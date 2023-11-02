import pytest
from src.extensions import db
from src.models.user import User
from src.models.entrytime import EntryTime
from src.exittimes import routes as exittime_routes
from tests.conftest import FAKE_DATE_TIME

def test_create_exittime(test_client, create_data, exittime_fixture):
    """
    GIVEN a user and a entrytime
    WHEN a POST request is made to /exittime/
    THEN create a exittime object and change user.state to 0
    """
    user_id = 1902
    user = db.get_or_404(User, user_id)
   
    entry_time1 = db.session.query(EntryTime).filter_by(user_id=user.id).order_by(EntryTime.id.desc()).first()
    exit_time1 = exittime_routes.create_exittime(user, entry_time1)
    
    assert user.state == User.STATES['Inactive']
    assert entry_time1.exit_time.id == exit_time1.id
    assert exit_time1.entry_time_id == entry_time1.id


def test_post_exittime(test_client, create_data, exittime_fixture):
    """
    GIVEN a user_id
    WHEN a POST request is made to /exittime/
    THEN check that the response is valid
    """
    response1 = test_client.post('/exittime/', json={'user_id': 1902})
    data_resonses1 = response1.get_json()
    assert response1.status_code == 200
    
    test_client.post('/entrytime/', json={'user_id': 1902})
    response2 = test_client.post('/exittime/', json={'user_id': 1902})
    data_resonse2 = response2.get_json()
    
    assert data_resonses1['entry_time_id'] != data_resonse2['entry_time_id']
    
def test_post_exittime_with_no_entrytime(test_client, create_data):
    """
    GIVEN a user_id
    WHEN a POST request is made to /exittime/
    THEN check that the response is valid
    """
    response = test_client.post('/exittime/', json={'user_id': 1902})
    assert response.status_code == 400
    
def test_post_exittime_with_no_user_id(test_client, create_data, exittime_fixture):
    """
    GIVEN a user_id
    WHEN a POST request is made to /exittime/
    THEN check that the response is valid
    """
    response = test_client.post('/exittime/', json={})
    assert response.status_code == 400

def test_post_exittime_with_user_id_not_integer(test_client, create_data, exittime_fixture):
    """
    GIVEN a user_id
    WHEN a POST request is made to /exittime/
    THEN check that the response is valid
    """
    response = test_client.post('/exittime/', json={'user_id': 'sebas'})
    assert response.status_code == 404
    
def test_post_no_user_with_user_id(test_client, create_data, exittime_fixture):
    """
    GIVEN a user_id
    WHEN a POST request is made to /exittime/
    THEN check that the response is valid
    """
    response = test_client.post('/exittime/', json={'user_id': 1})
    assert response.status_code == 404
    
