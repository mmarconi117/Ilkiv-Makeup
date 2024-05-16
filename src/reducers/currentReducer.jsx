const initialState = {
    currentImageIndex: 0,
  };

  const currentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURRENT_IMAGE_INDEX':
        return {
          ...state,
          currentImageIndex: action.payload,
        };
      default:
        return state;
    }
  };

  export default currentReducer;
