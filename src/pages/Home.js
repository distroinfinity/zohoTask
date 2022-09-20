import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./../App.css";
import filterIcon from "./../assets/filter.png";
import searchIcon from "./../assets/search.png";
import VehiclePopUP from "./../components/vehiclePopup";
import TollPopUp from "./../components/tollPopup";

function formatTime(timestamp) {
  if (!timestamp) return;
  // var date = new Date(timestamp);
  //const d = Date.now(timestamp);
  //console.log(typeof timestamp, timestamp);
  var date = new Date(timestamp);
  const temp = date.toISOString().slice(0, 10);
  //console.log(temp, "yyyy-mm-dd");

  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  //console.log(temp + " " + formattedTime);
  return temp + " " + formattedTime;
}
const vehicleTypeOptions = [
  "Car/Jeep/Van",
  "LCV",
  "Truck/Bus",
  "Heavy vehicle",
];

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [seenVehiclePopUp, setVehiclePopUp] = useState(false);
  const [seenTollPopUp, setTollPopUp] = useState(false);
  const [tollPage, setTollPage] = useState(false);
  const [tollInfo, setTollInfo] = useState([]);

  function viewAllTolls() {
    console.log("view all tolls");
    setTollPage(!tollPage);
  }
  function filterHandler() {
    console.log("filter working");
  }

  function searchHandler(event) {
    if (event.key != "Enter") {
      return;
    }
    console.log(event.target.value);
  }
  function deleteEntry(event) {
    if (event.key != "Enter" || event.target.value == "") {
      return;
    }
    let temp = tollInfo;
    temp = temp.filter((item) => !(item.tollName == event.target.value));
    console.log(event.target.value, temp);
    localStorage.setItem("tollsData", JSON.stringify(temp));
    setTollInfo(temp);
  }
  useEffect(() => {
    const allEntries = JSON.parse(localStorage.getItem("vehiclesData"));
    let tolls = JSON.parse(localStorage.getItem("tollsData"));
    //console.log(tolls);
    setTollInfo(tolls != null ? tolls : []);
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

          <button onClick={viewAllTolls}>
            {tollPage == false ? "View all tolls" : "back to vehicle logs"}
          </button>
        </div>
      </div>
      <hr></hr>
      <div>
        {tollPage == false ? (
          <table>
            <tr>
              <th>VEHICLE TYPE</th>
              <th>VEHICLE NUMBER</th>
              <th>DATE/TIME</th>
              <th>TOLL NAME</th>
              <th>TARIFF</th>
            </tr>
            {data.map((val, key) => {
              //console.log(val.timestamp, typeof val.timestamp);
              const formatted = formatTime(val.timestamp);
              return (
                <tr key={key}>
                  <td>{val.vehicleType}</td>
                  <td>{val.vehicleNumber}</td>
                  <td>{formatted}</td>
                  <td>{val.tollName}</td>
                  <td>{val.tariff}</td>
                </tr>
              );
            })}
          </table>
        ) : (
          <>
            <table>
              <tr>
                <th>TOLL NAME</th>
                {vehicleTypeOptions.map((val, key) => {
                  return <th>{val}</th>;
                })}
              </tr>
              {tollInfo.map((val, key) => {
                //console.log(val.timestamp, typeof val.timestamp);
                // const formatted = formatTime(val.timestamp);
                return (
                  <tr key={key}>
                    <td>
                      <>{val.tollName}</>
                    </td>
                    {vehicleTypeOptions.map((item, key) => {
                      return (
                        <td>{val[item].single + "/" + val[item].return}</td>
                      );
                    })}
                    <td>
                      {/* <button onClick={deleteEntry(val.tollName)}>Delete</button> */}
                    </td>
                  </tr>
                );
              })}
            </table>
            <br></br>
            <br></br>
            <br></br>
            <>
              {/* <input
                placeholder="Search Vehicles"
                onKeyDown={(event) => searchHandler(event)}
              /> */}
              <p>Delete</p>
              <input
                placeholder="enter name and hit enter"
                onKeyDown={(event) => deleteEntry(event)}
              ></input>
            </>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
