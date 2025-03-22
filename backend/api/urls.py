from django.urls import path, include
from .views import health_check, RestaurantViewSet, RecipeViewSet, IngredientViewSet, ScrapViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)
router.register(r'recipes', RecipeViewSet)
router.register(r'ingredients', IngredientViewSet)
router.register(r'scraps', ScrapViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('health/', health_check),
    path('', include(router.urls)),
]
