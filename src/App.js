// import { render } from "@testing-library/react";
import React, { useState } from "react";

// Bootstrap
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

// Styles
import "./App.css";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [inputVal, setInputVal] = useState("");
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataNum, setDataNum] = useState("0");
  const [respError, setRespError] = useState("");
  const [noResults, setNoResults] = useState("");

  const getInputValue = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoResults("");
    setRespError("");
    const dataArray = inputVal.split(";");
    loopIds(dataArray);
  };

  function handleErrors(response) {
    setRespError(response.Error);
    if (response.Error) throw Error(response.Error);
    if (!response.ok) throw Error(response.statusText);
    return response;
  }

  // This function takes the array of IDs, loops through and makes an API call for each iteration then stores it in an array. That new array will be set to the
  // state object which we will use to iterate over to display the data to the user.
  const loopIds = (dArray) => {
    setLoading(true);
    let arrayBuilder = [];
    dArray.map((d) => {
      fetch(`https://www.omdbapi.com/?i=${d}&apikey=${apiKey}`)
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          arrayBuilder.push(data);
        })
        .catch((error) => console.log(error));
    });
    setTimeout(function () {
      setLoading(false);
      setAllData(arrayBuilder);
      console.log(arrayBuilder);
      if (arrayBuilder.length === 0 || arrayBuilder[0].Response === "False") {
        setNoResults("no results found");
        setDataNum("0");
      } else {
        setDataNum(arrayBuilder.length);
      }
    }, 3000);
  };

  // takes the date given by the API and creates mm/dd/yyyy
  const convertDate = (date) => {
    let dateArray = date.split(" ");

    let month = dateArray[1];
    let day = dateArray[0];
    let year = dateArray[2];

    if (month === "Jan") {
      month = "1";
      return `${month}/${day}/${year}`;
    } else if (month === "Feb") {
      month = "2";
      return `${month}/${day}/${year}`;
    } else if (month === "Mar") {
      month = "3";
      return `${month}/${day}/${year}`;
    } else if (month === "Apr") {
      month = "4";
      return `${month}/${day}/${year}`;
    } else if (month === "May") {
      month = "5";
      return `${month}/${day}/${year}`;
    } else if (month === "Jun") {
      month = "6";
      return `${month}/${day}/${year}`;
    } else if (month === "Jul") {
      month = "7";
      return `${month}/${day}/${year}`;
    } else if (month === "Aug") {
      month = "8";
      return `${month}/${day}/${year}`;
    } else if (month === "Sep") {
      month = "9";
      return `${month}/${day}/${year}`;
    } else if (month === "Oct") {
      month = "10";
      return `${month}/${day}/${year}`;
    } else if (month === "Nov") {
      month = "11";
      return `${month}/${day}/${year}`;
    } else if (month === "Dec") {
      month = "12";
      return `${month}/${day}/${year}`;
    }
  };

  const renderData = allData
    ? allData.map((d, i) => {
        // This takes off the "min" off the end of the string. Requested formatting from Bob
        const rtString = d.Runtime
          ? d.Runtime.substring(0, d.Runtime.length - 3)
          : null;
        const date = d.Released ? convertDate(d.Released) : null;

        return (
          <tr key={i}>
            <td>{d.imdbID}</td>
            <td>{d.Title}</td>
            <td>{rtString}</td>
            <td>{d.Year}</td>
            <td>{d.Director}</td>
            <td>{d.Actors}</td>
            <td>{d.Poster}</td>
            <td>{d.Language}</td>
            <td>{d.Country}</td>
            <td>{date}</td>
          </tr>
        );
      })
    : null;

  return (
    <div className="App">
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
      {loading ? (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="table-container">
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>IMDB ID</th>
                <th>Title Name</th>
                <th>Run time</th>
                <th>Release year</th>
                <th>Director name</th>
                <th>Actors</th>
                <th>Poster URL</th>
                <th>Language</th>
                <th>Country of origin</th>
                <th>Release date</th>
              </tr>
            </thead>
            <tbody>{renderData}</tbody>
          </Table>
          {noResults ? (
            <Alert variant="warning" className="alerts">
              {noResults}
            </Alert>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;
