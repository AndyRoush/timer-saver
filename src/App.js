// import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

// Styles
import "antd/dist/antd.css";
import "./App.css";

// components
import Usage from "./components/usage/Usage";
import OmdbApi from "./components/omdb-api/OmdbApi";
// import ImdbApi from "./components/imdb-api/ImdbApi";
// import Episodic from "./components/eipsodic/Episodic";
// import EpisodicOmdb from "./components/episodic-omdb/EpisodicOmdb";
// import TestEp from "./components/episodic-omdb/TestEp";
import ImdbSingleSearch from "./components/imdb-api/ImdbSingleSearch";
import ImdbTalentSearch from "./components/imdb-api/ImdbTalentSearch";

const { TabPane } = Tabs;

function App() {
  const [theme, setTheme] = useState("light");

  // function setTheTheme(themeColor) {
  //   setTheme(themeColor);
  // }
  return (
    <div className={`App ${theme}`}>
      <div class="main-content-wrapper">
        {/* <Usage /> */}
        <div>
          <button onClick={() => setTheme("light")}>Light</button>
          <button onClick={() => setTheme("dark")}>Dark</button>
        </div>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Title Search" key="1">
            <ImdbSingleSearch themeType={theme} changeTheme={setTheme} />
          </TabPane>
          <TabPane tab="Bulk Search" key="2">
            <OmdbApi themeType={theme} changeTheme={setTheme} />
          </TabPane>
          <TabPane tab="Talent Search" key="3">
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
