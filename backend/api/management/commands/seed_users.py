from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Populate the database with regular users (non-admin)'

    def handle(self, *args, **kwargs):
        User = get_user_model()

        users_data = [
            {"username": "maria", "email": "maria@example.com", "password": "user123"},
            {"username": "joao", "email": "joao@example.com", "password": "user123"},
            {"username": "ana", "email": "ana@example.com", "password": "user123"},
        ]

        for user in users_data:
            if not User.objects.filter(username=user["username"]).exists():
                u = User.objects.create_user(
                    username=user["username"],
                    email=user["email"],
                    password=user["password"]
                )
                self.stdout.write(self.style.SUCCESS("User created"))
            else:
                self.stdout.write(self.style.WARNING(f"User already exists: {user['username']}"))
