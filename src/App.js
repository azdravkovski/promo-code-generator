import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const randomPromoCode = useSelector(state => state.randomPromoCode)
  const dispatch = useDispatch();

  const fetchPromoCodes = () => {
    return dispatch => {
      fetch("http://localhost:3001/promocodes")
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: "FETCH_ALL_PROMOCODES",
            promoCodes: data.promoCodes
          })
        })
        .catch(error => console.error(error));
    };
  };

  useEffect(() => {
    dispatch(fetchPromoCodes());
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <button className="button-promo" onClick={() => dispatch({ type: "FETCH_RANDOM_PROMOCODE"})}><span>Generate promo code</span></button>
        <p className="field-promo"><span>{randomPromoCode}</span></p>
      </div>
      <p className="credits">built by <a href="https://github.com/azdravkovski">Aleksandar Zdravkovski</a></p>
    </div>
  );
}

export default App;
