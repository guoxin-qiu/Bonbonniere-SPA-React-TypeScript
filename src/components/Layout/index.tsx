import * as React from 'react';
import './layout.css';
import NavMenu from './NavMenu';

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <NavMenu />
        </div>
        <div className="col-sm-9">{props.children}</div>
      </div>
    </div>
  );
}
