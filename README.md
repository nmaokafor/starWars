# About this Project

This project was built with **_React_**, **_Typescript_** and **_Sass_** for UI Components.

State management was handled with **_Context Api_** and React hooks.

Data Fetching was handled using **_[React-Query](https://react-query.tanstack.com/)_** library.

The base url for all the api calls made in this project is https://swapi.dev/api/

#### **The goals are**

1. To create an app protected by username and password
2. To allow users search through the following collections: /people, /planets, /species.
3. To display the search results in a bar chart showing comparisons between different datasets.
4. Allow users to fetch with wookiee encoding.

### **Implementation method and why**

During the planning/design stage of this project, it was observed there is no endpoint to do a global search on all the collections at once. It was also observed that the data is paginated by default, hence each collection returns a maximum of 10 records at a time. This presented two options:

1. To recursively query all 3 collections at once and display results for the different collections at the same time in the bar chart OR to display 3 different barcharts with data for each collection.
2. To give users an option to choose which collection to query. A recursive call is made to get all the values, and the barchart only displays results for one collection at a time.

I chose to implement usning **Option 2** for the following reasons:

1. Recursively querying the 3 collections at a time was bound to get very expensive and possibly give room for errors.
2. Displaying the result for all 3 at once did not make sense because a bar chart is supposed to be a graphical collection of similar sets of data. Each collection has different fields that needs to be visualized (e.g height for People collection, population for Planets collection and Average Height for Species).
3. Still on results visualization, there is also the issue where the range between the different fields are very high, hence the barchart doesn't display useful data. E.g population of planets returns 2,000,000 while height returns 172; this scenario results in the height bars looking non-existent.
4. For a better user experience, it also makes sense to separate each search for better understanding and an overall clean experience.
5. On the side of development, manipulating the data between those 3 collections (with different fields names) and wookiee collections (also with different field names) became too complicated.

### **Code Gotchas**

As with every generic api, there were some unforseen issues. The most notable being that the Wookie collection returns a string value, which when converted to JSON is **invalid**. The invalid part of the string text is a field which refers to `null`.
As a first line of solution, this was handled using a global replace for the `whhuanan` value and no recursive call.

# Getting Started with this Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Starting up this application

Clone this repository into your local directory using the git clone link at the top right of the page e.g git clone https://username@bitbucket.org/pvh-assignment/assignment-nmaokafo.git

After cloning this app, change directory into the project directory using this command

### `cd assignment-nmaokafo`

Once inside the project directory install all packages using

### `npm install`

this will create a node_modules folder in the root of the application.

Now to launch the app, you can run:

### `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Happy searching.

# Additional Information

To build the application, use this command

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
