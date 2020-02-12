import { stat } from "fs";

const reducer = (state = { promoCodes: null, randomPromoCode: "" }, action) => {
  switch (action.type) {
    case "FETCH_ALL_PROMOCODES":
      return {
        ...state,
        promoCodes: action.promoCodes
      };
      case "FETCH_RANDOM_PROMOCODE":
        return {
          ...state,
          randomPromoCode: state.promoCodes[Math.floor(Math.random() * state.promoCodes.length)]
        }
    default:
      return state;
  }
};

export default reducer;
