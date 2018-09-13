# react-dorling-map

> A simple widget to have a Dorling Cartogram that also animates into a regular map.

## Basic Usage

Clone the repo : `npm i react-dorling-map`.

## Docs

In the `docs` folders is an example `SimpleDorling.js` that has the settings. More docs coming at some point but for now:

### DorlingCartogram

A React component that takes the following properties and produces either a map or a dorling cartogram.

* **cartogram**: Set to `true` to display geodata as a dorling cartogram
* **mapData**: A geojson file. Features should have a `neighbors` property that gives the array position of any neighboring features (in other words if feature 9 borders features 0, 5 and 43 it should have a `neighbors: [0, 5, 43]` in its `properties`. While this isn't strictly required it will make things easier. Labeling by default is the `id` value of the feature. There is a `world.json` file in the `docs` folder that doesn't have Antarctica but does have neighbors and isocodes.
* **data**: An array of objects that will be joined onto the `mapData` features based on shared `id` values.
* **projectionType**: A `d3-geo` projection. Default projection is the horrible Mercator projection so good luck sailing ships in the 18th century you goons.
* **transitionSeconds**: How many seconds the animation from dorling to map takes.
* **size**: An array of `[width, height]` in pixels
* **sizeBy**: A string (if a property name) or function that takes a feature and returns a value to base the sizes on. There is no internal scaling so make sure this is a scaled value suitable for your cartogram size.
* **geoStyle**: An React style object or a function that returns a React style object to style the map features when in map mode.
* **circleStyle**: An React style object or a function that returns a React style object to style the map features when in map mode. Defaults to the `geoStyle` setting if no value is sent.
* **zoomToFit**: Zoom the dorling cartogram so that it fits the display area otherwise it will be closer to the centroids of the features in the map mode.
* **label**: Set to true to show simple labels based on the `id` property of the features or set to a function that takes the feature and returns a string or SVG JSX.
* **onHover**: Takes a function that is passed the hovered feature (uses the path in map mode or a voronoi of centroids in cartogram mode) like `d => {console.info(d)}`. There's no built-in tooltips but the passed element has x and y information for you to generate tooltips. Passed `undefined` onMouseLeave.
