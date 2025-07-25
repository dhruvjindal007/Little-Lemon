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
            user_message = data.get("message", "")

            # Add a helpful prompt prefix
            prompt = f"""You are a helpful restaurant assistant. Only answer about dishes, menu, or food queries.
Menu:\n{menu_text}\n
User: {user_message}
Assistant:"""

            # Send the prompt to Ollama (Phi model)
            response = requests.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": "phi",
                    "prompt": prompt,
                    "stream": False
                }
            )

            # Debug: print the raw response from Ollama
            print("Ollama response text:", response.text)

            if response.status_code == 200:
                result = response.json()
                reply = result.get("response", "Sorry, I didn't get that.")
                return JsonResponse({"reply": reply})
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
