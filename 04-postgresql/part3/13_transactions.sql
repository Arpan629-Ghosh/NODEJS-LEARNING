

-- multiple sql statement run as one safe unit

-- placing an order
-- reduce stock of that product
-- creating payment records
-- transfering money
-- creating user records with related profile data

BEGIN; 
    UPDATE posts
    SET status = 'published'
    WHERE title = 'Learning SQL Joins'
        AND status = 'draft';
    
    UPDATE posts
    SET views = views + 50
    WHERE title = 'Learning SQL Joins';

    SELECT 
        title,
        status,
        views
    FROM posts
    WHERE title = 'Learning SQL Joins';

COMMIT;

    