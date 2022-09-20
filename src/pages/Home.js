import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./../App.css";
import filterIcon from "./../assets/filter.png";
import searchIcon from "./../assets/search.png";
import VehiclePopUP from "./../components/vehiclePopup";
import TollPopUp from "./../components/tollPopup";

function filterHandler() {
  console.log("filter working");
}

function searchHandler(event) {
  if (event.key != "Enter") {
    return;
  }
  console.log(event.target.value);
}

function viewAllTolls() {
  console.log("view all tolls");
}

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [seenVehiclePopUp, setVehiclePopUp] = useState(false);
  const [seenTollPopUp, setTollPopUp] = useState(false);

  useEffect(() => {
    const allEntries = JSON.parse(localStorage.getItem("vehiclesDetails"));
    setData(allEntries != null ? allEntries : []);
  }, [seenVehiclePopUp, seenTollPopUp]);

  function toggleVehiclePop() {
    setVehiclePopUp(!seenVehiclePopUp);
  }

  function toggleTollPop() {
    setTollPopUp(!seenTollPopUp);
  }

  return (
    <div>
      <header className="App-header">
        <p>Toll Management Application</p>
      </header>
      <hr></hr>
      <br></br>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "40%",
            justifyContent: "space-evenly",
          }}
        >
          <b>Toll entries/Vehicle entries </b>

          <button onClick={filterHandler}>
            <img src={filterIcon} style={{ width: "14px" }} />
          </button>
          <input
            placeholder="Search Vehicles"
            onKeyDown={(event) => searchHandler(event)}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "40%",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <div onClick={toggleVehiclePop}>
              <button>Add vehicle entry</button>
            </div>
            {seenVehiclePopUp ? (
              <VehiclePopUP toggle={toggleVehiclePop} />
            ) : null}
          </div>

          <div>
            <div onClick={toggleTollPop}>
              <button>Add new toll</button>
            </div>
            {seenTollPopUp ? <TollPopUp toggle={toggleTollPop} /> : null}
          </div>

          <button onClick={viewAllTolls}>View all tolls</button>
        </div>
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
                <td>{val.tollName}</td>
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
