/*
*   Copyright (c) 2018, EPFL/Human Brain Project PCO
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*/

import React from "react";
import PropTypes from "prop-types";
import "./ConditionalButton.css";

export const ConditionalButton = ({className, test, onLabel, offLabel, onClick, offClick}) => {
  const classNames = ["kgs-conditional-button", className].join(" ");
  const label = test?onLabel:offLabel;
  const handleClick = test?onClick:offClick;
  return (
    <button className={classNames} onClick={handleClick}>{label}</button>
  );
};

ConditionalButton.propTypes = {
  className: PropTypes.string,
  test: PropTypes.bool,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  offClick: PropTypes.func.isRequired
};

export default ConditionalButton;