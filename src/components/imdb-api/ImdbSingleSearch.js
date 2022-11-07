// import { render } from "@testing-library/react";
import React, { useState, forwardRef, useEffect } from "react";
import MaterialTable from "material-table";
import { Table, Spin, Tag, Space } from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

// components
import LinkButton from "../external-link-button/ExternalLinkButton";

// css
import "../episodic-omdb/EpisodicOmdb.css";
import "./imdbStyles.css";

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
import Item from "antd/lib/list/Item";

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
  const [search, setSearch] = useState("");
  const [topLoading, setTopLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [thirdPartyLoading, setThirdPartyLoading] = useState(false);
  const [respError, setRespError] = useState("");
  const [noResults, setNoResults] = useState("");
  const [seriesResult, setSeriesResult] = useState([]);
  const [mainDisp, setMainDisp] = useState(false);
  const [talentSectionShow, setTalentSectionShow] = useState(false);
  const [imdbId, setImdbId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalContentLoading, setModalContentLoading] = useState(false);
  const [seasonInfo, setSeasonInfo] = useState([]);
  const [thirdPartyShow, setThirdPartyShow] = useState(false);
  const [thirdPartyData, setThirdPartyData] = useState([]);

  const getInputValue = (e) => {
    setInputVal(e.target.value);
  };

  // This submit handle the top most (and first) search with the IMDB ID
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
        setThirdPartyData([]);
        setThirdPartyShow(false);
      })
      .catch((error) => console.log("error", error));
  };

  // This function will fetch the season information when the user clicks on the season number on the season dropdown.
  // It's then used to generate the info used in the modal pop up
  const fetchSeasonInfo = (e, id, snumber) => {
    e.preventDefault();
    setModalContentLoading(true);
    fetch(
      `https://imdb-api.com/en/API/SeasonEpisodes/${apiKey}/${id}/${snumber}`,
      requestOptions
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setModalContentLoading(false);
        setSeasonInfo(data);
      })
      .catch((error) => console.log("error", error));
  };

  // This function fetched the third party links we can use to search additional sites with.
  const fetchThirdPartyData = (e, id) => {
    e.preventDefault();
    setThirdPartyLoading(true);
    fetch(
      `https://imdb-api.com/en/API/ExternalSites/${apiKey}/${id}`,
      requestOptions
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setThirdPartyLoading(false);
        setThirdPartyData(data);
      })
      .catch((error) => console.log("error", error));
  };

  // error handling.
  function handleErrors(response) {
    setRespError(response.Error);
    if (response.Error) throw Error(response.Error);
    if (!response.ok) throw Error(response.statusText);
    return response;
  }

  // This renders the main display after the user searches with the IMDB ID.
  const renderMainDisplay = () => {
    if (seriesResult) {
      // Render the directors with the array the API gives us so we can have a direct link to the corresponding IMDB page.
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

      // Render the writers with the array the API gives us so we can have a direct link to the corresponding IMDB page.
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

      // Map through the season array the API gives us to display the season dropdown the user will use to search the seasons.
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
                <span className="title-name">{seriesResult.title}</span>
                {/* <span className="title-date">({seriesResult.year})</span> */}
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
              <span className="dot-separator">•</span>
              {seriesResult.runtimeStr ? (
                <>
                  <span>
                    <i>{seriesResult.runtimeStr}</i>
                  </span>
                  <span className="dot-separator">•</span>
                </>
              ) : null}
              <span
                onClick={(e) => {
                  setThirdPartyShow(true);
                  fetchThirdPartyData(e, seriesResult.id);
                }}
                className="external-links"
              >
                <i>Click to view external website links</i>
              </span>
            </div>
            <div className="content-inner">
              <div className="info-content">
                <table className="main-body-table">
                  <tbody>
                    <tr>
                      <td style={{ width: "30%" }}>
                        <span className="title-first">
                          <b>Release date</b>
                        </span>
                      </td>
                      <td>
                        {seriesResult.releaseDate ? (
                          <span className="margin-right">
                            {seriesResult.releaseDate}
                          </span>
                        ) : null}
                        <LinkButton
                          link={`https://www.imdb.com/title/${seriesResult.id}/releaseinfo?ref_=tt_dt_rdat`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Release year</b>
                        </span>
                      </td>
                      <td>{seriesResult.year}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Runtime</b>
                        </span>
                      </td>
                      <td>
                        {seriesResult.runtimeMins ? (
                          <span className="margin-right">
                            {seriesResult.runtimeMins}
                          </span>
                        ) : null}
                        <LinkButton
                          link={`https://www.imdb.com/title/${seriesResult.id}/technical?ref_=tt_spec_sm`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Company Credits</b>
                        </span>
                      </td>
                      <td>
                        <LinkButton
                          link={`https://www.imdb.com/title/${seriesResult.id}/companycredits?ref_=tt_dt_co`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Companies</b>
                        </span>
                      </td>
                      <td>{seriesResult.companies}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Cast & Crew</b>
                        </span>
                      </td>
                      <td>
                        <LinkButton
                          link={`https://www.imdb.com/title/${seriesResult.id}/fullcredits/?ref_=tt_ql_cl`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Technical Specs</b>
                        </span>
                      </td>
                      <td>
                        <LinkButton
                          link={`https://www.imdb.com/title/${seriesResult.id}/technical?ref_=ttloc_ql_6`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Filming & Production</b>
                        </span>
                      </td>
                      <td>
                        <LinkButton
                          link={`https://www.imdb.com/title/${seriesResult.id}/locations?ref_=ttspec_ql_5`}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                <table className="main-body-table">
                  <tbody>
                    <tr>
                      <td style={{ width: "20%" }}>
                        <span className="title-first">
                          <b>IMDB ID</b>
                        </span>
                      </td>
                      <td>
                        <span>{seriesResult.id}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Countries</b>
                        </span>
                      </td>
                      <td>{seriesResult.countries}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Directors</b>
                        </span>
                      </td>
                      <td>{renderDirectors()}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Writers</b>
                        </span>
                      </td>
                      <td>{renderWriters()}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Actors</b>
                        </span>
                      </td>
                      <td>{seriesResult.stars}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Language</b>
                        </span>
                      </td>
                      <td>{seriesResult.languages}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Genre</b>
                        </span>
                      </td>
                      <td>{seriesResult.genres}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="title-first">
                          <b>Synopsis</b>
                        </span>
                      </td>
                      <td>{seriesResult.plot}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (seriesResult.length <= 0) {
      return <div>NOTHING</div>;
    }
  };

  const renderThirdPartyDisplay = () => {
    if (thirdPartyData && thirdPartyData.fullTitle) {
      let entries = Object.entries(thirdPartyData);
      console.log(entries);
      let data = entries
        .filter((name) => {
          return search.toLowerCase() === ""
            ? name[0]
            : name[0].toLowerCase().includes(search);
        })
        .map(([k, value]) => {
          if (
            typeof value === "object" &&
            value !== null &&
            k !== "wikipediaUrls"
          ) {
            //   console.log(`${key}: ${value.url}`);
            return (
              <tr id="external-site-table-tr">
                <td>{k}</td>
                <td className="primary-photo">
                  <a href={value.url} target="_blank" rel="noopener noreferrer">
                    {value.url}
                  </a>
                </td>
              </tr>
            );
          } else {
            console.log(value);
          }
        });
      return data;
    } else return;
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
        <div className="modal-wrapper">
          {modalContentLoading ? (
            <div className="spinner-wrapper">
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          ) : (
            <>
              {" "}
              <div className="modal-header">
                <h2 className="fw-4">{seasonInfo.fullTitle}</h2>
                <span className="close" onClick={() => setModalShow(false)}>
                  &times;
                </span>
              </div>
              <div className="custom-modal-body">
                <table className="season-table">
                  <thead>
                    <tr id="season-table-tr">
                      <th>Image</th>
                      <th>Season</th>
                      <th>Episode</th>
                      <th>Year</th>
                      <th>Title</th>
                      <th>Released</th>
                      <th>Plot</th>
                      <th>ID</th>
                    </tr>
                  </thead>
                  <tbody>{renderCustomModal()}</tbody>
                </table>
              </div>
              <div className="custom-modal-footer">
                <button onClick={() => setModalShow(false)}>Close</button>
              </div>
            </>
          )}
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
      {thirdPartyShow ? (
        <div className="md-border-padding">
          <h2 className="main-title-header">- External Sites -</h2>
          <form onSubmit={handleSubmit} className="third-party-search-form">
            <input
              type="text"
              placeholder="Type here to search ..."
              onChange={(e) => setSearch(e.target.value)}
              className="input-bar"
            />
          </form>
          {thirdPartyLoading ? (
            <div className="spinner-wrapper">
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          ) : (
            <table className="season-table">
              <tbody>
                <tr id="talent-table-tr">
                  <th className="table-header-30">Website</th>
                  <th>Link</th>
                </tr>
                {renderThirdPartyDisplay()}
              </tbody>
            </table>
          )}
        </div>
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
