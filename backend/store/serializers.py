from rest_framework import serializers
from .models import Author, Book, Order, OrderItem


# ---------- Author ----------
# Author model ကို JSON အဖြစ်ပြသဖို့ serializer.
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name']


# ---------- Book ----------
class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    image = serializers.ImageField(required=False)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(), write_only=True, source='author'
    )

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'author_id', 'description', 'price', 'stock', 'image']


# ---------- OrderItem ----------
class OrderItemSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), write_only=True, source='book'
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'book', 'book_id', 'quantity']


# ---------- Order ----------
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'complete', 'items']
        read_only_fields = ['user', 'created_at']
