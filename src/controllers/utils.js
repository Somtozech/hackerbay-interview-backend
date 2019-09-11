const jwt = require('jsonwebtoken');
const config = require('../config');
const download = require('image-downloader');
const sharp = require('sharp');
const fs = require('fs');

exports.generateAuthToken = ({ username }) => {
	const token = jwt.sign({ username }, config.JWT_KEY, { expiresIn: '5h' });
	return token;
};

exports.downloadImage = options => {
	return download.image(options);
};

exports.resize = filename => {
	const inputFile = fs.createReadStream(filename);
	const transform = sharp().resize({ width: 50, height: 50 });

	return inputFile.pipe(transform);
};
