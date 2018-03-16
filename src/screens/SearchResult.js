import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from "react-native";
import Header from "../components/Header";
import { Icon } from "react-native-elements";
import ItemFilter from "../components/ItemFilter";
import albums from "../json/albums.json";
import ItemTable from "../components/ItemTable";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
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

  componentWillMount() {
    let products = [];
    products = products.concat(albums);
    products = products.concat(albums);
    products = products.concat(albums);
    products = products.concat(albums);
    this.setState({
      items: products
    });
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

  onSetBrand = value => {
    this.setState({
      brand_selected: value,
      show_brands: false
    });
  };

  onSetType = value => {
    this.setState({
      type_selected: value,
      show_type: false
    });
  };

  onResetBrand = () => {
    this.setState({
      brand_selected: [],
      show_brands: false
    });
  };

  onResetType = () => {
    this.setState({
      type_selected: [],
      show_type: false
    });
  };

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

  onLearnMore = item => {
    this.props.navigation.navigate("Product", item);
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
              onSet: value => this.onSetBrand(value),
              onReset: () => this.onResetBrand(),
              options: this.state.brands,
              selected: this.state.brand_selected,
              state: this.state.show_brands
            }}
            filter2={{
              filter: "类型",
              type: "select",
              onClick: () => this.onType(),
              onSet: value => this.onSetType(value),
              onReset: () => this.onResetType(),
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
          <ItemTable
            styles={styles_itemtable}
            onLearnMore={item => this.onLearnMore(item)}
            items={this.state.items}
          />
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
    flex: 1
  }
});

const styles_itemtable = StyleSheet.create({
  touchablehighlight: {
    marginTop: 7,
    width: 180,
    height: 208
  },
  product: {
    flexDirection: "column",
    width: 180,
    height: 208,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center"
  },
  image: { width: 180, height: 180 },
  title: { width: 180, height: 30 },
  text: {
    fontSize: 20,
    paddingBottom: 3,
    color: "#777",
    textAlign: "center",
    fontWeight: "800"
  },
  scrollview: {
    //flex: 1
  },
  product_list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});

export default SearchResult;
