# Raster drawings on the web

Compared with [vector drawings](./vector-drawings), raster images aren't as flexible in terms of interactivity since they don't contain any information about the things they show. A few possible approaches involving annotation and layer separation are outlined below:

## Using Photoshop

  - Count Tool
    - The count tool doesn't save notes but can be used to tag entities in the drawing, in multiple layers, and assign numbers to each. This can be used in conjunction with another document to join drawing entities to attributes.
    - Use the `export-annotations.jsx` script to export count points with their screen coordinates in pixels.
  - Color Sampler Tool
    - Similar to the count tool, except it also captures the color of the annotated point.
  - Note Tool
    - Unfortunately the notes created by the note tool can't be easily accessed by Photoshop scripts and can't be exported. This may change in the future but for now it's recommended not to use them for annotation purposes.
  - Layers
    - Individual layers can be saved as separate images and reassembled in the browser.
    - Export individual layers by right-clicking them in the Layers panel and choosing "Quick Export as PNG"
    - Export layers in bulk with File > Export > Layers to Files
    - If you need to control the layout of images relative to each other, compose your scene as an SVG with embedded or linked images in Illustrator (see [vector drawings](./vector-drawings))
