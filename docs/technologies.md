autoscale: true

## Technologies for Public Drawing

---

**Objective:** Keep track of useful resources for learning / reference on relevant technologies for the pubic drawing project.
<br>
**We are thinking about:**

- exploring web dev as a way of drawing
- how to expand the approach of architectural drawing + adapt it to a new medium
- better ways to draw entities responsible for the public realm

---

### 3D

We're using react-three-fiber, a React addon that uses Threejs, another 3D library.

react-three-fiber:

- [Animation and 3D in react-three-fiber (with Paul Henschel) — Learn With Jason] (https://www.youtube.com/watch?v=1rP3nNY2hTo&t=4066s)

Three.js:

- [Three.js Fundamentals](https://threejsfundamentals.org/)

react-spring:

TODO

---

### General React/JavaScript Concepts

Am trying to familiarize myself with hooks because react-three-fiber heavily uses useFrame and react-spring uses useSpring.

- [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Hooks useState Tutorial](https://www.youtube.com/watch?v=9xhKH43llhU&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=1)
- [React Hooks useEffect Tutorial](https://www.youtube.com/watch?v=j1ZRyw7OtZs&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=2)
- [10 React Hooks Explained // Plus Build your own from Scratch](https://www.youtube.com/watch?v=TNhaISOUy6Q)

JavaScript Promises: TBD

### API Calls

I took freeCodeCamp's [APIs and Microservices](https://www.freecodecamp.org/learn/apis-and-microservices/) certificate to brush up on this stuff, am not 100% done with it. The most useful things here are the Repl.it projects I used to complete the lessons, specifically all of my code for the [Mongo and MongoDB projects](https://replit.com/@lucasgelfond/MongoDB-and-Mongoose) and all of my code for the [Basic Node and Express](https://replit.com/@lucasgelfond/Node-and-Express) modules. I like freeCodeCamp over YouTube videos because it actively evaluates/forces you to debug and apply the concepts. The course admittedly leans more backend than frontend but it is useful context and it feels useful to be at least lightly fluent in how this stuff works.

TODO: Finish remaining three projects. More work on fetching from REST APIs.

---

### Code Styling

We're using [AirBNB's JavaScript Style Guide](https://github.com/airbnb/javascript), enforced by the node package [ESLint](https://eslint.org/docs/user-guide/getting-started) and VS Code autoformatting extension [Prettier](https://prettier.io/).

We chose AirBNB style because (a) it is the most popular/standard, (b) it easily integrates with ESLint and Prettier and (c)Google's guide is more dated, Google-centric, and less compatible with modern frameworks. Idiomatic.js seemed to once be most popular but has fallen out of favor, as have the JQuery and official JavaScript guides (in addition to none being easily supported by ESLint). Here's some resources on how we picked:

- [10 Best JavaScript Style Guides Including Airbnb and Idiomatic](https://noeticforce.com/best-javascript-style-guide-for-maintainable-code)
- [5 JavaScript Style Guides — Including AirBnB, GitHub, & Google](https://codeburst.io/5-javascript-style-guides-including-airbnb-github-google-88cbc6b2b7aa)
- [What JavaScript code style is the most popular](https://hackernoon.com/what-javascript-code-style-is-the-most-popular-5a3f5bec1f6f)
- [Compare the Top 3 Style Guides and Set Them Up With ESLint](https://betterprogramming.pub/comparing-the-top-three-style-guides-and-setting-them-up-with-eslint-98ea0d2fc5b7)
- [5 JavaScript Style Guides That Will Help You Coding like a Pro](https://javascript.plainenglish.io/javascript-style-guides-write-better-code-f74f71318625)
- [JavaScript Style Guides: What are they and which one to use?](https://www.youtube.com/watch?v=UQd-50Pew94)

Here are some resources that we used to set up ESLint/Prettier with the AirBNB style guide:

- [Setup ESLint, Prettier & Airbnb Style Guide in under 2 Minutes](https://www.youtube.com/watch?v=qibrJYImqLU)
- [VSCode ESLint, Prettier & Airbnb Style Guide Setup](https://www.youtube.com/watch?v=SydnKbGc7W8)
- [Improve Your Code With ESLint + VsCode + Airbnb Styleguide](https://www.youtube.com/watch?v=mfGkKlMDfwQ)

This has been a bit bumpy; setting up all of the packages together is tricky. I (Lucas, feel free to reach out if you need help with setting this stuff up) tinkered around with this for awhile and don't remember exactly how I got it all working, although installing from package.json should probably work.

A great (or terrible) feature about ESLint is that it will simply not compile your code if you ignore formatting standards. I've added a few rules in .eslintrc.json to override some stuff that we use/swap it to "warn" (where it will print to the console). I have not been able to get this right. [Here](https://stackoverflow.com/questions/68167196/eslint-no-params-reassign-will-not-override-prettier-vs-code-airbnb-style)'s a StackOverflow post trying to troubleshoot this. Being completely honest I am not 100% sure I configured this whole thing correctly but it works well enough so I'm trying to run with it and slowly debug/iterate on the configuration as stuff goes wrong.

---
