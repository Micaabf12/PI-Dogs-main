import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div>
      <nav className={`${styles.titleBar} flex`}>
        <h2 className="special-heading">PI-Individual Dogs</h2>
        <div>
          <Link to="/home">
            <button className={`boton ${styles.linkBtn}`}>Home</button>
          </Link>
          <Link to="/dog">
            <button className={`boton ${styles.linkBtn}`}>Create your own breed</button>
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;