from rest_framework import serializers
from .models import Restaurant, Recipe, Ingredient, Scrap
from django.contrib.auth import get_user_model

User = get_user_model()

class IngredientSerializer(serializers.ModelSerializer):
    recipe_id = serializers.PrimaryKeyRelatedField(source='recipe', read_only=True)

    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'unit', 'recipe_id']

class SimpleRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    restaurants = SimpleRestaurantSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'description', 'instructions', 'ingredients', 'restaurants']

class ScrapSerializer(serializers.ModelSerializer):
    recipe_id = serializers.PrimaryKeyRelatedField(source='recipe', read_only=True)

    class Meta:
        model = Scrap
        fields = ['id', 'content', 'recipe_id']

class RestaurantDetailSerializer(serializers.ModelSerializer):
    recipes = RecipeSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address', 'phone', 'recipes']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_active']
        read_only_fields = ['is_staff', 'is_active']

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
