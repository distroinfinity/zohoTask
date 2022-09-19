import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./../App.css";
import filterIcon from "./../assets/filter.png";
import searchIcon from "./../assets/search.png";
const data = [
  {
    vehicleType: "Anom",
    vehicleNumber: 19,
    date: "123",
    tollname: "test",
    tariff: 1,
  },
  {
    vehicleType: "A",
    vehicleNumber: 190,
    date: "12123",
    tollname: "te213st",
    tariff: 12,
  },
  {
    vehicleType: "sdg",
    vehicleNumber: 20,
    date: "000",
    tollname: "test2",
    tariff: 1,
  },
];

function filterHandler() {
  console.log("filter working");
}

function searchHandler(event) {
  if (event.key != "Enter") {
    return;
  }
  console.log(event.target.value);
}

function addVehicleEntry() {
  console.log("adding vehicle entry");
}
function addNewToll() {
  console.log("adding new toll");
}
function viewAllTolls() {
  console.log("view all tolls");
}

function App() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <header className="App-header">
        <p>Toll Management Application</p>
      </header>
      <hr></hr>
      <br></br>
      <br></br>
      <div>
        <div>
          <b>Toll entries/Vehicle entries </b>

          <button onClick={filterHandler}>
            <img src={filterIcon} style={{ width: "14px" }} />
          </button>
          <input
            placeholder="Search Vehicles"
            onKeyDown={(event) => searchHandler(event)}
          />

          <div>
            <button onClick={addVehicleEntry}>Add vehicle entry</button>
            <button onClick={addNewToll}>Add new toll</button>
            <button onClick={viewAllTolls}>View all tolls</button>
          </div>
        </div>
        <br></br>
      </div>
      <hr></hr>
      <div>
        <table>
          <tr>
            <th>VEHICLE TYPE</th>
            <th>VEHICLE NUMBER</th>
            <th>DATE/TIME</th>
            <th>TOLL NAME</th>
            <th>TARIFF</th>
          </tr>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.vehicleType}</td>
                <td>{val.vehicleNumber}</td>
                <td>{val.date}</td>
                <td>{val.tollname}</td>
                <td>{val.tariff}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <Link to={`toll/`}>Learn React</Link>
    </div>
  );
}

export default App;