
SELECT 
    u.name AS author_name,
    COUNT(p.id) AS total_posts,
    SUM(p.views) AS total_views
FROM users AS u
LEFT JOIN posts AS p
    ON u.id = p.user_id
GROUP BY  u.name
HAVING COUNT(p.id) >= 0
ORDER BY total_posts DESC;