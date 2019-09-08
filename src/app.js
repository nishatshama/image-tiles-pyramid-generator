const fs = require('fs');

const sharp = require('sharp');

function generatePyramidTiles(filename){
	fs.existsSync('output_images') || fs.mkdirSync('output_images');

	const targetImage = sharp(filename);
	
	targetImage.metadata()
		.then(metadata => {
			let imgHeight = metadata.height;
			let imgWidth = metadata.width;
			let currentImage = targetImage;

			for (let levelDepth = Math.ceil(Math.log2(Math.max(metadata.height, metadata.width))); levelDepth >= 0; levelDepth--) {
				fs.existsSync(`output_images/${levelDepth}`) || fs.mkdirSync(`output_images/${levelDepth}`);

				console.log(`Constructing tiles for level ${levelDepth} for the ${imgWidth}x${imgHeight}`);
				let edgeTileX = imgWidth % 256;
				let edgeTileY = imgHeight % 256;
				if(imgHeight > 256 && imgWidth > 256) {
					generateTilesFrom2D(
						currentImage,
						levelDepth,
						imgSizeOuter=imgHeight,
						imgSizeInner=imgWidth,
						edgeTileOuter=edgeTileY,
						edgeTileInner=edgeTileX
					);
				} else if(imgHeight > 256){
					generateTilesFrom1D(
						currentImage,
						levelDepth,
						imgSizeInner=imgHeight,
						edgeTileSizeInner=edgeTileY,
						tileSizeOuter=imgWidth,
						tileCountOuter=0,
						false
					);
				} else if(imgWidth > 256){
					generateTilesFrom1D(
						currentImage,
						levelDepth,
						imgSizeInner=imgWidth,
						edgeTileSizeInner=edgeTileX,
						tileSizeOuter=imgHeight,
						tileCountOuter=0,
						true
					);
				} else {
					currentImage.toFile(`output_images/${levelDepth}/0_0.jpg`);
				}

				imgHeight = Math.ceil(imgHeight / 2);
				imgWidth = Math.ceil(imgWidth / 2);
				currentImage = sharp(img).resize(imgWidth, imgHeight);
			}
		})
}

function generateTilesFrom2D(currentImage, levelDepth, imgSizeOuter, imgSizeInner, edgeTileSizeOuter, edgeTileSizeInner){
	for(let tileCountOuter = 0; tileCountOuter < imgSizeOuter ; tileCountOuter += 256){
		let tileSizeOuter = edgeTileSizeOuter > 0 && tileCountOuter + 256 > imgSizeOuter ? edgeTileSizeOuter : 256;
		generateTilesFrom1D(currentImage, levelDepth, imgSizeInner, edgeTileSizeInner, tileSizeOuter, tileCountOuter, true);
	}
}

function generateTilesFrom1D(currentImage, levelDepth, imgSizeInner, edgeTileSizeInner, tileSizeOuter, tileCountOuter, isCroppingByXAxis){
	for(let tileCountInner = 0; tileCountInner < imgSizeInner; tileCountInner += 256){
		let tileSizeInner = edgeTileSizeInner > 0 && tileCountInner + 256 > imgSizeInner ? edgeTileSizeInner : 256;
		currentImage
			.extract({
						width: isCroppingByXAxis ? tileSizeInner : tileSizeOuter,
						height: isCroppingByXAxis ? tileSizeOuter : tileSizeInner,
						top: isCroppingByXAxis ? tileCountOuter : tileCountInner,
						left: isCroppingByXAxis ? tileCountInner : tileCountOuter
			})
			.toFile(`output_images/${levelDepth}/${tileCountInner}_${tileCountOuter}.jpg`);
	}
}

generatePyramidTiles('Cat 1.jpg');