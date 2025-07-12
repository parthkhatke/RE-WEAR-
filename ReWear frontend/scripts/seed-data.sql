-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Tops', 'T-shirts, blouses, sweaters, and other upper body clothing'),
('Dresses', 'Casual and formal dresses of all styles'),
('Pants', 'Jeans, trousers, leggings, and other bottom wear'),
('Shoes', 'Sneakers, boots, heels, and all types of footwear'),
('Outerwear', 'Jackets, coats, blazers, and outer garments'),
('Accessories', 'Bags, jewelry, scarves, and fashion accessories')
ON CONFLICT (name) DO NOTHING;

-- Insert sample users
INSERT INTO users (id, email, password_hash, name, points, avatar_url) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'john.doe@example.com', 'hashed_password_1', 'John Doe', 150, '/placeholder.svg?height=40&width=40'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'jane.smith@example.com', 'hashed_password_2', 'Jane Smith', 200, '/placeholder.svg?height=40&width=40'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'alice.jones@example.com', 'hashed_password_3', 'Alice Jones', 100, '/placeholder.svg?height=40&width=40')
ON CONFLICT (email) DO NOTHING;

-- Insert sample items
INSERT INTO items (
    id, 
    user_id, 
    title, 
    description, 
    category, 
    brand, 
    size, 
    condition, 
    points_value, 
    status
) VALUES
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Vintage Denim Jacket', 'Classic Levi''s denim jacket, perfect for layering. Lightly worn with a great faded look. No major flaws, just natural wear.', 'Outerwear', 'Levi''s', 'M', 'Good', 60, 'available'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Boho Floral Maxi Dress', 'Flowy maxi dress with a beautiful floral print, ideal for summer. Comfortable and breathable fabric. Worn once, like new.', 'Dresses', 'Zara', 'S', 'Like New', 75, 'available'),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Striped Cotton Sweater', 'Soft cotton sweater with classic stripes. Perfect for spring or cool evenings. Minor pilling.', 'Tops', 'Everlane', 'L', 'Excellent', 55, 'available'),
('g0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'High-Waisted Black Jeans', 'Comfortable and stylish high-waisted black jeans. Slight fading on knees. Size 28.', 'Pants', 'Madewell', '28', 'Good', 65, 'available'),
('h0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Cozy Knit Cardigan', 'Warm and soft knit cardigan, perfect for chilly days. Oversized fit. Minor snag on one sleeve.', 'Outerwear', 'H&M', 'M', 'Fair', 30, 'available')
ON CONFLICT (id) DO NOTHING;

-- Insert sample swaps
INSERT INTO swaps (
    requester_id,
    offerer_id,
    requested_item_id,
    requested_points,
    status
) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 55, 'pending')
ON CONFLICT (id) DO NOTHING;

-- Insert sample item images
INSERT INTO item_images (item_id, image_url) VALUES
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '/placeholder.svg?height=400&width=400'),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '/placeholder.svg?height=400&width=400'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', '/placeholder.svg?height=400&width=400'),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', '/placeholder.svg?height=400&width=400'),
('g0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', '/placeholder.svg?height=400&width=400'),
('h0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', '/placeholder.svg?height=400&width=400')
ON CONFLICT (item_id, image_url) DO NOTHING;

-- Insert sample wishlists
INSERT INTO wishlists (user_id, item_id) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14')
ON CONFLICT (user_id, item_id) DO NOTHING;

-- Insert sample messages
INSERT INTO messages (sender_id, receiver_id, swap_id, content) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'Hi, I''m interested in your striped sweater! I can offer 55 points.'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'Sounds good! I''ll accept the offer. When can you arrange shipping?')
ON CONFLICT (sender_id, receiver_id, swap_id) DO NOTHING;

-- Insert sample reports
INSERT INTO reports (reporter_id, reported_item_id, reason, status) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'h0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Item condition not as described.', 'pending')
ON CONFLICT (reporter_id, reported_item_id) DO NOTHING;
