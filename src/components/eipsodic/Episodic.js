// import { render } from "@testing-library/react";
import React, { useState, forwardRef, useEffect } from "react";
import MaterialTable from "material-table";
import { Table, Tag, Space } from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

// components
import LinkButton from "../external-link-button/ExternalLinkButton";

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

function Episodic() {
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
  const [seasonNums, setSeasonNums] = useState([]);
  const [table, showTable] = useState(false);
  const [seasonArray, setSeasonArray] = useState([]);
  const [imdbId, setImdbId] = useState("");

  const getInputValue = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(inputVal);
    e.preventDefault();
    // Set these 2 to emptry strings. If you don't, the errors will persist through the next search.
    setNoResults("");
    setRespError("");
    fetch(
      `https://tv-api.com/en/API/Title/${apiKey}/${inputVal}`,
      requestOptions
    )
      // .then(handleErrors)
      .then((response) => response.json())
      .then((result) => {
        setSeriesResult(result);
        setSeasonNums(result.tvSeriesInfo.seasons);
        setImdbId(result.id);
        console.log(result.tvSeriesInfo.seasons);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchSeasonInfo = (e) => {
    e.preventDefault();
    let arrayBuilder = [];
    setLoading(true);
    seasonNums.map((s, i) => {
      fetch(
        `https://tv-api.com/en/API/SeasonEpisodes/${apiKey}/${imdbId}/${s}`,
        requestOptions
      )
        // .then(handleErrors)
        .then((response) => response.json())
        .then((result) => {
          arrayBuilder.push(result);
          // console.log(result);
        })
        .catch((error) => console.log("error", error));
    });
    setTimeout(() => {
      setSeasonArray(arrayBuilder);
      showTable(true);
      setLoading(false);
    }, 2500);
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
          <div className="content">
            <div className="content-header">
              <h3>{seriesResult.fullTitle}</h3>
              <LinkButton
                link={`https://www.imdb.com/title/${seriesResult.id}/releaseinfo?ref_=tt_ov_rdat`}
              />
            </div>
            <div className="content-inner">
              <div className="info-content">
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
                  <b>Seasons</b>:&nbsp;
                  {seriesResult.tvSeriesInfo
                    ? seriesResult.tvSeriesInfo.seasons.length
                    : null}
                </p>
                <button onClick={fetchSeasonInfo}>Generate Season table</button>
                <div class="dropdown">
                  <span>Seasons</span>
                  <div class="dropdown-content">
                    {seasonNums.map((num) => {
                      return <p>{num}</p>;
                    })}
                  </div>
                </div>
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
                    href={`https://www.imdb.com/title/${seriesResult.id}/releaseinfo?ref_=tt_ov_rdat`}
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
          </div>
        </div>
      );
    } else if (seriesResult.length <= 0) {
      return <div>NOTHING</div>;
    }
  };
  const columns = [
    {
      title: "Season",
      dataIndex: "season",
      key: "season",
    },
    {
      title: "Episode",
      dataIndex: "episode",
      key: "episode",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Released",
      dataIndex: "released",
      key: "released",
    },
    {
      title: "Release Year",
      dataIndex: "releaseYear",
      key: "releaseYear",
    },
    {
      title: "IMDB ID",
      dataIndex: "imdbid",
      key: "imdbid",
    },
    {
      title: "Plot",
      dataIndex: "plot",
      key: "plot",
    },
  ];

  const data = seasonArray.map((item) => {
    item.episodes.map((d, index) => {
      console.log(d);
      return {
        key: index,
        season: d.seasonNumber,
        episode: d.episodeNumber,
        title: d.title,
        released: d.released,
        releaseYear: d.year,
        imdbid: d.id,
        plot: d.plot,
      };
    });
  });

  // const data = [
  //   {
  //     key: "1",
  //     season: "1",
  //     episode: "ep 1",
  //     title: "the title",
  //     released: "released",
  //     releaseYear: "releaseYear",
  //     imdbid: "tt38947",
  //     plot: "plot",
  //   },
  // ];

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
        </form>
      </div>
      <div className="md-border-padding">{renderMainDisplay()}</div>
      {table ? (
        <div className="md-border-padding">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : null}
    </div>
  );
}

export default Episodic;
