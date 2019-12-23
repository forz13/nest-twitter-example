
## Common description

Twitter-like api


## Для локальной разработки

######Зависимости
-Node.js>=v10.x

-MYSQL>=5.7

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
 (MYSQL_HOST=mysql1 оставить также, иначе может не работать)

 Выполнить команду
```bash
docker-compose up
``` 
При необходимости заполнить БД тестовыми данными

Для этого нужно узнать id контейнера нашего приложения
```bash
docker container ls
``` 
И выполнить команду
```bash
docker container exec -it 0801a4230ec0 npm run fill-db:prod
``` 
где 0801a4230ec0 - id контейнера нашего приложения

## API

В корне проекта располагается postman коллекция(https://www.getpostman.com/)   
twitter.postman_collection

##### Авторизация
Метод /auth/login возвращает accessToken

Этот параметр нужно передавать во всех запросах в заголовке auth


