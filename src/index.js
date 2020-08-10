import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { combineReducers,createStore } from 'redux'
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import restaurantReducer from './redux/reducer/restaurantReducer';
import menuReducer from './redux/reducer/menuReducer';

const allReducers = combineReducers({
  restaurant:restaurantReducer,
  menu:menuReducer
})
const store = createStore(allReducers,{
  restaurant:[
  {key:1,branch:'Dominos Ashok Nagar',manager:'Mr. Raj Khanna',contact:'0294568553',branchCode:'#0325698'},
  {key:2,branch:'Dominos Celebration Mall',manager:'Mr. Rakesh jain',contact:'02944436521',branchCode:'#0325656'}
  ],
  menu:[
  {key:1,name:'Cheese garlic pizza',price:250,restaurant_key:1},
  {key:2,name:'Corn pizza',price:250,restaurant_key:1},
  {key:3,name:'Cheese burst pizza',price:450,restaurant_key:2},
  {key:4,name:'Cheese burst pizza',price:450,restaurant_key:2},
  ]
});

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
