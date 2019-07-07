require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const validateBearerToken = require('./validate-bearer-token');
const BookmarksService = require('./bookmark/bookmarks-service');
const bookmarkRouter = require('./bookmark/bookmark-router');
const errorHandler = require('./error-handler')


const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())
app.use(validateBearerToken)
app.use(bookmarkRouter)
app.use(errorHandler);


module.exports = app