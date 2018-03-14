import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from "react-native";
import Header from "../components/Header";
import { Icon } from "react-native-elements";
import ItemFilter from "../components/ItemFilter";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: ["UGG", "贝拉美", "A2", "NUK", "Bioisland"],
      types: [
        "奶粉",
        "宝宝洗护",
        "营养辅食",
        "宝宝寝具",
        "孕产母乳",
        "美妆个护"
      ],
      brand_selected: [],
      type_selected: [],
      show_brands: false,
      show_type: false,
      sale: false,
      price: false // ascend/descend/false
    };
  }

  onBack = () => {
    this.props.navigation.navigate("ProductList");
  };

  onHelp = () => {
    console.log("onHelp");
  };

  onSearch = searchKey => {
    this.props.navigation.navigate("SearchResult", searchKey);
  };

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  onBrand = () => {
    this.setState(prevState => {
      return { show_brands: !prevState.show_brands, show_type: false };
    });
  };

  onType = () => {
    this.setState(prevState => {
      return { show_type: !prevState.show_type, show_brands: false };
    });
  };

  onSetBrand = (value) => {
    this.setState({
      brand_selected:value,
      show_brands: false
    });
  }

  onSetType = (value) => {
    this.setState({
      type_selected:value,
      show_type: false
    });
  }

  onResetBrand = () => {
    this.setState({
      brand_selected:[],
      show_brands: false
    });
  }

  onResetType = () => {
    this.setState({
      type_selected:[],
      show_type: false
    });
  }

  onSale = () => {
    this.setState(prevState => {
      return {
        sale: !prevState.sale,
        price: false,
        show_type: false,
        show_brands: false
      };
    });
  };

  onPrice = () => {
    this.setState(prevState => {
      if (prevState.price === "ascend")
        return {
          price: "descend",
          sale: false,
          show_type: false,
          show_brands: false
        };
      else
        return {
          price: "ascend",
          sale: false,
          show_type: false,
          show_brands: false
        };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          searchedKey={this.props.navigation.state.params}
          onBack={() => this.onBack()}
          search={value => this.onSearch(value)}
          icons={[{ icon: "help", onClick: () => this.onHelp() }]}
        />
        <View style={styles.contentContainer}>
          <ItemFilter
            filter1={{
              filter: "品牌",
              type: "select",
              onClick: () => this.onBrand(),
              onSet: (value)=>this.onSetBrand(value),
              onReset: ()=>this.onResetBrand(),
              options: this.state.brands,
              selected: this.state.brand_selected,
              state: this.state.show_brands
            }}
            filter2={{
              filter: "类型",
              type: "select",
              onClick: () => this.onType(),
              onSet: (value)=>this.onSetType(value),
              onReset: ()=>this.onResetType(),
              options: this.state.types,
              selected: this.state.type_selected,
              state: this.state.show_type
            }}
            filter3={{
              filter: "销量",
              type: "check",
              onClick: () => this.onSale(),
              state: this.state.sale
            }}
            filter4={{
              filter: "价格",
              type: "order",
              onClick: () => this.onPrice(),
              state: this.state.price
            }}
          />
          <View style={styles.resultContainer}><Text>afasva</Text></View>
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
    alignItems: "center"
  },
  resultContainer: {
    backgroundColor: "#ff7",
    flex:1,
  }
});

export default SearchResult;
