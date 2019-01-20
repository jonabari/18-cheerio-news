# Scrapping News Homework

### How to start the app

In this homework both of us did a Scrapping news site in which you can make notes.

To start this homework please download the `package.json` using `npm start`. To start the app please write `npm start` on your terminal. 

Other requirements to use this app:
To have `mongod` running in a `git bash` window.
Open a visualization of `MongoDB` visualization app, we recommend `Robo 3T`.

### Data Flowing Short explanation

In very short terms this is how the data flows

1. First, we scrape news on the site but it get storage on the `Local Storage`.

    * In `api-routes.js` you can find from line 9 to 27 the function that makes the scrape.

    * We did not do a moongose collection for the news that are scraped because the important ones are the news that actually get saved.

2. Then the `Article.js` makes the collection that we used for the rest of the rest of the design.

    * The endpoints on `api-routes.js` will show all the endpoints that manipulates the rest of the information storage on the MongoDB collection.

3. Aside from that you can see the `html-routes.js` that saves the different structures of the webpage.

    * Don't forget that inside of the `views` folder, inside `layouts` you will see the handlebars with the details.

Please follow our code comments to ensure the functionality of your app!

Att
Alix and Jona