import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
import OptionPage from "./OptionPage";

class ItemFilter extends Component {
  constructor(props) {
    super();
  }

  optionPage = [];

  componentWillReceiveProps(nextProps) {
    this.optionPage = [];
  }

  showSelected(selecteds){
    let result = "";
    for(let i =0; i<selecteds.length; i++ ){
      if(i>0)
        result+=',';
      result+=selecteds[i];
    }
    if(result.length>3)
      result = result.substring(0,3) + "..";
    return result;
  }

  renderFilter = filter => {
    switch (filter.type) {
      case "select":
        if (filter.state) {
          this.optionPage = (
            <OptionPage
              options={filter.options}
              selected={filter.selected}
              onReset={() => filter.onReset()}
              onSet={value => filter.onSet(value)}
              onQuit={()=>filter.onQuit()}
            />
          );
        }
        return (
          <TouchableHighlight
            key={filter.filter}
            style={styles.touchableContainer}
            onPress={() => filter.onClick()}
          >
            <View
              style={[
                (filter.state
                  ? styles.selectContainerActive
                  : styles.selectContainer),
                filter.selected.length > 0 ? styles.selectContainerWithOptions : {}
              ]}
            >
              <Text
                style={[
                  styles.selectText,
                  filter.selected.length > 0 ? styles.selectTextWithOptions : {}
                ]}
              >
                {filter.selected.length === 0
                  ? filter.filter
                  : this.showSelected(filter.selected)}
              </Text>
              <Icon
                name={filter.state ? "arrow-drop-up" : "arrow-drop-down"}
                color={filter.selected.length === 0?"#888":"red"}
              />
            </View>
          </TouchableHighlight>
        );
      case "check":
        return (
          <TouchableHighlight
            key={filter.filter}
            style={styles.touchableContainer}
            onPress={() => filter.onClick()}
          >
            <View style={styles.orderContainer}>
              <Text
                style={[styles.orderText, filter.state ? { color: "red" } : {}]}
              >
                {filter.filter}
              </Text>
            </View>
          </TouchableHighlight>
        );
      case "order":
        return (
          <TouchableHighlight
            key={filter.filter}
            style={styles.touchableContainer}
            onPress={() => filter.onClick()}
          >
            <View style={styles.orderContainer}>
              <Text
                style={[styles.orderText, filter.state ? { color: "red" } : {}]}
              >
                {filter.filter}
              </Text>
              <View style={styles.orderIcons}>
                <Icon
                  name="arrow-drop-up"
                  color={filter.state === "ascend" ? "red" : "#888"}
                  size={15}
                />
                <Icon
                  name="arrow-drop-down"
                  color={filter.state === "descend" ? "red" : "#888"}
                  size={15}
                />
              </View>
            </View>
          </TouchableHighlight>
        );
    }
  };

  render() {
    let filters = [];
    if (this.props.filter1) filters.push(this.renderFilter(this.props.filter1));
    if (this.props.filter2) filters.push(this.renderFilter(this.props.filter2));
    if (this.props.filter3) filters.push(this.renderFilter(this.props.filter3));
    if (this.props.filter4) filters.push(this.renderFilter(this.props.filter4));
    if (this.props.filter5) filters.push(this.renderFilter(this.props.filter5));
    return (
      <View style={styles.filterContainer}>
        {filters}
        {this.optionPage}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  filterContainer: {
    zIndex: 5,
    height: 50,
    borderColor: "#eee",
    borderWidth: 1,
    flexDirection: "row"
  },
  touchableContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  selectContainer: {
    borderRadius: 3,
    borderColor: "#ddd",
    backgroundColor: "#ddd",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingLeft: 12,
    paddingRight: 3
  },
  selectContainerActive: {
    borderRadius: 3,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingLeft: 12,
    paddingRight: 3
  },
  selectContainerWithOptions: {
    borderColor: "#fff",
    backgroundColor: "#fff"
  },
  selectText: {},
  selectTextWithOptions: { color: "red" },
  orderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  orderText: {
    fontSize: 16
  },
  orderIcons: {},
  optionsContainer: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
    top: 50
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row"
  },
  resetButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600"
  },
  enterButton: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  enterButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "rgba(255,255,255,0.9)"
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 166,
    height: 45,
    marginHorizontal: 7
  },
  optionText: {
    fontSize: 15
  },
  optionActive: {
    borderBottomWidth: 1,
    borderBottomColor: "red"
  },
  optionTextActive: {
    color: "red"
  }
});

export default ItemFilter;
