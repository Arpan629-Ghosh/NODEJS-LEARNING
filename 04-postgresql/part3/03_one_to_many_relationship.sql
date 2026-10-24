

SELECT users.name AS author_name, posts.title AS post_title, posts.status AS post_status FROM USERS INNER JOIN posts ON users.id = posts.user_id ORDER BY users.name, posts.title;