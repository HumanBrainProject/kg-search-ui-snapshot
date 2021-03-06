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
import { isMobile } from "../helpers/BrowserHelpers";
import "./Carousel.css";

const getNavigation = (item, showPrevious, onClose, onPrevious, navigationComponent) => {
  const NavigationComponent = navigationComponent;
  const Navigation = () => (
    <div className="kgs-carousel__header">
      {item.isActive && showPrevious && (
        <button className="kgs-carousel__previous-button" onClick={onPrevious}>
          <i className="fa fa-chevron-left" /> Previous
        </button>
      )}
      <div className="kgs-carousel__navigation">
        {item.isActive && item.data && NavigationComponent && (
          <NavigationComponent/>
        )}
      </div>
      {item.isActive && (
        <button className="kgs-carousel__close-button" onClick={onClose}>
          <i className="fa fa-close" />
        </button>
      )}
    </div>
  );
  Navigation.displayName = "Navigation";
  return Navigation;
};

const CarouselItem = ({item, showPrevious, onClose, onPrevious, itemComponent, navigationComponent}) => {
  const ItemComponent =  itemComponent;
  const NavigationComponent = getNavigation(item, showPrevious, onClose, onPrevious, navigationComponent);
  return (
    <div className={`kgs-carousel__item position${item.position}`}>
      <div className="kgs-carousel__content">
        {item.isActive && item.data && ItemComponent && (
          <ItemComponent data={item.data}  NavigationComponent={NavigationComponent}  />
        )}
      </div>
    </div>
  );
};

const nbOfItems = 5;

export class Carousel extends React.Component {
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

  onClose = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      const { onClose } = this.props;
      typeof onClose === "function" && onClose();
    }
  };

  render(){
    const {className, show, data, onPrevious, onClose, itemComponent, navigationComponent } = this.props;
    if (!show || !Array.isArray(data) || !data.length || !itemComponent) {
      return null;
    }

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

    const classNames = ["kgs-carousel", className].join(" ");

    return(
      <div className={classNames} onClick={this.onClose}>
        <div className="kgs-carousel__panel" ref={ref => this.wrapperRef = ref}>
          {items.map(item => (
            <CarouselItem key={item.id} item={item} showPrevious={showPrevious} onPrevious={onPrevious} onClose={onClose} itemComponent={itemComponent} navigationComponent={navigationComponent} />
          ))}
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  data:  PropTypes.arrayOf(PropTypes.any),
  onPrevious: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  itemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object
  ]).isRequired,
  navigationComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object
  ])
};

export default Carousel;