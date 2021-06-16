# Netflix and Chill MERN Stack App

## Basic Info

Netflix and Chill is a web app that allows users to see a list of all available Netflix titles and add posts for virtual hangouts to watch certain titles with friends or strangers online.

## Features
1.    View all available current titles with pagination.
2.    Filter titles based on various metrics like Relevance, Date, Length, Rating, and Runtime. 
3.    Search for specific titles by entering phrases in the search bar and all related titles will be displayed. 
4.    View individual movie details by clicking on a title.
5.    Add a 'chiiling' post for a specific title detailing info about the virtual hangout.
6.    View virtual hangouts added by other users.

## Tech
* React for frontend (functional components with Hooks - useState, useEffect, useRef, useHistory, custom Hooks and React Router). 

* Node and Express used for backend, MongoDB for database.

* uNoGS API used with axios to get all titles. 

* Bootstrap, CSS3, and Sass used for styling.

## Online demo

Visit https://netflixandchillreact.herokuapp.com/

## Testing the app locally

* [Clone the repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)

* Run the following command in the root directory: 
 
### `npm run dev`

This should run both the backend server and frontend as well.

## Experience working on this app

Creating the backend with Node and Express was surprisingly straightforward. The real problems arose when I was taking the list of titles from the uNoGS API and trying to display them in a responsive, clean, and dynamic manner. The API endpoints were fairly confusing and a lot of pre-processing before the API call and post-processing after the API call was needed for the app to run in its intended manner. Overall I learned a lot about the MERN stack, custom Hooks, and dealing with complex API calls. 
