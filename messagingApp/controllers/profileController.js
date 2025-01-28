
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// To create a profile
exports.createProfile = async (req, res) => {
   try {
    
    const { name, username } = req.body;
    const newProfile = await prisma.profile.create({
      data: {
        name,
        username,   
       },
    });

    res.redirect('/createProfile');
   } catch (err) {
     res.status(500).json({ message: 'Failed to create profile' });
  }
};

// To get all comments
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve profiles' });
  }
};

 // To get profiles by Id
exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await prisma.profile.findUnique({
      where: { id },
    });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve profile' });
  }
};

// To delete a profile
exports.deleteProfile = async (req, res) => {
 try {
    
    const profileId = req.params.id
    await prisma.profile.delete({
      where: { 
        id : profileId },
    });
    res.status(200).json('profile deleted Successfully');
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete profile' });
   }
};

// To edit a profile
exports.editProfile = async (req, res) => {
  try {
     const profileId = req.params.id
     const profile = await prisma.profile.findUnique({
       where: { 
         id : profileId },
     });
     res.render('editProfile', { profile });
   } catch (err) {
     res.status(500).json({ message: 'Failed to delete profiles' });
    }
 };

 // To 
 exports.updateProfile = async (req, res) => {
  try {
     
     const profileId = req.params.id
     const { profile } = req.body;
     await prisma.profile.update({
       where: { id : profileId },
       data: { profile }
     });
     res.status(200).json('profile updated Successfully');
   } catch (err) {
     res.status(500).json({ message: 'Failed to update profiles' });
    }
 };
 



