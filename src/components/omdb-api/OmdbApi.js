// import { render } from "@testing-library/react";
import React, { useState, forwardRef } from "react";
import MaterialTable from "material-table";

// antd imports
import { Table, Spin, Space } from "antd";

// Bootstrap
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

function OmdbApi() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [inputVal, setInputVal] = useState("");
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataNum, setDataNum] = useState("0");
  const [respError, setRespError] = useState("");
  const [noResults, setNoResults] = useState("");
  const [update, setUpdate] = useState(false);

  const getInputValue = (e) => {
    setInputVal(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set these 2 to empty strings. If you don't, the errors will persist through the next search.
    setNoResults("");
    setRespError("");
    console.log("handlesubmit");
    const dataArray = inputVal.split(" ");
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
    console.log("in loopIDs");
    setLoading(true);
    let arrayBuilder = [];
    dArray.map((d) => {
      // console.log(d);
      return fetch(`https://www.omdbapi.com/?i=${d}&apikey=${apiKey}`)
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          arrayBuilder.push(data);
        })
        .catch((error) => console.log("error: " + error));
    });
    setAllData(arrayBuilder);

    setTimeout(function () {
      setLoading(false);
      if (arrayBuilder.length === 0 || arrayBuilder[0].Response === "False") {
        setNoResults("no results found");
        setDataNum("0");
      } else {
        setDataNum(arrayBuilder.length);
      }
    }, 3000);
  };

  // const setAllTheData = (arr) => {
  //   setLoading(false);
  //   setAllData(arr);
  //   console.log("set all the data");
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

  // Material data table
  const renderMaterialData = allData
    ? allData.map((d, i) => {
        // This takes off the "min" off the end of the string. Requested formatting from Bob
        const rtString = d.Runtime
          ? d.Runtime.substring(0, d.Runtime.length - 3)
          : null;
        const date = d.Released ? convertDate(d.Released) : null;

        return {
          posterImg: d.Poster,
          imdbId: d.imdbID,
          title: d.Title,
          runtime: rtString,
          releaseYear: d.Year,
          director: d.Director,
          writer: d.Writer,
          actors: d.Actors,
          genre: d.Genre,
          language: d.Language,
          country: d.Country,
          releaseDate: date,
          posterUrl: d.Poster,
        };
      })
    : null;

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={getInputValue} className="input-bar" placeholder="Paste values with a space between" />
          {respError ? (
            <Alert variant="danger" className="alerts">
              {respError}
            </Alert>
          ) : null}
          <button type="submit" className="submit-button">
            Search
          </button>
          <p className="search-amount">
            You searched for <span className="data-num">{dataNum}</span>
            <span>&nbsp;{dataNum === 1 ? "title" : "titles"}</span>
          </p>
        </form>
      </div>

      {/* material table */}
      {loading ? (
        <div className="spinner-wrapper">
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : (
        <div className="table-container">
          <MaterialTable
            icons={tableIcons}
            options={{
              exportButton: true,
              exportAllData: true,
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
                export: false,
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "IMDB ID",
                field: "imdbId",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Title",
                field: "title",
                type: "string",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Run time",
                field: "runtime",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Release Year",
                field: "releaseYear",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Director",
                field: "director",
                type: "string",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Writer",
                field: "writer",
                type: "string",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Actors",
                field: "actors",
                type: "string",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Genre",
                field: "genre",
                type: "string",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Language",
                field: "language",
                type: "string",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Country of Origin",
                field: "country",
                type: "string",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Release Date",
                field: "releaseDate",
                type: "date",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
              },
              {
                title: "Poster URL",
                field: "posterUrl",
                type: "string",
                filtering: false,
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
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
}

export default OmdbApi;
