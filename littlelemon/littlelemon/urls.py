from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from reservation.views import BookingViewSet
from django.views.generic import TemplateView
from reservation.views import ask_chatbot

router = DefaultRouter()
router.register(r'tables', BookingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('restaurant/chatbot/', ask_chatbot),
    path('restaurant/', include('reservation.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('restaurant/booking/', include(router.urls)),
    path('api/', include('reservation.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('', TemplateView.as_view(template_name="frontend/index.html"), name="home"),
]
