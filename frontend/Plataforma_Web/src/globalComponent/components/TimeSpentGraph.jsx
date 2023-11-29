import React from "react";
import { Line } from "react-chartjs-2";

const TimeSpentGraph = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return <p>Sin data para el grafico.</p>;
  }

  return (
    <div></div>
  )
};

export default TimeSpentGraph;
