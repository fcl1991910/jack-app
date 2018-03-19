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
import { connect } from "react-redux";
import * as func from "../func/func";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({});

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      brands: [],
      types: [],
      brand_selected: [],
      type_selected: [],
      show_brands: false,
      show_type: false,
      sale: false,
      price: false // ascend/descend/false
    };
  }

  componentWillMount() {
    func
      .callApi(
        "get",
        "api/category/product/" + this.props.navigation.state.params,
        {},
        this.props.access_token
      )
      .then(response => {
        let brands = [];
        let types = [];
        for (let i = 0; i < response.data.length; i++) {
          let value = response.data[i];
          if (value.brand && !brands.includes(value.brand))
            brands.push(value.brand);
          if (value.categories) {
            let categories = JSON.parse("[" + value.categories + "]");
            categories.forEach(function(tmp) {
              if (!types.includes(tmp)) types.push(tmp);
            });
          }
        }
        this.setState({
          items: response.data,
          types: types,
          brands: brands
        });
      })
      .catch(error => {
        console.log("555", error.response.data.message);
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

  onQuit = () => {
    this.setState({
      show_brands: false,
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
    let items = [];
    for (let i = 0; i < this.state.items.length; i++) {
      let value = this.state.items[i];
      if (
        this.state.brand_selected.length > 0 &&
        !this.state.brand_selected.includes(value.brand)
      )
        continue;
      if (
        this.state.type_selected.length > 0 &&
        func.array_intersection(
          this.state.type_selected,
          JSON.parse("[" + value.categories + "]")
        ).length === 0
      )
        continue;
      items.push(value);
    }
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
              onQuit: () => this.onQuit(),
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
              onQuit: () => this.onQuit(),
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
            items={items}
            no_item_message={"没有搜到商品"}
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

//export default SearchResult;
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
