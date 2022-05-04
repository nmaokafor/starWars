import React, { useEffect } from 'react';
import { useCustomContext } from '../CustomContextProvider';

const EntitySelector = React.memo(() => {
  const { entityDataToFetch, setEntityDataToFetch } = useCustomContext();

  const handleChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setEntityDataToFetch(value);
  };

  return (
    <select
      className="select-field left-attached"
      value={entityDataToFetch}
      onChange={handleChange}
    >
      <option value="People">People</option>
      <option value="Planets">Planets</option>
      <option value="Species">Species</option>
    </select>
  );
});

export default EntitySelector;
