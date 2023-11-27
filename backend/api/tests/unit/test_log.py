import pytest


def test_get_all_logs(test_client, create_data):
    response = test_client.get('/logs')
    assert response.status_code == 200

log_data = {
    'type': 'Single_use',
    'description': 'Test log',
    'user_id':  1902,
    'truck_patent': 'TEST01',
    'fuel_level': 1,
    'water_level': 1,
    'oil_level': 1
}

def test_create_log(test_client, create_data, truck_fixture):

    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 201

def test_create_log_invalid_type(test_client, create_data, truck_fixture):
    invalid_log_data = log_data.copy()
    invalid_log_data['type'] = 'Invalid_type'

    response = test_client.post('/logs', json=invalid_log_data, content_type='application/json')
    assert response.status_code == 400

def test_create_log_invalid_user(test_client, create_data, truck_fixture):
    invalid_log_data = log_data.copy()
    invalid_log_data['user_id'] = 903

    response = test_client.post('/logs', json=invalid_log_data, content_type='application/json')
    assert response.status_code == 404
    
def test_create_log_invalid_truck(test_client, create_data):
    invalid_log_data = log_data.copy()
    invalid_log_data['truck_patent'] = 'Invalid_type'

    response = test_client.post('/logs', json=invalid_log_data, content_type='application/json')
    assert response.status_code == 404
    
def test_create_log_invalid_fuel_level(test_client, create_data, truck_fixture):
    invalid_log_data = log_data.copy()
    invalid_log_data['fuel_level'] = 2
    
    response = test_client.post('/logs', json=invalid_log_data, content_type='application/json')
    assert response.status_code == 400
    
def test_get_nonexistent_log(test_client, create_data):
    response = test_client.get('/logs/999')
    assert response.status_code == 404

def test_update_log(test_client, create_data):
    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 201

    response = test_client.put('/logs/1', json={'description': 'Updated log'}, content_type='application/json')
    assert response.status_code == 200
    
def test_update_log_invalid_data(test_client, create_data):
    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 201

    response = test_client.put('/logs/1', json={'type': 'INVALID'}, content_type='application/json')
    assert response.status_code == 400
    
    response = test_client.put('/logs/1', json={'fuel_level': 2}, content_type='application/json')
    assert response.status_code == 400
    
def test_update_nonexistent_log(test_client, create_data):
    response = test_client.put('/logs/999', json={'description': 'Updated log'}, content_type='application/json')
    assert response.status_code == 404
    
    
def test_delete_log(test_client, create_data):
    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 201

    response = test_client.delete('/logs/1')
    assert response.status_code == 200
    
def test_delete_nonexistent_log(test_client, create_data):
    response = test_client.delete('/logs/999')
    assert response.status_code == 404
    
def test_get_log(test_client, create_data):
    response = test_client.post('/logs', json=log_data, content_type='application/json')
    assert response.status_code == 201

    response = test_client.get('/logs/2')
    assert response.status_code == 200
    
def test_get_logs_with_description(test_client, create_data):
    no_description_log = log_data.copy()
    no_description_log['description'] = ''
    

    response = test_client.post('/logs', json=no_description_log, content_type='application/json')
    assert response.status_code == 201
    

    response = test_client.get('/logs?description=0')
    assert response.status_code == 200
    assert len(response.get_json()) == 4
    
    response = test_client.get('/logs') 
    assert response.status_code == 200
    assert len(response.get_json()) == 5

    