# LeanMood Backend ![build_status](https://travis-ci.org/Lemoncode/LeanMoodBackend.svg?branch=master)

LeanMood backend project will be a REST /JSON api, hopefully based on express, mongoose, mongodb.

Right now backend and front end are residing in the same GitHub project, depending on how this evolves we will split them in to two separate projects.


To get backend with data, use the seed files located on ./seeds.

>mongoimport -d leanMoodAccess -c logins --type json --file loginSeed.json --jsonArray
>mongoimport -d leanMood -c trainings --type json --file trainingSeed.json --jsonArray
>mongoimport -d leanMood -c users --type json --file userSeed.json --jsonArray

Use this command on the root folder where the file is placed.

Resources:
# Mongo Lab Arquitecture Guidance(https://blog.mlab.com/2017/05/mongodb-connection-pooling-for-express-applications/)
