

SELECT posts.title AS post_title,
       comments.body AS comment
       FROM posts LEFT JOIN comments
       ON posts.id = comments.post_id
       ORDER BY posts.title;