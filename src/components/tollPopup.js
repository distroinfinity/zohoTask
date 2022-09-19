import React, { Component, useState } from "react";

export default function TollPopUp(props) {
  function handleClick() {
    props.toggle();
  }

  const [tollName, setTollName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [tariff, setTariff] = useState();

  const [vehicleType1, setVehicleType1] = useState("");
  const [type1S, setType1S] = useState();
  const [type1R, setType1R] = useState();

  const [vehicleType2, setVehicleType2] = useState("");
  const [type2S, setType2S] = useState();
  const [type2R, setType2R] = useState();

  const [vehicleType3, setVehicleType3] = useState("");
  const [type3S, setType3S] = useState();
  const [type3R, setType3R] = useState();

  const [vehicleType4, setVehicleType4] = useState("");
  const [type4S, setType4S] = useState();
  const [type4R, setType4R] = useState();

  const [options, setOptions] = useState([
    "Car/Jeep/Van",
    "LCV",
    "Truck/Bus",
    "Heavy vehicle",
  ]);

  const submitButton = () => {
    const newEntry = {
      tollName: tollName,
      type1: { type1S: type1S, type1R: type1R },
      type2: { type2S: type2S, type2R: type2R },
      type3: { type3S: type3S, type3R: type3R },
      type4: { type4S: type4S, type4R: type4R },
    };
    const push = [newEntry];
    console.log("newEntry", push);

    let allEntries = JSON.parse(localStorage.getItem("tollInfo"));
    console.log("got", allEntries);
    if (!allEntries) {
      localStorage.setItem("tollInfo", JSON.stringify(push));
    } else {
      allEntries.push(newEntry);
      localStorage.setItem("tollInfo", JSON.stringify(allEntries));
    }
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;{" "}
        </span>
        <div>
          <p align="center">Add new toll</p>
          <br></br>
          <label>Toll Name*</label>
          <input
            type="text"
            onChange={(e) => setTollName(e.target.value)}
            placeholder="Enter toll name"
            value={tollName}
          />

          <br />
          <br />
          <label>Vehicle fare details*</label>
          <br></br>
          <br />
          <div>
            <select
              value={vehicleType1}
              onChange={(e) => {
                setVehicleType1(e.target.value);
                // let temp = options.filter((a) => a !== e.target.value);
                // setOptions(temp);
              }}
            >
              {options.map((val, key) => {
                return (
                  <option key={key} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="type1S"
              onChange={(e) => setType1S(e.target.value)}
              placeholder="Single Journey"
              value={type1S}
            />
            <input
              type="text"
              name="type1R"
              onChange={(e) => setType1R(e.target.value)}
              placeholder="Return Journey"
              value={type1R}
            />
          </div>

          <br />
          <br />

          <div>
            <select
              value={vehicleType2}
              onChange={(e) => setVehicleType2(e.target.value)}
            >
              {options.map((val, key) => {
                return (
                  <option key={key} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="type2S"
              onChange={(e) => setType2S(e.target.value)}
              placeholder="Single Journey"
              value={type2S}
            />
            <input
              type="text"
              name="type2R"
              onChange={(e) => setType2R(e.target.value)}
              placeholder="Return Journey"
              value={type2R}
            />
          </div>

          <br />
          <br />

          <div>
            <select
              value={vehicleType3}
              onChange={(e) => setVehicleType3(e.target.value)}
            >
              {options.map((val, key) => {
                return (
                  <option key={key} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="type3S"
              onChange={(e) => setType3S(e.target.value)}
              placeholder="Single Journey"
              value={type3S}
            />
            <input
              type="text"
              name="type3R"
              onChange={(e) => setType3R(e.target.value)}
              placeholder="Return Journey"
              value={type3R}
            />
          </div>

          <br />
          <br />

          <div>
            <select
              value={vehicleType4}
              onChange={(e) => setVehicleType4(e.target.value)}
            >
              {options.map((val, key) => {
                return (
                  <option key={key} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="type4S"
              onChange={(e) => setType4S(e.target.value)}
              placeholder="Single Journey"
              value={type4S}
            />
            <input
              type="text"
              name="type4R"
              onChange={(e) => setType4R(e.target.value)}
              placeholder="Return Journey"
              value={type4R}
            />
          </div>

          <br />
          <br />
          <p align="center">
            <button onClick={submitButton}>Add details</button>
          </p>
        </div>
      </div>
    </div>
  );
}
