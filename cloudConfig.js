const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET

})

const storage = new CloudinaryStorage({   // storage means cloudinary ka account to apna bana liya example google drive pe aapna apna folder bana diya aor usma files upload krni ha aor konsa folder ma jaka usa store krna ha
  cloudinary: cloudinary,
  params: {
    folder: 'Travel Quora_DEV',
    allowedFormats: ["png", "jpg", "jpeg"] 
  },
});

module.exports = {
  cloudinary,
  storage
};