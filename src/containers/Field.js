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
import { FieldLabel} from "./Field/FieldLabel";
import { Hint} from "../components/Hint";
import { ListField, PrintViewListField } from "./Field/ListField";
import { ObjectField, PrintViewObjectField } from "./Field/ObjectField";
import { ValueField, PrintViewValueField } from "./Field/ValueField";
import "./Field.css";

const FieldBase = (renderUserInteractions = true) => {

  const ListFieldComponent = renderUserInteractions?ListField:PrintViewListField;
  const ObjectFieldComponent = renderUserInteractions?ObjectField:PrintViewObjectField;
  const ValueFieldComponent = renderUserInteractions?ValueField:PrintViewValueField;

  const Field = ({name, data, mapping, index}) => {
    if (!mapping || !mapping.visible || !(data || mapping.showIfEmpty)) {
      return null;
    }

    const isList = Array.isArray(data);
    const style = (mapping.order && !renderUserInteractions)?{order: mapping.order}:null;
    const className = "kgs-field" + (name?" kgs-field__" + name:"") + (mapping.layout?" kgs-field__layout-" + mapping.layout:"");

    const labelProps = {
      show: !!mapping.value && (!mapping.label_hidden || !!renderUserInteractions),
      showAsBlock: mapping.tag_icon,
      value: mapping.value,
      counter: (mapping.layout === "group" && isList)?data.length:0
    };
    const hintProps = {
      show: renderUserInteractions && !!mapping.value && !!mapping.hint,
      value: mapping.hint,
      label: mapping.value
    };
    const listProps = {
      show: isList,
      items: data,
      mapping: mapping,
      index: index
    };
    const valueProps = {
      show: !isList,
      data: data,
      mapping: mapping,
      index: index
    };
    const objectProps = {
      show: !isList && !!mapping.children,
      data: data && data.children,
      mapping: mapping,
      index: index
    };

    return (
      <span style={style} className={className}>
        <FieldLabel {...labelProps} />
        <Hint {...hintProps} />
        <ValueFieldComponent {...valueProps} />
        <ListFieldComponent {...listProps} />
        <ObjectFieldComponent {...objectProps} />
      </span>
    );
  };

  return Field;
};

export const Field = FieldBase(true);
export const PrintViewField = FieldBase(false);