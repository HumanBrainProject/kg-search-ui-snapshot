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
import { MenuFilter, ResetFilters, SideBar } from 'searchkit';
import { TabEnablerComponent } from '../../../../containers/TabEnabler';
import { Select } from '../../../Select';
import { FacetList } from './containers/FacetList';
import './styles.css';

export function SidePanel({onToggle, currentIndex, indexes, onIndexChange, searchkit}) {
    return (
        <div className="kgs-sidebar">
            <div className="kgs-sidebar-container">
                <SideBar>
                    {indexes.length > 1?<Select label="Group" value={currentIndex} list={indexes} onChange={onIndexChange} />:null}
                    <ResetFilters options={{query:false, filter:true, pagination:true}} translations={{"reset.clear_all":"clear extended filters"}}/>
                    <TabEnablerComponent className={''} containerSelector={'.filter--facet_type'} itemSelector={'.sk-item-list-option'} activeItemSelector={'.is-active'} disabledItemSelector={'.is-disabled'} >
                        <MenuFilter field={"_type"} title="Type" id="facet_type"/>
                    </TabEnablerComponent>
                    <FacetList searchkit={searchkit} /> 
                </SideBar>
            </div>
            <button className="kgs-sidebar__toggle" onClick={onToggle} title="toggle faceted search">
                <i className="fa fa-angle-double-up kgs-sidebar__toggle-icon"></i>
            </button>
        </div>
    );
}
  