## Explanation of Development Methodology

All of the front end is in React, using JavaScript. Everything 3D is handled by react-three-fiber, a library that implements Three.js (a 3D package) in React components. We import the model as a GLTF. GLTF is a 3D model file format optimized for the web that can also include information like colors, lighting, animations, and camera positions. We had a bunch of initial issues here; loading is poorly documented and we began by experimenting with the JSON loader (heavier).

Animations are handled within Dolly.jsx. By being in the same react-three-fiber <canvas> element as our loaded GLTF, Dolly has access to the camera object. We use useFrame() within Dolly to change the camera position. useFrame gives us a camera object and a clock; various implementations have used each differently.

The first implementation of something resembling the current would log the time to Redux state every time it changed. 

![Diagram of stuff in state](docs/development methodology/all-in-state.svg)

This is a diagram of how the first version of this worked; changes to the state would actually take place within the reducer, but I am showing them this way because I think it is more logical.

A brief explainer on Redux:
- Redux is a state management framework. It persists some state across multiple React components by wrapping them with a <Provider>. It will refresh all of the components when state updates. Usually there is a Container within the provider also that will connect two functions, mapStateToProps (which passes state down to components through props) and mapDispatchToProps (which does the same, but with action creator functions) using react-redux's "connect".
- Redux has a somewhat bizarre way of changing state. State is immutable; whenever we want to change state, we have to construct a new state object from scratch and return it. This is done within functions called "reducers". Reducers take in "actions" and use their information to return new state objects (effectively changing state).
- Actions are generally just JavaScript objects, generally which have a key called type that is something like 'LOG_TIME' or 'ADD_ANIMATION'. They can also carry data which is generally held in a key called "payload."
- Actions are created by methods called action creators. Action creators are typically held in a separate file and are generally just functions that return actions objects.
- In order for actions to make it to a reducer, they need to be "dispatched." We use mapDispatchToProps (see above) to accomplish this and make sure each component has an ability to dispatch actions.

Redux is, essentially, extremely convoluted. 

Because new animations were being added from buttons, they would not have access to the time within state. As such, we would turn the "animationStarted" variable to true and, when useFrame ran next, it would add a start time to the animation. This was quite hack-y and didn't work well.

We abandoned Redux because state updates are too inconsistent and slow to be used for regular position updates. Instead, we swapped to using state just to give Dolly the start/end time/position pairs and it could use this + the current time to use linear interpolation and find a middle position. This was better (because actual animation was handled wholly in useFrame) but still would reload components everytime, meaning it would reload the entire 3D model, which was bad.

Valtio is far lighter weight which is why we are using it, plus it doesn't update each component everytime there is a state change. 

In every solution, we had an algorithm somewhere that would iterate through the animationsInProgress list. Each animation (modeled by the Animation class) has a start time, and end time, and an internal "movement" that describes the distance that needs to be travelled during that interval. Our algorithm would, each time it was called, remove any animations in which the end time had passed (meaning, the animation was over). 

The start position / time we would pass to useFrame would be generated from the time at which the last transition was added and the position the camera that was currently at. The end time/end position is calculated by:
- iterating through the list and finding the animation which will end the soonest
- calculating the amount the camera needs to move by that end time for all of the animations combined; have a function within the animation class that will apply only part of the animation's transition to the position

These do everything! With this stack working, we can just have the next button or any of the navigation buttons add a position (creates an animation that will go from the current point to the desired position) or a movement (will just move in a relative sense, good for looking up/down). 

Valtio allows us to modify state much more easily so the code should be mostly self-explanatory, but this diagram may help:

[!Explanation of using Valtio state](docs/development methodology/use-valtio.svg)