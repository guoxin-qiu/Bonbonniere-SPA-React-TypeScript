import * as React from 'react';

export interface Props {
  keyAction: (value: string) => void;
  keyType: string;
  keyValue: string;
}

function Key({ keyAction, keyType, keyValue }: Props) {
  return (
    <div
      className={`key-container ${keyType}`}
      onClick={() => {
        keyAction(keyValue);
      }}
    >
      <p className="key-value">{keyValue}</p>
    </div>
  );
}

export default Key;
