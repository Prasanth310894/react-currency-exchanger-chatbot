export function fromCurrency(formCurr) {
  return (dispatch, getState) => {
    dispatch({
      type: "from_currency",
      payload: formCurr,
    });
  };
}

export function toCurrency(toCurr) {
  return (dispatch, getState) => {
    dispatch({
      type: "to_currency",
      payload: toCurr,
    });
  };
}