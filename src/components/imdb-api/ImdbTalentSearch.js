// import { render } from "@testing-library/react";
import React, { useState, forwardRef, useRef, useEffect } from "react";
import MaterialTable from "material-table";
import { Table, Spin, Tag, Space } from "antd";
import { DownloadTableExcel } from "react-export-table-to-excel";
// import { Menu, Dropdown } from "antd";
// import { DownOutlined } from "@ant-design/icons";

// components
import LinkButton from "../external-link-button/ExternalLinkButton";

// css
import "../episodic-omdb/EpisodicOmdb.css";
import "./imdbStyles.css";

// Bootstrap
// import Table from "react-bootstrap/Table";
// import Spinner from "react-bootstrap/Spinner";
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

const ImdbTalentSearch = (props) => {
  const apiKey = process.env.REACT_APP_IMDB_KEY;

  // refs
  const talentTableRef = useRef(null);

  // request ops for IMDB API
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const [inputVal, setInputVal] = useState("");
  const [search, setSearch] = useState("");
  const [topLoading, setTopLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [respError, setRespError] = useState("");
  const [talentResult, settalentResult] = useState([]);
  const [mainDisp, setMainDisp] = useState(false);
  const [talentSectionShow, setTalentSectionShow] = useState(false);

  const getInputValue = (e) => {
    setInputVal(e.target.value);
  };

  // This submit handle the top most (and first) search with the IMDB ID
  const handleSubmit = (e) => {
    setTopLoading(true);
    console.log(inputVal);
    e.preventDefault();
    // Set these 2 to emptry strings. If you don't, the errors will persist through the next search.
    setRespError("");
    fetch(
      `https://imdb-api.com/en/API/Name/${apiKey}/${inputVal}`,
      requestOptions
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.errorMessage === "") {
          console.log(data);
          settalentResult(data);
          setTopLoading(false);
          setMainDisp(true);
          setTalentSectionShow(true);
        } else {
          setRespError(data.errorMessage);
          setTopLoading(false);
          setMainDisp(false);
          setTalentSectionShow(false);
        }
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

  const renderKnownFor = () => {
    if (talentResult) {
      let knownArray = talentResult.knownFor.map((ids, index) => {
        console.log(ids);
        return <span>{(index ? ", " : "") + ids.id}</span>;
      });
      return knownArray;
    }
  };

  // This renders the main display after the user searches with the IMDB ID.
  const renderMainDisplay = () => {
    if (talentResult) {
      return (
        <div className="main-display-wrapper">
          <img src={talentResult.image} alt="" className="ep-md-img" />
          <div className="content">
            <div className="content-header">
              <h2 className="title">
                <span className="title-name">{talentResult.name}</span>
              </h2>
              <LinkButton
                link={`https://www.imdb.com/name/${talentResult.id}/`}
              />
            </div>
            <div className="under-title-grid">
              <span>
                <i>{talentResult.role}</i>
              </span>
            </div>
            <div className="content-inner">
              <div className="info-content">
                <table className={`main-body-table-${props.themeType}`}>
                  <tbody>
                    <tr>
                      <td style={{ width: "30%" }}>
                        <span className={`title-first-${props.themeType}`}>
                          <b>Birth date</b>
                        </span>
                      </td>
                      <td>{talentResult.birthDate}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className={`title-first-${props.themeType}`}>
                          <b>Death Date</b>
                        </span>
                      </td>
                      <td>{talentResult.deathDate}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className={`title-first-${props.themeType}`}>
                          <b>Height</b>
                        </span>
                      </td>
                      <td>{talentResult.height}</td>
                    </tr>
                    <tr>
                      <td>
                        <span className={`title-first-${props.themeType}`}>
                          <b>Known For</b>
                        </span>
                      </td>
                      <td>{renderKnownFor()}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "30%" }}>
                        <span className={`title-first-${props.themeType}`}>
                          <b>Awards</b>
                        </span>
                      </td>
                      <td>{talentResult.awards}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="info-content">
                <table className={`main-body-table-${props.themeType}`}>
                  <tbody>
                    <tr>
                      <td style={{ width: "20%" }}>
                        <span className={`title-first-${props.themeType}`}>
                          <b>Summary</b>
                        </span>
                      </td>
                      <td>
                        <span>{talentResult.summary}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (talentResult.length <= 0) {
      return <div>NOTHING</div>;
    }
  };

  const renderKnownForDisplay = () => {
    if (talentResult) {
      let knownforArray = talentResult.knownFor;
      let knownForReturn = knownforArray.map(function (knownInfo) {
        const pathToTalent = `https://www.imdb.com/title/${knownInfo.id}/?ref_=ttfc_fc_cl_t1`;
        return (
          <tr id={`talent-table-tr-${props.themeType}`}>
            <td className="primary-photo">
              <img
                src={knownInfo.image}
                alt={knownInfo.title}
                className="talent-table-img"
              />
            </td>
            <td>
              <a href={pathToTalent} target="_blank" rel="noopener noreferrer">
                {knownInfo.fullTitle}
              </a>
            </td>
            <td>
              <span>{knownInfo.role}</span>
            </td>
            <td>{knownInfo.id}</td>
          </tr>
        );
      });
      return knownForReturn;
    } else if (talentResult.length <= 0) {
      return null;
    }
  };

  const renderCastMoviesDisplay = () => {
    if (talentResult) {
      let castArray = talentResult.castMovies;
      let castMoviesReturn = Array.isArray(castArray)
        ? castArray.map(function (movies) {
            const pathToTalent = `https://www.imdb.com/title/${movies.id}/?ref_=ttfc_fc_cl_t1`;
            return (
              <tr id={`talent-table-tr-${props.themeType}`}>
                <td>
                  <a
                    href={pathToTalent}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {movies.title}
                  </a>
                </td>
                <td>{movies.year}</td>
                <td>
                  <span>{movies.role}</span>
                </td>
                <td>
                  <span>{movies.description}</span>
                </td>
                <td>{movies.id}</td>
              </tr>
            );
          })
        : null;
      return castMoviesReturn;
    } else if (talentResult.length <= 0) {
      return null;
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Paste Talent ID"
            onChange={getInputValue}
            // className="input-bar"
            className={`input-bar-${props.themeType}`}
          />
          {respError ? (
            <Alert variant="danger" className="alerts">
              {respError}
            </Alert>
          ) : null}
          <button type="submit" className={`submit-button-${props.themeType}`}>
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
        <div className={`md-border-padding-${props.themeType}`}>
          {renderMainDisplay()}
        </div>
      ) : null}
      {talentSectionShow ? (
        <div
          className={`md-border-padding-${props.themeType} talent-section-grid`}
        >
          <h2 className={`main-title-header-${props.themeType}`}>- Known For -</h2>
          <p>
            {/* <DownloadTableExcel
              filename={talentResult.fullTitle}
              sheet="talent"
              currentTableRef={talentTableRef.current}
            >
              <button> Export excel </button>
            </DownloadTableExcel> */}
          </p>
          <table className={`talent-table-${props.themeType}`}>
            <tbody>{renderKnownForDisplay()}</tbody>
          </table>
        </div>
      ) : null}
      {talentSectionShow ? (
        <div
          className={`md-border-padding-${props.themeType} talent-section-grid talent-section-grid`}
        >
          <h2 className={`main-title-header-${props.themeType}`}>- Cast Movies -</h2>
          <p>
            {/* <DownloadTableExcel
              filename={talentResult.fullTitle}
              sheet="talent"
              currentTableRef={talentTableRef.current}
            >
              <button className="prev-season-btn"> Export to excel </button>
            </DownloadTableExcel> */}
          </p>
          <table className="cast-movies-table" ref={talentTableRef}>
            <tbody>{renderCastMoviesDisplay()}</tbody>
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

export default ImdbTalentSearch;
