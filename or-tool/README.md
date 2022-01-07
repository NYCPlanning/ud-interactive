## How to use this template

**Scene captions** can be added as a custom property in Blender. Each camera should be given a property with "caption" as the key and the caption text as the value. If you need to have captions of more than 1-2 sentences, it may be better to use a separate JSON object to pass caption values instead of using this method.

When exporting GLTF files from Blender, make sure the following settings are used:

- Export Cameras
- Custom Properties
- Compress

### Title, Captions and Annotations

These can all be set as custom properties on individual scene objects.

- Title: set as custom property `title` on scene object
- Caption: set as custom property `caption` on each camera object. Be sure to assign this to the camera object itself, not its parent empty if using Blender.
- View Name: same as above but `viewName`
- Annotations: set as custom property `text` on individual points or empties parented to each camera object.
