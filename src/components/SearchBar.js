import React, { Component } from "react";
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList
} from "react-native";
import { Icon } from "react-native-elements";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onFocus: false,
      searchKey: "",
      hotSearchkeys: [
        "A2奶粉",
        "UGG雪地靴",
        "电冰箱",
        "旧电视机",
        "澳洲纯羊毛棉裤"
      ],
      historySearchkeys: ["牛奶", "冰箱", "洗衣机", "电脑", "UGG"],
      SearchOptions: [
        "射手座",
        "射手座手链",
        "射手座项链",
        "射手座奖",
        "射手座礼物",
        "射手座生日礼物",
        "射手座：会有星光越重洋",
        "射手座沙发",
        "射手座戒指"
      ]
    };
  }

  quitSearch = () => {
    const field = TextInput.State.currentlyFocusedField();
    TextInput.State.blurTextInput(field);
    this.setState({ onFocus: false, searchKey: "" });
  };

  render() {
    let displaySearchPage = { display: "none" };
    let displaySearchOptions = { display: "none" };
    let quitButton = <View />;
    searchedKey = <View />;
    if (this.state.onFocus) {
      quitButton = (
        <TouchableHighlight
          style={styles.quitSearch}
          onPress={() => this.quitSearch()}
        >
          <Text style={styles.quitSearchText}>取消</Text>
        </TouchableHighlight>
      );
      if (this.state.searchKey) displaySearchOptions = {};
      else displaySearchPage = {};
    }else {
      if (this.props.searchedKey)
      searchedKey = (
        <TouchableHighlight style={styles.searchedKey}>
          <View style={styles.searchedKeyView}>
          <Text style={styles.searchedKeyText}>{this.props.searchedKey}</Text>
          <Icon name="clear" color="white" size={12}/>
          </View>
        </TouchableHighlight>
      );
    }
    let hotSearchKeys = [];
    for (let i = 0; i < this.state.hotSearchkeys.length; i++)
      hotSearchKeys.push(
        <TouchableHighlight
          key={i}
          style={styles.hotSearch}
          onPress={() => {
            this.props.search(this.state.hotSearchkeys[i]);
          }}
        >
          <Text style={styles.hotSearchText}>
            {this.state.hotSearchkeys[i]}
          </Text>
        </TouchableHighlight>
      );
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <Icon name="search" color="grey" />
          </View>
          <View style={styles.textContainer}>
            {searchedKey}
            <TextInput
              style={styles.textInputArea}
              placeholder={(this.props.searchedKey&&!this.state.onFucus)?"":"请输入关键词"}
              defaultValue={this.state.searchKey}
              onChangeText={text => {
                this.setState({
                  searchKey: text
                });
              }}
              onFocus={() => {
                this.setState({
                  onFocus: true,
                  searchKey: (this.props.searchedKey)?this.props.searchedKey:""
                });
              }}
              onSubmitEditing={() => {
                this.props.search(this.state.searchKey);
              }}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../img/freepik.png")}
            />
          </View>
        </View>
        {quitButton}
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={[styles.searchPageContainer, displaySearchOptions]}
        >
          <FlatList
            keyboardShouldPersistTaps="always"
            style={{ marginTop: 10 }}
            data={this.state.SearchOptions}
            renderItem={({ item }) => (
              <TouchableHighlight
                style={styles.historyItem}
                onPress={() => {
                  this.props.search(item);
                }}
              >
                <Text style={[styles.historyItemText, { marginLeft: 20 }]}>
                  {item}
                </Text>
              </TouchableHighlight>
            )}
            keyExtractor={item => item}
          />
        </ScrollView>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={[styles.searchPageContainer, displaySearchPage]}
        >
          <View style={styles.hotSearchContainer}>
            <View style={styles.hotSearchTitleContainer}>
              <Text style={styles.TitleText}>热搜</Text>
            </View>
            <View style={styles.hotSearchKeyContainer}>
              <ScrollView
                keyboardShouldPersistTaps="always"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.hotSearchKeyScrollView}
              >
                {hotSearchKeys}
              </ScrollView>
            </View>
          </View>
          <View style={styles.historySearchContainer}>
            <View style={styles.gapContainer} />
            <View style={styles.historyContainer}>
              <FlatList
                keyboardShouldPersistTaps="always"
                ListHeaderComponent={() => (
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyHeaderText}>历史搜索</Text>
                  </View>
                )}
                data={this.state.historySearchkeys}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    style={styles.historyItem}
                    onPress={() => {
                      this.props.search(item);
                    }}
                  >
                    <Text style={styles.historyItemText}>{item}</Text>
                  </TouchableHighlight>
                )}
                keyExtractor={item => item}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={styles.touchableHighlight}
                onPress={() => console.log("delete search history!")}
              >
                <View style={styles.button}>
                  <Icon name="delete-forever" color="grey" />
                  <Text style={styles.buttonText}>清空历史搜索</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 33,
    position: "absolute",
    width: Dimensions.get("window").width * 6 / 8
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 35,
    borderWidth: 3,
    backgroundColor: "#eeF0F3",
    borderColor: "#eeF0F3"
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 7,
    flexDirection: "row",
    zIndex:1
  },
  textInputArea: {
    flex:1,
  },
  searchedKey: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchedKeyView: {
    paddingVertical:4,
    paddingHorizontal: 5,
    flexDirection: "row",
    backgroundColor: "#888",
    borderColor: "#888",
    borderRadius: 3,
    borderWidth: 1,
  },
  searchedKeyText: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
    marginRight:4
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchPageContainer: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    right: -Dimensions.get("window").width / 8,
    top: 33
  },
  quitSearch: {
    position: "absolute",
    width: 50,
    height: 33,
    right: -50,
    top: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  quitSearchText: {
    color: "blue",
    paddingRight: 7,
    fontSize: 16,
    fontWeight: "600"
  },
  hotSearchContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eeF0F3",
    paddingVertical: 10,
    paddingLeft: 10
  },
  hotSearchTitleContainer: {},
  TitleText: {
    fontSize: 16,
    fontWeight: "600"
  },
  hotSearchKeyContainer: {
    paddingTop: 10
  },
  hotSearchKeyScrollView: {
    flexDirection: "row"
  },
  hotSearch: {
    marginRight: 14,
    paddingHorizontal: 2,
    borderRadius: 5,
    backgroundColor: "#eeF0F3"
  },
  hotSearchText: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    color: "#444"
  },
  historySearchContainer: {},
  gapContainer: {
    height: 10,
    backgroundColor: "#eeF0F3",
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  historyContainer: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#f7f7f7"
  },
  historyHeader: {
    paddingVertical: 10
  },
  historyHeaderText: {
    fontSize: 16,
    fontWeight: "600"
  },
  historyItem: {
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#f7f7f7"
  },
  historyItemText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#777"
  },
  buttonContainer: {
    paddingTop: 20,
    alignItems: "center"
  },
  touchableHighlight: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: 280,
    height: 42,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#777"
  }
});

export default SearchBar;
