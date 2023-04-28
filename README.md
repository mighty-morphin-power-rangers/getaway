
# Getaway
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

**Getaway** is the perfect mental health application for anyone looking to improve their emotional wellbeing. With features like mood tracking, affirmation generations, personalized playlists, habit tracking, and support resources, Getaway makes it easy to stay on top of your mental health. Whether you're struggling with anxiety, depression, or just need a little extra support, Getaway is the application for you.

## <h2 id="about-the-project"> :pencil: Getting Started</h2> 
1. Fork down the **mighty-morphin-power-rangers/getaway** repository
2. Clone the forked repository into your local environment
3. Make sure to run **npm install** to download necessary dependencies
```bash 
npm install 
```
5. Create a **.env** file in the root directory for necessary API keys/private information
```bash 
touch .env
```

You will need the following in your **.env** file:
Variable | Description
--------------|--------------
GOOGLE_CLIENT_ID | This is your key from Google O-Auth
GOOGLE_CLIENT_SECRET | This is your secret from Google O-Auth
REACT_APP_CLIENT_URL | This is your server URL
DATABASE_URL | This is your server URL
AFFIRMATIONS_OPENAI_API_KEY | This is your key to use the Open AI API 
GOOGLE_PLACES_API | This is your key to use the Google Places API


## Connecting to MySQL database
Assuming mySQL is configured in your local environment, start the mySQL server:
```bash
# MAC users 
$ mysql.server start

# Window users 
$ sudo service mysql start

```

## Prisma ORM   

If you are unfamiliar with how to get Prisma started, here are the official docs: https://www.prisma.io/docs/reference/api-reference/command-reference

Run **npx prisma studio**, if you want a better user experience viewing tabular data in the DB:
```bash
npx prisma studio
```


## Start Application
Run **npm run dev** to start the server and run the webpack build:
```bash
npm run dev
```
