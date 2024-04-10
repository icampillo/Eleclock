import React, { useState } from 'react';

import './timeCalculator.css';

import coeur from '../res/coeur.png';
import lune from '../res/lune.png';
import soleil from '../res/soleil.png';

const TimeCalculator: React.FC = () => {
  const [birthdate, setBirthdate] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<string>('');
  const [hoursSlept, setHoursSlept] = useState<number | null>(null);
  const [hoursAwake, setHoursAwake] = useState<number | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(event.target.value);
  };

  const calculateTimeElapsed = () => {
    if (!birthdate) {
      setInputError(true);
    }
    else {
      setInputError(false);
      const birthdateObj = new Date(birthdate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - birthdateObj.getTime());

      const hours = Math.floor(diffTime / (1000 * 60 * 60));
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

      setTimeElapsed(`${hours} heures ${minutes} minutes ${seconds} secondes`);

      calculateSleepStats();
    }

  };

  const calculateSleepStats = () => {
    const birthdateObj = new Date(birthdate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birthdateObj.getTime());

    const totalHours = diffTime / (1000 * 60 * 60); // Total des heures écoulées
    const hoursSlept = Math.floor(totalHours * 0.33); // Nombre d'heures passées à dormir (exemple: 8 heures par jour)
    const hoursAwake = Math.floor(totalHours - hoursSlept); // Nombre d'heures éveillées

    setHoursAwake(hoursAwake);
    setHoursSlept(hoursSlept);
  };

  return (
    <div className='lifetime-container'>
      <label htmlFor="birthdate">Date de naissance:</label>
      <input
        type="date"
        id="birthdate"
        className='input-date'
        value={birthdate}
        onChange={handleDateChange}
      />
      <button onClick={calculateTimeElapsed}>Calculer le temps écoulé</button>
      <div className='lifetime'>
        {timeElapsed && (
          <div className='lifetime-content'>
            <img style={{paddingTop:"5px"}} width={"50px"} src={coeur} />
            <p>Temps écoulé depuis votre naissance: <span style={{ color: "green" }}>{timeElapsed}</span></p>
          </div>
        )}
        {hoursSlept !== null && (
          <div className='lifetime-content'>
            <img style={{paddingTop:"5px"}} width={"50px"} src={lune} />
            <p>Nombre d'heures passées à dormir: <span style={{ color: "green" }}>{hoursSlept}</span> heures</p>
          </div>
        )}
        {hoursAwake !== null && (
          <div className='lifetime-content'>
            <img style={{paddingTop:"5px"}} width={"50px"} src={soleil} />
            <p>Nombre d'heures éveillé: <span style={{ color: "green" }}>{hoursAwake}</span> heures</p>
          </div>
        )}
        {inputError && (
          <p style={{ color: 'red' }}>Veuillez entrer une date de naissance valide.</p>
        )}
      </div>
    </div>
  );
};

export default TimeCalculator;