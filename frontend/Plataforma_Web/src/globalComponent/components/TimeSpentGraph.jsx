import React from "react";

const TimeSpentGraph = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return <p>Sin data para el grafico.</p>;
  }

  return (
    <div></div>
  )
};

export default TimeSpentGraph;
