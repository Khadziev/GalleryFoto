import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import comments from "./features/comments/comments";
import {application} from "./features/application/application";
import {data} from './features/data/data'
import {gallery} from "./features/gallery/gallery";
import {event} from "./features/event/event";

export const store = createStore(
    combineReducers({
        application, child: data, comments,gallery, event
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);