## Technologies for Public Drawing

---

**Objective:** Keep track of useful resources for learning / reference on relevant technologies for the pubic drawing project.
<br>
**We are thinking about:**

- exploring web dev as a way of drawing
- how to expand the approach of architectural drawing + adapt it to a new medium
- better ways to draw entities responsible for the public realm

---

## Displaying 3D Models

We are trying to import a JSON output from Rhino into a react-three-fiber scene. Three.js has [ObjectLoader](https://threejs.org/docs/#api/en/loaders/ObjectLoader), which allows for this. Of note here is that this is distinct from [OBJLoader](https://threejs.org/docs/#examples/en/loaders/OBJLoader) which is for .obj files. 

A few ideas I saw:
- [This](https://stackoverflow.com/questions/56568535/objloader-with-react-three-parcel-and-react-three-fiber) StackOverflow post using OBJLoader, which I tried to tweak to use ObjectLoader but didn't work. [Here](https://stackoverflow.com/questions/56568535/objloader-with-react-three-parcel-and-react-three-fiber)'s a near identical example that has a similar issue with finding the model's path. A commenter notes that they could not properly get the model imported; this was also my problem. Of note also is that react-three-fiber's [useRender has been deprecated in favor of the useFrame hook](https://stackoverflow.com/questions/62838327/react-three-fiber-userender-is-not-exported-from-react-three-fiber), which differs from how implementation is described here.
- [This](https://www.ilyameerovich.com/simple-3d-text-meshes-in-three-js/) post which is more generally about 3D text meshes in Three.js w/ R3F, but which imports a font file via JSON; I didn't get much here. 
- Many of the posts I saw use [glTF format](https://discoverthreejs.com/book/first-steps/load-models/) which appears more modern than JSON, using [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) within R3F/Three.js instead. I tried playing with examples of this (it seems more supported/common) by downloading [sample models from glTF](https://github.com/KhronosGroup/glTF-Sample-Models) to test importing, but also couldn't figure out how to do this. It's pretty clear that the issue here is actually getting something imported. 
- [This](https://codesandbox.io/s/xvvn4vxqnz?file=/src/index.js:0-997) example I copied almost verbatim to try to get GLTF to display but had no luck. I think this may be worth trying again because I didn't actually use the exact file structure/exact environment that is described; this I will try in the morning. [Here's](https://codesandbox.io/s/react-three-fiber-gltf-loader-animations-vh976?file=/src/Scene.js) another although I think I want one that has controls already implemented. 
- It seems that one of the issues that comes up is fetching the model and whether to wait for it; [here](https://github.com/pmndrs/react-three-fiber/issues/73)'s someone struggling with this on GitHub with GLTFLoader (using the .load function), I also often saw use of React's [<Suspense />](https://reactjs.org/docs/concurrent-mode-suspense.html) component, although it seems this is not well-supported. 

---

### 3D

We're using react-three-fiber, a React addon that uses Threejs, another 3D library.

react-three-fiber:

- [Animation and 3D in react-three-fiber](https://www.youtube.com/watch?v=1rP3nNY2hTo&t=4066s)

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

Also trying to learn about JavaScript promises for API calls. The Three.js fundamentals tutorial linked some stuff about about Promises and async/await from the Mozilla Developer Network that I read:

- [Making asynchronous programming easier with async and await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

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

### Annotations

There are a few ways we might approach adding annotations to the project's SVG:

- Using React's createRef or useRef to directly access the SVG and then add directly to it. This presents challenges because SVG manipulation is quite difficult, especially appending additional elements. As such, we might use
- D3.js, a framework for manipulating SVG elements. D3 is not a particularly easy-to-use framework but handles JSON (useful as we translate data into points) but is still several orders of magnitude easier than manipulating the raw SVGs. Of issue here is that D3 itself does not play super nicely with React; both frameworks attempt to manipulate the DOM. One can use the two together but [setup is a bit more involved](https://wattenberger.com/blog/react-and-d3).

The first working solution we used was a node package called react-svg-tooltip. The package basically did exactly what we wanted it to: adds decoration to SVGs that tooltips can be added to. This approach also uses SVGR, which converts SVGs into React Components. I had no idea we were doing this, but some code I found online (importing an svg as a ReactComponent) uses this because SVGR is built into create-react app!

One issue with this is the limit of adding rich content to annotations, because one must interface directly with SVG. In addition, the drawing we use may be a raster image; a solution we choose should not just support SVG.

There's two thoughts here for how to approach this issue.

Firstly, deal with positioning of the tooltip and the tooltip itself together; a library like [react-image-tooltips](https://www.npmjs.com/package/react-image-tooltips/v/1.0.1) would allow for 'hotspots' on images that tooltips would show up on. This said, react-image-tooltips is not a particularly popular or (seemingly) frequently maintained package.

As such, I moved on from this approach, looking at figuring out absolute positioning of React components on images first and dealing with tooltips separately (and with libraries that have more flexibility). Here's where I did some of the research:

- [10 Awesome React Tooltip Components - Morioh](https://morioh.com/p/fddae4cc0dec)
- [61 Best React Tooltip Libraries](https://openbase.com/categories/js/best-react-tooltip-libraries)

After some brief research, the most stylistically and feature-rich example looked like Tippy.js (based on Popper.js), which has been implemented in React as [react-tippy](https://tvkhoa.github.io/testlib/). This has more functionality than react-svg-tooltip (mostly styling) and while large popout tooltips are not already supported, one can add custom HTML to any tooltip, including features to make it interactive; the site provides documentation for adding a form element to a tooltip, for example.

The issue here is positioning, which is not easily solvable; it is very difficult to set left and top properties within styling programmatically (played around with this for awhile without success) and, more than this, to get this to scale proportionally with an SVG and to be responsive to different viewport sizes.

Regardless of how we annotate, animating and scaling an SVG with React is difficult; the [best solution I found](https://codepen.io/sdras/pen/VjvGJM) that scales/moves around/tours an SVG uses plain HTML/CSS/JavaScript; their [demo](https://codepen.io/sdras/pen/VjvGJM) is almost exactly what we want, but my sense is that this would be complicated by React's manipulation of the DOM. This said, React serves an important purpose, if we are going to manipulate state in the future.

Amidst all of this confusion, I messaged the developers at [CHIPS](https://chips.nyc/), the design and development studio responsible for the [MET Kids installation](https://www.metmuseum.org/art/online-features/metkids/explore) we used as reference. To paraphrase from their email: they apparently used a piece of software called [MapTiler Desktop](https://www.maptiler.com/) that converted the JPG into a many-layered set of files that they integrated into mapping software; they used coordinates, tooltips, and info windows; none of this changed with zooming and was all responsive! MapTiler apparently can generate HTML in a few formats (Leaflet, OpenLayers, and Mapbox).

---
