

-- aliases is going to make your query shorter and easier to read.


SELECT 
    p.title AS post_title,
    p.status,
    p.views,
    u.name AS author_name,
    c.body AS comment_body
FROM posts AS p 
INNER JOIN users as u
    ON p.user_id = u.id
LEFT JOIN comments AS c
    ON p.id = c.post_id
ORDER BY p.views DESC;