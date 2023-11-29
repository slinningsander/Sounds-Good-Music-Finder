# Sounds Good v1.1

## Description

Sounds Good is a web application that allows you to search for different artists, albums, and songs and view details about them. On every song, you can comment and view other users' comments.

## Installation

The project is fully functional [here](http://it2810-23.idi.ntnu.no/project2).

### Start local backend

Navigate to the Sounds-Good folder like this:

```bash
cd Sounds-Good
```

Then run:

```bash
npm install
```

Then finally to run the project:

```bash
npm run dev
```

This will run the project on localhost.

**Note:** This will also use the backend that is hosted on the server.

### Start local backend

First, you have to change line 9 in main.tsx

From this:

```javascript lineos 9
uri: "http://it2810-23.idi.ntnu.no:4000";
```

To this:

```javascript
uri: "http://localhost:4000";
```

Then you have to navigate to the backend folder:

```bash
cd Sounds-Good-Backend
node index
```

## Roadmap

- _V0.1_

  Date: 11. October

  Description: This should only be a visual representation of how we think the project should look. No backend.

- _V1.0_

  Date: 8. November

  Description: Get the app fully functional with a working database and backend connected.

- _V1.1_

  Date: 22. November

  Description: Improve the app and add other important things such as web accessibility and make the code more sustainable.

## Dataset

View our dedicated dataset documentation [here](/Sounds-Good-Backend/dataset-utils/README.md).

## Database

Since we already were going to use GraphQL instead of REST, we chose to make a Neo4j database. The reason for this is that GraphQL naturally supports graph databases like Neo4j. By choosing this database we avoid coding our own resolvers, and thus save a lot of time.

## Sorting and filtering

We have created a search where you first choose what category you want to search. Either artists, albums, or songs. When searching for artists you can further filter the search by amount of listeners, which in reality means their popularity. When searching for albums you can filter by multiple tags. These tags are user-generated in the dataset, so some tags might only apply to one album and some tags might seem obscure. When searching for songs you can further filter by the duration of the song.

### Redux global state management

To pass the filter component output values to the search result components we are using Redux Toolkit. The values are dispatched to the Redux store and retrieved using the selector. In the simplest terms, it works as event listeners and event subscribers.

This way of dealing with states requires some setup, but when this is done it is easier than regular prop drilling to pass state from one component to another.

There are a lot of alternatives to Redux, and some are more suitable for smaller web applications, but we chose Redux because it is well-documented and has a lot of potential if we want to do more with it than we are doing now.

## Components

We have used [MUI](https://mui.com) to create some of the more complex components such as the navbar. For simple components, or components where we want to be more in control we make our own using just tsx and css.

## Web Accessibility

Web accessibility is an important aspect of web development because it allows everyone regardless of who they are to use your application. We have chosen to demonstrate the most relevant aspects of web accessibility in our app. To help us discover accessibility errors we have used a Google Chrome extension called [Wave](https://wave.webaim.org/).

Wave showed us that our contrast on the 'Show more' button was too low when we had white button text:

<img src="Sounds-Good/src/assets/lowcontrast.png" alt="Image showing contrast too low" width="400" height="200" />

When we changed colors, it was clear that the button was much more legible because it had a higher contrast. Wave also doesn't complain anymore:

<img src="Sounds-Good/src/assets/highcontrast.png" alt="Image showing new button" width="300">

Wave also helped with discovering missing form-labels and ARIA-labels. It also helped with discovering heading level skips, which should have been avoided and is now fixed.

There are however some things that Wave can't check for such as keyboard accessibility. WCAG guideline 2.1 states: Make all functionality available from a keyboard. We had to check this manually. A lot of our components were wrapped in HTML div tags with onclick functions which made them work with a mouse, but not when navigating the page with a keyboard. We have now replaced a lot of divs with Link components from react-router-dom, which makes them keyboard accessible.

Here is a complete list of what relevant WCAG guidelines we have followed and a short description of how we followed them. (Note that some guidelines do not apply due to their irrelevancy. E.g. guidelines related to video content)

### Principle 1: Perceivable

- #### Guideline 1.1 Text Alternatives

  We have quite a lot of images of album covers on our website. All of them have been given an alt-text.

- #### Guideline 1.3 Adaptable

  The content of the website can be viewed horizontally (such as on a laptop) or vertically (mobile device). We have also achieved adaptability by conscious coding of headings and such.

- #### Guideline 1.4 Distinguishable
  We have achieved this guideline by the use of sufficient contrast. Making it easy to distinguish the foreground from the background.

### Principle 2: Operable

- #### Guideline 2.1 Keyboard Accessible

  All functionality on the website is accessible through the keyboard. Mainly by using the tabulator, but also the arrow buttons and spacebar to select between options in radio buttons and drop-down menus.

- #### Guideline 2.4 Navigable
  The application has an intuitive focus order that makes sense.

### Principle 3: Understandable

- #### Guideline 3.1 Readable

  The language of the page (English) is specified in index.html

- #### Guideline 3.2 Predictable

  We used to make queries and load content when the input in the search bar changed. We have now made it so content only loads after you have pressed enter or the search button to make our application more predictable.

- #### Guideline 3.3 Input Assistance
  We have made sure to prompt the user with the text "Search..." so that they better understand that the search bar in fact is a search bar and not something else.

### Principle 4: Robust

- #### Guideline 4.1 Compatible
  We have used ESLint to ensure that our code is free from errors. This is to ensure robustness and compatibility with most standard browsers. We also give the users feedback if something goes wrong or their search doesn't yield any results.

## Sustainable web development

Sustainable web development is a topic that is gaining increasing importance. We have chosen to focus on the UN's sustainability goals, 12: Responsible production, and consumption and 13: Climate action. These goals are tightly tied together, as responsible production and consumption will help in taking climate action.

To make our website more sustainable we chose to split up our search into three different categories, namely an artist search, an album search, and a song search. Our original plan was to make it possible to search for everything all at once. However, we let sustainability influence us to choose differently. By splitting up the search into different categories, the query only gets data from one node in the database, making it computationally simpler, using less power, and thus more sustainable.

Previously we did a query on every single keypress in the search. This would cause a lot of data to be sent every keypress and wasn't very good considering sustainability and environmental impact. This will of course sometimes lead to the user not getting any results when searching for something, but we felt that this didn't impact the user experience negatively.

Pagination also plays a big role in sustainable web development. By only retrieving a few pieces of data at a time, the amount of data sent for every search is reduced by a large amount. Less data traffic means that less power is needed, resulting in a more sustainable website.

We have also taken sustainability into account when showing images on our page. All the images are 300x300 px which is a size that we felt was a good balance between having a good quality image while not having excessive image quality. This again goes back to reducing the amount of data that is being transmitted.

Another thing we did was to change our color palette. Dark colors use less energy than light colors, so we decided to go for a darker color palette, to align with our sustainability goals. Here you can see our color palette:

<img src="Sounds-Good/src/assets/colorpalette.png" alt="Image showing color palette" width=400>

## Testing

We have done both end-to-end testing and component and unit testing. E2E testing is the most relevant because it actually tests use cases. The component and unit tests are mostly to see if components render correctly and that functions function as intended.

### E2E testing

We used Cypress to make and execute an automated End-To-End test that would test the functionality found in the application. We decided to have all the tests in one file to make it easier for others to run the test smoothly. An alternative would be to have the tests in separate files that would correspond to different user scenarios.

The testing covers all of our functionality, that being filters, sorting, searching and commenting on songs. We additionally have some testing that makes sure the different pages and components render correctly, given a user action. It should also be noted that we only test alphabetical sorting once, even though it is a recurring feature. This is because any more of those tests would be redundant.

To run the Cypress test, you need to be in the "Sounds-Good" repo and write the following command:

```bash
npm run cypress:open
```

Remember to run this command if you have not done it earlier:

```bash
npm install
```

Once you have run the command to open Cypress, you should be greeted by this window:

<img src="Sounds-Good/src/assets/CypressStartInterface.PNG" alt="Image showing choice between E2E Testing or Component Testing" width=400>

Press the "E2E Testing" option which will lead you further to another screen:

<img src="Sounds-Good/src/assets/CypressChooseBrowser.PNG" alt="Image showing choice between installed browsers" width=400>

Here you can choose which browser you want to run the E2E test on. We strongly advise you to use Firefox, as this browser is going to run the test, with Chrome remaining in a constant refresh loop when running the test. If you change the "baseURL" from this:

```javascript
baseUrl: "http://it2810-23.idi.ntnu.no/project2";
```

to this:

```javascript
baseUrl: 'http://localhost/project2',
```

in "cypress.config.ts", Chrome will also run the test. In that case, remember to run:

```bash
npm run dev
```

Note that for Mac users, the Safari browser will not be recognized. After you have chosen a browser, a new browser window will open with a new interface:

<img src="Sounds-Good/src/assets/CypressChooseSpec.PNG" alt="Image showing the available specs(tests)" width=700>

You will now have to choose which test to run, which in our case is only one. After you have clicked on "E2E.spec.ts", the test will start and you will see the results:

<img src="Sounds-Good/src/assets/CypressTest.PNG" alt="Image showing the test results" width=400>

To close Cypress, you only need to go back to the terminal where you started it and press the keys "CTRL + C".

### Component and unit testing

We have used Vitest and @react-testing-library to do component and unit testing. Each test is found in the same folder as the corresponding component.
To run these tests, write the following command when you are in the Sounds-Good directory:

```
npm test
```

Remember to run this command if you have not done it earlier:

```bash
npm install
```

## Discussion

### Final release

After the last round of feedback, we have made several improvements. We have changed the search functionality so that we search when we press the enter button on the keyboard or the search button on the screen. This was due to two things. First of all, we considered that it was not very sustainable to make a query towards the database every keypress. Secondly, to provide a more predictable page it is not good to have major changes in the page when typing in an input field, according to WCAG and accessibility standards.

Another thing we have done is that we have redesigned the homepage so that the search bar is bigger. This is similar to the way [Google](Google.com) has done it. Making the search bar big encourages the user even more than before to use the search bar. We also moved the filters so that they are possible to show and hide, making the page cleaner.

We have also fixed some small bugs. Most notably we changed it so that the text is white all the time and not only in browsers that use dark mode like before. This ensures that we have good contrast regardless of what browser and color scheme you are using, which is very important for accessibility.

Almost all our states are now handled through Redux. This means that we have removed all prop drilling and the code has become much more concise.

### V1.1

This release contains all the functionality we have planned for during the project. We still had some problems with Material UI components, getting the value output from the filter components. These values were also challenging to pass to our GraphQL queries, as they had to be formatted.

We have implemented Redux global state management for every filter state and realized we should have done this earlier. Our first solution was prop drilling, but this quickly became hard to get an overview of. Centralizing all states into the Redux store and accessing it seems to be simpler. It has to be added that there is a lot of potential in Redux that we are not exploiting.

### V1.0

For _V1.0_ we have set up the database, deployed the backend and further developed the frontend. We have generated a dataset by making API calls to the last.fm open API. From this, we got JSON data, which we generated a graphDB with nodes and relations.

The webpage is still centered around the homepage. Here it is possible to search for either artist, album or track. There is a filter that configures search categories that can be picked both before and after the search. It is also possible to filter tracks by duration in seconds. There is also functionality to sort search results either ascending or descending alphabetically.

We wanted to be able to filter on all three search categories (artist, album and track), but we had a lot of issues dealing with MaterialUI components and the graphQL query language and were only able to filter the track category by duration. We have filter components in FilterComponent -> subcomponent mostly done and will develop these further.

All in all, we have a large dataset and there is a lot of database content to view on the site.
