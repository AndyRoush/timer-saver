// import { render } from "@testing-library/react";
import React from "react";
import { Tabs } from "antd";

// Styles
import "antd/dist/antd.css";
import "./App.css";

// components
import OmdbApi from "./components/omdb-api/OmdbApi";
// import ImdbApi from "./components/imdb-api/ImdbApi";
// import Episodic from "./components/eipsodic/Episodic";
// import EpisodicOmdb from "./components/episodic-omdb/EpisodicOmdb";
// import TestEp from "./components/episodic-omdb/TestEp";
import ImdbSingleSearch from "./components/imdb-api/ImdbSingleSearch";

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <div class="main-content-wrapper">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Title Search" key="1">
            <ImdbSingleSearch />
          </TabPane>
          <TabPane tab="Bulk Search" key="2">
            <OmdbApi />
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
