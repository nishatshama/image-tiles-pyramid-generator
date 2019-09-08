# Image Tiles Pyramid Generator

A Node.js application to process large images. This module resizes given images into images with lower resolution. Then for each resized image, a set of tiles is created.

## Getting Started

To install the dependencies, run:

```
npm install
```

To generate tiles from source images, run the command:

```
npm start [filename1] [filename2]
```

filenames are the strings of image paths. If the images are located inside the project directory, relative file path should work. Otherwise, absolute file path of the images is needed.

## Running the tests

[Jest testing framework](https://jestjs.io/) is used to test this project. To run test, run the command:

```
npm test
```

### Test 1: Test if appropriate number of levels are created in the directory.

Tests whether the script creates the appropriate number of levels according to the image size. Number of levels, L should follow the following equation:

`L = 1 + log2(max(imageWidth, imageHeight))`

### Test 2: Test if appropriate number of tiles are created for each level.

Each tile size is 256x256 pixels, unless the original image is smaller than 256x256 or its an edge tile. This test calculates the number of tiles that can be created from a specific image and compare that with the tiles created in each level directory.

### Additional Test

Run the command:

```
npm run additional-test
```

This command will create a directory in the project called "test_images". This directory will contain full images patched from the tiles of each level. The coordinates of the tiles are obtained from each tile name `x_y.jpg` where x and y indicate the coordinates of the tile's starting position. The name of the patched image will indicate its level. The result images indicate whether all the tiles create the original full image properly.

## Built With

* [Node.js](https://nodejs.org/en/) - Version 10.16.1
* [Sharp](https://github.com/lovell/sharp) - Used for image processing
* [Jest](https://jestjs.io/) - Used for testing

## Authors

* **Nishat Shama** 
