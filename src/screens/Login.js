import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from "react-native";

var t = require("tcomb-form-native");
t.form.Form.i18n = {
  optional: "",
  required: " (required)" // inverting the behaviour: adding a postfix to the required fields
};
var Form = t.form.Form;
var type = t.struct({
  name: t.String, // a required string
  surname: t.maybe(t.String), // an optional string
  age: t.Number, // a required number
  rememberMe: t.Boolean // a boolean
});
var options = {
  fields: {
    name: {
      label: "用户名",
      placeholder: "用户名",
      error: "用户名不可用"
    },
    surname: {
      label: "姓氏",
      placeholder: "姓氏",
      help: "不用填",
      autoCapitalize:"words",
      clearButtonMode: "while-editing"
    }
  }
};
class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      age: 18,
      rememberMe: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "登录"
  });

  onPress = () => {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
  };

  componentDidMount() {
    this.refs.form.getComponent("name").refs.input.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Form ref="form" onChange={this.onChange} type={type} options={options} value={this.state} />
          <TouchableHighlight
            style={styles.button}
            onPress={this.onPress}
            underlayColor="#99d9f4"
          >
            <Text style={styles.buttonText}>登录</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});

export default Login;
