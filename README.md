### Geting started ####
* install node.js
* type _npm istall_ in _terminal_ in _ClientApp_ folder using VS Code
* type _update-database_ in _Package Manager Console_ using Visual Studio
* run a project
* admin login: admin@gmail.com / adminadmin

#### Libraries used ####

* Autofac
* AutoMapper
* Entity Framework Core
* LINQ
* NgRx

#### Presentation ####

* the project is based on multi-layered architecture: __Data Access__, __Business Logic__, __Presentation__ layers
* Autofac container and AutoMapper configuration were moved to Configuration Folder
* Used depedency injection
* Deleting and adding (in short url tab) urls is only allowed for authorised users 
* Avaible email, password, url validations
* Url shortenner algorithm is located in Helpers folder
* DataBase structure was build by code first 
* Used repository pattern
* Added important exceptions
* All request to DB are asynchronous
* DataBase relationship:
* * User - Url => 1 - Many
