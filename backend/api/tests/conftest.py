import os
import pytest
import datetime
import time
from src import create_app
from src.extensions import db
from src.models.user import User
from src.models.entrytime import EntryTime
from src.entrytimes import routes as entrytime_routes
from src.exittimes import routes as exittime_routes
from config import TestingConfig

FAKE_DATE_TIME = datetime.datetime(2000, 2, 19, 0, 0, 0)
test_user_id = 1902

@pytest.fixture(scope='module') 
def test_client():
    flask_app = create_app(TestingConfig)
    
    with flask_app.test_client() as testing_client:
        with flask_app.app_context():
            yield testing_client

@pytest.fixture(scope='module')
def create_data(test_client):
    test_user = User(
        id = test_user_id,
        first_name='Sebastian', 
        last_name='Sanhueza', 
        role='firefighter', 
        user_name='sebas', 
        password='1234',
        email = 'seba@sanhue.cl'
        )
    db.session.add(test_user) 
    db.session.commit()

    yield
    
    db.drop_all()

@pytest.fixture(scope='function')
def exittime_fixture(test_client):
    user = db.get_or_404(User, test_user_id)
    test_entrytime = entrytime_routes.create_entrytime(user)
    
    db.session.add(test_entrytime)
    db.session.commit()
    
    yield
    
    db.session.delete(test_entrytime)
    db.session.commit()
    
@pytest.fixture(scope='function')
def get_entrytime_fixture(test_client):
    user = db.get_or_404(User, test_user_id)
    
    for i in range(3):
        entry_time = entrytime_routes.create_entrytime(user)
        db.session.add(entry_time)   
        db.session.add(exittime_routes.create_exittime(user, entry_time))
   
    
@pytest.fixture
def date_time_mock(monkeypatch):
    
    class MyDateTime(datetime.datetime):
        @classmethod
        def now(cls):
            return FAKE_DATE_TIME
    
    monkeypatch.setattr(datetime, 'datetime', MyDateTime)