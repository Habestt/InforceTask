### Geting started ####
* install node.js
* type _npm istall_ in _terminal_ in _ClientApp_ folder using VS Code
* type _update-database_ in _Package Manager Console_ using Visual Studio
* run a project
* admin login: admin@gmail.com / 123456

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
* Used NgRx for saving data to store
* Add (in Short url tab) urls is only allowed for authorised users 
* Users can delete only their own URLs, admin can delete all urls
* Users can view their own URLs on My URLs tab
* Peoples can navigate by short URLs
* Avaible email, password, url validations
* Url shortenner algorithm is located in Helpers folder
* DataBase structure was build by code first 
* Used repository pattern
* Added important exceptions
* All request to DB are asynchronous
* DataBase relationship:
* * User - Url => 1 - Many
