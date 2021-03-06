import React from "react";
import { TouchableHighlight, View, Text } from "react-native";
import { Icon } from "react-native-elements";

const AddedTag = props => {
  let clearIcon = props.onClear ? (
    <Icon name="clear" color="white" size={12} />
  ) : (
    []
  );
  return (
    <TouchableHighlight
      style={styles.searchedKey}
      onPress={() =>
        props.onClear ? props.onClear({ id: props.id, name: props.tag }) : {}
      }
    >
      <View style={styles.searchedKeyView}>
        <Text style={styles.searchedKeyText}>{props.tag}</Text>
        {clearIcon}
      </View>
    </TouchableHighlight>
  );
};

const styles = {
  searchedKey: {
    justifyContent: "center",
    alignItems: "center"
  },
  searchedKeyView: {
    paddingVertical: 4,
    paddingHorizontal: 5,
    flexDirection: "row",
    backgroundColor: "#888",
    borderColor: "#888",
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchedKeyText: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
    marginRight: 4
  }
};

export default AddedTag;
