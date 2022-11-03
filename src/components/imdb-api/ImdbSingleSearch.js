// import { render } from "@testing-library/react";
import React, { useState, forwardRef, useEffect } from "react";
import MaterialTable from "material-table";
import { Table, Spin, Tag, Space } from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

// components
import LinkButton from "../external-link-button/ExternalLinkButton";
import TalentCard from "./TalentCard";

// css
import "../episodic-omdb/EpisodicOmdb.css";

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

const ImdbSingleSearch = () => {
  const apiKey = process.env.REACT_APP_IMDB_KEY;

  // request ops for IMDB API
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const [inputVal, setInputVal] = useState("");
  const [topLoading, setTopLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [respError, setRespError] = useState("");
  const [noResults, setNoResults] = useState("");
  const [seriesResult, setSeriesResult] = useState([]);
  const [mainDisp, setMainDisp] = useState(false);
  const [talentSectionShow, setTalentSectionShow] = useState(false);
  const [imdbId, setImdbId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [seasonInfo, setSeasonInfo] = useState([]);

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
    fetch(
      `https://imdb-api.com/en/API/Title/${apiKey}/${inputVal}`,
      requestOptions
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSeriesResult(data);
        setImdbId(data.imdbID);
        setTopLoading(false);
        setMainDisp(true);
        setTalentSectionShow(true);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchSeasonInfo = (e, id, snumber) => {
    e.preventDefault();
    fetch(
      `https://imdb-api.com/en/API/SeasonEpisodes/${apiKey}/${id}/${snumber}`,
      requestOptions
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSeasonInfo(data);
      })
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
      const renderDirectors = () => {
        if (seriesResult) {
          let directorListArray = seriesResult.directorList;
          let directorList = directorListArray.map(function (directors) {
            const pathToTalent = `https://www.imdb.com/name/${directors.id}/?ref_=ttfc_fc_cl_t1`;
            return (
              <>
                <a
                  href={pathToTalent}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {directors.name}
                </a>
                &nbsp;
              </>
            );
          });
          return directorList;
        } else return;
      };
      const renderWriters = () => {
        if (seriesResult) {
          let writersListArray = seriesResult.writerList;
          let writerList = writersListArray.map(function (writers) {
            const pathToTalent = `https://www.imdb.com/name/${writers.id}/?ref_=ttfc_fc_cl_t1`;
            return (
              <>
                <a
                  href={pathToTalent}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {writers.name}
                </a>
                &nbsp;
              </>
            );
          });
          return writerList;
        } else return;
      };

      const renderSeasonDropdownItems = () => {
        if (seriesResult) {
          let seriesResultArray = seriesResult.tvSeriesInfo.seasons;
          let seriesResults = seriesResultArray.map(function (seasons) {
            return (
              <span
                onClick={(e) => {
                  fetchSeasonInfo(e, seriesResult.id, seasons);
                  setModalShow(true);
                }}
                className="dropdown-item"
              >
                {seasons}
              </span>
            );
          });
          return seriesResults;
        } else return;
      };
      return (
        <div className="main-display-wrapper">
          <img src={seriesResult.image} alt="" className="ep-md-img" />
          <div className="content">
            <div className="content-header">
              <h2 className="title">
                <span className="title-name">{seriesResult.title}</span>{" "}
                <span className="title-date">({seriesResult.year})</span>
              </h2>
              {seriesResult.originalTitle !== "" ? (
                <p class="original-title">
                  Original Title: {seriesResult.originalTitle}
                </p>
              ) : null}
              {/* <p class="original-title">
                Original Title: this is original title
              </p> */}
              <LinkButton
                link={`https://www.imdb.com/title/${seriesResult.id}/`}
              />
            </div>
            <div className="under-title-grid">
              <span>
                <i>{seriesResult.type}</i>
              </span>
              <span className="dot-separator">•</span>
              <span>
                {seriesResult.tvSeriesInfo !== null ? (
                  <i>
                    {seriesResult.year} - {seriesResult.tvSeriesInfo.yearEnd}
                  </i>
                ) : (
                  <i>{seriesResult.year}</i>
                )}
              </span>
              <span className="dot-separator">•</span>
              <span>
                <i>{seriesResult.contentRating}</i>
              </span>
            </div>
            <div className="content-inner">
              <div className="info-content">
                <p>
                  <span className="title-first">
                    <b>Release date</b>:&nbsp;
                  </span>
                  {seriesResult.releaseDate}
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.id}/releaseinfo?ref_=tt_dt_rdat`}
                  />
                </p>
                <p>
                  <span className="title-first">
                    <b>Release year</b>:&nbsp;
                  </span>
                  {seriesResult.year}
                </p>
                <p>
                  <span className="title-first">
                    <b>Runtime</b>:&nbsp;
                  </span>
                  {seriesResult.runtimeMins}
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.id}/technical?ref_=tt_spec_sm`}
                  />
                </p>
                <p>
                  <span className="title-first">
                    <b>Company Credits:</b>
                  </span>
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.id}/companycredits?ref_=tt_dt_co`}
                  />
                </p>
                <p>
                  <span className="title-first">
                    <b>Companies</b>:&nbsp;
                  </span>{" "}
                  <span>{seriesResult.companies}</span>
                </p>
                <p>
                  <span className="title-first">
                    <b>Cast & Crew:</b>
                  </span>
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.id}/fullcredits/?ref_=tt_ql_cl`}
                  />
                </p>
                <p>
                  <span className="title-first">
                    <b>Technical Specs:</b>
                  </span>
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.id}/technical?ref_=ttloc_ql_6`}
                  />
                </p>
                <p>
                  <span className="title-first">
                    <b>Filming & Production:</b>
                  </span>
                  <LinkButton
                    link={`https://www.imdb.com/title/${seriesResult.id}/locations?ref_=ttspec_ql_5`}
                  />
                </p>
                {seriesResult.seasons ? (
                  <p>
                    <span className="title-first">
                      <b>Seasons</b>:&nbsp;
                    </span>{" "}
                    {seriesResult.totalSeasons}
                    <LinkButton
                      link={`https://www.imdb.com/title/${seriesResult.id}/episodes/?ref_=tt_ov_epl`}
                    />
                  </p>
                ) : null}
                {seriesResult.tvSeriesInfo !== null ? (
                  <div className="dropdown">
                    <button className="dropbtn">Seasons</button>
                    <div className="dropdown-content">
                      {renderSeasonDropdownItems()}
                    </div>
                  </div>
                ) : null}
                {seriesResult.tvSeriesInfo !== null ? (
                  <button
                    className="prev-season-btn"
                    onClick={() => setModalShow(true)}
                  >
                    open previous season
                  </button>
                ) : null}
              </div>
              <div className="info-content">
                <p>
                  <span className="title-first">
                    <b>IMDB ID</b>:&nbsp;
                  </span>{" "}
                  <span>{seriesResult.id}</span>
                </p>
                <p>
                  <span className="title-first">
                    <b>Countries</b>:&nbsp;
                  </span>{" "}
                  {seriesResult.countries}
                </p>
                <p>
                  <span className="title-first">
                    <b>Directors</b>:&nbsp;
                  </span>{" "}
                  {renderDirectors()}
                </p>
                <p>
                  <span className="title-first">
                    <b>Writers</b>:&nbsp;
                  </span>{" "}
                  {renderWriters()}
                </p>
                <p>
                  <span className="title-first">
                    <b>Actors</b>:&nbsp;
                  </span>{" "}
                  {seriesResult.stars}
                </p>
                <p>
                  <span className="title-first">
                    <b>Language</b>:&nbsp;
                  </span>{" "}
                  {seriesResult.languages}
                </p>
                <p>
                  <span className="title-first">
                    <b>Genre</b>:&nbsp;
                  </span>{" "}
                  {seriesResult.genres}
                </p>
                <p>
                  <span className="title-first">
                    <b>Synopsis</b>:&nbsp;
                  </span>
                  {seriesResult.plot}
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

  const renderTalentDisplay = () => {
    if (seriesResult) {
      let talentArray = seriesResult.actorList;
      let cardReturn = talentArray.map(function (talentInfo) {
        const pathToTalent = `https://www.imdb.com/name/${talentInfo.id}/?ref_=ttfc_fc_cl_t1`;
        return (
          <tr id="talent-table-tr">
            <td className="primary-photo">
              <img
                src={talentInfo.image}
                alt={talentInfo.name}
                className="talent-table-img"
              />
            </td>
            <td>
              <a href={pathToTalent} target="_blank" rel="noopener noreferrer">
                {talentInfo.name}
              </a>
            </td>
            <td>
              <span>{talentInfo.asCharacter}</span>
            </td>
            <td>{talentInfo.id}</td>
          </tr>
        );
      });
      return cardReturn;
    } else if (seriesResult.length <= 0) {
      return null;
    }
  };

  const renderCustomModal = () => {
    if (seasonInfo && seasonInfo.episodes) {
      let seasonArray = seasonInfo.episodes;
      let seasonsData = seasonArray.map(function (seasonInfo) {
        const pathToEpisode = `https://www.imdb.com/title/${seasonInfo.id}/`;
        return (
          <tr id="talent-table-tr">
            <td>
              {" "}
              <img
                src={seasonInfo.image}
                alt={seasonInfo.title}
                className="season-table-img"
              />
            </td>
            <td>{seasonInfo.seasonNumber}</td>
            <td>{seasonInfo.episodeNumber}</td>
            <td>{seasonInfo.year}</td>
            <td>{seasonInfo.title}</td>
            <td>{seasonInfo.released}</td>
            <td>{seasonInfo.plot}</td>
            <td>
              <a href={pathToEpisode} target="_blank" rel="noopener noreferrer">
                {seasonInfo.id}
              </a>
            </td>
          </tr>
        );
      });
      return seasonsData;
    } else return null;
  };

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Paste IMDB ID"
            onChange={getInputValue}
            className="input-bar"
          />
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
      <div className={modalShow ? "modal-content-show" : "modal-content-hide"}>
        <div class="modal-wrapper">
          <div className="modal-header">
            <h2 className="fw-4">{seasonInfo.fullTitle}</h2>
            <span className="close" onClick={() => setModalShow(false)}>
              &times;
            </span>
          </div>
          <div className="custom-modal-body">
            <table className="season-table">
              <tbody>
                <tr id="talent-table-tr">
                  <th>Image</th>
                  <th>Season</th>
                  <th>Episode</th>
                  <th>Year</th>
                  <th>Title</th>
                  <th>Released</th>
                  <th>Plot</th>
                  <th>ID</th>
                </tr>
                {renderCustomModal()}
              </tbody>
            </table>
          </div>
          <div className="custom-modal-footer">
            <button onClick={() => setModalShow(false)}>Close</button>
          </div>
        </div>
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
      {talentSectionShow ? (
        <div className="md-border-padding talent-section-grid">
          <h2 className="main-title-header">- Series Cast -</h2>
          <table className="talent-table">
            <tbody>{renderTalentDisplay()}</tbody>
          </table>
        </div>
      ) : null}
      {bottomLoading ? (
        <div className="spinner-wrapper">
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : null}
    </div>
  );
};

export default ImdbSingleSearch;
