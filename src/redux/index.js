import { createStore, combineReducers } from "redux";
import regionListReducer from "./regionListReducer";
import cityListReducer from "./cityListReducer";

const reducers = combineReducers({
    regionList: regionListReducer,
    cityList: cityListReducer
});

const store = createStore(reducers);

export default store;