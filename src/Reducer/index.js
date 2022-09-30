import { combineReducers } from "redux";

import { currencyData } from "./ExchangeReducer";

export default combineReducers(
    {
        currencyValue: currencyData,
 
    }
)