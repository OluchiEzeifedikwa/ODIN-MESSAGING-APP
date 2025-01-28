const { Router } = require('express');
const addRouter = Router();

addRouter.get('/add', (req, res) => {
    res.render('../auth/views/welcome');
  })
   
module.exports = addRouter;

