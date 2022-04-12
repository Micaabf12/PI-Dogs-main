import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, getTemperaments } from '../../redux/actions';
import styles from './CreateDog.module.css';

//función para validar  lo que el cliente escribe
function inputValidator(input) {
  //objeto auxiliar donde pongo errores
  let inputError = {};
  const inputProps = ['name', 'min_height', 'max_height', 'min_weight', 'max_weight', 'life_span'];
  for (var i = 0; i < inputProps.length; i++) {
    if (!input[inputProps[i]]) {
      inputError[inputProps[i]] = `${inputProps[i]} is required`; //le pido que me  ponga si o si es imput para poder avanzar
    }
  }
  //no permito que haya imputs vacios; ante la nada renderizo  que debe entrar un valor
  //cada error es una propiedad del objeto input error
  if (input.name.trim() === '') {
    inputError.name = 'Must enter a name';
  }
  if (isNaN(Number(input.min_height))) {
    // Si no es numero tiro error
    inputError.min_height = 'min_height should be a number';
  }
  if (isNaN(Number(input.max_height))) {
    //si no es numero tiro error
    inputError.max_height = 'max_height should be a number';
  }
  if (isNaN(Number(input.min_weight))) {
    //si no es numero tiro eror
    inputError.min_weight = 'min_weight should be a number';
  }
  if (isNaN(Number(input.max_weight))) {
    //si no es numero tiro error
    inputError.max_weight = 'max_weight should be a number';
  }
  if (input.min_height && input.min_height <= 0) {
    //si la altura es cero o menos error
    inputError.min_height = 'Min height should be more than zero';
  }
  if (input.max_height && input.max_height > 110) {
    //primero valido si tiene altura maxima si el dinosaurio mide mas de un metro diez tiro error
    inputError.max_height =
      "Make sure it's a dog you are trying to add becasue max-height should be below 110cms";
  }
  if (Number(input.min_height) > Number(input.max_height)) {
    //comparo la altura minima y maxima para que no ponga algo icoherente
    inputError.min_height = 'Min height should be smaller than max height';
  }
  if (input.min_weight && input.min_weight <= 0) {
    //valido si tiene altura maxima y despues
    inputError.min_weight = 'Min weight should be more than zero';
  }
  if (input.max_weight && input.max_weight > 110) {
    //chequeo el peso maximo que pone para que no sea excesivo
    inputError.max_weight =
      "Make sure it's a dog you are trying to add becasue max-weight should be below 100kgs";
  }
  if (Number(input.min_weight) > Number(input.max_weight)) {
    //vuelvo a comparar las alturas maximas y minimas para que no se prdozca la incoherencia
    inputError.min_weight = 'Min weight should be smaller than max weight';
  }
  if (input.life_span && input.life_span < 0) {
    //valido que exista la esperanza de vida y que sea mayor a cero
    inputError.life_span = 'Life span should be a positive number of years';
  }
  if (input.life_span > 23) {
    //chequeo que no ponga al matusalem de los perros
    inputError.life_span = 'Are you sure dogs live that long?';
  }

  return inputError; //retorno el objeto con las propiedades con errores, si no hay errores esta vacio
}

export default function CreateDog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: '',
    min_height: '',
    max_height: '',
    min_weight: '',
    max_weight: '',
    life_span: '',
    temperaments: [],
  });
  // const [temperamentsSelected, setTemperamentsSelected] = useState({});
  const [inputError, setInputError] = useState({});

  function handleTemperamentsSelection(e) {
    e.preventDefault();
    if (!input.temperaments.includes(e.target.value)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
    }
  }

  function handleTemperamentDelete(temperamentClicked) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temperament) => temperament !== temperamentClicked),
    });
  }

  function handleInputChanges(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setInputError(
      inputValidator({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    // console.log(input);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.keys(inputError).length > 0) {
      return alert('Check your form fields');
    }

    var temperamentsId = [];

    if (input.temperaments.length > 0) {
      for (let i = 0; i < input.temperaments.length; i++) {
        var temperamentFound = temperaments.find(
          (temperament) => temperament.name === input.temperaments[i]
        );
        temperamentsId.push(Number(temperamentFound.id));
      }
    }

    const newDog = {
      name: input.name,
      height: input.min_height + ' - ' + input.max_height,
      weight: input.min_weight + ' - ' + input.max_weight,
      life_span: input.life_span,
      temperament: temperamentsId,
    };
    console.log(newDog);
    dispatch(postDog(newDog));

    alert('Your Dog was successfully created');

    setInput({
      name: '',
      min_height: '',
      max_height: '',
      min_weight: '',
      max_weight: '',
      life_span: '',
      temperaments: [],
    });

    navigate('/home');
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <div className="contenedor">
        <div className={`flex ${styles.createDogFlex}`}>
          <h2>Create your own breed</h2>
          <form onSubmit={handleSubmit}>
            <div className={`grilla my-1`}>
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={(e) => handleInputChanges(e)}
                />
              </div>
              {inputError.name && <p>{inputError.name}</p>}
            </div>
            <div className={`grilla my-1`}>
              <div>
                <label>Min Weight: </label>
                <input
                  type="text"
                  value={input.min_weight}
                  name="min_weight"
                  onChange={(e) => handleInputChanges(e)}
                />
              </div>
              {inputError.min_weight && <p>{inputError.min_weight}</p>}
            </div>
            <div className={`grilla my-1`}>
              <div>
                <label>Max Weight: </label>
                <input
                  type="text"
                  value={input.max_weight}
                  name="max_weight"
                  onChange={(e) => handleInputChanges(e)}
                />
              </div>
              {inputError.max_weight && <p>{inputError.max_weight}</p>}
            </div>
            <div className={`grilla my-1`}>
              <div>
                <label>Min. Height: </label>
                <input
                  type="text"
                  value={input.min_height}
                  name="min_height"
                  onChange={(e) => handleInputChanges(e)}
                />
              </div>
              {inputError.min_height && <p>{inputError.min_height}</p>}
            </div>
            <div className={`grilla my-1`}>
              <div>
                <label>Max Height: </label>
                <input
                  type="text"
                  value={input.max_height}
                  name="max_height"
                  onChange={(e) => handleInputChanges(e)}
                />
              </div>
              {inputError.max_height && <p>{inputError.max_height}</p>}
            </div>
            <div className={`grilla my-1`}>
              <div>
                <label>Life Span</label>
                <input
                  type="text"
                  value={input.life_span}
                  name="life_span"
                  onChange={(e) => handleInputChanges(e)}
                />
              </div>
              {inputError.life_span && <p>{inputError.life_span}</p>}
            </div>


            
            <div className={`grilla my-1 ${styles.temperamentsGrid}`}>
              <div>
                <div>
                  <label>Choose Temperaments: </label>
                  <select defaultValue="default" onChange={(e) => handleTemperamentsSelection(e)}>
                    <option value="default" disabled hidden>
                      Select Temperaments
                    </option>
                    {temperaments &&
                      temperaments.map((temperament) => {
                        return (
                          <option key={temperament.id} value={temperament.name}>
                            {temperament.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div>
                  <button
                    className={`boton my-1 ${styles.submitBtn}`}
                    type="submit"
                    disabled={Object.keys(inputError).length > 0 || input.name === ''}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div>
                {input.temperaments.length > 0 &&
                  input.temperaments.map((temperament, id) => {
                    return (
                      <div key={id}>
                        <div className={styles.temperamentCard}>
                          <div className="flex">
                            <p>{temperament}</p>
                            <button
                              className={`${styles.temperamentCardBtn}`}
                              onClick={() => handleTemperamentDelete(temperament)}
                            >
                              x
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
}
