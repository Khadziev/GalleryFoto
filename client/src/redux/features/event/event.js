const initialState = {
  items: [],
  loading: true,
  error: null,
};


export const event = (state = initialState, action) => {
  switch (action.type) {
    case 'event/load/pending':
      return {
        ...state,
        loading: true,
      };

    case 'event/load/fulfilled':
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case 'create/todos/pending':
      return {
        ...state,
        loading: true,
      };
    case 'create/event/fulfilled':
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    case 'create/event/rejected':
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };

    case 'event/edit/pending':
      return {
        ...state,
        editing: true,
      };
    case 'event/edit/fulfilled':
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
    case 'event/delete/pending':
      return {
        ...state,
        editing: true,
      };
    case 'event/delete/fulfilled':
      return {
        ...state,
        editing: false,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};



export const loadEvent = () => {
  return async (dispatch) => {
    dispatch({ type: 'event/load/pending' });

    const response = await fetch('/event');
    const json = await response.json();

    dispatch({
      type: 'event/load/fulfilled',
      payload: json,
    });
  };
};

export const createEvent = ({ text, id }) => {
  return async (dispatch, useState) => {
    const state = useState();
    dispatch({ type: 'create/event/pending' });
    try {
      const response = await fetch(`/event/${id}`, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const json = await response.json();
      dispatch({ type: 'create/event/fulfilled', payload: json });
    } catch (e) {
      dispatch({ type: 'create/event/rejected', error: e.toString() });
    }
  };
};


export const deleteEvent = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'event/delete/pending' });

    try {
      await fetch(`/event/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'event/delete/fulfilled', payload: id });
    } catch (error) {
      console.error('Failed to delete the event:', error);
    }
  };
};
