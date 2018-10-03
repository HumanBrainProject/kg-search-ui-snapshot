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
import { isMobile } from "../helpers/BrowserHelpers";
import "./Carrousel.css";


const CarrouselItem = ({item, showPrevious, onPrevious, onClose, itemComponent, navigationComponent}) => {
  const ItemComponent =  itemComponent;
  const NavigationComponent = navigationComponent;
  return (
    <div className={`kgs-carrousel__item position${item.position}`} >
      <div className="kgs-carrousel__content">
        <div className="kgs-carrousel__header">
          {item.isActive && showPrevious && (
            <button className="kgs-carrousel__previous-button" onClick={onPrevious}>
              <i className="fa fa-chevron-left" /> Previous
            </button>
          )}
          <div className="kgs-carrousel__navigation">
            {item.isActive && item.data && (
              <NavigationComponent/>
            )}
          </div>
          {item.isActive && (
            <button className="kgs-carrousel__close-button" onClick={onClose}>
              <i className="fa fa-close" />
            </button>
          )}
        </div>
        <div className="kgs-carrousel__body">
          {item.isActive && item.data && (
            <ItemComponent data={item.data} />
          )}
        </div>
      </div>
    </div>
  );
};

const nbOfItems = 5;

export class Carrousel extends PureComponent {
  constructor(props) {
    super(props);
    this.items =  Array.from(Array(nbOfItems)).map((x, idx) => ({
      id: idx,
      position: idx,
      isActive: false,
      data: null
    }));
  }
  componentDidMount() {
    if (!isMobile) {
      window.addEventListener("keyup", this._keyupHandler.bind(this), false);
    }
  }
  componentWillUnmount() {
    if (!isMobile) {
      window.removeEventListener("keyup", this._keyupHandler);
    }
  }
  _keyupHandler(event) {
    const {onPrevious, onClose} = this.props;
    if (this.props.show) {
      if (event.keyCode === 27) {
        event.preventDefault();
        typeof onClose === "function" && onClose();
      } else if (event.keyCode === 8) {
        event.preventDefault();
        typeof onPrevious === "function" && onPrevious();
      }
    }
  }
  render(){
    const {className, show, data, onPrevious, onClose, itemComponent, navigationComponent} = this.props;
    if (!show || !Array.isArray(data) || !data.length) {
      return null;
    }

    //window.console.debug("Carrousel rendering...", data);

    const currentPosition = (data.length -1) % nbOfItems;
    const items = this.items;
    items.forEach((item, idx) => {
      item.isActive = item.id === currentPosition;
      const position = (idx <= currentPosition?(nbOfItems - (currentPosition - idx)):(idx - currentPosition)) % 5;
      item.position = position;
      const idxData = data.length -1 - (idx <= currentPosition?(currentPosition - idx):(nbOfItems  - (idx - currentPosition)));
      item.data = idxData >= 0?data[idxData]:null;
    });
    const showPrevious = data.length > 1;

    const classNames = ["kgs-carrousel", className].join(" ");

    return(
      <div className={classNames}>
        <div className="kgs-carrousel__panel">
          {items.map(item => (
            <CarrouselItem key={item.id} item={item} showPrevious={showPrevious} onPrevious={onPrevious} onClose={onClose} itemComponent={itemComponent} navigationComponent={navigationComponent} />
          ))}
        </div>
      </div>
    );
  }
}