CREATE TABLE bookmarks_list (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    rating NUMERIC NOT NULL,
    description TEXT
);