import os
import django
from django.conf import settings
from django.core.management import call_command
import psycopg2
from psycopg2 import sql

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

def create_database():
    db_name = settings.DATABASES['default']['NAME']
    db_user = settings.DATABASES['default']['USER']
    db_password = settings.DATABASES['default']['PASSWORD']
    db_host = settings.DATABASES['default']['HOST']
    db_port = settings.DATABASES['default']['PORT']
    
    conn = psycopg2.connect(
        dbname="postgres",
        user=db_user,
        password=db_password,
        host=db_host,
        port=db_port,
    )
    conn.autocommit = True
    cur = conn.cursor()

    try:
        print(f"Creating database: {db_name}...")
        cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(db_name)))
        print(f"Database {db_name} created successfully!")
    except psycopg2.errors.DuplicateDatabase:
        print(f"Database {db_name} already exists.")

    cur.close()
    conn.close()

def setup_db():
    print("Setting up the database...")

    try:
        create_database()

        print("Applying migrations...")
        call_command("migrate")
        print("Migrations applied successfully!")

        print("Creating superuser...")
        call_command("createsuperuser", "--noinput", username="admin", email="admin@example.com", password="adminpassword")
        print("Superuser created successfully!")

        print("Database setup completed successfully!")

    except Exception as e:
        print(f"Error setting up the database: {e}")

if __name__ == "__main__":
    setup_db()
