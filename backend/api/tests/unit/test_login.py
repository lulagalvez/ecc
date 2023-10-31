import pytest

def test_request_post_login(test_client):
    """
    GIVEN a user_id
    WHEN a POST request is made to /entrytime/
    THEN check that the response is valid
    """
    response = test_client.post('/user/login', json={
    "user_name": "testuser",
    "password": "testpassword"
})
    
    assert response.status_code == 200