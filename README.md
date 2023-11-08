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
