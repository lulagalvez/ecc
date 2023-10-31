import pytest
from src.entrytimes import routes
from src.extensions import db


def test_request_post_entrytime(test_client, create_data):
    """
    GIVEN a user_id
    WHEN a POST request is made to /entrytime/
    THEN check that the response is valid
    """
    response = test_client.post('/entrytime/', json={'user_id': 1})
    
    assert response.status_code == 200


def test_error_post_entrytime_with_same_id_without_exittime(test_client):
    """
    GIVEN a user_id 
    WHEN there is a entrytime with the same user_id without exittime
    THEN return an error
    """
    
    response = test_client.post('/entrytime/', json={'user_id': 1})
    
    assert response.status_code == 400
    