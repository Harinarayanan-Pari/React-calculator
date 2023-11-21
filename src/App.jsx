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
      if (state.overwrite == true)
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          currentOperand: null,
          overwrite: false,
        };
      if (state.currentOperand === null) return state;
      if (state.currentOperand.length === 1)
        return {
          ...state,
          currentOperand: null,
        };
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null)
        return {
          ...state,
          operation: payload.operation,
        };

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: Evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.EVALUATE:
      if (
        state.previousOperand == null ||
        state.currentOperand == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: Evaluate(state),
      };
  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("es-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function Evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseInt(previousOperand);
  const current = parseInt(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let commutation = "";
  switch (operation) {
    case "+":
      commutation = prev + current;
      break;
    case "-":
      commutation = prev - current;
      break;
    case "*":
      commutation = prev * current;
      break;
    case "/":
      commutation = prev / current;
      break;
  }
  return commutation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <>
      <h1>CALSPACE</h1>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperand(previousOperand)}
            {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>

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
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </>
  );
}
export default App;
