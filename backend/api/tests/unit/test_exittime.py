import pytest
from src.exittimes import routes

def test_request_post_exittime(test_client, create_data, exittime_fixture):
    """
    GIVEN a user_id
    WHEN a POST request is made to /exittime/
    THEN check that the response is valid
    """
    response = test_client.post('/exittime/', json={'user_id': 1902})
    assert response.status_code == 200
    

    