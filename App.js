import React,{ Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './src/reducers';
import {Tabs} from './src/config/router';

const loggerMiddleware = createLogger({ predicate: (getState, action)=> __DEV__});

function configureStore(initialState){
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Tabs />
        {/*<View style={styles.container}>
          <Text>ascasvadvsndvidsnvslkdvnskdlvnsdkjv</Text>
    </View>*/}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
