import * as React from 'react';

export interface Props {
  displayValue: string;
}

function Display({ displayValue }: Props) {
  return (
    <div className="display-container">
      <p className="display-value">{displayValue}</p>
    </div>
  );
}

export default Display;
