import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const createThumbnail = (photo: string) => {
  const inputPath = path.join(
    __dirname,
    '..',
    '..',
    'static',
    'photogallery',
    photo,
  );
  const newName = `thumbnail-${photo.split('photo-')[1]}`;
  const outputPath = path.join(
    __dirname,
    '..',
    '..',
    'static',
    'thumbnails',
    newName,
  );

  // Check if file exists
  if (!fs.existsSync(inputPath)) {
    console.log('File not found ' + inputPath);
    return;
  }

  sharp(inputPath)
    .resize(300, 300)
    .toFile(outputPath)
    .then(() => console.log('Thumbnail created:', outputPath))
    .catch((err) => console.error('Error generating thumbnail:', err));
};

const createThumbnailsForAllPhotos = () => {
  const photosPath = path.join(__dirname, '..', '..', 'static', 'photogallery');
  fs.readdir(photosPath, (err, files) => {
    if (err) {
      console.log('Error reading thumbnails from photos file: ', err.message);
      return;
    }
    files.forEach((file) => createThumbnail(file));
  });
};

export { createThumbnailsForAllPhotos, createThumbnail };
