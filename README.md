# FilmonAhri API

## Overview

<table>
  <tr>
    <td>
      <img src="Logo.png" width="150px" alt="FilmonAhri API Logo">
    </td>
    <td>
      <p>FilmonAhri API is a REST API developed in Javascript with Node.js and Hapi.js. It is a simple API that allows you to manage films and users, 
        with the possibility to favorite a film. It also allows you to manage the users and their roles.</p>
    </td>
  </tr>
</table>

## Table of Contents

- [Overview](#overview)
- [Table of Contents](#table-of-contents)
- [Features](#features)
    - [Films](#films)
    - [Users](#users)
    - [Favorites](#favorites)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Contribution](#contribution)
- [License](#license)

## Features

### Films

- **Get all films** : Get all films from the API
- **Get film by id** : Get a film by its id
- **Create film** : Create a film
- **Update film** : Update a film
- **Delete film** : Delete a film
- **Get CSV of films** : Receive a CSV file of all films by email

### Users

- **Get all users** : Get all users from the API
- **Get user by id** : Get a user by its id
- **Create user** : Create a user
- **Update user** : Update a user
- **Delete user** : Delete a user
- **Login** : Login a user

### Favorites

- **Get all favorites** : Get all favorites for the logged user
- **Add favorite** : Add a film to the favorites of the logged user
- **Remove favorite** : Remove a film from the favorites of the logged user

## Getting Started

### Prerequisites

- **Docker** : ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

You need Docker to run the project, you can download it [here](https://www.docker.com/get-started)

### Installation

1. clone the repository
    ```bash
    git clone https://github.com/paul-rezzonico/filmonahri.git
    ```

2. > ⚠️ **Before running the project, you need to create a .env file in the `mailer-service` folder with the following content:**
    > ```bash
    > # .env
    > MAIL_HOST=smtp.ethereal.email
    > MAIL_PORT=587
    > MAIL_USER=your_email
    > MAIL_PASS=your_password
    > ```

3. run docker-compose
    ```bash
    docker-compose up -d
    ```

4. OPTIONAL: you can run seeders to populate the database if you want, but DO IT BEFORE CALLING ANY POST ROUTE
    ```bash
    docker exec -it api npx knex seed:run
    ```

5. You can now access the API swagger documentation at http://localhost:3000/documentation

## Technologies Used

- **Node.js** : ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
- **Hapi.js** : ![Hapi.js](https://img.shields.io/badge/Hapi.js-F2B440?style=flat&logo=hapi.js&logoColor=white)
- **MySQL** : ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
- **Docker** : ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
- **JWT** : ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white)
- **Knex** : ![Knex](https://img.shields.io/badge/Knex-000000?style=flat&logo=knex&logoColor=white)
- **Joi** : ![Joi](https://img.shields.io/badge/Joi-F15B2A?style=flat&logo=joi&logoColor=white)
- **Nodemailer** : ![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=flat&logo=nodemailer&logoColor=white)
- **Swagger** : ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)
- **Eslint** : ![Eslint](https://img.shields.io/badge/Eslint-4B32C3?style=flat&logo=eslint&logoColor=white)
- **RabbitMQ** : ![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=flat&logo=rabbitmq&logoColor=white)
- **Jest** : ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)

## Contribution

This project is not actually open to contribution.

## License

This project is under MIT license - see the LICENSE.md file for details.

---

Thank you for reading so far
