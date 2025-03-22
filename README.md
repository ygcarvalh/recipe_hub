# Recipe Hub Application

## Purpose

The Recipe Hub Application is a web-based platform designed to allow users to manage, share, and explore recipes from various restaurants. It provides functionalities for both restaurant managers and regular users to create, update, and view recipes. The application is divided into two major parts: Frontend and Backend.

- Frontend: Built with Next.js, this part of the application handles the user interface, allowing users to view recipes, search for specific dishes, and interact with the system seamlessly. It also features authentication mechanisms, including login and logout, and supports dark/light themes.

- Backend: Built with Django Rest Framework, the backend handles user management, recipe storage, and restaurant management. It exposes RESTful APIs for the frontend to consume, ensuring that all operations related to recipe and restaurant management are handled efficiently and securely.

This application aims to improve the accessibility of restaurant menus, allowing users to easily explore available recipes while enabling restaurant staff to manage their offerings efficiently.

---

## Technologies Used

The Recipe Hub Application utilizes a combination of modern technologies to provide a seamless and efficient experience for both users and developers. Below are the main technologies used in both the Frontend and Backend:

### Frontend

- Next.js: A React framework that enables server-side rendering and static site generation. It is used to build the user interface and handle routing.

- React: A JavaScript library for building user interfaces. Used in conjunction with Next.js, it powers the frontend components and manages the state.

- Styled Components: A library for styled components that allows for writing CSS in JavaScript, ensuring a modular, maintainable, and scalable approach to styling.

- JWT (JSON Web Tokens): Used for authentication and authorization. The frontend interacts with the backend via secured API calls using the access token provided after login.

### Backend

- Django: A high-level Python web framework that follows the model-template-views (MTV) architectural pattern. It is used for developing the backend, managing models, and serving APIs.

- Django Rest Framework (DRF): A toolkit for building Web APIs on top of Django. It simplifies the creation of RESTful APIs and integrates well with Django’s ORM.

- PostgreSQL: A relational database used to store all data, including user information, recipes, and restaurant details.

- psycopg2: A PostgreSQL database adapter for Python. It is used to interact with the PostgreSQL database from the Django backend.

- JWT (JSON Web Tokens): Used for user authentication, providing secure communication between the frontend and backend.

- CORS (Cross-Origin Resource Sharing): Configured to allow requests from the frontend to the backend while ensuring proper security and authorization.

### Development Tools

- Git: Version control system used to track changes in the codebase and collaborate with others.

- VS Code: Preferred code editor, equipped with extensions for Python, JavaScript, and Django development.

---

## Installation Instructions

To get the Recipe Hub Application up and running, follow the instructions below for both the Backend and Frontend. Ensure you complete each section in the order specified.

### Backend Setup

1. Clone the repository:

```bash
    git clone https://github.com/ygcarvalh/recipe_hub.git
    cd recipe_hub
```

2. Create a Virtual Environment: First, ensure that you have Python installed. Then, create a virtual environment for the backend.

```bash
    cd backend
    python3 -m venv venv
```

3. Activate the Virtual Environment: Activate the virtual environment to install the required packages.

```bash
    source venv/bin/activate # For Linux/Mac
    venv\Scripts\activate # For Windows
```

4. Install Required Packages: Install the necessary Python packages using pip.

```bash
    pip install -r requirements.txt
```

5. Set Up the Database: Create a PostgreSQL database and update the database settings in `backend/recipe_hub/settings.py`.

```bash
    python setup_db.py
```

6. Run Migrations: Apply the migrations to create the necessary database tables. (optional)

```bash
    python manage.py migrate
```

7. Create a Superuser: Create a superuser to access the Django admin panel. (optional)

```bash
    python manage.py createsuperuser
```

8. Run the Development Server: Start the Django development server.

```bash
    python manage.py runserver
```

---

### Frontend Setup

1. Navigate to the frontend directory:

```bash
    cd frontend
```

2. Install pnpm (if you don't have it installed):

```bash
    npm install -g pnpm
```

3. Inside the frontend directory, run the following command to install the necessary dependencies using pnpm:

```bash
    pnpm install
```

4. Start the development server:

```bash
    pnpm dev
```

---

### Additional Notes

- The backend server will run on `http://localhost:8000/`, and the frontend server will run on `http://localhost:3000/`.
- Database settings can be configured in `backend/recipe_hub/settings.py`.
- For production deployment, ensure to set the `DEBUG` flag to `False` in the Django settings.

---

## Improvements to be Made

While the Recipe Hub Application is functional, there are several areas where improvements can be made to enhance performance, maintainability, and overall user experience. The following improvements are planned for future development:

### Frontend Improvements

1. Refactor UI Components:

   - Improve the structure and organization of UI components to enhance maintainability.
   - Optimize CSS styles and remove unused styles to reduce bundle size.

2. Improve State Management:

   - Refactor state management to reduce prop-drilling and improve the flow of data between components. A state management library like Redux or Zustand could be explored for more complex state handling.

3. Error Handling and Loading States:

   - Improve error handling across the application by introducing custom error components that can be reused, and ensure that loading states are clearly communicated to users.
   - Implement fallback UI for network failures and ensure that users are informed when there’s an issue with the API.

4. Form Validation:

   - Add client-side form validation for input fields like creating recipes, adding restaurants, and registering users to ensure a better user experience before sending data to the backend.

5. Implement Global Error Boundaries:
   - Introduce React Error Boundaries to catch runtime errors and display a fallback UI, preventing the app from crashing.

### Backend Improvements

1. Restructure the Backend Architecture:

   - Follow a more modular architecture for the backend, organizing the Django app by features (e.g., separate apps for `recipes`, `restaurants`, `users`, etc.), which will make the codebase easier to maintain and scale.

2. API Rate Limiting:

   - Introduce services and repositories to handle business logic and database operations separately from the views and serializers.

3. API Documentation:

   - Integrate an API documentation tool like Swagger or Redoc to automatically generate and maintain up-to-date documentation for the RESTful API.

4. User Permissions and Roles:

   - Refine the role-based access control (RBAC) system. Currently, only admins have the ability to add restaurants or users, but this can be expanded to include more granular permissions for different user roles.
   - Introduce custom permissions to handle specific access control scenarios (e.g., allowing restaurant owners to manage their recipes but not other restaurants' recipes).

5. Background Tasks
   - For heavy operations like scraping, create background jobs using Celery to offload long-running tasks from the main thread and improve user experience by avoiding blocking the request-response cycle.

### General Improvements

1. Docker:

   - Dockerize the application to ensure consistent development and deployment environments across different machines.

2. Tests:

   - Write comprehensive unit tests and integration tests for both the frontend and backend to ensure the reliability and stability of the application.

3. Performance Optimization:
   - Implement performance optimizations like lazy loading images, code splitting, and server-side rendering to improve the overall speed and user experience of the application.

## IA Utilization

Throughout the development of the Recipe Hub Application, AI has been used to streamline various tasks and improve efficiency. Below are some key areas where AI was utilized:

1. gitignore Generation

To ensure that unnecessary files were excluded from version control, a `.gitignore` file was generated. The following prompt was used to assist with its creation:
Prompt for generating `.gitignore`:

```plaintext
Create a .gitignore file for a project that uses Python (Django), JavaScript (Next.js), and PostgreSQL. Exclude the following:
- Python virtual environment files
- Node.js dependencies (node_modules)
- Django migrations and database files
- .env files containing sensitive data
- Log files, system files, and IDE configuration files
```

2. CORS Issue Resolution

While setting up the backend with Django, a CORS issue occurred when making API requests from the frontend. The following prompt was used to address the problem:

Prompt for resolving the CORS issue:

```plaintext
How can I resolve a CORS issue in a Django application when making API requests from a frontend running on a different port? I am using the `django-cors-headers` package and need to allow requests from `http://localhost:3000`.
```

Solution:

```python
# In settings.py of your Django project

INSTALLED_APPS = [
    # Other apps...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # Other middleware...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

CORS_ALLOW_HEADERS = list(default_headers) + [
    "authorization",
]

CORS_ALLOW_CREDENTIALS = True
```

3. Documentation Generation

AI was also utilized to generate various sections of the project documentation, ensuring a comprehensive and organized structure. Here are some prompts that were used for documentation:

Prompt for generating the "Technologies Used" section:

```plaintext
    Create a section for the "Technologies Used" in a project that uses Next.js for the frontend, Django for the backend, PostgreSQL for the database, and Docker for containerization. Include libraries such as styled-components and Axios, and explain the use of JWT for authentication.
```

Prompt for generating the "Installation Instructions" section:

```plaintext
    Write installation instructions for a project with a backend using Django (Python) and a frontend using Next.js. Include instructions for setting up a virtual environment for Python, installing dependencies with pip, running Django migrations, and setting up the frontend with pnpm.
```

Generated sections for Technologies Used and Installation Instructions were included as part of the final documentation, making it easier for contributors to get started with the project.


4. Seed Data Generation

Seed data was needed to populate the database with initial information. AI was used to generate mock data for testing purposes, such as creating restaurant entries, recipe details, and ingredients. Here's the prompt used for generating seed data:

Prompt for generating seed data:

```plaintext
    Generate mock seed data for a Recipe Hub application that includes the following:
        - A list of users with usernames, emails, and passwords.
        - A list of restaurants with names, addresses, and phone numbers.
        - A list of recipes with names, instructions, ingredients (with name and quantity), and associated restaurants.
```
