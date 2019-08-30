#The Knowledge
###An app for making and taking fun quizzes!

####[Live Site](http://theknowledge.surge.sh)

#####Created by [David Linke](https://github.com/davidlinke), [Peter Fuoco](https://github.com/peterfuoco), and [Peter Dillenschneider](https://github.com/pdcoding)

**NOTE: This is the frontend component of this site, the backend component can be found [here](https://github.com/pdcoding/theknowledge-backend).**

![Screenshot of home page](https://i.imgur.com/qCDigGV.png)

## Features

- Account creation and login with authentication
- Logged in users can create quizzes with a variable number of questions and answers
- Logged in users can delete quizzes they have created
- Users can see quizzes to take, sorted by most those most recently created at the top
- Users can take a quiz and see quiz results
- Upon finishing a quiz, the quiz "play" count updates on the backend

**You can see how we tracked this projects' development using Pivotal Tracker [here](https://www.pivotaltracker.com/n/projects/2387552).**

## Technologies Used

- Built on the MERN Stack (MongoDB, Express, React and Node.js)

- Frontend Packages:

  - axios
  - dotenv
  - js-cookie
  - moment
  - react
  - react-dom
  - react-modal
  - react-scripts
  - react-slick
  - slick-carousel

## Future Improvements

- Allow for editing of quizzes
- Allow for quiz results to be calculated in different ways i.e. count correct answers
- Allow logged in users to see only quizzes they have created with a toggle button
- Allow linking to individual quizzes so they can be easily shared

## Difficulties Faced

We originally configured sessions to use cookies, however after we deployed we realized this would not work due to deploying our frontend and backend on different domains. A quick fix was to switch to localStorage for maintaining sessions between page refreshes/reloads. This is not ideal and the backend is not very secure at the moment due to not checking if sessions are valid before creating new quizzes/deleting quizzes. This is definitely something that can be improved upon in the future.
