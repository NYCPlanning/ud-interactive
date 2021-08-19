## Explanation of Development Methodology

All of the front end is in React, using JavaScript. Everything 3D is handled by react-three-fiber, a library that implements Three.js (a 3D package) in React components. We import the model as a GLTF. GLTF is a 3D model file format optimized for the web that can also include information like colors, lighting, animations, and camera positions. We had a bunch of initial issues here; loading is poorly documented and we began by experimenting with the JSON loader (heavier).

Animations are handled within Dolly.jsx. By being in the same react-three-fiber <canvas> element as our loaded GLTF, Dolly has access to the camera object. We use useFrame() within Dolly to change the camera position. useFrame gives us a camera object and a clock; various implementations have used each differently.

## Animations

(Note: for one implenentation here, using Rhino positions, we were using lookAt, which is a property of the camera that has x, y, and z components. When we swapped to Blender for camera positions, we started using rotation, which also has x, y, and z components. They obviously modify different parts of the camera, but I use them interchangeably because there is virtually zero difference in technical implementation versus setting camera.rotation versus camera.lookAt in useFrame). 

Animation implementation was by far the most complex portion of this project. 

The motivation for this problem came from the fact that we would have to "layer" multiple animations on top of one another. For example, if the user is moving from Point A to Point B and clicks the button to move the viewport upwards, we would not want them to occur sequentially; while the user wanted to look upwards while flying over the model, they would only look upwards after they had already gotten to Point B. As such, we needed some way of "layering" two animations. 

We could, instead, combine the animations. In the above example of moving from Point A to Point B and looking upwards, we could simply adjust Point B to be slightly upwards, meaning that, at the end, the viewport would be looking more up. However, this is also not how users are used to navigation; users would want to more immediately look upwards. For example, if the transition from Point A to Point B is 10 seconds long, they might expect a transition looking upwards to take a second or two. Essentially, we need some way of handling animations that occur simultaneously, but not in perfectly overlapping ways. See diagram animations-diagram-1 for explanation.

![animation-diagram-1](https://raw.githubusercontent.com/NYCPlanning/ud-interactive/0008e85e939ea763629ffd4e8178ea71f976e83f/docs/development%20methodology/animations-diagram-1.svg)

The initial thought here was to calculate the rates of change for each animated transition. For example, we would, for x, y, z, and lookAt dimensions, find the difference between Point A and Point B. We would call the difference between these two points the **movement** of the animation. From the movement, we could divide each of these coordinates by the duration of the animation to find the rate of change on each. For example, in this transition between Point A and Point B, perhaps x is moving at 1 unit / second, y is moving at - 5 units / sec, z is moving at 0 units / sec, and the same for the lookAt position.

Essentially, every animation could be moving to a position (an actual place the model needs to be) or a movement (just a relative change, i.e. looking up or down). By looking at where things overlap, we could calcualte the rates at each time. Each time we log the time and position to the state, we would:
- Iterate through the list of animations to see if any had ended. If so, we would remove them.
- Add up the rates in each direction (x, y, z, lookAt x, lookAt y, lookAt z) to find the total rates at the current time.
- Subtract the old time that was in state from the current time. Because state updates with time whenever useFrame runs. The difference in time will be very small, in practice something like 0.01 seconds. Multiply this time difference by the current rates and change current position by this amount. 
- Access currentPosition from state within useFrame and update camera position.

Given the timeline in animations-diagram-1, I've worked out the rate calculations in animations-diagram-2. 

![animation-diagram-2](https://raw.githubusercontent.com/NYCPlanning/ud-interactive/0008e85e939ea763629ffd4e8178ea71f976e83f/docs/development%20methodology/animations-diagram-2.svg)

This was a bad approach because of a few things I didn't realize initially:
- This is extremely computationally costly; we are recalculating rates multiple times per second when they are rarely changing.
- State is not meant to be used like this/this frequently. State updates do not work this instantaneously/are not evenly timed, so the animations that resulted from this approach were super jittery. 

I realized in doing this that we could, instead, only calculate the "endpoints" of animations in state. Essentially, we could still use an array to keep track of the animations in progress, but could update it only when (a) an animation had ended and (b) when an animation was added. Essentially, we know all of the periods that have different overlaps (whenever animations start and end) and so, using the duration in between them and knowledge of the duration of each animation, we could calculate what percentage of each animation should be applied in each interval. See animations-diagram-3 for this. 

![animation-diagram-3](https://raw.githubusercontent.com/NYCPlanning/ud-interactive/0008e85e939ea763629ffd4e8178ea71f976e83f/docs/development%20methodology/animations-diagram-3.svg)

Essentially, when adding animations, there are ranges where the rates will be exactly the same (when the same animations are overlapping). In the diagram above, the time between A and B, time between B and C, etc are all moving at the same speed. By knowing the start position, start time, end time, and end position of these overlaps, we can just use linear interpolation and the current time to calculate position outside of state. 

Basically, we know where it stars and where it ends, by using Three.js's built in LERP, we can calculate the percentage we are through the current animation and from here calculate position, completely in useFrame with just the start/end pairs. This is far more efficient. 

A few notes on implementation:
- Animation takes in two positions and calculates the relative movement from here, regardless of what is passed in. This makes sense because, if we are moving to Point B we can pass in the current position as the first position and Point B as the second position and easily find how much we need to move from where we are to get to the desired point. If we are moving in a relative sense (i.e. just looking) we can pass in all zeros for the first object to have the relative position still work.
- The Animation class has a static method called "addPositionChanges." This just does the math above of using the duration of the current interval and the amount of the animation to calculate how much of the movement to apply. 
- We are still updating time and position in state really frequently using Valtio. This may be inefficient but we have not currently seen performance issues for this. The reason we are doing this because there is no great other way to get the current time and position of the camera from useFrame when we add a new animation. In a previous implementation I kept a variable essentially called animationAdded that would be turned to true when an animation was added, prompting useFrame to add a currentPosition and currentTime to it, then turning animationAdded to false. This is a more efficient implementation but I did not get the chance to finish it up.


## State Management

The first implementation of something resembling the current would log the time to Redux state every time it changed. 

![Diagram of stuff in state](https://raw.githubusercontent.com/NYCPlanning/ud-interactive/public-drawings-2021/docs/development%20methodology/all-in-state.svg)

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

![Explanation of using Valtio state](https://raw.githubusercontent.com/NYCPlanning/ud-interactive/0008e85e939ea763629ffd4e8178ea71f976e83f/docs/development%20methodology/use-valtio.svg)

