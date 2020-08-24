
## Common description

Twitter-like API on Nest.js


## Для локальной разработки

- Node.js>=v12.13.x

- MySQL>=v5.7.x

 Установить зависимости
```bash
npm i
``` 
 Создать и заполнить .env файл по примеру .env.example 
 
 В MySQL создать соответствующую БД
    
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
 (MYSQL_HOST=mysql1 не менять)

 Собрать и запустить проект
```bash
docker-compose build
docker-compose up
``` 
При необходимости заполнить БД тестовыми данными

Используя docker-compose
```bash
 docker-compose exec app npm run fill-db:prod
``` 

Либо через docker, для этого нужно узнать id контейнера нашего приложения
```bash
docker container ls
``` 
И выполнить команду
```bash
docker container exec -it 0801a4230ec0 npm run fill-db:prod
``` 
где 0801a4230ec0 - id контейнера нашего приложения

## API

В папке /doc располагается postman коллекция(https://www.getpostman.com/) twitter.postman_collection

В ней описаны все актуальные методы 

##### Авторизация
Метод /auth/login возвращает accessToken

Этот параметр нужно передавать во всех запросах в заголовке auth


