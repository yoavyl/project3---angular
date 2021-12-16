import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { cartReducer } from "./cart-state";
import { categoryReducer } from "./category-state";
import { cityReducer } from "./city-state";
import { itemReducer } from "./item-state";
import { orderReducer } from "./order-state";
import { productsReducer } from "./products-state";

const reducers = combineReducers({ 
    productsState: productsReducer, 
    authState: authReducer,
    categoryState: categoryReducer,
    orderState: orderReducer,
    cartState: cartReducer,
    cityState: cityReducer,
    itemState: itemReducer,
    

});

const store = createStore(reducers);

export default store;