import React, { useState } from "react";

export default function MultipleSelect(props) {
  const selectNames = ["select1", "select2", "select3", "select4"];
  const [options] = useState([
    {
      label: "Car/Jeep/Van",
      value: "Car/Jeep/Van",
    },
    {
      label: "LCV",
      value: "LCV",
    },
    {
      label: "Truck/Bus",
      value: "Truck/Bus",
    },
    {
      label: "Heavy vehicle",
      value: "Heavy vehicle",
    },
  ]);

  const [chosenOptions, setChosenOptions] = useState({});
  const [prices, setPrices] = useState({});
  const [tollname, setTollname] = useState("");
  const isChosenByOther = (optionValue, selectName) => {
    for (let key in chosenOptions) {
      if (key !== selectName) {
        if (chosenOptions[key] === optionValue) {
          return true;
        }
      }
    }
    return false;
  };

  const handleChange = (ev) => {
    setChosenOptions({ ...chosenOptions, [ev.target.name]: ev.target.value });
  };
  function handlePrice(ev) {
    setPrices({ ...prices, [ev.target.name]: ev.target.value });
  }
  //console.log("options", Object.keys(chosenOptions).length);
  const submitButton = () => {
    if (
      !tollname ||
      !prices["select1single"] ||
      !prices["select2single"] ||
      !prices["select3single"] ||
      !prices["select4single"] ||
      !prices["select1return"] ||
      !prices["select2return"] ||
      !prices["select3return"] ||
      !prices["select4return"] ||
      Object.keys(chosenOptions).length != 4
    ) {
      alert("One of the required field not provided");
      return;
    }
    const newEntry = {
      tollName: tollname,
      "Car/Jeep/Van": {
        single: prices["select1single"],
        return: prices["select1return"],
      },
      LCV: { single: prices["select2single"], return: prices["select2return"] },
      "Truck/Bus": {
        single: prices["select3single"],
        return: prices["select3return"],
      },
      "Heavy vehicle": {
        single: prices["select4single"],
        return: prices["select4return"],
      },
    };
    const push = [newEntry];
    //console.log("newEntry", push);

    let allEntries = JSON.parse(localStorage.getItem("tollsData"));
    //console.log("got", allEntries);
    if (!allEntries) {
      localStorage.setItem("tollsData", JSON.stringify(push));
    } else {
      allEntries.push(newEntry);
      localStorage.setItem("tollsData", JSON.stringify(allEntries));
    }
    props.handleClick();
  };

  return (
    <div>
      <p align="center">Add new toll</p>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "280px",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>Toll Name</label>
          <input
            type="text"
            onChange={(e) => setTollname(e.target.value)}
            placeholder="Enter toll name"
            value={tollname}
          />
        </div>

        {selectNames.map((name, index) => {
          return (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <select
                  name={name}
                  key={index}
                  onChange={handleChange}
                  placeholder="Select vehicle type"
                  value={chosenOptions[name] || ""}
                  required={index === 0}
                >
                  <option value="" />
                  {options
                    .filter(({ value }) => !isChosenByOther(value, name))
                    .map(({ label, value }, oIndex) => (
                      <option value={value} key={oIndex}>
                        {label}
                      </option>
                    ))}
                </select>
                <input
                  type="text"
                  name={name + "single"}
                  onChange={(e) => handlePrice(e)}
                  placeholder="Single Journey"
                  value={prices[name + "single"] || ""}
                />
                <input
                  type="text"
                  name={name + "return"}
                  onChange={(e) => handlePrice(e)}
                  placeholder="Return Journey"
                  value={prices[name + "return"] || ""}
                />
              </div>
            </>
          );
        })}
      </div>
      <p align="center">
        <button onClick={submitButton}>Add details</button>
      </p>
    </div>
  );
}
