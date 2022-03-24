# m1p9mean-kevin
Heroku URL : https://m1p9mean-kevin.herokuapp.com/

## Setup environnment :
npm install express-generator –g
npm install -g nodemon
npm install cors

## Setup Back-end : Node JS
express m1p9mean-kevin
cd m1p9mean-kevin
npm install

In package.json, add scripts.dev = "nodemon ./bin/www"

## Running Server :
npm run dev

## Setup Front-end : Angular
ng new m1p9mean-kevin-client

ng generate component profiles/client
ng generate component profiles/restaurant
ng generate component profiles/delivery-man
ng generate component profiles/e-kaly

ng generate component pages/login
ng generate component pages/signup
ng generate module pages/login
ng generate module pages/signup

ng generate service services/auth
ng generate service services/base
ng generate service services/storage
ng generate service services/popup

npm install sweetalert2

## Build Client App :
ng build

## Setup database : MongoDB
npm install mongodb --save
In Mongo Atlas , adding IP Address : 0.0.0.0/0 to let all users to use database