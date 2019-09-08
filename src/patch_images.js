const fs = require('fs');
const path = require('path');

const sharp = require('sharp');

const getAllLevelProps = function getAllLevelProp(imgHeight, imgWidth, level) {
	let allLevels = [];
	for (let i = level; i >= 0; i--) {
		allLevels.push({
			level: i,
			imgHeight: imgHeight,
			imgWidth: imgWidth
		});
		imgHeight = Math.ceil(imgHeight / 2);
		imgWidth = Math.ceil(imgWidth / 2);
	}
	return allLevels;
};

function createFullImage(filePath, width, height, level) {
	let imgList = [];
	fs.readdirSync(path.join(filePath, level.toString())).forEach(file => {
		coordinates = file.split('.')[0].split('_');
		imgList.push({
			input: path.join(filePath, level.toString(), file),
			top: parseInt(coordinates[1]),
			left: parseInt(coordinates[0])
		});
	});

	sharp({
		create: {
			width: width,
			height: height,
			channels: 4,
			background: { r: 255, g: 255, b: 255, alpha: 1 }
		}
	})
	.composite(imgList)
	.toFile(`test_images/${level}.jpg`);
}

getAllLevelProps(imgHeight=2117, imgWidth=3176, level = 12)
	.forEach(levelObj => createFullImage('./output_images/Cat 1.jpg/', width=levelObj.imgWidth, height=levelObj.imgHeight, levelObj.level));

