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

class OptionPage extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedOptions: props.selected
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedOptions: nextProps.selected
    });
  }

  togleOption = value => {
    if (this.state.selectedOptions.includes(value))
      this.setState(prevState => {
        return {
          selectedOptions: prevState.selectedOptions.filter(function(item) {
            return item !== value;
          })
        };
      });
    else
      this.setState(prevState => {
        return { selectedOptions: prevState.selectedOptions.concat(value) };
      });
  };

  render() {
    let options = [];
    for (let i = 0; i < this.props.options.length; i++) {
      let value = this.props.options[i];
      if (this.state.selectedOptions.includes(value))
        options.push(
          <TouchableHighlight key={i} onPress={() => this.togleOption(value)}>
            <View style={[styles.optionActive, styles.option]}>
              <Text style={[styles.optionTextActive, styles.optionText]}>
                {value}
              </Text>
              <Icon
                style={styles.optionIcon}
                name="done"
                size={15}
                color="red"
              />
            </View>
          </TouchableHighlight>
        );
      else
        options.push(
          <TouchableHighlight key={i} onPress={() => this.togleOption(value)}>
            <View key={i} style={styles.option}>
              <Text style={styles.optionText}>{value}</Text>
            </View>
          </TouchableHighlight>
        );
    }
    return (
      <View style={styles.container}>
      <View
        style={[
          styles.optionsContainer,
          {
            height:
              this.props.options.length > 14
                ? Dimensions.get("window").height
                : Math.ceil(this.props.options.length / 2) * 45 + 45
          }
        ]}
      >
        <ScrollView style={styles.optionsScroll}>
          <View style={styles.options}>{options}</View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.resetButton}
            onPress={() => this.props.onReset()}
          >
            <Text style={styles.resetButtonText}>重置</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.enterButton}
            onPress={() => this.props.onSet(this.state.selectedOptions)}
          >
            <Text style={styles.enterButtonText}>确定</Text>
          </TouchableHighlight>
        </View>
      </View>
      <TouchableHighlight onPress={()=>this.props.onQuit()}>
        <View  style={styles.shadowContainer}/>
      </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    position: "absolute",
    top: 50,
    left: -1
  },
  shadowContainer:{
    backgroundColor: "rgba(0,0,0,0.5)",
    height: Dimensions.get("window").height,
  },
  optionsContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
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
  optionsScroll: {
    backgroundColor: "rgba(255,255,255,0.95)"
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
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

export default OptionPage;
