const INITIAL_STATE = {
    fromCurrency:null,
    toCurrency:null
  };
  
  export function currencyData(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'from_currency':
        return {
          ...state,
          fromCurrency: action.payload,
        };
     
      case "to_currency":
        return {
          ...state,
          toCurrency: action.payload,
        };
      default:
        return state;
    }
  }