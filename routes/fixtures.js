const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const Fixture = require('../models/fixture');