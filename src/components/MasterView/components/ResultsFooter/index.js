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

import React, { Component } from 'react';
import { Pagination } from 'searchkit';
import { TabEnablerComponent } from '../../../../containers/TabEnabler';
import { TermsShortNotice } from '../TermsShortNotice';
import './styles.css';

const windowHeight = () => {
    const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];
    return w.innerHeight || e.clientHeight || g.clientHeight;
   //return $(window).height();
};

export class ResultsFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: 'kgs-result-footer',
            style: {
                display: "none"
            }
        };
        this.eventState = {
            scrollTop: 0,
            didScroll: false,
            didResize: false,
            didOrientationChange: false,
            didMute: false
        };
        this.initialized = false;
        this.observer = null;
        this.interval = null;
        this.adjustLayout = this.adjustLayout.bind(this);
        this.handleScrollEvent = this.handleScrollEvent.bind(this);
        this.handleResizeEvent = this.handleResizeEvent.bind(this);
        this.handleOrientationChangeEvent = this.handleOrientationChangeEvent.bind(this);
        this.handleMutationEvent = this.handleMutationEvent.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScrollEvent);
        window.addEventListener('resize', this.handleResizeEvent);
        window.addEventListener('orientationchange', this.handleOrientationChangeEvent);
        if (window.MutationObserver) {
            this.observer = new MutationObserver(this.handleMutationEvent);
            this.observer.observe(document.body, { attributes: true, childList: true });
        }
        this.interval = setInterval(this.adjustLayout, 250);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollEvent);
        window.removeEventListener('resize', this.handleResizeEvent);
        window.removeEventListener('orientationchange', this.handleOrientationChangeEvent);
        if (this.observer) {
            this.observer.disconnect();
            delete this.observer;
            this.observer = null;
        }
        clearInterval(this.interval);
        this.interval = null;
    }
    componentWillReceiveProps(nextProps) {
        const state = Object.assign({}, this.state, {style: {display: nextProps.hasPaging?"block":"none"}});
        this.setState(state);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return  nextProps.hasPaging !== this.props.hasPaging || nextState.className !== this.state.className || nextState.style.display !== this.state.style.display || nextState.style.position !== this.state.style.position || nextState.style.bottom !== this.state.style.bottom || nextState.style.left !== this.state.style.left;
    }
    handleScrollEvent() {
        this.eventState.didScroll = true;
    }
    handleResizeEvent() {
        this.eventState.didResize = true;
    }
    handleOrientationChangeEvent() {
        this.eventState.didOrientationChange = true;
    }
    handleMutationEvent() {
        this.eventState.didMute = true;
    }
    adjustLayout() {
        const {relatedElements} = this.props;
        let height = 0;
        const needSizeCalculation = !this.initialized || this.eventState.didResize || this.eventState.didOrientationChange || this.eventState.didMute;
        const eventWasTriggered = this.eventState.didScroll || needSizeCalculation;
        this.eventState = {
            scrollTop: this.eventState.scrollTop,
            didScroll: false,
            didResize: false,
            didOrientationChange: false,
            didMute: false
        };
        this.initialized = true;
        let localStorageChange = false;
        relatedElements.forEach(e => {
            let doCalc = e.height === undefined || needSizeCalculation;
            if (e.localStorageKey && (e.localStorageValue === undefined || e.localStorageValue === null)) {
                const value = localStorage.getItem(e.localStorageKey);
                if (e.localStorageValue !== value) {
                    e.localStorageValue = value;
                    localStorageChange = true;
                    if (value !== null)
                        e.height = 0;
                    else 
                        doCalc = true;
                }
            }
            if (doCalc) {
                e.height = 0;
                if (!e.conditionQuerySelector || document.querySelector(e.conditionQuerySelector)) {
                    if (!e.nodes || !e.nodes.length)
                        e.nodes = document.querySelectorAll(e.querySelector);
                    e.nodes.forEach(n => {
                        e.height += n.offsetHeight;
                    });
                }
            }
            height += e.height;
        });
        if (localStorageChange || eventWasTriggered) {
            const scrollDown = (document.documentElement.scrollTop - this.eventState.scrollTop) > 0;
            const fixedLayout = document.documentElement.scrollHeight - this.eventState.scrollTop - windowHeight() < height;
            this.eventState.scrollTop = document.documentElement.scrollTop;
            if (scrollDown && fixedLayout) {
                this.setState({className: "kgs-result-footer", style: {}});
            } else if (!scrollDown && !fixedLayout) {
                this.setState({className: "kgs-result-footer kgs-result-footer-panel", style: {position: "fixed", bottom: "0", left: "0"}});
            }
        }
    }
    render() {
        const { showTermsShortNotice, onAgreeTermsShortNotice } = this.props;
        return (
            <div className={this.state.className} style={this.state.style}>
                <TermsShortNotice show={showTermsShortNotice} onAgree={onAgreeTermsShortNotice} />
                <TabEnablerComponent className={'kgs-paging'} containerSelector={'.kgs-paging'} itemSelector={'.sk-toggle-option'} activeItemSelector={'.is-active'} disabledItemSelector={'.is-disabled'} >
                    <Pagination showNumbers={true} />
                </TabEnablerComponent>
            </div>
        );
    }
}