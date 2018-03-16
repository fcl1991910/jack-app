import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductSimple from "../components/ProductSimple";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      item: []
    };
  }

  componentWillMount() {
    this.setState({
      item: this.props.navigation.state.params
    });
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title = {this.props.navigation.state.params.name}
          onBack={() => this.onBack()}
          icons={[{ icon: "help", onClick: () => this.onHelp() }]}
        />
        <ProductSimple key={this.state.item.name} item={this.state.item} />
        <Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Product;
