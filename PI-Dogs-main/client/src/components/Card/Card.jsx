import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({ name, image, temperament, weight, id, life_span}) {
  return (
    <div className="carta">
      <Link className="cardLink" to={`dogs/${id}`}>
        <h3 className="centrar-texto">{name}</h3>
        <div className="grilla">
          <div className="imgContainer">
            <img src={image} alt="dog_image" />
          </div>
          <div>
            <h4>Weight</h4>
            <p>{weight} Kgs</p>
            <h4>Temperament:</h4>
            <p>{temperament}</p>
            <h5>Life_span</h5>
            <p>{life_span} Years</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
