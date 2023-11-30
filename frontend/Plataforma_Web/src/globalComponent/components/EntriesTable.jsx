import React from 'react';

const EntriesTable = ({ entries }) => {
  return (
    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiempo de ingreso</th>
            <th>Tiempo de salida</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.entry_date_time}</td>
              <td>{entry.exit_date_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntriesTable;
