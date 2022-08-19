export const settingGender = (gender) => ({type:"SET", gender});

const initialState = {
    gender :"",
};

const gender_reducer = (state = initialState, action) => {
    switch (action.type){
        case "SET":
            return {
                ...state,
                gender : action.gender};
         default :
            return state;     
    }
};

export default gender_reducer;

