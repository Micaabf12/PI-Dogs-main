import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import entrada from './images/entrada.png';


const LandingPage = () => {
  return (
    <div className={styles.container}>
      <img src={entrada} className="entrada" alt="" />
      <Link to="/home">
        <button className={styles.enterBtn}>ENTER THE DOGS PAGE</button>
      </Link>
    </div>
  );
};

export default LandingPage;
