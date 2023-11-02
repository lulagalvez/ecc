import React, { useState, useEffect } from 'react';

const RequestExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL de la API, en este caso la API esta viviendo en localhost:5000
    const apiUrl = 'http://localhost:5000/user/'; 

    // fetch para realizar la petición
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Respuesta de red incorrecta');
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []); // Arreglo vacio para que el useEffect se ejecute solamente 1 vez

  return (
    <div>
      <h1>Request Example</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          {/* Mostrar data tomada de la API */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RequestExample;
