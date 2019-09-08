const fs = require('fs');
const path = require('path');

const getLevelDir = filePath => fs.readdirSync(filePath).filter(element => fs.statSync(path.join(filePath, element)).isDirectory());

describe('testing app', () => {
	let imgWidth;
	let imgHeight;
	let filePath;

	beforeAll(() => {
		imgWidth = 3176;
		imgHeight = 2117;
		filePath = './output_images/Cat 1.jpg';
	});

	test('Number of levels should be equal 1 + log2(max(imgHeight, imgWidth))', () => {
		expect(getLevelDir(filePath).length).toBe(Math.round(1 + Math.log2(Math.max(imgHeight, imgWidth))));
	});
});