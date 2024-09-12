import { createStore, combineReducers } from "redux";
import regionListReducer from "./regionListReducer";
import cityListReducer from "./cityListReducer";
import categoryListReducer from "./categoryListReducer";

const reducers = combineReducers({
    regionList: regionListReducer,
    cityList: cityListReducer,
    categoryList: categoryListReducer
});

const store = createStore(reducers);

export default store;