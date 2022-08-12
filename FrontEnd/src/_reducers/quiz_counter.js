export const increaseCount = (count) => ({ type: "INCREASE", count });

const initialState = {
  count: 0,
};

const quiz_counter = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE":
      return {
        ...state,
        count: action.count + 1,
      };
    default:
      return state;
  }
};

export default quiz_counter;
