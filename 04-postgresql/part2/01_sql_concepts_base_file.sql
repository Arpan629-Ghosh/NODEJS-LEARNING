

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECk(price >=0),
    stock INTEGER NOT NULL DEFAULT 0 CHECk(stock >= 0),
    is_active BOOLEAN DEFAULT true,
    sku TEXT UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


INSERT INTO products (
    name,
    category,
    price,
    stock,
    is_active,
    sku,
    description
)
VALUES
    ('Wireless Mouse', 'Electronics', 799.00, 45, TRUE, 'ELEC-MOU-001', 'Ergonomic wireless mouse with USB receiver'),

    ('Mechanical Keyboard', 'Electronics', 2499.00, 20, TRUE, 'ELEC-KEY-002', 'RGB mechanical keyboard with blue switches'),

    ('Cotton T-Shirt', 'Clothing', 499.00, 100, TRUE, 'CLOT-TSH-003', 'Comfortable cotton crew-neck T-shirt'),

    ('Running Shoes', 'Footwear', 2199.00, 15, TRUE, 'FOOT-SHO-004', 'Lightweight running shoes for daily workouts'),

    ('Water Bottle', 'Accessories', 299.00, 75, TRUE, 'ACCS-BOT-005', 'Reusable stainless steel water bottle'),

    ('Laptop Stand', 'Accessories', 1199.00, 30, TRUE, 'ACCS-LST-006', 'Adjustable aluminum laptop stand'),

    ('Bluetooth Speaker', 'Electronics', 1599.00, 0, TRUE, 'ELEC-SPK-007', 'Portable Bluetooth speaker with deep bass'),

    ('Notebook Set', 'Stationery', 199.00, 200, TRUE, 'STAT-NBK-008', 'Pack of three ruled notebooks'),

    ('Desk Lamp', 'Home', 899.00, 12, TRUE, 'HOME-LMP-009', 'LED desk lamp with adjustable brightness'),

    ('Travel Backpack', 'Accessories', 1799.00, 80, TRUE, 'ACCS-BAG-010', 'Water-resistant backpack with laptop compartment');

-- SELECT * FROM products;

-- SELECT name, price, stock,is_active from products;

-- SELECT * FROM products 
-- WHERE category = 'Electronics'

-- SELECT name, price
-- FROM products 
-- WHERE price > 1000;

-- SELECT name, is_active from products
-- WHERE is_active = FALSE;

-- SELECT * FROM products
-- WHERE category = 'Electronics' and price > 1000;

-- SELECT * FROM products
-- WHERE category IN ('Electronics', 'Accessories');


-- SELECT * FROM products
-- WHERE category = 'Electronics' OR category = 'Accessories';

-- SELECT * FROM products
-- WHERE NOT category = 'Accessories';

-- SELECT name, price, stock, is_active
-- FROM products
-- WHERE is_active = true
--       AND (price < 1000 OR stock >= 100);

-- SELECT name, price FROM products 
-- WHERE name LIKE 'Wireless%';

-- SELECT name, category, price
-- FROM products
-- WHERE name ILIKE '%deSk%';

-- SELECT name, category, description FROM products 
-- WHERE name ILIKE '%Running%'
--         OR description ILIKE '%Running%';

-- SELECT * FROM products
-- WHERE category NOT IN ('Electronics', 'Accessories');

-- SELECT name, price 
-- FROM products
-- WHERE price BETWEEN 1000 AND 2000;

-- SELECT name, category, price, stock
-- FROM products
-- WHERE category IN ('Electronics', 'Accessories')
--     AND price BETWEEN 1000 AND 1500;

-- SELECT name, description
-- FROM products
-- WHERE description is NULL;

-- SELECT name, description
-- FROM products
-- WHERE description is NOT NULL;

-- SELECT name, price 
-- FROM products
-- ORDER BY price ASC;

-- SELECT name, price 
-- FROM products
-- ORDER BY price DESC;

-- SELECT name, category, price
-- FROM products
-- ORDER BY category ASC, price DESC;

-- SELECT name, price
-- FROM products
-- ORDER BY price ASC
-- LIMIT 5;

-- SELECT name, price 
-- FROM products
-- ORDER BY name ASC
-- LIMIT 5 OFFSET 0;

-- SELECT name, price 
-- FROM products
-- ORDER BY name ASC
-- LIMIT 5 OFFSET 5;

-- UPDATE products
-- SET price = 1199.50,
--     stock = 23
-- WHERE sku = 'FOOT-SHO-004';

-- SELECT price, stock 
-- FROM products
-- WHERE sku = 'FOOT-SHO-004';

-- UPDATE products
-- SET price = ROUND(price * 1.10, 2)
-- WHERE category = 'Electronics';

-- SELECT name, price FROM products 
-- WHERE category = 'Electronics';

-- UPDATE products
-- SET is_active = FALSE
-- WHERE stock = 0;

-- SELECT name, stock, is_active from products
-- WHERE stock = 0;

-- INSERT INTO products (
--     name,
--     category,
--     price,
--     stock,
--     is_active,
--     sku,
--     description
-- )
-- VALUES
--     ('Kettle', 'Electronics', 799.00, 45, TRUE, 'ELEC-KTTL-001', 'Electric kettle');

-- SELECT name FROM 
-- products WHERE sku = 'ELEC-KTTL-001';

-- DELETE FROM products
-- WHERE sku = 'ELEC-KTTL-001';

-- SELECT name FROM 
-- products WHERE sku = 'ELEC-KTTL-001';

-- INSERT INTO products (
--     name,
--     category,
--     price,
--     stock,
--     is_active,
--     sku,
--     description
-- )
-- VALUES
--     ('Kettle', 'Electronics', 799.00, 45, TRUE, 'ELEC-KTTL-001', 'Electric kettle') RETURNING id, name, category, price, stock, created_at;

-- UPDATE products
-- SET stock = stock + 11
-- WHERE sku = 'ELEC-KTTL-001'
-- RETURNING id, name, stock;

-- DELETE FROM products 
-- WHERE sku = 'ELEC-KTTL-001'
-- RETURNING id, name, sku;

-- SELECT name. sku FROM products
-- WHERE sku = 'ELEC-KTTL-001';