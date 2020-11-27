# Cierzo

Aplicación web implementada con el stack MEAN para comparar los distritos de Zaragoza por parámetros como conectividad, salario, cultura y demografía. Proyecto para la asignatura Sistemas y tecnologías web, Universidad de Zaragoza

## Tecnologias:

 * Stack MEAN (MongoDB, Express, Angular, Node.js)

## Startup:
VirusFive: git pull && mongod
VirusFive\BackEnd: npm install && npm start
VirusFive\FrontEnd: npm install && ng serve

### Install dependencies:
```
npm install
```

### Run:

```
npm start
```


### Deploy in Heroku:

Directory FrontCierzo:
```
ng build --prod
```


```
git init
git add --all
git commit -m "Commit"

heroku create

heroku local

git push heroku master

heroku open
```

Changes:
```
git add --all
git commit -m "X commit"
git push heroku master
```

clon heroku repository in local:
```
git init
heroku git:remote -a <nameApp>
```
