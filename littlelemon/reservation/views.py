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
        data = json.loads(request.body)
        user_input = data.get("question", "")
        menu_text = data.get("menu", "")

        prompt = f"""You are a helpful restaurant assistant. Here's the current menu:\n{menu_text}\n\nUser: {user_input}"""

        try:
            response = requests.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": "gemma:2b",
                    "prompt": prompt,
                    "stream": False
                }
            )
            result = response.json()
            return JsonResponse({"response": result.get("response", "Sorry, I couldn't respond.")})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


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
