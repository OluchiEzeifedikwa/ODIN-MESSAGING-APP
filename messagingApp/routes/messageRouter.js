const { Router } = require('express');
const messageRouter = Router();
const messageController = require('../controllers/messageController');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

messageRouter.get('/messages', (req, res) => {
    res.render('../messagingApp/views/createMessage');
  });
messageRouter.post('/messages', messageController.createMessage);
messageRouter.get('/messages', messageController.getMessages);
messageRouter.get('/messages/:id', messageController.getMessage);
messageRouter.put('/messages/:id', messageController.updateMessage);
messageRouter.delete('/messages/:id', messageController.deleteMessage);
  

module.exports = messageRouter;






