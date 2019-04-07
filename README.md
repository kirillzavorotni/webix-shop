#XBShop#

1) npm install
2) composer install
3) Create db
4) create .env file like .env.example and add db name, pass, host
5) php artisan key:generate - generate key(если нужно)
6) php artisan migrate (create tables in db)
7) php artisan db:seed (fill tables in db)
8) change url variable in sources/models/serverUrl.js for corect url
9) npm run build (create codebase folder with final bundle)
10) open root public folder in browser(example: http://localhost:8000/webix-shop/public/), create accaunt in app (default you create accaunt with user role) App include two user role: - User, - Admin
11) To change user role you need to create sql request in created database:
    -> UPDATE `users_roles` SET `role_id` = '1' WHERE `users_roles`.`id` = 1;
(first created user will get Admin user role)
