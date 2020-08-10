import React from "react";
import classnames from 'classnames';
import "./PersonInfo.scss";

function PersonInfo({ data, className, ...restProps }) {
  return (
    <div
      className={classnames("person-info", className)}
      {...restProps}
    >
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
