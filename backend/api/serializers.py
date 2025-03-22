from rest_framework import serializers
from .models import Restaurant, Recipe, Ingredient, Scrap
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class IngredientSerializer(serializers.ModelSerializer):
    quantity = serializers.CharField(source="unit")  # renomeia para o frontend
    recipe_id = serializers.PrimaryKeyRelatedField(source='recipe', read_only=True)

    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'quantity', 'recipe_id']

class SimpleRestaurantSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    class Meta:
        model = Restaurant
        fields = ['id', 'name']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    restaurants = SimpleRestaurantSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'description', 'instructions', 'ingredients', 'restaurants', 'created_by']

    def create(self, validated_data):
        ingredients_data = validated_data.pop("ingredients", [])
        restaurants_data = validated_data.pop("restaurants", [])
        recipe = Recipe.objects.create(**validated_data)

        for ingredient in ingredients_data:
            ingredient_instance = Ingredient.objects.create(recipe=recipe, **ingredient)

            recipe.ingredients.add(ingredient_instance)

        for restaurant_data in restaurants_data:
            restaurant_id = restaurant_data.get('id')

            if restaurant_id:
                try:
                    restaurant = Restaurant.objects.get(id=restaurant_id)
                    recipe.restaurants.add(restaurant)
                except Restaurant.DoesNotExist:
                    raise serializers.ValidationError(f"Restaurant with id {restaurant_id} does not exist.")
            else:
                restaurant_name = restaurant_data.get('name')

                if restaurant_name:
                    restaurant = Restaurant.objects.create(name=restaurant_name)
                    recipe.restaurants.add(restaurant)
                else:
                    restaurant = Restaurant.objects.filter(name='Default Restaurant').first()
                    if restaurant is None:
                        restaurant = Restaurant.objects.create(name='Default Restaurant')
                    recipe.restaurants.add(restaurant)

        return recipe

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
        fields = ['id', 'username', 'email', 'password', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'required': False, 'default': False}
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["is_admin"] = user.is_staff
        token["username"] = user.username

        return token
