const initialState = {
  loading: true,
  items: [],
  error: null,
  currentItem: [],
  removing: false,
  addingToRend: false,
  returning: false,
  buId: null, // Добавлено поле buId
};

export const data = (state = initialState, action) => {
  switch (action.type) {
    case 'data/fetch-data/pending':
      return {
        ...state,
        loading: true,
      };
    case 'data/fetch-data/fulfilled':
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case 'data/fetch-data/rejected':
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };
    case 'create/data/pending':
      return {
        ...state,
        loading: true,
      };
    case 'create/data/fulfilled':
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    case 'create/data/rejected':
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };
    case 'data/edit/pending':
      return {
        ...state,
        editing: true,
      };
    case 'data/edit/fulfilled':
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
    case 'data/delete/fetch/pending':
      return {
        ...state,
        deleting: true,
      };
    case 'data/delete/fetch/fulfilled':
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    case 'byId/data/pending':
      return {
        ...state,
        loading: true,
      };
    case 'byId/data/fulfilled':
      return {
        ...state,
        loading: false,
        currentItem: action.payload,
      };
    case 'byId/data/rejected':
      return {
        ...state,
        loading: false,
        currentItem: [],
        error: action.error,
      };
    case 'service/image/pending':
      return {
        ...state,
        loading: true,
      };
    case 'service/image/fulfilled':
      return {
        ...state,
        loading: false,
        image: action.payload.image,
      };
    default:
      return state;
  }
};

export const loadUserData = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().application;
    dispatch({ type: 'data/fetch-data/pending' });
    try {
      const token = getState().application.token;
      const response = await fetch('/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (json.error) {
        dispatch({
          type: 'data/fetch-data/rejected',
          error: json.error,
        });
      } else {
        const itemsWithBuId = json.map((item) => ({ ...item, buId: userId }));
        dispatch({
          type: 'data/fetch-data/fulfilled',
          payload: itemsWithBuId,
        });
      }
    } catch (error) {
      dispatch({
        type: 'data/fetch-data/rejected',
        error: error.message,
      });
    }
  };
};

export const fetchDataById = ({ id }) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'byId/data/pending' });
    try {
      const token = getState().application.token;
      const response = await fetch(`/data/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: 'byId/data/rejected',
          error: 'При запросе на сервер произошла ошибка',
        });
      } else {
        dispatch({ type: 'byId/data/fulfilled', payload: json });
      }
    } catch (e) {
      dispatch({ type: 'byId/data/rejected', error: e.toString() });
    }
  };
};

export const postData = ({ name, image, age, gender }) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'create/data/pending' });
    try {
      const token = getState().application.token;
      const userId = getState().application.userId;
      const state = getState();

      const response = await fetch('/data', {
        method: 'POST',
        body: JSON.stringify({
          name,
          image: state.gallery.image,
          age,
          gender,
          user: userId,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'create/data/fulfilled', payload: json });
      } else {
        dispatch({ type: 'create/data/rejected', error: json.error });
      }
    } catch (error) {
      dispatch({ type: 'create/data/rejected', error: error.toString() });
    }
  };
};

export const deleteData = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'data/delete/fetch/pending' });
    try {
      await fetch(`/data/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'data/delete/fetch/fulfilled', payload: id });
    } catch (e) {
      dispatch({ type: 'data/delete/fetch/rejected' });
    }
  };
};

export const addImage = (e) => {
  return async (dispatch) => {
    dispatch({ type: 'service/image/pending' });

    const { files } = e.target;
    const data = new FormData();
    data.append('image', files[0]);

    const response = await fetch('/data/upload/image', {
      method: 'POST',
      body: data,
    });

    const json = await response.json();

    dispatch({
      type: 'service/image/fulfilled',
      payload: json,
    });
  };
};
