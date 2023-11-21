def test_get_all_trucks(test_client, truck_fixture):
    response = test_client.get('/trucks')
    assert response.status_code == 200
    assert response.json['trucks'][0]['patent'] == 'TEST01'

def test_get_single_truck(test_client, truck_fixture):
    response = test_client.get(f'/trucks/{truck_fixture.patent}')
    assert response.status_code == 200
    assert response.json['patent'] == 'TEST01'

def test_create_truck(test_client):
    response = test_client.post('/trucks', json={'patent': 'NEW001'})
    assert response.status_code == 201

def test_update_truck(test_client, truck_fixture):
    response = test_client.put(f'/trucks/{truck_fixture.patent}', json={'patent': 'UPDT01', 'oil_level': 1/3, 'water_level': 2/3, 'fuel_level': 1})
    assert response.status_code == 200



def test_delete_truck(test_client, truck_fixture):
    response = test_client.delete(f'/trucks/{truck_fixture.patent}')
    assert response.status_code == 200

    
def test_create_truck_invalid_data(test_client):
    response = test_client.post('/trucks', json={'patent': ''})
    assert response.status_code == 400
    assert 'error' in response.json
    
def test_get_nonexistent_truck(test_client):
    response = test_client.get('/trucks/INVALID')
    assert response.status_code == 404

def test_update_truck_invalid_data(test_client, truck_fixture):
    response = test_client.put(f'/trucks/{truck_fixture.patent}', json={'patent': 'INVALID'})
    assert response.status_code == 400
    assert 'error' in response.json
    
def test_update_truck_invalid_level(test_client, truck_fixture):
    response = test_client.put(f'/trucks/{truck_fixture.patent}', json={'oil_level': 3, 'water_level': 2/3, 'fuel_level': 1})
    assert response.status_code == 400
    assert 'error' in response.json

def test_update_nonexistent_truck(test_client):
    response = test_client.put('/trucks/INVALID', json={'patent': 'NEW001'})
    assert response.status_code == 404


def test_delete_nonexistent_truck(test_client):
    response = test_client.delete('/trucks/INVALID')
    assert response.status_code == 404


