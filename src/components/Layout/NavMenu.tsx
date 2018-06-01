import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function NavMenu() {
  return (
    <div className="main-nav">
      <div className="navbar navbar-inverse">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to={'/'}>
            Bonbonniere
          </Link>
        </div>
        <div className="clearfix" />
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <NavLink exact={true} to={'/'} activeClassName="active">
                <span className="glyphicon glyphicon-home" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink exact={true} to={'/counter'} activeClassName="active">
                <span className="glyphicon glyphicon-education" /> Counter
              </NavLink>
            </li>
            <li>
              <NavLink exact={false} to={'/fetchdata'} activeClassName="active">
                <span className="glyphicon glyphicon-th-list" /> Fetch Data
              </NavLink>
            </li>
            <li>
              <NavLink exact={true} to={'/product'} activeClassName="active">
                <span className="glyphicon glyphicon-th-list" /> Product
              </NavLink>
            </li>
            <li>
              <NavLink exact={true} to={'/calculator'} activeClassName="active">
                <span className="glyphicon glyphicon-th-list" /> Calculator
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
