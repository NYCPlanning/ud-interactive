# Vector drawings on the web

Vector drawings in the browser are usually based on [Scalable Vector Graphics](https://developer.mozilla.org/en-US/docs/Web/SVG) (SVG). Depending on your needs there are a few different approaches to this, outlined below:

## Using Illustrator

Some of the Illustrator features that can be used to support interactivity in SVGs are:

  - Layers - used to assign id to `<g>` tags containing individual objects. Object names, set within the layers panel, are used as ids on individual element tags (`<rect>`, `<path>` etc.) Unlike Graphic Styles, dashes can be used here. In most cases this is the recommended way to identify individual objects or groups for dynamic styling and interactivity.
  - Graphic Styles – used to assign CSS classes and can be used as an alternate to the layers method above. Best to use only alphanumeric characters, dashes will not register properly. Can only be used this way when members of the class have the same graphic style.
  - SVG Interactivity – can be used to register event handlers to specific elements (e.g. onClick). Not applied when exporting through Asset Export or Export For Screens (Artboard), only works when using save as SVG. Names of functions need to be coordinated with the development team.

- Exporting an SVG:
  - File > Save As > SVG
  - Export for Screens > Either artboards/assets with the format set to SVG, click the Gear icon to access options (note slightly different than below)

- SVG export options:
  - Note the to approaches above show slightly different options
  - Use Artboards: 
  - "More Options" displays all available settings
  - Text can be either text elements (depends on fonts) or exported as outlines
  - You can choose how images are included (embedded, linked, or mixed based on how they're included in the Illustrator file)
  - Uncheck Preserve Illustrator Editing Capabilities
  - CSS Properties. There are four options for how to handle style information for the drawing, related to the three ways style can be applied to SVG elements ([CSS rules applied to elements](https://www.w3.org/TR/SVG/styling.html#StylingUsingCSS) by class, inline on the element itself, and using [Presentation Attributes](https://www.w3.org/TR/SVG/styling.html#PresentationAttributes)):
    - Presentation Attributes. Applies properties at the highest point in the hierarchy, allows flexibility for edits and transformations.
    - Style Attributes. Produces most readable files.
    - Style Attributes (Entity References). Like above but 
    - Style Elements. Recommended if you're styling both CSS and HTML with a single style sheet. Uses CSS classes to apply 
  - Uncheck Include Unused Graphic Styles
  - Output fewer tspan elements
  - Use textPath element for Text on Path
  - Responsive: Allows CSS resizing (make sure checked)
  - Include Slicing Data: 
  - Include XMP: if checked, includes metadata like author, date created etc
  - Use the SVG Code button to preview the results in a text editor, or click the Earth icon to preview in a browser.

## Code-Based Approaches/Considerations

- In React:
  - Use a transformer to convert the SVG to React components (like [SVGR](https://react-svgr.com/)). Create-react-app has built-in support for this.
  - Use 3rd-party libraries to generate chart layout and use React to render individual elements. See this [article](https://wattenberger.com/blog/react-and-d3).
  - Use refs. Will work in many cases but not recommended.
- Text Formatting
  - One drawback of SVG is it has comparatively poor support for text formatting versus HTML + CSS. A workaround is to use the `<foreignObject />` element which will allow you to add HTML elements inside of an SVG document. Be aware this will only work in some browsers (notably not Internet Explorer) and will also result in an SVG document that is not backwards-compatible with Illustrator and most other non-browser tools. For details see this [Stack Overflow](https://stackoverflow.com/questions/4991171/auto-line-wrapping-in-svg-text) discussion.
