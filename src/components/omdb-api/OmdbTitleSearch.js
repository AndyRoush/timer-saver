// new page
import React, {useState} from "react";

// antd imports
import { Table, Spin, Space } from "antd";

// Bootstrap
import Alert from "react-bootstrap/Alert";

const OmdbTitleSearch = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [inputVal, setInputVal] = useState("");
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataNum, setDataNum] = useState("0");
  const [respError, setRespError] = useState("");
  const [noResults, setNoResults] = useState("");

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
    fetch(`https://www.omdbapi.com/?i=${inputVal}&apikey=${apiKey}`)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => console.log("error: " + error));
  };

  function handleErrors(response) {
    setRespError(response.Error);
    if (response.Error) throw Error(response.Error);
    if (!response.ok) throw Error(response.statusText);
    return response;
  }

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={getInputValue}
            className={`input-bar-${props.themeType}`}
            placeholder="Paste values with a space between"
          />
          {respError ? (
            <Alert variant="danger" className="alerts">
              {respError}
            </Alert>
          ) : null}
          <button type="submit" className={`submit-button-${props.themeType}`}>
            Search
          </button>
          <p className={`search-amount-${props.themeType}`}>
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
          <p>HELLO</p>
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

export default OmdbTitleSearch;
