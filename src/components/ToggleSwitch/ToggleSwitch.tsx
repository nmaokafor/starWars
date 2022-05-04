import React from 'react';
import { useCustomContext } from '../../CustomContextProvider';
import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = React.memo(() => {
  const { fetchWithWookiee, setFetchWithWookiee } = useCustomContext();

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFetchWithWookiee(!fetchWithWookiee);
  };
  return (
    <div className="d-flex justify-end align-center mb-8">
      <p className="text-caption mr-8">
        Switch {fetchWithWookiee ? 'back to English' : 'to Wookie'}
      </p>
      <label className={styles.toggle}>
        <input type="checkbox" onChange={handleToggle}></input>
        <span />
      </label>
    </div>
  );
});

export default ToggleSwitch;
