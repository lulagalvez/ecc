import pytest


def test_get_all_logs(test_client, create_data):
    response = test_client.get('/logs')
    assert response.status_code == 200


def test_create_log(test_client, create_data, truck_fixture):
    log_data = {
        'type': 1,
        'description': 'Test log',
        'user_id': create_data.id,
        'truck_patent': truck_fixture.patent
    }

    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 201


def test_create_log_invalid_data(test_client, create_data):
    log_data = {
        'type': 1,
        'description': 'Test log',
        'user_id': create_data.id,
        'truck_patent': 'INVALID'
    }

    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 404

def test_create_log_invalid_type(test_client, create_data, truck_fixture):
    log_data = {
        'type': 5,
        'description': 'Test log',
        'user_id': create_data.id,
        'truck_patent': truck_fixture.patent
    }

    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 400

def test_create_log_invalid_user(test_client, create_data, truck_fixture):
    log_data = {
        'type': 1,
        'description': 'Test log',
        'user_id': 999,
        'truck_patent': truck_fixture.patent
    }

    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 404
    
def test_create_log_invalid_truck(test_client, create_data):
    log_data = {
        'type': 1,
        'description': 'Test log',
        'user_id': create_data.id,
        'truck_patent': 'INVALID'
    }

    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 404
    
def test_get_nonexistent_log(test_client, create_data):
    response = test_client.get('/logs/999')
    assert response.status_code == 404

def test_update_log(test_client, create_data):
    log_data = {
        'type': 1,
        'description': 'Test log',
        'user_id': create_data.id,
        'truck_patent': 'TEST01'
    }

    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 201

    response = test_client.put('/logs/1', json={'description': 'Updated log'}, content_type='application/json')
    assert response.status_code == 200
    
def test_update_log_invalid_data(test_client, create_data):
    log_data = {
        'type': 1,
        'description': 'Test log',
        'user_id': create_data.id,
        'truck_patent': 'TEST01'
    }

    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 201

    response = test_client.put('/logs/1', json={'type': 5}, content_type='application/json')
    assert response.status_code == 400
    
def test_update_nonexistent_log(test_client, create_data):
    response = test_client.put('/logs/999', json={'description': 'Updated log'}, content_type='application/json')
    assert response.status_code == 404
    
def test_delete_log(test_client, create_data):
    log_data = {
        'type': 1,
        'description': 'Test log',
        'user_id': create_data.id,
        'truck_patent': 'TEST01'
    }

    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 201

    response = test_client.delete('/logs/1')
    assert response.status_code == 200
    
def test_delete_nonexistent_log(test_client, create_data):
    response = test_client.delete('/logs/999')
    assert response.status_code == 404
    
def test_get_log(test_client, create_data):
    log_data = {
        'type': 1,
        'description': 'Test log',
        'user_id': create_data.id,
        'truck_patent': 'TEST01'
    }

    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 201

    response = test_client.get('/logs/2')
    assert response.status_code == 200

    