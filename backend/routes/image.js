const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const router = require('express').Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const imageController = require('../controllers/image')
require('dotenv').config();
