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

import React, { PureComponent } from "react";
import AppManager from "./app.manager";
import { withStoreStateSubscription} from "./components/withStoreStateSubscription";
import { withTabKeyNavigation } from "./components/withTabKeyNavigation";
import { SearchkitProvider } from "searchkit";
import { MasterView } from "./components/MasterView";
import { DetailViewManager } from "./components/DetailViewManager";
import { TermsShortNotice } from "./components/TermsShortNotice";
import { FetchingPanel } from "./components/FetchingPanel";
import { ErrorPanel } from "./components/ErrorPanel";

const ViewsComponent = ({show, manager}) => {
  if (!show) {
    return null;
  }
  if (!manager || !manager.searchkit) {
    window.console.error("application failed to instanciate searchkit");
    return null;
  }
  //window.console.debug("Views rendering...");
  return (
    <span>
      <SearchkitProvider searchkit={manager.searchkit}>
        <MasterView />
      </SearchkitProvider>
      <DetailViewManager/>
    </span>
  );
};

const ViewsWithTabKeyNavigation = withTabKeyNavigation(
  ViewsComponent,
  data => !data.hits.currentHit,
  null,
  ".kgs-masterView"
);

const Views = withStoreStateSubscription(
  ViewsWithTabKeyNavigation,
  data => ({
    show: data.application.isReady
  })
);

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.manager = new AppManager(props.config || {});
  }
  componentDidMount() {
    this.manager.start();
  }
  componentWillUnmount() {
    this.manager.stop();
  }
  render() {
    //window.console.debug("App rendering...");
    return (
      <div className="kgs-app">
        <Views manager={this.manager} />
        <TermsShortNotice/>
        <FetchingPanel/>
        <ErrorPanel/>
      </div>
    );
  }
}

export default App;