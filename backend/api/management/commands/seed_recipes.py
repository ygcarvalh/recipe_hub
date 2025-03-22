import random
from django.core.management.base import BaseCommand
from api.models import Recipe, Ingredient, Restaurant

class Command(BaseCommand):
    help = 'Populate the database with recipes and ingredients'

    def handle(self, *args, **kwargs):
        recipes_data = [
            {
                "name": "Feijoada",
                "description": "Traditional Brazilian recipe.",
                "instructions": "Cook the beans with the meats for hours.",
                "created_by_id": 1
            },
            {
                "name": "Moqueca",
                "description": "Fish with coconut milk and palm oil.",
                "instructions": "Cook slowly with seasonings.",
                "created_by_id": 1
            },
            {
                "name": "Escondidinho de Carne",
                "description": "Mashed cassava with shredded dried meat.",
                "instructions": "Layer and bake.",
                "created_by_id": 1
            }
        ]

        ingredients_mock = {
            "Feijoada": [("Black beans", "kg"), ("Dried meat", "kg"), ("Bay leaf", "leaves")],
            "Moqueca": [("Fish", "kg"), ("Coconut milk", "ml"), ("Palm oil", "ml")],
            "Escondidinho de Carne": [("Dried meat", "kg"), ("Cassava", "kg"), ("Cheese", "g")]
        }

        restaurants = list(Restaurant.objects.all())
        if not restaurants:
            self.stdout.write(self.style.ERROR("You need to create restaurants first!"))
            return

        for recipe_data in recipes_data:
            recipe, created = Recipe.objects.get_or_create(
                name=recipe_data["name"],
                defaults={
                    "description": recipe_data["description"],
                    "instructions": recipe_data["instructions"],
                    "created_by_id": recipe_data["created_by_id"]
                }
            )
            if created:
                for name, unit in ingredients_mock[recipe.name]:
                    Ingredient.objects.create(name=name, unit=unit, recipe=recipe)

                selected_restaurants = random.sample(restaurants, k=random.randint(1, min(2, len(restaurants))))
                recipe.restaurants.set(selected_restaurants)

                self.stdout.write(self.style.SUCCESS(f"Recipe created: {recipe.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Recipe already existed: {recipe.name}"))
