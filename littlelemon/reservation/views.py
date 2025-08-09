from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import UserSerializer, BookingSerializer, MenuItemSerializer
from .models import Booking, MenuItem
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests

@csrf_exempt
def ask_chatbot(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            menu_text = data.get("menu", "")
            user_message = data.get("message", "").strip()

            # First load greeting
            if user_message == "__start__":
                user_message = (
                    "You are the restaurant's AI assistant. "
        "The user just opened the chat. "
        "Reply with EXACTLY ONE sentence. "
        "Start with a single greeting (only one), then in the same sentence ask if they prefer something light, spicy, or sweet, "
        "and suggest exactly 2 dishes per category from the menu. "
        "Do not add any extra sentences, bullet points, or alternatives."
                )

            prompt = f"""
You are a friendly, engaging restaurant assistant.
You have access to the menu below.

If the user greets you or makes small talk, reply briefly and guide them toward asking about the menu.

Menu:
{menu_text}

User: {user_message}
Assistant:
"""

            response = requests.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": "phi3:mini",
                    "prompt": prompt,
                    "stream": False,
                }
            )

            if response.status_code == 200:
                result = response.json()
                reply = result.get("response", "").strip()

                # ✅ Remove duplicate lines
                lines = [line.strip() for line in reply.split("\n") if line.strip()]
                cleaned = []
                for line in lines:
                    if line not in cleaned:
                        cleaned.append(line)

                # ✅ Remove extra greetings if more than one found
                greetings = ("hi", "hello", "welcome", "hey")
                filtered = []
                greeting_found = False
                for line in cleaned:
                    if any(line.lower().startswith(g) for g in greetings):
                        if not greeting_found:
                            filtered.append(line)
                            greeting_found = True
                        # skip additional greetings
                    else:
                        filtered.append(line)

                reply = " ".join(filtered)

                return JsonResponse({"response": reply or "Sorry, I didn't get that."})
            else:
                return JsonResponse({"error": "Model failed to respond."}, status=500)

        except Exception as e:
            print("Chatbot error:", e)
            return JsonResponse({"error": "An error occurred while processing your request."}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)



def index(request):
    return render(request, 'project/index.html', {})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

class MenuItemsView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

class SingleMenuItemView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def msg(request):
    return Response({"message": "This view is protected"})
