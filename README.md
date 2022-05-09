# RaceR
This is RaceR, a [FlickR](https://flickr.com/) clone. </br><br>

Every car enthusiest has some a certain way they want to build their car. With raceR, users are able to find their dream builds or post their own for others to find inspiration for their projects.

# Live Site
[RaceR](https://race-r.herokuapp.com/)


# Index

| [RaceR Wiki](https://github.com/AuDang/RaceR/wiki) | [RaceR DB Schema](https://github.com/AuDang/RaceR/wiki/Database-Schema) | [RaceR Features](https://github.com/AuDang/RaceR/wiki/Features-List) |



# Technologies Used
<img src="https://camo.githubusercontent.com/442c452cb73752bb1914ce03fce2017056d651a2099696b8594ddf5ccc74825e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667" height=40><img src="https://camo.githubusercontent.com/27d0b117da00485c56d69aef0fa310a3f8a07abecc8aa15fa38c8b78526c60ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667" height=40>
<img src="https://camo.githubusercontent.com/2b6b50702c658cdfcf440cef1eb88c7e0e5a16ce0eb6ab8bc933da7697c12213/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656475782f72656475782d6f726967696e616c2e737667" height=40>


# Getting Started
Clone the Repo 

`https://github.com/AuDang/RaceR.git`

Install the dependencies for the backend and frontend folders

`npm install`

Add a .env file in the backend with everything from the .env example

Create a postgresql user and password 

`CREATE USER racer_app WITH PASSWORD 'password' CREATEDB;`

Create a database with what is included in the .env file 

`CREATE DATABASE racer_db WITH OWNER racer_app;`

Use the Sequelize CLI to apply the provided database migrations and seeders

`npx dotenv sequelize db:migrate`

`npx dotenv sequelize db:seed:all`

Start the database by running the command in the frontend and backend folders

`npm start`



