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

import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import "normalize.css/normalize.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./ie.css";
import ReactPiwik from "react-piwik";

// GLOBAL CONSTANTS DEFINED OUTSIDE THE APP
const SearchApiHostEnvKey = "SearchApiHost";        // "https://kg.humanbrainproject.org"

// APP PARAMETERS
const hitsPerPage = 20;
const timeout = 10000;
const queryTweaking = {
  wildcard: {
    maxNbOfTerms: 2, // -1 = apply on all terms, 0 = do not apply, positive number n = apply on first n terms
    minNbOfChars: 3 // nb of character under which wildcard is not applied
  },
  fuzzySearch: {
    maxNbOfTerms: 3, // -1 = apply on all terms, 0 = do not apply, positive number n = apply on first n terms
    minNbOfChars: 4 // nb of character under which fuzzy search is not applied
  },
  maxNbOfTermsTrigger: 4 // maximum number of terms before tweaking is turned off
};
const oidcUri = "https://services.humanbrainproject.eu/oidc/authorize";
const oidcClientId = "nexus-kg-search";

const matomo = new ReactPiwik({
  url: process.env.REACT_APP_MATOMO_URL,
  siteId: process.env.REACT_APP_MATOMO_SITE_ID,
  trackErrors: true
});

ReactPiwik.push(["trackPageView"]);

const config = {
  searchApiHost: window[SearchApiHostEnvKey] ? window[SearchApiHostEnvKey] : "",
  timeout: timeout,
  hitsPerPage: hitsPerPage,
  queryTweaking: queryTweaking,
  oidcUri: oidcUri,
  oidcClientId: oidcClientId,
  matomo: matomo
};

const kCode = { step: 0, ref: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] };

const handleGlobalShortcuts = (e) => {
  kCode.step = kCode.ref[kCode.step] === e.keyCode ? kCode.step + 1 : 0;
  if (kCode.step === kCode.ref.length) {
    kCode.step = 0;
    document.body.setAttribute("theme", "dark");
  }
};

document.addEventListener("keydown", handleGlobalShortcuts);


ReactDOM.render(
  <Provider store={store}>
    <App config={config} />
  </Provider>,
  document.getElementById("root")
);