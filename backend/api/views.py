from django.db import connection, DatabaseError
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Restaurant, Recipe, Ingredient, Scrap
from .serializers import (
    RestaurantDetailSerializer, RecipeSerializer,
    IngredientSerializer, ScrapSerializer,
    UserSerializer, UserCreateSerializer
)

User = get_user_model()

@api_view(['GET'])
def health_check(request):
    app_status = "ok"
    db_status = "ok"

    try:
        connection.ensure_connection()
    except DatabaseError as e:
        db_status = "error"
        return Response({
            "app": app_status,
            "database": db_status,
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({
        "app": app_status,
        "database": db_status
    }, status=status.HTTP_200_OK)

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantDetailSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class ScrapViewSet(viewsets.ModelViewSet):
    queryset = Scrap.objects.all()
    serializer_class = ScrapSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer
