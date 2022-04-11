import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  filterDogsBySource,
  filterDogsByTemperament,
  getDogs,
  getTemperaments,
  sortByName,
  sortByWeight,
} from '../../redux/actions';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css';
import notfound from '../NotFound/images/notfound.png';


export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  const allDogsCopy = useSelector((state) => state.allDogs);

  const allTemperaments = useSelector((state) => state.temperaments);






  //paginación
  const [currentPage, setCurrentPage] = useState(1);
  // steamos un estado con nuestra primera pagina y llamamos un setState quq econtrola el número de página
  const [dogsPerPage] = useState(8);

  //eslint-disable-next-line
  const [orderByName, setOrderByName] = useState();
  //eslint-disable-next-line
  const [orderByWeight, setOrderByWeight] = useState();


  const indexOfLastDogOnPage = currentPage * dogsPerPage;
  const indexOfFirstDogOnPage = indexOfLastDogOnPage - dogsPerPage;

  const currentPageDogs = allDogs.slice(indexOfFirstDogOnPage, indexOfLastDogOnPage);

  const paginationChanger = (pageNumber) => {
    setCurrentPage(pageNumber);
  };







  
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  // Filter By Temperaments

  function handleFilterByTemperaments(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
    setCurrentPage(1);
  }

  // Filter By Source

  function handleFilterBySource(e) {
    e.preventDefault();
    dispatch(filterDogsBySource(e.target.value));
  }

  // Sort by Name

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1); //tengo que volver a la pagina uno
    setOrderByName(`${e.target.value}`);
  }

  // Sort by Weight

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setCurrentPage(1);
    setOrderByWeight(`${e.target.value}`);
  }

  return (
    <div>
      <header className={`${styles.filterBar} flex`}>
        <div>
          <select onChange={(e) => handleSortByName(e)} defaultValue="default">
            <option value="default" disabled hidden>
              Sort by Name
            </option>
            <option value="nameAscendant">A to Z</option>
            <option value="nameDescendant">Z to A</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => handleSortByWeight(e)} defaultValue="originalOrder">
            <option value="originalOrder" disabled hidden>
              Sort by Weight
            </option>
            <option value="weightAscendant">Ascendent</option>
            <option value="weightDescendant">Descendent</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => handleFilterByTemperaments(e)} defaultValue="default">
            <option value="default" disabled hidden>
              Select Temperament
            </option>
            <option value="all">All Temperaments</option>
            {allTemperaments &&
              allTemperaments.map((temperament) => (
                <option key={temperament.id}>{temperament.name}</option>
              ))}
          </select>
        </div>
        <div>
          <select onChange={(e) => handleFilterBySource(e)} defaultValue="default">
            <option value="default" disabled hidden>
              Select Source
            </option>
            <option value="all">ALL</option>
            <option value="onlyFromApi">API</option>
            <option value="onlyFromDb">DB</option>
          </select>
        </div>
        <div>
          <SearchBar />
        </div>
      </header>
      <section>
        {!allDogs.length && !allDogsCopy.length && (
          <div className="centrar-texto">
            <p className="special-heading">Loading...</p>
          </div>
        )}
      </section>
      <body className="contenedor">
        {!allDogs.length && allDogsCopy.length > 0 && (
          <div className="centrar-texto">
            <h2>No Dogs Found</h2>
            <img className={styles.imgNotFound} src={notfound} alt="" />
          </div>
        )}
        <div className="grilla">
          {currentPageDogs &&
            currentPageDogs.map((dog) => {
              return (
                <Card
                  id={dog.id}
                  key={dog.id}
                  name={dog.name}
                  image={dog.image}
                  temperament={dog.temperament}
                  weight={dog.weight}
                />
              );
            })}
        </div>
      </body>

      <div>
        {allDogs.length > 0 && (
          <Pagination
            totalAmountOfDogs={allDogs.length}
            dogsPerPage={dogsPerPage}
            paginationChanger={paginationChanger}
            currentPage={currentPage}
          />
        )}
        {!allDogs.length && allDogsCopy.length > 0 && (
          <div className="contenedor centrar-texto">
            <p className={styles.noPagination}>no pagination to show</p>
          </div>
        )}
      </div>
    </div>
  );
}