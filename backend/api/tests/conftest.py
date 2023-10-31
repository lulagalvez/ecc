import os
from src import create_app
import pytest

@pytest.fixture(scope='module') 
def test_client():
    os.environ['CONFIG_TYPE'] = 'config.TestingConfig'
    flask_app = create_app()
    
    with flask_app.test_client() as testing_client:
        yield testing_client
    