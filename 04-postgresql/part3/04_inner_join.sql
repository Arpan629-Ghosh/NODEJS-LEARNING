

SELECT users.name as author_name,
       posts.title AS post_title,
       posts.status,
       posts.views
FROM posts INNER JOIN users ON users.id = posts.user_id 
WHERE posts.status = 'published'
ORDER BY posts.views DESC;