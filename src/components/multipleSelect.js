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
  const submitButton = () => {
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
    console.log("newEntry", push);

    let allEntries = JSON.parse(localStorage.getItem("tolls"));
    console.log("got", allEntries);
    if (!allEntries) {
      localStorage.setItem("tolls", JSON.stringify(push));
    } else {
      allEntries.push(newEntry);
      localStorage.setItem("tolls", JSON.stringify(allEntries));
    }
    props.handleClick();
  };

  return (
    <div>
      <p align="center">Add new toll</p>
      <br></br>
      <label>Toll Name</label>
      <input
        type="text"
        onChange={(e) => setTollname(e.target.value)}
        placeholder="Enter toll name"
        value={tollname}
      />
      <br></br>
      <br></br>
      {selectNames.map((name, index) => {
        return (
          <>
            <div>
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
            <br></br>
            <br></br>
          </>
        );
      })}
      <p align="center">
        <button onClick={submitButton}>Add details</button>
      </p>
    </div>
  );
}
