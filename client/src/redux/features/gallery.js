const initialState = {
    items: [],
    loading: false,
};

export default function gallery(state = initialState, action) {
    switch (action.type) {
        case "gallery/load/pending":
            return {
                ...state,
                loading: true,
            };

        case "gallery/load/fulfilled":
            return {
                ...state,
                loading: false,
                items: action.payload,
            };

        case "gallery/post/pending":
            return {
                ...state,
                loading: true,
            };
        case "gallery/post/fulfilled":
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload],
            };
        case "gallery/delete/fetch/pending":
            return {
                ...state,
                deleting: true,
            };
        case "gallery/delete/fetch/fulfilled":
            return {
                ...state,
                deleting: false,
                candidate: state.candidate._id,
            };
        default:
            return state;

    }
}

export const loadGallery = () => {
    return async (dispatch) => {
        dispatch({ type: "gallery/load/pending" });

        const response = await fetch("/gallery");
        const json = await response.json();

        dispatch({
            type: "gallery/load/fulfilled",
            payload: json,
        });
    };
};

export const postGallery  = (data) => {
    return async (dispatch) => {
        dispatch({ type: "gallery/create/pending" });
        const response = await fetch('/gallery', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                imageURL: data.imageURL,
                description:data.description
            }),
        });
        const json = await response.json();
        dispatch({
            type: "gallery/post/fulfilled",
            payload: json,
        });
       // window.location.reload();
    };
};

export const deleteGallery = (id) => {
    return async (dispatch) => {
        dispatch({ type: "gallery/delete/pending" });

        await fetch(`/gallery/${id}`, {
            method: "DELETE",
        });
        dispatch({ type: "gallery/delete/fulfilled", payload: id });
    };
};