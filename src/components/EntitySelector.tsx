import React from 'react';
import { useCustomContext } from '../CustomContextProvider';

const EntitySelector = React.memo(() => {
  const {
    entityDataToFetch,
    setEntityDataToFetch,
    setSubmitButtonClicked,
    setBarChartData,
  } = useCustomContext();

  const handleChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setEntityDataToFetch(value);
    setSubmitButtonClicked(false);
    setBarChartData({
      labels: [],
      datasets: [],
    });
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
