# CNA-Cart-Service
* DB produkter i korgen
* Session optional

### Teknologier
* PostgreSQL
* Azure
* REST
* Pool
* Swagger io
* Cors

## Cart Service Endpoint
* Swagger
  *  https://cartserviceem.azurewebsites.net/
* API
  * https://cartserviceem.azurewebsites.net/cart
* Enskild produkt
  * https://cartserviceem.azurewebsites.net/cart/1001


### Teminal kommandon
* npm init 
* node index.js (localhost)
* git commit -m "initial commit"
* git config --global user.email "bromanem@arcada.fi"
* git config --global user.name "emmebroman"

### To-do
* Allow cors i cart
* Checka att de e rätt userid
* Userid finns med i jwt så den behöver int vara me i responsen (ta bort från swagger och rest)
* Ändra product till product_id och så att man kan ha flera products  
