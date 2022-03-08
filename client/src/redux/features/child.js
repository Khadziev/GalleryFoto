const initialState = {
    loading: true,
    items: [],
    error: null,
    currentItem: [],
    removing: false,
    addingToRend: false,
    returning: false,

};

export default function child(state = initialState, action) {
    switch (action.type) {
        case 'child/fetch-child/pending':
            return {
                ...state,
                loading: true
            }
        case 'child/fetch-child/fulfilled':
            return {
                ...state,
                loading: false,
                items: action.payload,
            }
        case 'child/fetch-child/rejected':
            return {
                ...state,
                loading: false,
                items: [],
                error: action.error
            }
        case "create/child/pending":
            return {
                ...state,
                loading: true,
            };
        case "create/child/fulfilled":
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload],
            };
        case "create/child/rejected":
            return {
                ...state,
                loading: false,
                items: [],
                error: action.error,
            };
        case "child/edit/pending":
            return {
                ...state,
                editing: true,
            };

        case "child/edit/fulfilled":
            return {
                ...state,
                editing: false,
                items: state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            ...action.payload.data,
                        };
                    }
                    return item;
                }),
            };

        case "child/delete/fetch/pending":
            return {
                ...state,
                deleting: true,
            };
        case "child/delete/fetch/fulfilled":
            return {
                ...state,
                deleting: false,
                candidate: state.candidate._id,
            };

        case "byId/child/pending":
            return {
                ...state,
                loading: true,
            };
        case "byId/child/fulfilled":
            return {
                ...state,
                loading: false,
                currentItem: action.payload,
            };
        case "byId/child/rejected":
            return {
                ...state,
                loading: false,
                currentItem: [],
                error: action.error,
            };

        default:
            return state;
    }
}


// Админ
export const loadUserChild = () => {
    return async dispatch => {
        dispatch({type: 'child/fetch-child/pending'})

        try {
            const response = await fetch('/child', {})
            const json = await response.json()

            if (json.error) {
                dispatch({
                    type: 'child/fetch-child/rejected',
                    error: 'При запросе на сервер произошла ошибка',
                })
            } else {
                dispatch({type: 'child/fetch-child/fulfilled', payload: json})
            }
        } catch (e) {
            dispatch({
                type: 'child/fetch-child/rejected',
                error: e.toString()
            })
        }
    }
}

// хотел вывести отдельно для админа но потом...
export const fetchChildById = ({ id }) => {
    return async (dispatch) => {
        dispatch({ type: "byId/child/pending" });

        try {
            const response = await fetch(`/child/${id}`);
            const json = await response.json();
            if (json.error) {
                dispatch({
                    type: "byId/child/rejected",
                    error: "При запросе на сервер произошла ошибка",
                });
            } else {
                dispatch({ type: "byId/child/fulfilled", payload: json });
            }
        } catch (e) {
            dispatch({ type: "byId/child/rejected", error: e.toString() });
        }
    };
};

export const postChild = ({name, imageURL, age, gender, id}) => {
    return async (dispatch, useState) => {
        const state = useState();
        dispatch({type: "create/child/pending"});
        try {
            const response = await fetch(`/child/${id}`, {
                method: "POST",
                body: JSON.stringify({name, imageURL, age, gender}),
                headers: {
                    Authorization: `Bearer ${state.application.token}`,
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const json = await response.json();
            dispatch({type: "create/child/fulfilled", payload: json});
        } catch (e) {
            dispatch({type: "create/child/rejected", error: e.toString()});
        }

    };
};


export const deleteChild = (id) => {
    return async (dispatch) => {
        dispatch({type: "account/delete/fetch/pending"});
        try {
            await fetch(`/child/${id}`, {
                method: "DELETE",
            });
            window.location.reload();

            dispatch({type: "account/delete/fetch/fulfilled", payload: id});
        } catch (e) {
            dispatch({type: "account/delete/fetch/rejected"});
        }
    };
};


//
// export const editTodo = (id, data) => {
//     return async (dispatch, getState) => {
//         dispatch({type: "todos/edit/pending"});
//
//         const state = getState();
//         await fetch(`/todos/${id}`, {
//             method: "PATCH",
//             headers: {
//                 Authorization: `Bearer ${state.application.token}`,
//                 "Content-type": "application/json",
//             },
//             body: JSON.stringify({
//                 text: data.text,
//             }),
//         });
//         window.location.reload();
//
//         dispatch({type: "todos/edit/fulfilled", payload: {id, data}});
//     };
// };








