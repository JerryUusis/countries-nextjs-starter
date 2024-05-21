# Countries application

## Overview

This project is a web application built with React.js and Material-UI to explore countries around the world. Users can search for their different destinations, discover information such as languages, currencies, and population, and save countries they have visited.

This project is a end assignment of React Advanced course in Business College Helsinki. It's built and refactored on top of this [template](https://github.com/martin-holland/countries-nextjs-starter).

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=JerryUusis_countries-nextjs-starter&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=JerryUusis_countries-nextjs-starter)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=JerryUusis_countries-nextjs-starter&metric=bugs)](https://sonarcloud.io/summary/new_code?id=JerryUusis_countries-nextjs-starter)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=JerryUusis_countries-nextjs-starter&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=JerryUusis_countries-nextjs-starter)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=JerryUusis_countries-nextjs-starter&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=JerryUusis_countries-nextjs-starter)

## Features

- Search for countries by name.
- View detailed information about each country, including its flag, official name, languages, currencies, and population.
- Responsive design for usage on various screen sizes.
- User authentication
- Users can add visited countries and they get stored in the database

Data on the page is being fetched from [Open Weather API](https://openweathermap.org/) and [REST Countries](https://restcountries.com/)

## Technologies used

- React + Vite
- TypeScript
- React Router
- Axios
- Material-UI
- Firebase
- Redux Toolkit

## What I Learned from this project?

### TypeScript

- **TypeScript Integration**: Initially, I built the project with Vite and JavaScript. However, I decided to refactor it using TypeScript. This transition was incredibly valuable as it taught me how to configure and use TypeScript with the technologies deployed in the project.

### Material UI

- **UI Refactoring**: The project was initially written with Bootstrap but decided to switch to Material UI. Material UI helped me create a "starndard" and cohesive look for the app, and I enjoyed working with its extensive set of components.

### Firebase SDKs

- **Firebase Basics**: This was my first deep dive into Firebase, and I learned a lot about database management and authentication. Using Firebase SDKs, I was able to set up real-time database interactions and secure user login systems.

### Advanced State management

- **Redux Toolkit**: Working with Redux Toolkit was a game-changer for me. It made managing the app's state so much easier and more efficient. Although this application is pretty simple, I can see how it can save a lot of work from prop drilling in a more complex application.

## Setup and usage

You can go check the page live in [here](https://willowy-parfait-1cc23c.netlify.app)

or you can clone the project. Run these commands in your terminal:

1. **Clone the project**

```bash
git clone https://github.com/JerryUusis/countries-nextjs-starter.git
```

2. **Install dependencies**. Navigate to the project folder and run the following command to install the necessary dependencies:

```bash
npm install
```

3. **Run the development server**. Start the development server by running:

```bash
npm run dev
```

This will launch the application on your local machine. By default, you can access it at localhost:5173 in your web browser.

## Screenshots

### Desktop

<img width="1440" alt="Screenshot 2024-03-17 at 23 10 12" src="https://github.com/JerryUusis/countries-nextjs-starter/assets/118634468/04460c5d-869b-4b19-a3f3-b244ea8ec666">
<img width="1440" alt="Screenshot 2024-03-17 at 23 36 22" src="https://github.com/JerryUusis/countries-nextjs-starter/assets/118634468/862a4036-5e87-43da-a243-7d57f7c58bf3">

### Mobile

<img width="376" alt="Screenshot 2024-03-17 at 23 35 07" src="https://github.com/JerryUusis/countries-nextjs-starter/assets/118634468/415df449-c895-4279-8c64-cb6518760024">
<img width="377" alt="Screenshot 2024-03-17 at 23 40 05" src="https://github.com/JerryUusis/countries-nextjs-starter/assets/118634468/d8e3443c-e73d-4412-a49a-73f3f060af4d">
