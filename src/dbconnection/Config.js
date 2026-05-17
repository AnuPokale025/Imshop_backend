const cloudinary = require('cloudinary').v2;

const CLOUDINARY_CLOUD_NAME = 'dqgmmh0jv';
const CLOUDINARY_API_KEY = '583163478571157';
const CLOUDINARY_API_SECRET = 'DpOyEwA9d293K-i5WP8UJaokEsE';

cloudinary.config({
  cloud_name: 'dqgmmh0jv',
  api_key: '583163478571157',
  api_secret: 'DpOyEwA9d293K-i5WP8UJaokEsE'
});

module.exports = cloudinary;