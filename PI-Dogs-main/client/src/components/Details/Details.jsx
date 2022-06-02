import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetails } from '../../redux/actions';
import styles from './Details.module.css';

export default function DogDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(getDogDetails(id));
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.dogDetails);
  console.log(myDog);

  return (
    <div>
      <div className={`contenedor ${styles.detailsContainer}`}>
        <div className="grilla-detalles">
          <div>
            <img className={styles.image} src={myDog.image} alt="perrito" />
          </div>
          <div>
            <h4 className={styles.titulo}>Name:</h4>
            <p className={styles.data}>{myDog.name}</p>
            <h4 className={styles.titulo}>Weight:</h4>
            <p className={styles.data}>{myDog.weight} kgs</p>
            <h4 className={styles.titulo}>Height:</h4>
            <p className={styles.data}>{myDog.height} cms</p>
            <h4 className={styles.titulo}>Life Span:</h4>
            <p className={styles.data}>{myDog.life_span} years</p>
            <h4 className={styles.titulo}>Temperament:</h4>
            <p className={styles.data}>{myDog.temperament}</p>
        
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}
