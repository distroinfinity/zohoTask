import React, { Component, useEffect, useState } from "react";

const vehicleTypeOptions = [
  "Car/Jeep/Van",
  "LCV",
  "Truck/Bus",
  "Heavy vehicle",
];

export default function VehiclePopUP(props) {
  function handleClick() {
    props.toggle();
  }

  const [tollName, setTollName] = useState(null);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [tariff, setTariff] = useState(0);
  const [tollOptions, setTollOptions] = useState([]);
  const [tollPriceInfo, setTollInfo] = useState({});

  useEffect(() => {
    let tollsInfo = JSON.parse(localStorage.getItem("tolls"));
    setTollInfo(tollsInfo);
    let tolls = [];
    tollsInfo.forEach(function (item) {
      tolls.push(item.tollName);
    });
    //console.log(tolls);
    setTollOptions(tolls);
    setTollName(tolls[0]);
  }, []);

  function handlePrice(value, flag) {
    // console.log("called");
    if (flag == 1) {
      setTollName(value);
    } else {
      setVehicleType(value);
    }
  }
  useEffect(() => {
    if (tollName && vehicleType) {
      let tarriffPrice;
      // console.log(tollName);
      tollPriceInfo.forEach(function (item) {
        if (item.tollName === tollName) {
          // console.log(vehicleType, item[vehicleType]);
          tarriffPrice = item[vehicleType].single;
        }
      });
      setTariff(tarriffPrice);
    }
  }, [vehicleType, tollName]);

  const submitButton = () => {
    if (!tollName || !vehicleType || !vehicleNumber | !tariff) {
      alert("One of the required field not provided");
      return;
    }
    const newEntry = {
      tollName: tollName,
      vehicleType: vehicleType,
      vehicleNumber: vehicleNumber,
      tariff: tariff,
    };

    const push = [newEntry];
    // console.log("newEntry", push);

    let allEntries = JSON.parse(localStorage.getItem("vehiclesDetails"));
    // console.log("got", allEntries);
    if (!allEntries) {
      localStorage.setItem("vehiclesDetails", JSON.stringify(push));
    } else {
      allEntries.push(newEntry);
      localStorage.setItem("vehiclesDetails", JSON.stringify(allEntries));
    }
    handleClick();
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;{" "}
        </span>
        <p align="center">Add new entry</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "80%",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label>Select toll name</label>
            <select
              value={tollName}
              onChange={(e) => handlePrice(e.target.value, 1)}
            >
              {tollOptions.map((value, oIndex) => (
                <option value={value} key={oIndex}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Select vehicle type</label>

            <select
              value={vehicleType}
              onChange={(e) => {
                handlePrice(e.target.value, 2);
              }}
            >
              {vehicleTypeOptions.map((value, oIndex) => (
                <option value={value} key={oIndex}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Vehicle Number</label>

            <input
              type="text"
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="Enter your login id"
              value={vehicleNumber}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Tariff</label>

            <input
              type="text"
              name="gmail"
              onChange={(e) => setTariff(e.target.value)}
              placeholder="Tariff amount"
              value={tariff}
            />
          </div>
        </div>
        <p align="center">
          <button onClick={submitButton}>Add Entry</button>
        </p>
      </div>
    </div>
  );
}
