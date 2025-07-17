#define URL route for index() view
from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from .views import UserViewSet,BookingViewSet
from rest_framework.authtoken.views import obtain_auth_token
from .views import ask_chatbot
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'tables', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/', include(router.urls)),
    path('booking/', include(router.urls)),
    path('menu-items/', views.MenuItemsView.as_view()),
    path('menu-items/<int:pk>', views.SingleMenuItemView.as_view()),
    path('message/', views.msg),
    path('api-token-auth/', obtain_auth_token),
    path('chatbot/', ask_chatbot, name='chatbot'),

]
