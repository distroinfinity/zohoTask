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
  const [tollOptions, setTollOptions] = useState([]);
  const [tollFilter, setTollFilter] = useState("All");

  function viewAllTolls() {
    console.log("view all tolls");
    setTollPage(!tollPage);
  }
  function filterHandler(e) {
    setTollFilter(e);
    let temp = JSON.parse(localStorage.getItem("vehiclesDat"));
    if (e != "All") {
      temp = temp.filter((item) => item.tollName == e);
    }
    setData(temp);
  }

  function searchHandler(event) {
    if (event.key != "Enter") {
      return;
    }
    console.log(event.target.value);
    if (tollPage == false) {
      let temp = JSON.parse(localStorage.getItem("vehiclesDat"));
      if (!event.target.value) {
        setData(temp);
        return;
      }
      temp = temp.filter((item) => item.vehicleNumber == event.target.value);
      console.log(temp, event.target.value);
      setData(temp);
    } else {
      console.log(tollInfo);
      let temp = JSON.parse(localStorage.getItem("tollsDat"));
      if (!event.target.value) {
        setTollInfo(temp);
        return;
      }
      temp = temp.filter((item) => item.tollName == event.target.value);
      setTollInfo(temp);
    }
  }

  function deleteEntry(event) {
    if (event.key != "Enter" || event.target.value == "") {
      return;
    }
    let temp = tollInfo;
    temp = temp.filter((item) => !(item.tollName == event.target.value));
    console.log(event.target.value, temp);
    localStorage.setItem("tollsDat", JSON.stringify(temp));
    setTollInfo(temp);
  }
  useEffect(() => {
    const allEntries = JSON.parse(localStorage.getItem("vehiclesDat"));
    let tolls = JSON.parse(localStorage.getItem("tollsDat"));

    let option = [];
    if (tolls != null) {
      tolls.forEach(function (item) {
        option.push(item.tollName);
      });
    }

    //console.log(tolls, option);
    setTollOptions(option);
    setTollInfo(tolls != null ? tolls : []);
    setData(allEntries != null ? allEntries : []);
  }, [seenVehiclePopUp, seenTollPopUp]);

  function toggleVehiclePop() {
    if (seenVehiclePopUp == false && tollOptions.length == 0) {
      //console.log(tollOptions.length, "option avail", seenVehiclePopUp);
      alert("No toll entry found, first add toll then add vehicle");
      return;
    }
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
          {tollPage == false ? (
            <b>Toll entries/Vehicle entries </b>
          ) : (
            <b>Tollgate List</b>
          )}

          {!tollPage && (
            <button style={{ color: "white", background: "white" }}>
              <img src={filterIcon} style={{ width: "14px" }} />
              <select
                value={tollFilter}
                onChange={(e) => filterHandler(e.target.value)}
              >
                <option value={"All"}>All</option>
                {tollOptions.map((value, oIndex) => (
                  <option value={value} key={oIndex}>
                    {value}
                  </option>
                ))}
              </select>
            </button>
          )}

          <input
            placeholder={
              tollPage == false ? "Search Vehicles" : "Search a toll"
            }
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
              <button style={{ color: "white", background: "#2196f3" }}>
                Add vehicle entry
              </button>
            </div>
            {seenVehiclePopUp ? (
              <VehiclePopUP toggle={toggleVehiclePop} />
            ) : null}
          </div>

          <div>
            <div onClick={toggleTollPop}>
              <button style={{ color: "white", background: "#2196f3" }}>
                Add new toll
              </button>
            </div>
            {seenTollPopUp ? <TollPopUp toggle={toggleTollPop} /> : null}
          </div>

          <button
            style={{ color: "white", background: "#2196f3" }}
            onClick={viewAllTolls}
          >
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

            {data.length == 0
              ? "No vehicle entries found"
              : data.map((val, key) => {
                  //console.log(val.timestamp, typeof val.timestamp);
                  const formatted = formatTime(val.timestamp);
                  return (
                    <>
                      <tr key={key}>
                        <td>{val.vehicleType}</td>
                        <td>{val.vehicleNumber}</td>
                        <td>{formatted}</td>
                        <td>{val.tollName}</td>
                        <td>{val.tariff}</td>
                      </tr>
                      <br />
                    </>
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
              {tollInfo.length == 0
                ? "No toll found"
                : tollInfo.map((val, key) => {
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
            <div
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "space-evenly",
              }}
            >
              {/* <input
                placeholder="Search Vehicles"
                onKeyDown={(event) => searchHandler(event)}
              /> */}
              <div>Delete a toll</div>
              <div>
                <input
                  placeholder="enter name and hit enter"
                  onKeyDown={(event) => deleteEntry(event)}
                ></input>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
