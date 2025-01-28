const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.addControl = async(req, res) => {
    res.render('../messagingApp/views/profile')
}