# iut-project
#


## Description

This project is a simple example of a project that uses the [IUT](

## Installation

1. clone the repository
```bash
git clone
```

2. run docker-compose
```bash
docker-compose up -d
```

3. BEFORE RUNNING THE PROJECT, YOU NEED TO CREATE A .env FILE IN THE ROOT OF THE PROJECT WITH THE FOLLOWING CONTENT:
```bash
# .env
DB_HOST=database
DB_PORT=3306
DB_DATABASE=laravel
....
```

4. you can run seeders to populate the database if you want, but DO IT BEFORE CALLING ANY POST ROUTE
```bash
docker-compose exec app php artisan db:seed
```

5. you can access the project at http://localhost:3000/documentation

## Usage

You can use the following routes:

- GET /api/v1/user
...

## License
