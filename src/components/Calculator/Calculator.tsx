import * as React from 'react';

import './Calculator.css';
import Display from './Display';
import Keypad from './Keypad';

export interface CurState {
  displayValue: string;
  numbers: string[];
  operators: string[];
  selectedOperator: string;
  storedValue: string;
}

export default class Calculator extends React.Component<{}, CurState> {
  constructor(props: any) {
    super(props);

    this.state = {
      displayValue: '0',
      numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce'],
      operators: ['/', 'x', '-', '+'],
      selectedOperator: '',
      storedValue: ''
    };

    this.updateDisplay = this.updateDisplay.bind(this);
    this.setOperator = this.setOperator.bind(this);
    this.callOperator = this.callOperator.bind(this);
  }

  public render() {
    const { displayValue, numbers, operators } = this.state;
    return (
      <div className="calculator-container">
        <Display displayValue={displayValue} />
        <Keypad
          callOperator={this.callOperator}
          numbers={numbers}
          operators={operators}
          setOperator={this.setOperator}
          updateDisplay={this.updateDisplay}
        />
      </div>
    );
  }

  public callOperator() {
    let { displayValue, selectedOperator } = this.state;
    const { storedValue } = this.state;
    const updateStoreValue = displayValue;
    let displayValueNum = parseInt(displayValue, 10);
    const storedValueNum = parseInt(storedValue, 10);

    switch (selectedOperator) {
      case '+':
        displayValueNum = storedValueNum + displayValueNum;
        break;
      case '-':
        displayValueNum = storedValueNum - displayValueNum;
        break;
      case 'x':
        displayValueNum = storedValueNum * displayValueNum;
        break;
      case '/':
        displayValueNum = storedValueNum / displayValueNum;
        break;
      default:
        displayValueNum = 0;
    }

    displayValue = displayValueNum.toString();
    selectedOperator = '';
    if (displayValue === 'NaN' || displayValue === 'Infinity') {
      displayValue = '0';
    }
    this.setState({
      displayValue,
      selectedOperator,
      storedValue: updateStoreValue
    });
  }

  public setOperator(value: string) {
    let { displayValue, selectedOperator, storedValue } = this.state;
    if (selectedOperator === '') {
      storedValue = displayValue;
      displayValue = '0';
      selectedOperator = value;
    } else {
      selectedOperator = value;
    }
    this.setState({ displayValue, selectedOperator, storedValue });
  }

  public updateDisplay(value: string) {
    let { displayValue } = this.state;
    if (value === '.' && displayValue.includes('.')) {
      value = '';
    }
    if (value === 'ce') {
      displayValue = displayValue.substring(0, displayValue.length - 1);
      if (displayValue === '') {
        displayValue = '0';
      }
    } else {
      displayValue === '0' ? (displayValue = value) : (displayValue += value);
    }

    this.setState({ displayValue });
  }
}
