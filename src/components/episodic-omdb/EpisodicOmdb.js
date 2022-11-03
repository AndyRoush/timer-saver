// import { render } from "@testing-library/react";
import React, { useState, forwardRef, useEffect } from "react";
import MaterialTable from "material-table";
import { Table, Spin, Tag, Space } from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

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
  // const requestOptions = {
  //   method: "GET",
  //   redirect: "follow",
  // };

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
    showTable(false);
    console.log(inputVal);
    e.preventDefault();
    // Set these 2 to emptry strings. If you don't, the errors will persist through the next search.
    setNoResults("");
    setRespError("");
    fetch(`https://www.omdbapi.com/?i=${inputVal}&apikey=${apiKey}`)
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
      fetch(`https://www.omdbapi.com/?i=${imdbId}&Season=${i}&apikey=${apiKey}`)
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          arrayBuilder.push(data);
          console.log(data);
        })
        .catch((error) => console.log("error", error));
    }

    setSeasonArray(arrayBuilder);
    console.log(arrayBuilder);

    setTimeout(() => {
      showTable(true);
      setBottomLoading(false);
    }, 2000);
  };

  function handleErrors(response) {
    setRespError(response.Error);
    if (response.Error) throw Error(response.Error);
    if (!response.ok) throw Error(response.statusText);
    return response;
  }

  const generateMenu = () => {
    let numLength = Number(seasonNums);
    console.log(numLength);
    let i = 1;
    while (i < numLength) {
      return <Menu.Item key={i}>{i}</Menu.Item>;
      i++;
    }
  };

  // const menu = <Menu>{generateMenu()}</Menu>;

  const renderMainDisplay = () => {
    if (seriesResult) {
      return (
        <div className="main-display-wrapper">
          <img src={seriesResult.Poster} alt="" className="ep-md-img" />
          <div className="content">
            <div className="content-header">
              <h3 className="title">
                <span className="title-name">{seriesResult.Title}</span>&nbsp;{" "}
                <span className="title-date">({seriesResult.Year})</span>
              </h3>
              <LinkButton
                link={`https://www.imdb.com/title/${seriesResult.imdbID}/`}
              />
            </div>
            <div className="content-inner">
              <div className="info-content">
                <p>
                  <span className="title-first">
                    <b>Release date</b>:&nbsp;
                  </span>
                  {seriesResult.Released}
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.imdbID}/releaseinfo?ref_=tt_dt_rdat`}
                  />
                </p>
                <p>
                  <span className="title-first">
                    <b>Release year</b>:&nbsp;
                  </span>
                  {seriesResult.Year}
                </p>
                <p>
                  <span className="title-first">
                    <b>Runtime</b>:&nbsp;
                  </span>
                  {seriesResult.Runtime}
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.imdbID}/technical?ref_=tt_spec_sm`}
                  />
                </p>
                <p>
                  <span className="title-first">
                    <b>Company Credits:</b>
                  </span>
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.imdbID}/companycredits?ref_=tt_dt_co`}
                  />
                </p>
                <p>
                  <span className="title-first">
                    <b>Cast & Crew:</b>
                  </span>
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.imdbID}/fullcredits/?ref_=tt_ql_cl`}
                  />
                </p>
                {seriesResult.totalSeasons ? (
                  <p>
                    <span className="title-first">
                      <b>Seasons</b>:&nbsp;
                    </span>{" "}
                    {seriesResult.totalSeasons}
                    <LinkButton
                      link={`https://www.imdb.com/title/${seriesResult.imdbID}/episodes/?ref_=tt_ov_epl`}
                    />
                  </p>
                ) : null}
                {seriesResult.totalSeasons ? (
                  <button
                    onClick={fetchSeasonInfo}
                    className="season-gen-button"
                  >
                    Generate Season table
                  </button>
                ) : null}
                {/* {seriesResult.totalSeasons ? (
                  <Dropdown overlay={menu} trigger={["hover"]}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Season: <DownOutlined />
                    </a>
                  </Dropdown>
                ) : null} */}
              </div>
              <div className="info-content">
                <p>
                  <span className="title-first">
                    <b>IMDB ID</b>:&nbsp;
                  </span>{" "}
                  <span>{seriesResult.imdbID}</span>
                </p>
                <p>
                  <span className="title-first">
                    <b>Countries</b>:&nbsp;
                  </span>{" "}
                  {seriesResult.Country}
                </p>
                <p>
                  <span className="title-first">
                    <b>Director</b>:&nbsp;
                  </span>{" "}
                  {seriesResult.Director}
                </p>
                <p>
                  <span className="title-first">
                    <b>Language</b>:&nbsp;
                  </span>{" "}
                  {seriesResult.Language}
                </p>
                <p>
                  <span className="title-first">
                    <b>Actors</b>:&nbsp;
                  </span>{" "}
                  {seriesResult.Actors}
                </p>
                <p>
                  <span className="title-first">
                    <b>Genre</b>:&nbsp;
                  </span>{" "}
                  {seriesResult.Genre}
                </p>
              </div>
            </div>
            <div class="synopsis-section">
              <p>
                <span className="title-first">
                  <b>Synopsis</b>:&nbsp;
                </span>
                {seriesResult.Plot}
              </p>
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
      season: item.Season,
      episodename: epNum.map((ep) => {
        return <p>{ep.Title}</p>;
      }),
      episodenum: epNum.map((ep) => {
        return <p>{ep.Episode}</p>;
      }),
      released: epNum.map((ep) => {
        return <p>{ep.Released}</p>;
      }),
      imdbid: epNum.map((ep) => {
        return <p>{ep.imdbID}</p>;
      }),
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
          <input type="text" onChange={getInputValue} className="input-bar" />
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
              headerStyle: {
                backgroundColor: "#393E46",
                color: "#FFF",
              },
            }}
            columns={[
              {
                title: "Season",
                field: "season",
                type: "string",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                },
              },
              {
                title: "Episode Name",
                field: "episodename",
                type: "string",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                },
              },
              {
                title: "Episode Number",
                field: "episodenum",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                },
              },
              {
                title: "Released",
                field: "released",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                },
              },
              {
                title: "IMDBID",
                field: "imdbid",
                type: "string",
                cellStyle: {
                  backgroundColor: "#393E46",
                  color: "#FFF",
                },
                headerStyle: {
                  backgroundColor: "#393E46",
                },
              },
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
