const initialState = {
    items: [],
    loading: true,
    error: null
};

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case "event/load/pending":
            return {
                ...state,
                loading: true,
            };

        case "event/load/fulfilled":
            return {
                ...state,
                loading: false,
                items: action.payload,
            };

        case "create/todos/pending":
            return {
                ...state,
                loading: true,
            };
        case "create/event/fulfilled":
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload],
            };
        case "create/event/rejected":
            return {
                ...state,
                loading: false,
                items: [],
                error: action.error,
            };

        case "event/edit/pending":
            return {
                ...state,
                editing: true,
            };
        case "event/edit/fulfilled":
            return {
                ...state,
                editing: false,
                items: state.items.map((report) => {
                    if (report.id === action.payload.id) {
                        return {
                            ...report,
                            ...action.payload.data,
                        };
                    }
                    return report;
                }),
            };
        case "event/delete/pending":
            return {
                ...state,
                editing: true,
            };
        case "event/delete/fulfilled":
            return {
                ...state,
                editing: false,
                items: state.items.map((report) => {
                    if (report.id === action.payload.id) {
                        return {
                            ...report,
                            ...action.payload.data,
                        };
                    }
                    return report;
                }),
            };
        default:
            return state;
    }
}

export const loadEvent = () => {
    return async (dispatch) => {
        dispatch({ type: "event/load/pending" });

        const response = await fetch("/event");
        const json = await response.json();

        dispatch({
            type: "event/load/fulfilled",
            payload: json,
        });
    };
};

export const createEvent = ({text, id}) => {
    return async (dispatch, useState) => {
        const state = useState();
        dispatch({type: "create/event/pending"});
        try {
            const response = await fetch(`/event/${id}`, {
                method: "POST",
                body: JSON.stringify({text}),
                headers: {
                    Authorization: `Bearer ${state.application.token}`,
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const json = await response.json();
            dispatch({type: "create/event/fulfilled", payload: json});
        } catch (e) {
            dispatch({type: "create/event/rejected", error: e.toString()});
        }

    };
};

// для выведения событий по id но не получилось
export const loadComments = (id) => {
    return async dispatch => {
        dispatch({
            type: "comments/load/pending",
        });
        const response = await fetch(`/event/${id}`);
        const json = await response.json();
        dispatch({
            type: "comments/load/fulfilled",
            payload: json,
        });
    };
};


export const deleteEvent = (id) => {
    return async (dispatch) => {
        dispatch({ type: "event/delete/pending" });

        await fetch(`/event/${id}`, {
            method: "DELETE",
        });
        dispatch({ type: "event/delete/fulfilled", payload: id });
        window.location.reload();
    };
};
