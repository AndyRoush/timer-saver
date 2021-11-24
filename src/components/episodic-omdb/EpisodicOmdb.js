// import { render } from "@testing-library/react";
import React, { useState, forwardRef, useEffect } from "react";
import MaterialTable from "material-table";
import { Table, Spin, Tag, Space } from "antd";

// components
import LinkButton from "../external-link-button/ExternalLinkButton";

// css
import "./EpisodicOmdb.css";

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
import { FlashOffRounded } from "@material-ui/icons";

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

const EpisodicOmdb = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  // request ops for IMDB API
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const [inputVal, setInputVal] = useState("");
  const [allData, setAllData] = useState([]);
  const [topLoading, setTopLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [dataNum, setDataNum] = useState("0");
  const [respError, setRespError] = useState("");
  const [noResults, setNoResults] = useState("");
  const [seriesResult, setSeriesResult] = useState([]);
  const [seasonNums, setSeasonNums] = useState("");
  const [table, showTable] = useState(false);
  const [mainDisp, setMainDisp] = useState(false);
  const [seasonArray, setSeasonArray] = useState([]);
  const [imdbId, setImdbId] = useState("");

  const getInputValue = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    setTopLoading(true);
    console.log(inputVal);
    e.preventDefault();
    // Set these 2 to emptry strings. If you don't, the errors will persist through the next search.
    setNoResults("");
    setRespError("");
    fetch(`https://www.omdbapi.com/?i=${inputVal}&apikey=${apiKey}`)
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        setSeriesResult(data);
        setSeasonNums(data.totalSeasons);
        setImdbId(data.imdbID);
        setTopLoading(false);
        setMainDisp(true);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchSeasonInfo = (e) => {
    e.preventDefault();
    let arrayBuilder = [];
    let arrLength = Number(seasonNums);
    setBottomLoading(true);
    for (var i = 1; i < arrLength + 1; i++) {
      fetch(
        `https://www.omdbapi.com/?i=${inputVal}&Season=${i}&apikey=${apiKey}`
      )
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          arrayBuilder.push(data);
          console.log(data);
        })
        .catch((error) => console.log("error", error));
    }

    setSeasonArray(arrayBuilder);

    setTimeout(() => {
      showTable(true);
      setBottomLoading(false);
    }, 4000);
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
          <img src={seriesResult.Poster} alt="" className="ep-md-img" />
          <div className="content">
            <div className="content-header">
              <h3>
                {seriesResult.Title}&nbsp;({seriesResult.Year})
              </h3>
              <LinkButton
                link={`https://www.imdb.com/title/${seriesResult.imdbID}/`}
              />
            </div>
            <div className="content-inner">
              <div className="info-content">
                <p>
                  <b>Release date</b>: {seriesResult.Released}
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.imdbID}/releaseinfo?ref_=tt_dt_rdat`}
                  />
                </p>
                <p>
                  <b>Release year</b>: {seriesResult.Year}
                </p>
                <p>
                  <b>Runtime</b>: {seriesResult.Runtime}
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.imdbID}/technical?ref_=tt_spec_sm`}
                  />
                </p>
                <p>
                  <b>Seasons</b>: {seriesResult.totalSeasons}
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.imdbID}/episodes/?ref_=tt_ov_epl`}
                  />
                </p>
                <button onClick={fetchSeasonInfo}>Generate Season table</button>
              </div>
              <div className="info-content">
                <p>
                  <b>Countries</b>: {seriesResult.Country}
                </p>
                <p>
                  <b>Director</b>: {seriesResult.Director}
                </p>
                <p>
                  <b>IMDB ID</b>:{" "}
                  <a
                    href={`https://www.imdb.com/title/${seriesResult.imdbID}/releaseinfo?ref_=tt_ov_rdat`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {seriesResult.imdbID}
                  </a>
                </p>
                <p>
                  <b>Language</b>: {seriesResult.Language}
                </p>
                <p>
                  <b>Actors</b>: {seriesResult.Actors}
                </p>
                <p>
                  <b>Company Credits: </b>
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.imdbID}/companycredits?ref_=tt_dt_co`}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (seriesResult.length <= 0) {
      return <div>NOTHING</div>;
    }
  };
  // const columns = [
  //   // {
  //   //   title: "Season",
  //   //   dataIndex: "season",
  //   //   key: "season",
  //   // },
  //   {
  //     title: "Episode",
  //     dataIndex: "episode",
  //     key: "episode",
  //   },
  //   {
  //     title: "Title",
  //     dataIndex: "title",
  //     key: "title",
  //   },
  //   {
  //     title: "Released",
  //     dataIndex: "released",
  //     key: "released",
  //   },
  //   // {
  //   //   title: "Release Year",
  //   //   dataIndex: "releaseYear",
  //   //   key: "releaseYear",
  //   // },
  //   {
  //     title: "IMDB ID",
  //     dataIndex: "imdbid",
  //     key: "imdbid",
  //   },
  //   // {
  //   //   title: "Plot",
  //   //   dataIndex: "plot",
  //   //   key: "plot",
  //   // },
  // ];

  // const data = seasonArray
  //   ? seasonArray.map((item) => {
  //       console.log(item);
  //     })
  //   : null;

  // const data = seasonArray.map((item) => {
  //   console.log(item);
  //   return item.Episodes.map((d, index) => {
  //     console.log(d);
  //     return {
  //       key: index,
  //       episode: d.Episode,
  //       title: d.Title,
  //       released: d.Released,
  //       imdbid: d.imdbID,
  //     };
  //   });
  // });

  const renderMaterialData = seasonArray.map((item) => {
    console.log(item);
    const epNum = item.Episodes;
    return {
      episode: epNum.map((ep) => {
        return <p>{ep.Title}</p>;
      }),
      title: item.Season,
      released: item.Title,
      imdbid: item.totalSeasons,
    };
    // item.Episodes.map((d) => {
    //   return {
    //     episode: d.Episode,
    //     title: d.Title,
    //     released: d.Released,
    //     imdbid: d.imdbID,
    //   };
    // });
  });

  // const renderMaterialData = () => {
  //   let epArray = [];
  //   seasonArray.map((item) => {
  //     epArray.push(item.Episodes.Title);
  //   });
  //   epArray.map((d) => {
  //     return {
  //       episode: d.Episode,
  //       title: d.Title,
  //       released: d.Released,
  //       imdbid: d.imdbID,
  //     };
  //   });
  // };

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
      {topLoading ? (
        <div className="spinner-wrapper">
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : null}
      {mainDisp ? (
        <div className="md-border-padding">{renderMainDisplay()}</div>
      ) : null}
      {bottomLoading ? (
        <div className="spinner-wrapper">
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : null}
      {table ? (
        <div className="md-border-padding">
          {/* <Table columns={columns} dataSource={data} /> */}
          <MaterialTable
            icons={tableIcons}
            options={{
              exportButton: true,
              exportAllData: true,
            }}
            columns={[
              { title: "Episode", field: "episode", type: "string" },
              { title: "Title", field: "title" },
              { title: "Released", field: "released" },
              { title: "IMDBID", field: "imdbid", type: "string" },
            ]}
            data={renderMaterialData}
            title="Series generator"
          />
        </div>
      ) : null}
    </div>
  );
};

export default EpisodicOmdb;
