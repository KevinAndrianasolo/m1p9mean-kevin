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

### Public pages :
ng generate component pages/login
ng generate module pages/login

### Client profile :
ng generate component profiles/client
ng generate module profiles/client --routing
ng generate component profiles/client/signup
ng generate module profiles/client/signup
ng generate component profiles/client/home
ng generate module profiles/client/home
ng generate component profiles/client/restaurants
ng generate module profiles/client/restaurants
ng generate component profiles/client/basket
ng generate module profiles/client/basket
ng generate component profiles/client/orders
ng generate module profiles/client/orders

ng generate component profiles/client/restaurant
ng generate component profiles/client/menu

### Restaurant profile :
ng generate component profiles/restaurant
ng generate module profiles/restaurant --routing
ng generate component profiles/restaurant/home
ng generate module profiles/restaurant/home

ng generate component profiles/restaurant/orders
ng generate component profiles/restaurant/order
ng generate component profiles/restaurant/profit
ng generate component profiles/restaurant/management
ng generate component profiles/restaurant/menu-form




### Delivery man profile :
ng generate component profiles/delivery-man
ng generate module profiles/delivery-man --routing
ng generate component profiles/delivery-man/orders
ng generate component profiles/delivery-man/order


### E-Kaly profile :
ng generate component profiles/e-kaly
ng generate module profiles/e-kaly --routing
ng generate component profiles/e-kaly/home
ng generate module profiles/e-kaly/home
ng generate component profiles/e-kaly/orders
ng generate component profiles/e-kaly/order
ng generate component profiles/e-kaly/profit
ng generate component profiles/e-kaly/management
### Components :
ng generate component components/header
ng generate module components/header

ng generate component components/footer
ng generate module components/footer



ng generate service services/auths/auth
ng generate service services/base
ng generate service services/storage/storage
ng generate service services/popup/popup
ng generate service services/auth-guard/AuthGuard
ng generate service services/basket/basket
ng generate service services/restaurant/restaurant
ng generate service services/menu/menu
ng generate service services/order/order
ng generate service services/api/api
ng generate service services/profit/profit





npm install sweetalert2
npm install --save @fortawesome/fontawesome-free

## Build Client App :
ng build

## Setup database : MongoDB
npm install mongodb --save
In Mongo Atlas , adding IP Address : 0.0.0.0/0 to let all users to use database

mongosh "mongodb+srv://cluster0.mlqtk.mongodb.net/m1p9mean-kevin" --apiVersion 1 --username kevin
Password : 2zt83wSFXTtQaYSg