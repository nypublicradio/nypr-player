/* eslint-env node */
'use strict';

const express = require('express')
const morgan = require('morgan');
const path = require('path')

module.exports = function(app) {
  // Log proxy requests
  app.use(morgan('dev'));
  app.use(express.static(path.resolve(__dirname, 'static')));
};
