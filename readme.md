# Drives

Author: [Brad Pearson](https://github.com/bradpearson)

Thank you for taking the time to review this document and the **Drives** application that I created per the [Root coding problem statement](https://gist.github.com/dan-manges/1e1854d0704cb9132b74). This is a JavaScript based application that runs in Node.js. This was developed and tested on macOS.

## Getting Started

You will need Node.js version 8.10 or higher to run this application, so install it if you don't already have it.

The application requires just one external dependency to run - [chalk](https://github.com/chalk/chalk). The tarball should contain a populated node_modules folder and chalk should be present, but if not, you can re-populate it via `npm i`.

The tests were created using [Jest](https://jestjs.io/) which is also in node_modules, but if you have issues, just run the trusty old `npm i`.

To run the application, you can run `npm start` which will run the application using the included data file.
If you want to run a different data file you can run the command `node start.js <your input file>`

To enable debug output, you can pass the flag `debug` as the argument after the input file. That would look like:
`node start.js <your input file> debug`

## Running The Tests

To run the tests, just run `npm test`. This will run all of the .spec.js files in the folder which will test the files with the same root name. Jest is setup to create coverage reports which will be populated in the coverage folder in HTML form. Take a peek at them!

## Design Decisions

This was an interesting application to create. Usually, creating a new application means building it within other frameworks and libraries, but I tried to use simply the JavaScript language and the Node.js core libraries. This approach made me think about the application organization by itself, with nothing else to frame it within.

### The First Attempt

I actually wrote this application twice. First by just creating modules and putting functions in them to run small parts of that module's domain. This approach was faster to create but there wasn't a good sense for what parts of the app were really doing what. It was also much harder to test. I scrapped it and tried a different approach.

### The Second Attempt

After writing the app once, I took a day off and thought about the organization that would not only isolate parts of the application for structural reasons, but I wanted to build it so that it was easier to test in isolation and so that other developers that looked at the codebase could quickly [grok](https://en.wikipedia.org/wiki/Grok) the high level parts and mentally create an organization quickly.

## Application Anatomy

The application is organized mainly around [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). While JS classes are simply syntactic sugar over the base protptype system, they allow for a flexible way to associate domains of functionality. JS classes aren't for creating deep taxonomies of objects, but they do provide some of the same traditional OOP class functionality like constructors and instance level state.

### InputHandler

The input handler is a tiny class that's responsible for reading the input file and creating an array with the lines of the input file.

### CommandParser

The command parser takes a set of commands with regex validators and then processes commands that are passed in via `parseLine`. Parseline will validate the command line and return an object with the command name, command data and the original line.

### Driver

This is the representation of a Driver from the data set. This object contains the all of the trip data for that driver and some other metadata.

### DataStore

The data store isn't specific to this application's domain, it's just a high level holder for objects and arrays with a mechanism to run commands on them. I didn't want to tightly couple the data processing to a specific implementation so the data store takes actions as functions to run over data sets that it contains. This allows the actions to be defined close to the entities they operate on.

For example, the Driver.js file contains a few action functions after the class definition that get exported as `driverActions`. These actions can be run on the driver entity set in the data store but they don't have to necessarily be associated with the data store.

This separation of the data organization and the actions that happen on them allow for greater flexibility in managing different types of data. We could add any type of data and create actions that operate on those sets of data.

### logger

The logger is just a simple wrapper over console.log that allows a debug flag to be set that toggles on all calls to`logger.debug`. The module is cached by Node and ends up being a singleton so setting the debugging via a command line flag in the beginning of the application flow will keep it on for any other modules that import the logger and log to it.

### utils

The utils module isn't a class, just an exported function to deal with the time parsing and calculating

## Other Thoughts

- I didn't attempt to optomize the application for very large sets of data or for blazing speed, just to work and to meet the criteria of the spec
- I could have created a report class and externalized the report using some template format, but because it was so simple, using a template string was a single line of code
- I don't currently work in a TDD shop so I don't write a LOT of tests, but by taking a TDD approach to this app, I actually found quite a few errors in running the tests that I probably would have otherwise tried to figure out by running the app and setting breakpoints
- I really enjoyed working with Jest. It seems like a flexible and easy to use testing framework

## Summary

I hope you enjoy reviewing my code and I look forward to hearing your feedback! Thanks agagin!
