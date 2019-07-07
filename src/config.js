module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || 'f1f5ae82-a0f1-11e9-a2a3-2a2ae2dbcce4',
    DB_URL: process.env.DB_URL || 'postgresql://dunder-mifflin@localhost/bookmarks'
}