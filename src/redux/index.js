import { createStore, combineReducers } from "redux";
import regionListReducer from "./regionListReducer";
import cityListReducer from "./cityListReducer";
import categoryListReducer from "./categoryListReducer";
import subcategoryListReducer from "./subcategoryListReducer";

const reducers = combineReducers({
    regionList: regionListReducer,
    cityList: cityListReducer,
    categoryList: categoryListReducer,
    subcategoryList: subcategoryListReducer
});

const store = createStore(reducers);

export default store;