// import { render } from "@testing-library/react";
import React, { useState, forwardRef, useEffect } from "react";
import MaterialTable from "material-table";

// css
import "./Episodic.css";

// Bootstrap
// import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

// Material Icons
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function App() {
  const apiKey = process.env.REACT_APP_IMDB_KEY;

  // request ops for IMDB API
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const [inputVal, setInputVal] = useState("");
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataNum, setDataNum] = useState("0");
  const [respError, setRespError] = useState("");
  const [noResults, setNoResults] = useState("");
  const [seriesResult, setSeriesResult] = useState([]);

  const getInputValue = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set these 2 to emptry strings. If you don't, the errors will persist through the next search.
    setNoResults("");
    setRespError("");
    fetch(
      `https://imdb-api.com/en/API/Title/${apiKey}/${inputVal}`,
      requestOptions
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((result) => setSeriesResult(result))
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  function handleErrors(response) {
    setRespError(response.Error);
    if (response.Error) throw Error(response.Error);
    if (!response.ok) throw Error(response.statusText);
    return response;
  }

  const renderMainDisplay = () => {
    if (seriesResult) {
      return (
        <div className="main-display-wrapper">
          <img src={seriesResult.image} alt="" className="ep-md-img" />
          <div className="info-content">
            <h3>{seriesResult.fullTitle}</h3>
            <p>
              <b>Release date</b>: {seriesResult.releaseDate}
            </p>
            <p>
              <b>Release year</b>: {seriesResult.year}
            </p>
            <p>
              <b>Runtime</b>: {seriesResult.runtimeMins}
            </p>
            <p>
              <b>Seasons</b>: {seriesResult.tvSeriesInfo.seasons.length}
            </p>
          </div>
          <div className="info-content">
            <p>
              <b>Countries</b>: {seriesResult.countries}
            </p>
            <p>
              <b>Director</b>: {seriesResult.directors}
            </p>
            <p>
              <b>IMDB ID</b>:{" "}
              <a
                href={`https://www.imdb.com/title/${seriesResult.id}/`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {seriesResult.id}
              </a>
            </p>
            <p>
              <b>Companies</b>: {seriesResult.companies}
            </p>
          </div>
        </div>
      );
    } else {
      return <div>NOTHING</div>;
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={getInputValue} />
          {respError ? (
            <Alert variant="danger" className="alerts">
              {respError}
            </Alert>
          ) : null}
          <button type="submit" className="submit-button">
            Search
          </button>
          <p>
            You searched for <span className="data-num">{dataNum}</span>
            <span>&nbsp;{dataNum === 1 ? "title" : "titles"}</span>
          </p>
        </form>
      </div>
      <div>{renderMainDisplay()}</div>
    </div>
  );
}

export default App;
