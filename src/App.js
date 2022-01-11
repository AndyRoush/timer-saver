// import { render } from "@testing-library/react";
import React from "react";
import { Tabs } from "antd";

// Styles
import "antd/dist/antd.css";
import "./App.css";

// components
import OmdbApi from "./components/omdb-api/OmdbApi";
import ImdbApi from "./components/imdb-api/ImdbApi";
import Episodic from "./components/eipsodic/Episodic";
import EpisodicOmdb from "./components/episodic-omdb/EpisodicOmdb";

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="1" centered>
        {/* <TabPane tab="Series" key="1">
          <Episodic />
        </TabPane> */}
        <TabPane tab="Series-Omdb" key="1">
          <EpisodicOmdb />
        </TabPane>
        {/* <TabPane tab="IMDB-API" key="3">
          <ImdbApi />
        </TabPane> */}
        <TabPane tab="Bulk Search" key="2">
          <OmdbApi />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
