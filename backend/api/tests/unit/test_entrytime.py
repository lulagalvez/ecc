import pytest
from src.models.user import User
from src.extensions import db
from src.entrytimes import routes

def test_create_entrytime(test_client, create_data):
    """
    GIVEN a user
    WHEN a POST request is made to /entrytime/
    THEN create a entrytime object and change user.state to 1
    """
    user_id = 1902
    user = db.get_or_404(User, user_id)
    entry_time = routes.create_entrytime(user)
    
    assert entry_time.user_id == user_id
    assert user.state == User.STATES['Active']
    
    db.session.delete(entry_time)

def test_post_entrytime(test_client, create_data):
    """
    GIVEN a user_id
    WHEN a POST request is made to /entrytime/
    THEN check that the response is valid
    """
    user_id = 1902
    response = test_client.post('/entrytime/', json={'user_id': user_id})
    
    assert response.status_code == 200
    
def test_error_post_entrytime_with_same_id_without_exittime(test_client, create_data):
    """
    GIVEN a user_id 
    WHEN there is a entrytime with the same user_id without exittime
    THEN return an error
    """
    response = test_client.post('/entrytime/', json={'user_id': 1902})
    
    assert response.status_code == 400
    
def test_error_post_no_user_id_argument(test_client, create_data):
    """
    GIVEN nothing
    WHEN a POST request is made to /entrytime/
    THEN check that the response is valid
    """

    response = test_client.post('/entrytime/', json={})
    
    assert response.status_code == 400
    
def test_error_post_user_id_is_not_an_integer(test_client, create_data):
    """
    GIVEN a user_id that is not an integer
    WHEN a POST request is made to /entrytime/
    THEN check that the response is valid
    """
    
    response = test_client.post('/entrytime/', json={'user_id': 'sebas'})
    
    assert response.status_code == 404
    
def test_error_post_no_user_with_user_id(test_client, create_data):
    """
    GIVEN a user_id that is not an integer
    WHEN a POST request is made to /entrytime/
    THEN check that the response is valid
    """
    
    response = test_client.post('/entrytime/', json={'user_id': 1001})
    
    assert response.status_code == 404