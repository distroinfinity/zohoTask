import React, { Component, useState } from "react";

export default function VehiclePopUP(props) {
  function handleClick() {
    props.toggle();
  }

  const [tollName, setTollName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [tariff, setTariff] = useState(0);

  const submitButton = () => {
    const newEntry = {
      tollName: tollName,
      vehicleType: vehicleType,
      vehicleNumber: vehicleNumber,
      tariff: tariff,
    };
    const push = [newEntry];
    console.log("newEntry", push);

    let allEntries = JSON.parse(localStorage.getItem("vehiclesInfo"));
    console.log("got", allEntries);
    if (!allEntries) {
      localStorage.setItem("vehiclesInfo", JSON.stringify(push));
    } else {
      allEntries.push(newEntry);
      localStorage.setItem("vehiclesInfo", JSON.stringify(allEntries));
    }
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;{" "}
        </span>
        <div>
          <label>Select toll name*</label>
          <select
            value={tollName}
            onChange={(e) => setTollName(e.target.value)}
          >
            <option value="test1">test1</option>
            <option value="test2">test2</option>
            <option value="test3">test3</option>
          </select>

          <br />
          <label>Select vehicle type*</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="t1">t1</option>
            <option value="t2">t2</option>
            <option value="t3">t3</option>
          </select>

          <br />

          <label>Vehicle Number*</label>
          <input
            type="text"
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="Enter your login id"
            value={vehicleNumber}
          />

          <br />

          <label>Tariff*</label>
          <input
            type="text"
            name="gmail"
            onChange={(e) => setTariff(e.target.value)}
            placeholder="Tariff amount"
            value={tariff}
          />

          <br />

          <button onClick={submitButton}>Add Entry</button>
        </div>
      </div>
    </div>
  );
}
