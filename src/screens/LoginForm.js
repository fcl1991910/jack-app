import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from "react-native";

var t = require("tcomb-form-native");
var Form = t.form.Form;

var options = {
  fields: {
    username: {
      label: "用户名",
      placeholder: "输入用户名",
      error: "用户名不可用",
      maxLength:15,
      autoCapitalize: 'none'
    },
    email: {
      label: "邮箱",
      keyboardType: "email-address",
      error: "电子邮箱不可用",
      placeholder: "输入邮箱",
      autoCapitalize: 'none'
    },
    password: {
      label: "密码",
      placeholder: "输入密码",
      maxLength: 15,
      secureTextEntry: true,
      error: "密码不正确",
    },
    passwordAgain: {
      label: "确认密码",
      placeholder: "再次输入密码",
      maxLength: 15,
      secureTextEntry: true,
      error: "密码不正确",
    }
  }
};

class LoginForm extends Component {
  //   componentDidMount() {
  //     this.refs.form.getComponent("name").refs.input.focus();
  //   }

  componentDidMount() {
    this.refs.form.getComponent('username').refs.input.focus();
  }

  getValue = () => {
    return this.refs.form.getValue();
  };

  getType = () => {
    switch (this.props.type) {
      case "LOGIN":
        return t.struct({
          username: t.String,
          password: t.String
        });
      case "REGISTER":
        return t.struct({
          username: t.String,
          email: t.String,
          password: t.String,
          passwordAgain: t.String
        });
      case "FORGOTPASSWORD":
        return t.struct({
          username: t.String,
          email: t.String
        });
    }
  };

  getOptions = () => {
    return options;
  };

  render() {
    let type = this.getType();
    //let options = this.getOptions();
    return (
      <Form
        ref="form"
        onChange={this.onChange}
        type={type}
        options={options}
        value={this.props.value}
      />
    );
  }
}

LoginForm.propTypes = {
  type: PropTypes.oneOf(["LOGIN", "REGISTER", "FORGOTPASSWORD"]),
  value: PropTypes.object
};

const styles = StyleSheet.create({});

export default LoginForm;
