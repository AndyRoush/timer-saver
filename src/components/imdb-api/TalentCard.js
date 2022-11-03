import React from "react";

import "./imdbStyles.css";

const TalentCard = (props) => {
  const pathToTalent = `https://www.imdb.com/name/${props.id}/?ref_=ttfc_fc_cl_t1`;

  return (
    <>
      <div className="talent-card-wrapper">
        <div class="talent-img-wrapper">
          <img src={props.img} alt="talent" className="talent-card-img" />
        </div>
        <div class="talent-card-info-wrapper">
          <a href={pathToTalent}>{props.name}</a>
          &nbsp;
          <span>
            <i>as</i> {props.asChar}
          </span>
          <p>
            <b>ID:</b> &nbsp;{props.id}
          </p>
        </div>
      </div>
    </>
  );
};

export default TalentCard;
