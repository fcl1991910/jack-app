import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";

const TabHeader = props => {
    const {tab,tabActive,tabInactive,tabText,tabActiveText,tabInactiveText,tabHeader} = props.styles;
    let headers = [];
    let viewStyle, textStyle;
    for (let i = 0; i < props.navigationState.routes.length; i++) {
      let value = props.navigationState.routes[i];
      if (props.navigationState.index == i) {
        viewStyle = [tab, tabActive];
        textStyle = [tabText, tabActiveText];
      } else {
        viewStyle = [tab, tabInactive];
        textStyle = [tabText, tabInactiveText];
      }
      headers.push(
        <TouchableHighlight
          key={i}
          style={viewStyle}
          underlayColor={null}
          onPress={() => props._changeIndex(i)}
        >
          <Text style={textStyle}>{value.title}</Text>
        </TouchableHighlight>
      );
    }
    //console.log(headers);
    return <View style={tabHeader}>{headers}</View>;
};

export default TabHeader;
