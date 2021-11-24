import React from "react";

//css
import "./ExternalLinkButton.css";

//assets
import linkImg from "../../assets/images/exit-top-right.png";

const ExternalLinkButton = (props) => {
  return (
    <>
      <a href={props.link} target="_blank" rel="noopener noreferrer" className="link-button-wrapper">
        <img src={linkImg} alt="external link" className="ext-link-button" />
      </a>
    </>
  );
};

export default ExternalLinkButton;
