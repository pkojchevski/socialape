import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { userReducer } from "./reducers/userReducer";
import { uiReducer } from "./reducers/uiReducer";
import { dataReducer } from "./reducers/dataReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
const initialState = {};
const middleware = [thunk, logger];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

export const store = createStore(reducers, initialState, enhancer);

export default store;
