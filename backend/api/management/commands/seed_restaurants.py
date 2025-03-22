from django.core.management.base import BaseCommand
from api.models import Restaurant

class Command(BaseCommand):
    help = 'Populate the database with fictional restaurants'

    def handle(self, *args, **kwargs):
        data = [
            {"name": "Homemade Flavor Restaurant", "address": "Street A, 100", "phone": "11999999999"},
            {"name": "Chef's Delights", "address": "Avenue B, 200", "phone": "21988888888"},
            {"name": "Fast Food", "address": "Alley C, 300", "phone": "31977777777"},
        ]

        for entry in data:
            obj, created = Restaurant.objects.get_or_create(**entry)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Restaurant created: {obj.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Restaurant already existed: {obj.name}"))
