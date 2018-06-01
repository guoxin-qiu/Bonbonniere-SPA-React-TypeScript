import * as React from 'react';
import Key from './Key';

export interface Props {
  callOperator: () => void;
  numbers: string[];
  operators: string[];
  setOperator: (value: string) => void;
  updateDisplay: (value: string) => void;
}

function Keypad({
  callOperator,
  numbers,
  operators,
  setOperator,
  updateDisplay
}: Props) {
  const renderedNumbers = numbers.map(num => {
    return (
      <Key
        key={num}
        keyAction={updateDisplay}
        keyType="number-key"
        keyValue={num}
      />
    );
  });
  const renderedOperators = operators.map(oper => {
    return (
      <Key
        key={oper}
        keyAction={setOperator}
        keyType="operator-key"
        keyValue={oper}
      />
    );
  });

  return (
    <div className="keypad-container">
      <div className="numbers-container">{renderedNumbers}</div>
      <div className="operators-container">{renderedOperators}</div>
      <Key keyAction={callOperator} keyType="submit-key" keyValue="=" />
    </div>
  );
}

export default Keypad;
