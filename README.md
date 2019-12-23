
## Common description

Twitter-like api


## Для локальной разработки

 Установить зависмости
```bash
npm i
``` 
 Создать и заполнить .env файл по примеру .env.example 

 Запустить сервис
```bash
npm run start:dev
``` 
 При необходимости заполнить БД тестовыми данными
```bash
npm run fill-db
``` 

## Для запуска в контейнере (Docker)
Создать и заполнить .env файл по примеру .env.example
 (MYSQL_HOST=mysql1 оставить также, иначе может не работать)

 Выполнить команду
```bash
docker compose up
``` 
При необходимости заполнить БД тестовыми данными, 
для этого нужно зайти в контейнер и выполнить команду  
```bash
npm run fill-db:prod
``` 

## API

В корне проекта раполагается postman(https://www.getpostman.com/) коллекция  
twitter.postman_collection

##### Авторизация
Метод /auth/login возвращает accessToken

Этот параметр нужно передавать во всех запросах в заголовке auth


