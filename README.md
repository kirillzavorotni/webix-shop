#XBShop#

1) npm install
2) npm run build (create codebase folder with final bundle)
3) composer install
4) Create db
5) create .env file like .env.example and add db name, pass, host
6) php artisan key:generate - generate key(если нужно)
7) php artisan migrate (create tables in db)
8) php artisan db:seed (fill tables in db)
9) open root public folder in browser, create accaunt in app (default you create accaunt with user role) App include two user role: - User, - Admin
10) To change user role you need to create sql request in created database:
    -> UPDATE `users_roles` SET `role_id` = '1' WHERE `users_roles`.`id` = 1;
(first created user will get Admin user role)
