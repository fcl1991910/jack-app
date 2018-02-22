import React,{Component} from "react";
import { StyleSheet, Text, View } from "react-native";

class Login extends Component {
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
    name: navigation.state.params.name
  });

  render() {
    return (
      <ProductSimple key={this.state.item.name} item={this.state.item} />
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

export default Login;
