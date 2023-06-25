const initialState = {
  newsItem: {}
};

const Reducers = (state = initialState, action: any) => {
  console.log('11111111111111==', action)
  switch (action.type) {
    case 'SET_NEWS':
      console.log('1188888888888811==', action.payload)
      return { ...state, newsItem: action.payload };  
    default:
      return state;
  }
};

export default Reducers;
