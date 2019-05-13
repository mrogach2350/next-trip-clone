## NexTrip Clone

This app reads data from The [Metro Transit Open API](http://svc.metrotransit.org) to display information on Bus Routes, Stops, and Departure Times.

[Hosted with GitHub Pages here](http://www.mrogach.com/next-trip-clone)

### Technologies used in this project: 
1. React
2. React-Router
3. Material-UI
4. Axios
5. Jest & Enzyme
6. GitHub Pages

### Assumptions made during development
1. Majority of Users would be on mobile (App is responsive to to different screens)
2. Users would be anonymous (No login)
3. Routes/Departures displayed are only for the current date, no way to search future dates.

### To Run locally
```
// Clone Project
 git clone https://github.com/mrogach2350/next-trip-clone.git

// Cd into project directory
 cd next-trip-clone

// Install dependencies
 yarn

// Start local server
 yarn start

// Run tests
  yarn test
```
### Future Development
1. Additional `mount` tests for each step in workflow.
2. e2e testing using Cypress.
3. Auto-updating for Live Departure times. 




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
