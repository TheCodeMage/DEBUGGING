# backend/store/urls.py

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AuthorViewSet, BookViewSet, OrderViewSet, OrderItemViewSet

router = DefaultRouter()
router.register(r'authors', AuthorViewSet)
router.register(r'books', BookViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order-items', OrderItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
