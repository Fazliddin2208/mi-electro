import { combineReducers } from "redux";
import locationReducer from "./locationReducer";
import fetchReducer from "./fetchReducer";

const allReducers = combineReducers({
    location: locationReducer,
    fetchData: fetchReducer
})

export default allReducers;