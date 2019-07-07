const BookmarksService = {
    getAllBookmarks(knexInstance) {
        return knexInstance.select('*').from('bookmarks_list')
    },

    // insertBookmark(knexInstance, newBookmark) {
    //     return knexInstance
    //         .insert(newBookmark)
    //         .into('bookmarks_list')
    //         .returning('*')
    //         .then(rows => {
    //             return rows[0]
    //         })
    // },

    getById(knexInstance, bookmarkID) {
        return knexInstance
            .from('bookmarks_list')
            .select('*')
            .where('id', bookmarkID)
            .first()
    },

    // deleteBookmark(knexInstance, id) {
    //     return knexInstance('bookmarks_list')
    //         .where({ id })
    //         .delete()
    // },

    // updateBookmark(knexInstance, id, newBookmarkFields) {
    //     return knexInstance('bookmarks_list')
    //         .where({ id })
    //         .update(newBookmarkFields)
    // },
}

module.exports = BookmarksService