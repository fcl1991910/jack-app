import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  render() {
    return (
      <View style={styles.container}>
        <Header
          //searchedKey={this.props.navigation.state.params}
          //onBack={() => this.onBack()}
          //search={value => this.onSearch(value)}
          icons={[{ icon: "help", onClick: () => this.onHelp() }]}
        />
        <View style={styles.contentContainer}>
        <Text>
          {this.props.navigation.state.params}
        </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SearchResult;
