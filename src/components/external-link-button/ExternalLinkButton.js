import React from "react";

//css
import "./ExternalLinkButton.css";

// FA icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const ExternalLinkButton = (props) => {
  return (
    <>
      <a
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        className="link-button-wrapper"
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </a>
    </>
  );
};

export default ExternalLinkButton;
