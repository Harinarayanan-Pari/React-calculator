// import { useState } from "react";
import { useReducer } from "react";
import "./App.css";
import Digibtn from "./Digibtn";
import Operationbtn from "./Operationbtn";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete",
  CHOOSE_OPERATION: "choose_operation",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      // console.log(state.currentOperand)
      return {
        ...state,
        currentOperand: `${state.currentOperand || "a"}${payload.digit}`,
      };

    case ACTIONS.CLEAR:
      return {};

      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null) {
          return state
        }
      
  }
}

function App() {
  
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  console.log(currentOperand)

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand}
          {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      {/* <button className="span-two">AC</button> */}

      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <Digibtn digit="DEL" dispatch={dispatch} />
      <Operationbtn operation="/" dispatch={dispatch} />
      <Digibtn digit="1" dispatch={dispatch} />
      <Digibtn digit="2" dispatch={dispatch} />
      <Digibtn digit="3" dispatch={dispatch} />
      <Operationbtn operation="*" dispatch={dispatch} />
      <Digibtn digit="4" dispatch={dispatch} />
      <Digibtn digit="5" dispatch={dispatch} />
      <Digibtn digit="6" dispatch={dispatch} />
      <Operationbtn operation="-" dispatch={dispatch} />
      <Digibtn digit="7" dispatch={dispatch} />
      <Digibtn digit="8" dispatch={dispatch} />
      <Digibtn digit="9" dispatch={dispatch} />
      <Operationbtn operation="+" dispatch={dispatch} />
      <Digibtn digit="." dispatch={dispatch} />
      <Digibtn digit="0" dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  );
}
export default App;
