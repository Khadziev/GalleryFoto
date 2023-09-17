const initialState = {
  items: [],
  loading: false,
  error: null,
  removing: false,
  token: null,
};

export const gallery = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'gallery/load/pending':
      return {
        ...state,
        loading: true,
      };
    case 'gallery/load/fulfilled':
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case 'gallery/post/pending':
      return {
        ...state,
        loading: true,
      };
    case 'gallery/post/fulfilled':
      const userId = state.application && state.application.userId;
      const newItem = action.payload;

      if (newItem.user === userId) {
        return {
          ...state,
          loading: false,
          items: [...state.items, newItem],
        };
      } else {
        return state;
      }
    case 'gallery/update/items':
      return {
        ...state,
        items: action.payload,
      };
    case 'gallery/post/rejected':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'remove/gallery/pending':
      return {
        ...state,
        removing: true,
      };
    case 'remove/gallery/fulfilled':
      return {
        ...state,
        removing: false,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case 'remove/gallery/rejected':
      return {
        ...state,
        removing: false,
        error: action.error,
      };
    case 'gallery/likeMeme/fulfilled': {
      return {
        ...state,
        items: state.items.map((item) => {
          if (action.payload.galleryId === item._id) {
            return {
              ...item,
              likes: [...item.likes, action.payload.userId], // Добавляем userId в массив лайков
            };
          }
          return item;
        }),
      };
    }
    case 'gallery/unlikeMeme/fulfilled':
      return {
        ...state,
        items: state.items.map((item) => {
          if (action.payload.galleryId === item._id) {
            return {
              ...item,
              likes: item.likes.filter(
                (userId) => userId !== action.payload.userId
              ), // Удаляем userId из массива лайков
            };
          }
          return item;
        }),
      };

    case 'gallery/sort/option':
      return {
        ...state,
        sortOption: action.payload,
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

export const loadGallery = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'gallery/load/pending' });

    const state = getState();
    const token = state.application.token;

    const response = await fetch('/gallery', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    if (response.ok) {
      const json = await response.json();

      const sortOption = state.gallery.sortOption;

      if (sortOption === 'name') {
        json.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption === 'date') {
        json.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }

      dispatch({
        type: 'gallery/load/fulfilled',
        payload: json,
      });
    } else {
      dispatch({ type: 'gallery/load/rejected' });
    }
  };
};

export const loadGalleryId = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'gallery/item/fetch/pending' });
    try {
      const state = getState();
      const token = state.application.token;

      const response = await fetch(`/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({
          type: 'gallery/item/fetch/fulfilled',
          payload: json,
        });
      } else {
        dispatch({ type: 'gallery/item/fetch/rejected' });
      }
    } catch (error) {
      dispatch({
        type: 'gallery/item/fetch/rejected',
        error: error.toString(),
      });
    }
  };
};

export const postGallery = (data) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'gallery/post/pending' });
    const state = getState();
    const token = localStorage.getItem('token');
    const userId = state.application.userId;

    const response = await fetch('/gallery', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        image: state.gallery.image,
        description: data.description,
        likes: [],
        user: userId,
      }),
    });

    if (response.ok) {
      const json = await response.json();
      dispatch({
        type: 'gallery/post/fulfilled',
        payload: json,
      });
      const updatedState = getState();
      const updatedItems = [...updatedState.gallery.items, json];
      dispatch({
        type: 'gallery/update/items',
        payload: updatedItems,
      });
    } else {
      const error = await response.text();
      dispatch({
        type: 'gallery/post/rejected',
        payload: error,
      });
    }
  };
};

export const addImage = (e) => {
  return async (dispatch) => {
    dispatch({ type: 'service/image/pending' });

    const { files } = e.target;
    const data = new FormData();
    data.append('image', files[0]);

    const response = await fetch('/gallery/upload/image', {
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

export const deleteGallery = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'remove/gallery/pending' });

    try {
      const state = getState();
      const response = await fetch(`/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response.ok) {
        dispatch({ type: 'remove/gallery/fulfilled', payload: id });
      } else {
        const error = await response.json();
        dispatch({
          type: 'remove/gallery/rejected',
          error:
            error.message ||
            alert(
              'Этот пост добавил другой пользователь вы не можите его удалить'
            ),
        });
      }
    } catch (error) {
      dispatch({
        type: 'remove/gallery/rejected',
        error: error.message || 'Произошла ошибка при удалении галереи',
      });
    }
  };
};

export const likeMeme = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/gallery/likes/${id}`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();

    if (json.status) {
      dispatch({ type: 'gallery/likeMeme/fulfilled', payload: json });
    } else {
      dispatch({ type: 'gallery/unlikeMeme/fulfilled', payload: json });
    }
  } catch (e) {
    dispatch({ type: 'gallery/likeMeme/rejected', error: e.toString() });
  }
};
