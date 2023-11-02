import pytest
from src.models.user import User  # Import the User model

def test_new_user():
    """
    GIVEN a User model
    WHEN a new User is created
    THEN check the email, hashed_password, and role fields are defined correctly
    """
    user = User(
        email="johndoe@example.com",
        first_name="John",
        last_name="Doe",
        role="User",
        state=0,
        user_name="johndoe123",
        password="YourPasswordHere"  # Add the password attribute
    )
    assert user.email == 'johndoe@example.com'
    assert user.first_name == 'John'
    assert user.last_name == 'Doe'
    assert user.role == 'User'
    assert user.state == 0
    assert user.user_name == 'johndoe123'
    assert user.password == 'YourPasswordHere'


def test_role_assignment():
    user = User(
        email="johndoe@example.com",
        role="Admin"
    )
    assert user.role == 'Admin'

