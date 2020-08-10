import { combineReducers,createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import restaurantReducer from './redux/reducer/restaurantReducer';
import menuReducer from './redux/reducer/menuReducer';

const rootReducer = combineReducers({
  restaurant:restaurantReducer,
  menu:menuReducer
})
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer,{
      restaurant:[
      {key:1,branch:'Dominos Ashok Nagar',manager:'Mr. Raj Khanna',contact:'0294568553',branchCode:'#0325698'},
      {key:2,branch:'Dominos Celebration Mall',manager:'Mr. Rakesh jain',contact:'02944436521',branchCode:'#0325656'}
      ],
      menu:[
      {key:1,name:'Cheese garlic pizza',price:250},
      {key:2,name:'Corn pizza',price:250},
      {key:3,name:'Cheese burst pizza',price:450},
      ]
  });
    let persistor = persistStore(store)
    return { store, persistor }
}