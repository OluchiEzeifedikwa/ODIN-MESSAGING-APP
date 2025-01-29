const { Router } = require('express');
const profileRouter = Router();
const profileController = require('../controllers/profileController');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, picture, cb) => {
    cb(null, "images");
  },
  picturename: (req, picture, cb) => {
    const timestamp = Date.now();
    const uniquePicturename = `${timestamp}_${picture.originalname}`;
    console.log(uniquePicturename); // Verify the filename in the console
    cb(null, uniquePicturename);
    console.log(picture);
    // console.log(cb(null, Date.now() + path.extname(file.originalname)))
  },
});
const upload = multer({ storage: storage });

//folderRouter.post('/folder', upload.array('uploads'), folderController.uploadFileInFolderPost)


profileRouter.get('/api/profile', (req, res) => {
    res.render('../messagingApp/views/createProfile');
});
profileRouter.post('/api/profile', upload.single("image"), profileController.createProfile);
profileRouter.get('/profiles', profileController.getProfiles);
profileRouter.get('/pictures', profileController.getPictures);
profileRouter.get('/profiles/:id', profileController.getProfileById);
profileRouter.put('/profiles/:id', profileController.updateProfile);
profileRouter.delete('/profiles/:id', profileController.deleteProfile);
profileRouter.get('/profiles/:id', profileController.editProfile);


module.exports = profileRouter;