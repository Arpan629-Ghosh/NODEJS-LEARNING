-- SELECT
--     COUNT(*) AS total_posts
-- FROM posts;

-- SELECT
--     COUNT(*) AS total_posts,
--     COUNT(*) FILTER (WHERE status = 'published') AS published_posts
-- FROM posts;

-- SELECT
--     COUNT(*) AS total_posts,
--     COUNT(*) FILTER (WHERE status = 'published') AS published_posts,
--     SUM(views) AS total_views
-- FROM posts;

SELECT
    COUNT(*) AS total_posts,
    COUNT(*) FILTER (WHERE status = 'published') AS published_posts,
    AVG(views) AS avg_views,
    MIN(views) AS lowest_views,
    MAX(views) AS highest_views
FROM posts;
