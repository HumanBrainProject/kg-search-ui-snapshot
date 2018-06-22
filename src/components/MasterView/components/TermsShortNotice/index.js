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

import React from 'react';
import './styles.css';

export function TermsShortNotice({ show, onAgree }) {
    if (!show)
        return null;
    return (
        <span className="terms-short-notice" data-agree={!show}>
            <span className="terms-short-notice-content">
                <p>Access to the data and metadata provided through HBP Knowledge Graph Data Platform (&quot;KG&quot;) requires that you cite and acknowledge said data and metadata according to the Terms and Conditions of the Platform.</p>
                <p>Citation requirements are outlined <a href="https://www.humanbrainproject.eu/en/explore-the-brain/search-terms-of-use#citations" target={"_blank"}>here</a>.</p>
                <p>Acknowledgement requirements are outlined <a href="https://www.humanbrainproject.eu/en/explore-the-brain/search-terms-of-use#acknowledgements" target={"_blank"}>here</a>.</p>
                <p>These outlines are based on the authoritative Terms and Conditions are found <a href="https://www.humanbrainproject.eu/en/explore-the-brain/search-terms-of-use" target={"_blank"}>here</a>.</p>
                <p>If you do not accept the Terms &amp; Conditions you are not permitted to access or use the KG to search for, to submit, to post, or to download any materials found there-in.</p>
            </span>
            <button className="btn btn-primary pull-right agree-button" onClick={onAgree}>I agree</button>
        </span>
    );
}
  