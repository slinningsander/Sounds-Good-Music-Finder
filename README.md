# Sounds Good v0.1

## Description

Sounds Good is a web application that allows you to search for different artists, albums, and songs and view details about them. It should also allow you to look at and post comments (not yet implemented).

## Installation

The project is fully functional [here](http://it2810-23.idi.ntnu.no/project2).

If you for some reason want to use the application locally you can follow these steps:

Navigate to the Sounds-Good folder like this:

    cd Sounds-Good

Then run:

    npm install

Then finally to run the project:

    npm run dev

This will run the project locally on localhost.

**Note:** This will also use the backend that is hosted on the server. To use a local backend you have to change the ApolloClient URI in main.tsx to localhost, and start the backend manually:

    cd Sounds-Good-Backend

    node index

## Usage

You can now search for artists, albums and songs and view details about them.

## Roadmap

- _V0.1_

  Date: 11. October

  Description: Should only be a visual representation of how we think the project should look. No backend.

- _V1.0_

  Date: 8. November

  Description: Get the app fully functional with a working database and backend connected.

- _V1.1_

  Date: 22. November

  Description: Improve the app and add other important things such as web accessibility and make the code more sustainable.

## Dataset

We got our dataset from last.fm. We have taken data from the 150 most popular artists, their top 5 albums and all the songs on those albums. Our dataset is big enough so that search functionality is a natural part of our application.

## Database

Since we already were going to use GraphQL instead of REST, we chose to make a Neo4j database. The reason for this is that GraphQL naturally supports graph databases like Neo4j. By choosing this database we avoid coding our own resolvers, and thus save a lot of time.

## Sorting and filtering

We have created a search where you first choose what category you want to search. Either artists, albums or songs. When searching for artists you have the ability to further filter the search by amount of listeners, which in reality means their popularity. When searching for albums you have the ability to filter by multiple tags. These tags are user-generated in the dataset, so some tags might only apply to one album. When searching for songs you can further filter by the duration of the song.

## Components

We have used [MUI](https://mui.com) to create some of the more complex components such as the navbar. For simple components, or components where we want to be more in control we make our own using just tsx and css.

## Global state management

We have chosen Redux for our global state management. We have not yet put it to use, but we will in the future.

## Web Accessibility

Web accessibility is an important aspect of web development, because it allows everyone regardless of who they are to use your application. We have chosen to demonstrate the most relevant aspects of web accessibility in our app. To help us discover accessibility errors we have used a Google Chrome extension called [Wave](https://wave.webaim.org/).

Wave showed us that our constrast on the 'Show more' button was too low when we have white button text:

![Image showing constrast too low](/Sounds-Good/src/assets/Screenshot%202023-11-20%20at%2011.24.56.png)

When we changed the text color to white, it is clear that the button is much more legible. Wave also doesn't complain anymore:

![Image showing new button](/Sounds-Good/src/assets/Screenshot%202023-11-20%20at%2011.11.38.png)

There is however some things that Wave can't check for such as keyboard accessibility. WCAG guideline 2.1 states: Make all functionality available from a keyboard. We had to check this manually. A lot of our components were wrapped in HTML div tags with onclick functions which made them work with a mouse, but not when navigating the page with a keyboard. We have now replaced a lot of divs with Link components from react-router-dom, which makes them keyboard accessible.

Here is a complete list of what relevant WCAG guidelines we have followed and a short description of how we followed them. (Note that some guidelines do not apply due too their irrelevancy. E.g. guidelines related to video content)

### Principle 1: Perceivable

- #### Guideline 1.1 Text Alternatives
  We have quite a lot of images of album covers on our website. All of them have been given an alt-text.
  <!-- - #### Guideline 1.3 Adaptable
    The content of the website can be viewed horisontally (such as on a laptop) or vertically (mobile device). We have also achieved adaptability by concious coding of headings and such. -->
- #### Guideline 1.4 Distinguishable
  We have achieved this guidline by the use of sufficient contrast. Making it easy to distinguish the foreground from the background.

### Principle 2: Operable

- #### Guideline 2.1 Keyboard Accessible
  All functionality on the website is accessible through the keyboard. Mainly by using the tabulator, but also the arrow buttons and spacebar to select between options in radio buttons and drop-down menus.

### Principle 3: Understandable

- #### Guideline 3.1 Readable
  The language of the page (english) is specified in index.html

### Principle 4: Robust

- #### Guideline 4.1 Compatible
  We have used ESLint to ensure that our code is free from errors. This is to ensure robustness and compatibility with most standard browsers.

## Discussion

For _V1.0_ we have set up the database, deployed the backend and further developed the frontend. We have generated a dataset by making API calls to the last.fm open API. From this we got JSON data, which we generated a graphDB with nodes and relations.

The webpage is still centered around the homepage. Here it is possible to search for either artist, album or track. There is a filter which configurates search category that can be picked both before and after search. It is also possible to filter on tracks by duration in seconds. There is also functionality to sort search result either ascending or descending alphabeticaly.

We wanted to be able to filter on all three search-categories(artist, album and track), but we had alot of issues dealing with MaterialUI components and the graphQL query language, and were only able to filter the track category by duration. We have filter components in FilterComponent -> subcomponent mostly done and will develope these further.

All in all, we have a large dataset and there is a lot of database content to view on the site.
