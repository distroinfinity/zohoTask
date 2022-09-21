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
  const [data, setData] = useState({});

  useEffect(() => {
    let tollsInfo = JSON.parse(localStorage.getItem("tollsDat"));
    const allEntries = JSON.parse(localStorage.getItem("vehiclesDat"));
    setData(allEntries != null ? allEntries : []);
    //console.log(tollsInfo, "test");
    setTollInfo(tollsInfo != null ? tollsInfo : []);
    let tolls = [];
    if (tollsInfo) {
      tollsInfo.forEach(function (item) {
        tolls.push(item.tollName);
      });
      setTollName(tolls[0]);
    } else {
      // alert("No toll entry found, first add toll then add vehicle");
      // handleClick();
      // return;
    }
    //console.log(tolls);
    setTollOptions(tolls);
    setVehicleType(vehicleTypeOptions[0]);
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
    //console.log(vehicleType, tollName, vehicleNumber);
    if (tollName && vehicleType) {
      let tarriffPrice,
        tariffPriceReturn = false;
      // console.log(tollName);
      data.forEach(function (item) {
        if (item.tollName == tollName && item.vehicleNumber == vehicleNumber) {
          if ((Date.now() - item.timestamp) / 60000 < 60) {
            tariffPriceReturn = true;
          }
        }
      });
      tollPriceInfo.forEach(function (item) {
        if (item.tollName === tollName) {
          // console.log(vehicleType, item[vehicleType]);
          if (tariffPriceReturn) {
            tarriffPrice = item[vehicleType].return;
          } else {
            tarriffPrice = item[vehicleType].single;
          }
        }
      });
      setTariff(tarriffPrice);
    }
  }, [vehicleType, tollName, vehicleNumber]);

  const submitButton = () => {
    if (!tollName || !vehicleType || !vehicleNumber | !tariff) {
      alert("One of the required field not provided");
      return;
    }
    //console.log(Date.now());
    const newEntry = {
      tollName: tollName,
      vehicleType: vehicleType,
      vehicleNumber: vehicleNumber,
      tariff: tariff,
      timestamp: Date.now(),
    };

    const push = [newEntry];
    // console.log("newEntry", push);

    let allEntries = JSON.parse(localStorage.getItem("vehiclesDat"));
    // console.log("got", allEntries);
    if (!allEntries) {
      localStorage.setItem("vehiclesDat", JSON.stringify(push));
    } else {
      allEntries.push(newEntry);
      localStorage.setItem("vehiclesDat", JSON.stringify(allEntries));
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
