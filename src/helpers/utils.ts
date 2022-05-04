type PeopleType = {
  name: string;
  fetchWithWookiee: boolean;
};

type WookiePeopleType = {
  whrascwo: string;
  fetchWithWookiee: boolean;
};

export const convertArrayOfDataToArrayOfNames = (
  data: any,
  fetchWithWookiee: boolean,
) => {
  let finalArrayOfNames: Array<string> = [];

  if (data && !fetchWithWookiee) {
    data?.forEach((result: PeopleType) => {
      return finalArrayOfNames.push(result.name);
    });
  } else if (data && fetchWithWookiee) {
    data?.forEach((result: WookiePeopleType) => {
      return finalArrayOfNames.push(result.whrascwo);
    });
  }

  return finalArrayOfNames;
};

const determineLabelName = (entity: string) => {
  let labelName = ['Height', 'Mass'];

  if (entity === 'People') {
    return labelName;
  } else if (entity === 'Planets') {
    labelName = ['Population', 'Diameter'];
  } else {
    labelName = ['Average Height', 'Average Lifespan'];
  }

  return labelName;
};

const parseDataToInt = (value: string) => {
  const parsedString = parseInt(value) || 0.1;
  return parsedString;
};

export const extractDataForChart = (
  entity: string,
  arrayOfData: any[],
  fetchWithWookiee: boolean,
) => {
  if (entity === 'People') {
    const arrayOfHeights: any[] = [];
    const arrayOfMass: any[] = [];

    if (!fetchWithWookiee) {
      arrayOfData.forEach((data: { height: any; mass: any }) => {
        arrayOfHeights.push(parseDataToInt(data.height));
        arrayOfMass.push(parseDataToInt(data.mass));
      });
    }

    if (fetchWithWookiee) {
      arrayOfData.forEach((data: { acwoahrracao: any; scracc: any }) => {
        arrayOfHeights.push(parseDataToInt(data.acwoahrracao));
        arrayOfMass.push(parseDataToInt(data.scracc));
      });
    }

    return [arrayOfHeights, arrayOfMass];
  } else if (entity === 'Planets') {
    const arrayOfPopulation: any[] = [];
    const arrayOfDiameter: any[] = [];

    if (!fetchWithWookiee) {
      arrayOfData.forEach((data: { population: any; diameter: any }) => {
        arrayOfPopulation.push(parseDataToInt(data.population));
        arrayOfDiameter.push(parseDataToInt(data.diameter));
      });
    }

    if (fetchWithWookiee) {
      arrayOfData.forEach(
        (data: { akooakhuanraaoahoowh: any; waahrascwoaoworc: any }) => {
          arrayOfPopulation.push(parseDataToInt(data.akooakhuanraaoahoowh));
          arrayOfDiameter.push(parseDataToInt(data.waahrascwoaoworc));
        },
      );
    }

    return [arrayOfPopulation, arrayOfDiameter];
  } else {
    const arrayOfAverageHeight: any[] = [];
    const arrayOfArrayLifespan: any[] = [];

    if (!fetchWithWookiee) {
      arrayOfData.forEach(
        (data: { average_height: any; average_lifespan: any }) => {
          arrayOfAverageHeight.push(parseDataToInt(data.average_height));
          arrayOfArrayLifespan.push(parseDataToInt(data.average_lifespan));
        },
      );
    }

    if (fetchWithWookiee) {
      arrayOfData.forEach(
        (data: {
          rahoworcrarrwo_acwoahrracao: any;
          rahoworcrarrwo_anahwwwocakrawh: any;
        }) => {
          arrayOfAverageHeight.push(
            parseDataToInt(data.rahoworcrarrwo_acwoahrracao),
          );
          arrayOfArrayLifespan.push(
            parseDataToInt(data.rahoworcrarrwo_anahwwwocakrawh),
          );
        },
      );
    }

    return [arrayOfAverageHeight, arrayOfArrayLifespan];
  }
};

export const extractBarChartData = (
  arrayOfData: any,
  datasetToFetch: string,
  fetchWithWookiee: boolean,
) => {
  const labels = convertArrayOfDataToArrayOfNames(
    arrayOfData,
    fetchWithWookiee,
  );
  const labelName = determineLabelName(datasetToFetch);
  const chartDataField = extractDataForChart(
    datasetToFetch,
    arrayOfData,
    fetchWithWookiee,
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        id: 1,
        label: labelName[0],
        data: chartDataField[0],
        backgroundColor: '#ffe400',
      },
      {
        id: 2,
        label: labelName[1],
        data: chartDataField[1],
        backgroundColor: 'red',
      },
    ],
  };
  return chartData;
};
