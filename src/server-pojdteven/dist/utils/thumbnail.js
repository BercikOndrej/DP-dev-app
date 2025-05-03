"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThumbnail = exports.createThumbnailsForAllPhotos = void 0;
const tslib_1 = require("tslib");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const createThumbnail = (photo) => {
    const inputPath = path_1.default.join(__dirname, '..', '..', 'static', 'photogallery', photo);
    const newName = `thumbnail-${photo.split('photo-')[1]}`;
    const outputPath = path_1.default.join(__dirname, '..', '..', 'static', 'thumbnails', newName);
    // Check if file exists
    if (!fs_1.default.existsSync(inputPath)) {
        console.log('File not found ' + inputPath);
        return;
    }
    (0, sharp_1.default)(inputPath)
        .resize(300, 300)
        .toFile(outputPath)
        .then(() => console.log('Thumbnail created:', outputPath))
        .catch((err) => console.error('Error generating thumbnail:', err));
};
exports.createThumbnail = createThumbnail;
const createThumbnailsForAllPhotos = () => {
    const photosPath = path_1.default.join(__dirname, '..', '..', 'static', 'photogallery');
    fs_1.default.readdir(photosPath, (err, files) => {
        if (err) {
            console.log('Error reading thumbnails from photos file: ', err.message);
            return;
        }
        files.forEach((file) => createThumbnail(file));
    });
};
exports.createThumbnailsForAllPhotos = createThumbnailsForAllPhotos;
//# sourceMappingURL=thumbnail.js.map