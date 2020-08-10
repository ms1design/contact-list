import React from "react";
import { shape, string } from "prop-types";
import classnames from "classnames";
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

PersonInfo.propTypes = {
  data: shape({
    id: string.isRequired,
    jobTitle: string.isRequired,
    emailAddress: string.isRequired,
    firstNameLastName: string.isRequired,
  }).isRequired,
  className: string,
};

PersonInfo.defaultProps = {
  className: '',
};

export default PersonInfo;
