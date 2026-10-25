

-- index helps postgres finds rows faster

-- SELECT -> speed it up this particular process

    SELECT
        id,
        title,
        status,
        views,
        user_id
    FROM posts
    WHERE status = 'published';

    CREATE INDEX IF NOT EXISTS idx_posts_status
    ON posts(status);

    SELECT
        title,
        status,
        views
    FROM posts
    WHERE status = 'published'
    ORDER BY views DESC;

    -- composite index

    CREATE INDEX IF_NOT_EXISTS idx_posts_status_views
    ON posts(status, views DESC);

    --/users/:id/posts
    SELECT 
        title,
        status,
        views
    FROM posts
    WHERE user_id = (
        SELECT id 
        FROM users
        WHERE name = 'Arpita Jana'
    );

    CREATE INDEX IF NOT ExISTS idx_posts_user_id
    ON posts(user_id);