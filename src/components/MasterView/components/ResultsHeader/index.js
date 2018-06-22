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
import { ActionBar, ActionBarRow, HitsStats } from 'searchkit';
import { ShareBar } from '../../../ShareBar';
import { TabEnablerComponent } from '../../../../containers/TabEnabler';
import { LayoutModeSwitcherToggle } from './components/LayoutModeSwitcherToggle';
import { SortingTab } from './containers/SortingTab';
import './styles.css';

export function ResultsHeader({hitCount, gridLayoutMode, onGridLayoutModeToogle}) {
    return (
        <ActionBar>
            <ActionBarRow>
                <HitsStats translations={{"hitstats.results_found":"{hitCount} results found"}} />
                <LayoutModeSwitcherToggle gridLayoutMode={gridLayoutMode} onToggle={onGridLayoutModeToogle} /> 
                <TabEnablerComponent className={'kgs-sorting-selector'} containerSelector={'.kgs-sorting-selector'} itemSelector={'.sk-toggle-option'} activeItemSelector={'.is-active'} disabledItemSelector={'.is-disabled'} >
                    <SortingTab/>
                </TabEnablerComponent>
                <ShareBar/>
            </ActionBarRow>
        </ActionBar>
    );
}
  