import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from "react-native";
import LoginForm from "./LoginForm";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      type: "LOGIN",
      value: {
        surname: "",
        password: "",
        passwordAgain: "",
        email: ""
      }
    };
  }

  getTitle() {
    if (this.state.title) return this.state.title;
    else return "登录";
  }

  static navigationOptions = ({ navigation }) => ({
    title: "登录/注册"
  });

  onPress = () => {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
  };

  getMessage = (type, left) => {
    let register = (
      <TouchableHighlight
        style={styles.forgotMessage}
        underlayColor="rgba(0,0,0,0)"
        onPress={() => {
          this.setState({
            type: "REGISTER"
          });
        }}
      >
        <Text style={styles.forgotText}>注册</Text>
      </TouchableHighlight>
    );
    let alreadyHaveAccount = (
      <TouchableHighlight
        style={styles.forgotMessage}
        underlayColor="rgba(0,0,0,0)"
        onPress={() => {
          this.setState({
            type: "LOGIN"
          });
        }}
      >
        <Text style={styles.forgotText}>已经有账号？</Text>
      </TouchableHighlight>
    );
    let forgotPassword = (
      <TouchableHighlight
        style={styles.forgotMessage}
        underlayColor="rgba(0,0,0,0)"
        onPress={() => {
          this.setState({
            type: "FORGOTPASSWORD"
          });
        }}
      >
        <Text style={styles.forgotText}>忘记密码</Text>
      </TouchableHighlight>
    );
    switch (type) {
      case "LOGIN":
        if (left) return register;
        else return forgotPassword;
      case "REGISTER":
        if (left) return forgotPassword;
        else return alreadyHaveAccount;
      case "FORGOTPASSWORD":
        if (left) return register;
        else return alreadyHaveAccount;
    }
  };

  getButtonText() {
    switch (this.state.type) {
      case "LOGIN":
        return "登录";
      case "REGISTER":
        return "注册";
      case "FORGOTPASSWORD":
        return "重置密码";
    }
  }

  render() {
    let leftMessage = this.getMessage(this.state.type, true);
    let rightMessage = this.getMessage(this.state.type, false);
    let buttonText = this.getButtonText();
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <LoginForm
              ref="form"
              type={this.state.type}
              value={this.state.value}
            />
          </View>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onPress}
            underlayColor="#99d9f4"
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableHighlight>
          <View style={styles.forgotContainer}>
            {leftMessage}
            {rightMessage}
          </View>
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
  },
  forgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7
  },
  forgotMessage: {
    //backgroundColor:"#ff7",
    justifyContent: "center",
    height: 36,
    paddingLeft: 10,
    paddingRight: 10
  },
  forgotText: {
    fontSize: 15,
    alignSelf: "center"
  }
});

export default Login;
