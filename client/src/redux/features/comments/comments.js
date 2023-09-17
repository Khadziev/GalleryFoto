const initialState = {
    comments: [],
    loading: false,
};


export default function comments(state = initialState, action) {
    switch (action.type) {
        case "comments/fetch/fulfilled":
            return {
                ...state,
                comments: action.payload,
                loading: false,
            };
        case "comments/fetch/pending":
            return {
                ...state,
                loading: true,
            };
        case "comments/create/fulfilled":
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };
        default:
            return state;
    }
}

export const getComments = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: "comments/fetch/pending" });
            const token = getState().application.token;
            const data = await fetch("/comments/gallery", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const json = await data.json();

            await dispatch({ type: "comments/fetch/fulfilled", payload: json });
        } catch (e) {
            dispatch({ type: "comments/fetch/rejected", error: e.toString() });
        }
    };
};

export const createComments = (id, text) => {
    return async (dispatch) => {
        try {
            const data = await fetch(`/comments/gallery/${id}`, {
                method: "POST",
                body: JSON.stringify({ text }),
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            const json = await data.json();

            await dispatch({ type: "comments/create/fulfilled", payload: json });
        } catch (e) {
            dispatch({ type: "comments/create/rejected", error: e.toString() });
        }
    };
};