const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createMessage = async (req, res) => {
try {
const senderId = req.body.senderId;
const recipientId = req.body.recipientId;

const sender = await prisma.user.findUnique({ where: { id: senderId } });
const recipient = await prisma.user.findUnique({ where: { id: recipientId } });

if (!sender || !recipient) {
  res.status(400).json({ message: 'Invalid senderId or recipientId' });
  return;
}

const message = await prisma.message.create({
  data: {
    messages: req.body.messages,
    senderId: senderId,
    recipientId: recipientId,
  },
});

res.json(message);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await prisma.message.findMany();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const message = await prisma.message.findUnique({
      where: { id: req.params.id },
    });
    res.json(message);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const message = await prisma.message.update({
      where: { id: req.params.id },
      data: {
        messages: req.body.messages,
      },
    });
    res.json(message);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await prisma.message.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

