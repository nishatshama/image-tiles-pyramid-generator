const fs = require('fs');
const path = require('path');

const getLevelDir = filePath => fs.readdirSync(filePath).filter(element => fs.statSync(path.join(filePath, element)).isDirectory());

const getTilesAtLevel = filePath => fs.readdirSync(filePath);

const getTileCount = (imgHeight, imgWidth) =>
						imgWidth > 256 && imgHeight > 256 ?
						Math.ceil(imgHeight / 256) * Math.ceil(imgWidth / 256) :
						(imgHeight > 256 ? Math.ceil(imgHeight / 256) :
						(imgWidth > 256 ? Math.ceil(imgWidth / 256) : 1));

describe('testing app', () => {
	let imgWidth;
	let imgHeight;
	let filePath;
	let allLevelProps = [
		{ level: 12, imgHeight: 2117, imgWidth: 3176 },
		{ level: 11, imgHeight: 1059, imgWidth: 1588 },
		{ level: 10, imgHeight: 530, imgWidth: 794 },
		{ level: 9, imgHeight: 265, imgWidth: 397 },
		{ level: 8, imgHeight: 133, imgWidth: 199 },
		{ level: 7, imgHeight: 67, imgWidth: 100 },
		{ level: 6, imgHeight: 34, imgWidth: 50 },
		{ level: 5, imgHeight: 17, imgWidth: 25 },
		{ level: 4, imgHeight: 9, imgWidth: 13 },
		{ level: 3, imgHeight: 5, imgWidth: 7 },
		{ level: 2, imgHeight: 3, imgWidth: 4 },
		{ level: 1, imgHeight: 2, imgWidth: 2 },
		{ level: 0, imgHeight: 1, imgWidth: 1 }
	];

	beforeAll(() => {
		imgWidth = 3176;
		imgHeight = 2117;
		filePath = './output_images/Cat 1.jpg';
	});

	test('Number of levels should be equal 1 + log2(max(imgHeight, imgWidth))', () => {
		expect(getLevelDir(filePath).length).toBe(Math.round(1 + Math.log2(Math.max(imgHeight, imgWidth))));
	});

	for (let i = 0; i < allLevelProps.length; i++) {
		let tileCount = getTileCount(allLevelProps[i].imgHeight, allLevelProps[i].imgWidth);
		it(`Number of tiles in level ${allLevelProps[i].level} should be equal to ${tileCount}`, () => {
			expect(getTilesAtLevel(path.join(filePath, allLevelProps[i].level.toString())).length).toBe(tileCount);
		});
	}
});