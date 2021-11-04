// import { render } from "@testing-library/react";
import React, { useState, forwardRef, useEffect } from "react";
import MaterialTable from "material-table";

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

const ImdbApi = () => {
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

  const getInputValue = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set these 2 to emptry strings. If you don't, the errors will persist through the next search.
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
  // const loopIds = (dArray) => {
  //   setLoading(true);
  //   let arrayBuilder = [];
  //   dArray.map((d) => {
  //     return fetch(
  //       `https://imdb-api.com/en/API/Title/${apiKey}/${d}`,
  //       requestOptions
  //     )
  //       .then(handleErrors)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         arrayBuilder.push(data);
  //       })
  //       .catch((error) => console.log(error));
  //   });

  //   setTimeout(function () {
  //     setLoading(false);
  //     setAllData(arrayBuilder);
  //     console.log(arrayBuilder);
  //     if (arrayBuilder.length === 0 || arrayBuilder[0].Response === "False") {
  //       setNoResults("no results found");
  //       setDataNum("0");
  //     } else {
  //       setDataNum(arrayBuilder.length);
  //     }
  //   }, 3000);
  // };
  const loopIds = (dArray) => {
    setLoading(true);
    let arrayBuilder = [];
    dArray.map((d) => {
      return fetch(
        `https://imdb-api.com/en/API/Title/${apiKey}/${d}`,
        requestOptions
      )
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          arrayBuilder.push(data);
        })
        .catch((error) => console.log(error));
    });

    // await fullArray;

    // setAllTheData(arrayBuilder);

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

  // const setAllTheData = (arr) => {
  //   console.log(arr);
  //   setLoading(false);
  //   setAllData(arr);
  //   console.log(arr);
  //   if (arr.length === 0 || arr[0].Response === "False") {
  //     setNoResults("no results found");
  //     setDataNum("0");
  //   } else {
  //     setDataNum(arr.length);
  //   }
  // };

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

  const renderMaterialData = allData
    ? allData.map((d, i) => {
        console.log(d);
        const date = d.releaseDate ? convertDate(d.releaseDate) : null;
        // let theActor = d.actorList[0];
        // function returnActors() {
        //   if (d.actorList.length > 0) {
        //     d.actorList.map((item, i) => {
        //       console.log(i + item.name);
        //       return i;
        //     });
        //   } else return;
        // }
        return {
          posterImg: d.image,
          imdbId: d.id,
          title: d.title,
          runtime: d.runtimeMins,
          releaseYear: d.year,
          director: d.directors,
          writer: d.writers,
          actors: "actors",
          genre: d.genres,
          language: d.languages,
          country: d.countries,
          releaseDate: d.releaseDate,
          posterUrl: d.image,
        };
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
          <MaterialTable
            icons={tableIcons}
            options={{
              exportButton: true,
              filtering: true,
            }}
            columns={[
              {
                title: "Poster Img",
                field: "posterImg",
                render: (rowData) => (
                  <img
                    src={rowData.posterImg}
                    alt="poster"
                    style={{ width: 70 }}
                  />
                ),
                filtering: false,
              },
              {
                title: "IMDB ID",
                field: "imdbId",
              },
              { title: "Title", field: "title", type: "string" },
              { title: "Run time", field: "runtime" },
              { title: "Release Year", field: "releaseYear" },
              { title: "Director", field: "director", type: "string" },
              { title: "Writer", field: "writer", type: "string" },
              { title: "Actors", field: "actors", type: "string" },
              { title: "Genre", field: "genre", type: "string" },
              { title: "Language", field: "language", type: "string" },
              { title: "Country of Origin", field: "country", type: "string" },
              { title: "Release Date", field: "releaseDate", type: "date" },
              {
                title: "Poster URL",
                field: "posterUrl",
                type: "string",
                filtering: false,
              },
            ]}
            data={renderMaterialData}
            title="IMDB Search"
          />
          {noResults ? (
            <Alert variant="warning" className="alerts">
              {noResults}
            </Alert>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ImdbApi;
