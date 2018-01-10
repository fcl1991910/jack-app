import React,{Component} from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductSimple from "../components/ProductSimple";

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

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title
  });

  render() {
    return (
      <ProductSimple key={this.state.item.title} item={this.state.item} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Product;
