// import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

// Styles
import "antd/dist/antd.css";
import "./App.css";

// components
// import Usage from "./components/usage/Usage";
import OmdbApi from "./components/omdb-api/OmdbApi";
// import ImdbApi from "./components/imdb-api/ImdbApi";
// import Episodic from "./components/eipsodic/Episodic";
// import EpisodicOmdb from "./components/episodic-omdb/EpisodicOmdb";
// import TestEp from "./components/episodic-omdb/TestEp";
import ImdbSingleSearch from "./components/imdb-api/ImdbSingleSearch";
import ImdbTalentSearch from "./components/imdb-api/ImdbTalentSearch";

// assets
import sunImg from "./assets/images/sun-img.png";
import moonImg from "./assets/images/moon-img.png";

const { TabPane } = Tabs;

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let themeChoice = localStorage.getItem("theme");
    if (themeChoice) {
      setTheTheme(themeChoice);
    } else {
      return;
    }
  }, []);

  function setTheTheme(themeColor) {
    setTheme(themeColor);
    localStorage.setItem("theme", themeColor);
  }
  return (
    <div className={`App ${theme}`}>
      <div class="main-content-wrapper">
        {/* <Usage /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "32px",
          }}
        >
          <button
            className="button-light"
            onClick={() => setTheTheme("light")}
            style={
              theme === "dark"
                ? { width: "25px" }
                : { height: "32px", width: "32px" }
            }
          >
            <img
              src={sunImg}
              alt="light mode"
              style={{ width: "100%", height: "100%" }}
            />
          </button>
          <button
            className="button-dark"
            onClick={() => setTheTheme("dark")}
            style={
              theme === "light"
                ? { width: "22px" }
                : { height: "32px", width: "32px" }
            }
          >
            <img
              src={moonImg}
              alt="dark mode"
              style={{ width: "100%", height: "100%" }}
            />
          </button>
        </div>
        <Tabs defaultActiveKey="1" centered>
          <TabPane className={`tab-color-${theme}`} tab="Title Search" key="1">
            <ImdbSingleSearch themeType={theme} changeTheme={setTheme} />
          </TabPane>
          <TabPane className={`tab-color-${theme}`} tab="Bulk Search" key="2">
            <OmdbApi themeType={theme} changeTheme={setTheme} />
          </TabPane>
          <TabPane className={`tab-color-${theme}`} tab="Talent Search" key="3">
            <ImdbTalentSearch themeType={theme} changeTheme={setTheme} />
          </TabPane>
          {/* <TabPane tab="IMDB-API" key="3">
          <ImdbApi />
        </TabPane> */}
          {/* <TabPane tab="Test Ep" key="3">
            <TestEp />
          </TabPane>
          <TabPane tab="Series" key="4">
            <Episodic />
          </TabPane>
          <TabPane tab="IMDB Single" key="5">
            <ImdbSingleSearch />
          </TabPane> */}
        </Tabs>
      </div>
    </div>
  );
}

export default App;
