import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import application from "./features/application";
import child from "./features/child";
import gallery from './features/gallery'
import event from './features/event'


export const store = createStore(
    combineReducers({
        application, child, gallery, event
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);