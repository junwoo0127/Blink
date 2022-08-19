export const addLiar = (liar) => ({ type: "ADD", liar });

const initialState = {
  liarArray: [],
};
const selectedLiar = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.liar];
    default:
      return state;
  }
};

export default selectedLiar;
