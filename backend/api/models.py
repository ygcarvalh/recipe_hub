from django.db import models
from django.conf import settings

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    instructions = models.TextField()
    restaurants = models.ManyToManyField('Restaurant', related_name='recipes')

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_recipes'
    )

    def __str__(self):
        return self.name

class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    unit = models.CharField(max_length=50)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')

    def __str__(self):
        return self.name

class Scrap(models.Model):
    content = models.TextField()
    recipe = models.OneToOneField(Recipe, on_delete=models.CASCADE, related_name='scrap')

    def __str__(self):
        return f"Scrap for {self.recipe.name}"
