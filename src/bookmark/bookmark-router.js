const express = require('express');
const uuid = require('uuid/v4');
const logger = require('../logger');
const { bookmarks } = require('../store');
const bookmarkRouter = express.Router();
const BookarksService = require('./bookmarks-service')
const bodyParser = express.json();

const serializeBookmark = bookmark => ({
    id: bookmark.id,
    title: bookmark.title,
    url: bookmark.url,
    description: bookmark.description,
    rating: Number(bookmark.rating),
})


bookmarkRouter
    .route('/bookmarks')
    .get((req, res, next) => {
        BookarksService.getAllBookmarks(req.app.get('db'))
            .then(bookmarks => {
                res.json(bookmarks.map(serializeBookmark))
            })
            .catch(next)
    })
    .post(bodyParser, (req, res) => {
        for (const field of ['title', 'url', 'rating']) {
            if (!req.body[field]) {
                logger.error(`${field} is required`)
                return res.status(400).send(`'${field}' is required`)
            }
        }
        const { title, url, description, rating } = req.body

        if (isNaN(rating)) {
            logger.error(`Invalid rating '${rating}' supplied`)
            return res.status(400).send(`'rating' is ${rating}, must be a number`)
        }

        if (!isNaN(rating)) {
            if (rating < 0 || rating > 5) {
                logger.error(`Invalid rating '${rating}' supplied`)
                return res.status(400).send(`'rating' is ${rating}, must be between 0 and 5`);
            }
        }

        const bookmark = { id: uuid(), title, url, description, rating }

        bookmarks.push(bookmark)

        logger.info(`Bookmark with id ${bookmark.id} created`)
        res.status(201)
            .location(`http://localhost:8000/bookmark/${bookmark.id}`)
            .json(bookmark)
    })


bookmarkRouter.route('/bookmarks/:id/')
    // Get bookmark by ID
    .get((req, res, next) => {
        const bookmark_id = req.params.id
        BookarksService.getById(req.app.get('db'), bookmark_id)
            .then(bookmark => {
                if (!bookmark) {
                    logger.error(`Bookmark with id ${bookmark_id} not found.`)
                    return res.status(404).json({
                        error: { message: `Bookmark Not Found` }
                    })
                }
                res.json(serializeBookmark(bookmark))
            })
            .catch(next)
    })    
    // Delete bookmark by ID
    .delete((req, res) => {
        const { id } = req.params;

        const bookmarkIndex = bookmarks.findIndex(c => c.id.toString() === id.toString());

        if (bookmarkIndex === -1) {
            logger.error(`Bookmark with id ${id} not found.`);
            return res.status(404)
                .send('Not found');
        }

        bookmarks.splice(bookmarkIndex, 1);
        logger.info(`Bookmark with id ${id} deleted.`);
        res.status(204).end();
    });

module.exports = bookmarkRouter;