import React from 'react';

import styles from './NotFound.module.css';
import notfound from './images/notfound.png';

export default function NotFound() {
  return (
    <div>
      <div className=" centrar-texto">
        <h2>Ruta no encontrada</h2>
        <img className={styles.img} src={notfound} alt="" />
      </div>
    </div>
  );
}