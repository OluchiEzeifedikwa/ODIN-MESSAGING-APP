const { Router } = require('express');
const profileRouter = Router();
const profileController = require('../controllers/profileController');

profileRouter.get('/api/profile', (req, res) => {
    res.render('../messagingApp/views/profile');
});
profileRouter.post('/api/profile', profileController.createProfile);
profileRouter.get('/api/profiles', profileController.getAllProfiles);
profileRouter.get('/api/profiles/:id', profileController.getPostById);

module.exports = profileRouter;