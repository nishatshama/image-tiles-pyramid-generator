const fs = require('fs');

const sharp = require('sharp');

function generatePyramidTiles(filename){
	const targetImage = sharp(filename);

	targetImage.metadata()
		.then(metadata => {
			let imgHeight = metadata.height;
			let imgWidth = metadata.width;
			let currentImage = targetImage;

			for (let levelDepth = Math.ceil(Math.log2(Math.max(metadata.height, metadata.width))); levelDepth >= 0; levelDepth--) {
				fs.existsSync(`output_images/${levelDepth}`) || fs.mkdirSync(`output_images/${levelDepth}`);

				console.log('levelDepth, imageheight, imagewidth', levelDepth, imgHeight, imgWidth);
				currentImage.toFile(`output_images/${levelDepth}/0_0.jpg`);

				imgHeight = Math.ceil(imgHeight / 2);
				imgWidth = Math.ceil(imgWidth / 2);
				currentImage = sharp(img).resize(imgWidth, imgHeight);
			}
		})
}

generatePyramidTiles('Cat 1.jpg');