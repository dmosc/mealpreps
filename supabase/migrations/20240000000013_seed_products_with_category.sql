-- Seed Products table with normalized names and categories, using correct units and quantities

INSERT INTO public.products (name, price, units, quantity, description, category)
VALUES
-- Breakfast
('Eggs w/ Avocado Toast', 8.00, 'plate', 1, 'Eggs served over avocado toast', 'breakfast'),
('Egg Skillet w/ Ground Beef & Veggies', 8.00, 'plate', 1, 'Egg skillet with ground beef and sautéed veggies', 'breakfast'),
('Egg Sandwich', 7.00, 'sandwich', 1, 'Egg sandwich on wheat bread or bagel', 'breakfast'),
('Omelet w/ Veggies', 8.00, 'plate', 1, 'Omelet with assorted vegetables', 'breakfast'),
('Burrito w/ Beans & Pico de Gallo', 8.00, 'burrito', 1, 'Egg burrito with beans and pico de gallo', 'breakfast'),
('Huevos Rancheros', 8.00, 'plate', 1, 'Mexican huevos rancheros', 'breakfast'),
('Tortilla Española', 8.00, 'plate', 1, 'Spanish-style potato omelet', 'breakfast'),
('Pancakes', 7.00, 'pancake', 3, 'Three pancakes, add protein for $2', 'breakfast'),
('Toast w/ Almond Butter & Fruit', 6.00, 'slice', 1, 'Toast with almond butter and fruit', 'breakfast'),
('Greek Yogurt', 6.00, 'cup', 1, '20oz Greek yogurt', 'breakfast'),
('Chia Pudding', 8.00, 'cup', 1, '12oz chia pudding, low-sugar, low-calorie', 'breakfast'),
('Overnight Oats', 7.00, 'cup', 1, '12oz overnight oats, low-sugar, low-calorie', 'breakfast'),

-- Entrees
('Bowl w/ Salmon & Rice', 18.00, 'bowl', 1, 'Grilled salmon with rice', 'entree'),
('Bowl w/ Chicken & Rice', 15.00, 'bowl', 1, 'Grilled chicken with rice', 'entree'),
('Bowl w/ Second Protein & Rice', 17.00, 'bowl', 1, 'Choice of second protein with rice', 'entree'),
('Bowl w/ Ground Beef & Rice', 15.00, 'bowl', 1, 'Ground beef with rice', 'entree'),
('Bowl w/ Tilapia & Rice', 16.00, 'bowl', 1, 'Tilapia with rice', 'entree'),
('Bowl w/ Grilled Steak & Rice', 18.00, 'bowl', 1, 'Grilled steak with rice', 'entree'),
('Bowl w/ Tuna, Mayo & Pico de Gallo', 17.00, 'bowl', 1, 'Tuna with light mayo and pico de gallo', 'entree'),
('Bowl w/ Scrambled Eggs', 14.00, 'bowl', 1, 'Scrambled eggs bowl', 'entree'),
('Custom Bowl', 15.00, 'bowl', 1, 'Base: Pasta or Rice, add-ons of choice', 'entree'),
('Chicken w/ Mole & Rice', 16.00, 'plate', 1, 'Chicken with mole sauce and rice', 'entree'),
('Enchiladas w/ Chicken', 16.00, 'enchilada', 5, 'Five chicken enchiladas', 'entree'),
('Enchiladas w/ Cheese', 16.00, 'enchilada', 5, 'Five cheese enchiladas', 'entree'),
('Chicken Tikka Masala w/ Rice', 17.00, 'plate', 1, 'Chicken tikka masala with rice', 'entree'),
('Tinga de Pollo', 16.00, 'plate', 1, 'Mexican tinga de pollo', 'entree'),
('Spinach & Cheese Stuffed Chicken Breasts', 17.00, 'breast', 2, 'Two stuffed chicken breasts', 'entree'),
('Colombian Empanadas', 15.00, 'empanada', 3, 'Three empanadas (chicken, beef, or cheese)', 'entree'),
('Chicken Salad w/ Nuts & Grapes', 14.00, 'plate', 1, 'Chicken salad with nuts and grapes', 'entree'),
('Cuban Ropa Vieja', 17.00, 'plate', 1, 'Cuban ropa vieja', 'entree'),
('Venezuelan Pabellón Criollo', 17.00, 'plate', 1, 'Venezuelan pabellón criollo', 'entree'),
('Korean BBQ Beef Bowl', 17.00, 'bowl', 1, 'Korean BBQ beef bowl', 'entree'),
('Southwest Salad w/ Chicken', 14.00, 'bowl', 1, 'Southwest salad with chicken', 'entree'),
('Poke Bowl w/ Salmon', 17.00, 'bowl', 1, 'Salmon poke bowl with cucumber, mango, edamame', 'entree'),
('Tuna Salad w/ Nuts & Pico de Gallo', 14.00, 'bowl', 1, 'Tuna salad with nuts, pico de gallo, corn & peas', 'entree'),
('Sushi Roll', 16.00, 'roll', 1, 'Sushi roll', 'entree'),
('Fresh Salad w/ Fruit, Veggies & Dressing', 13.00, 'bowl', 1, 'Fresh salad with fruit, veggies, and dressing', 'entree'),
('Batches', 12.00, 'cup', 2, 'Two 1lb cups per order', 'entree'),

-- Sandwiches
('Smashed Burger w/ Tomato, Cheese & Pickles', 13.00, 'burger', 1, 'Hand-made burger with tomato, cheese & pickles', 'sandwich'),
('Caprese Sandwich', 12.00, 'sandwich', 1, 'Caprese sandwich', 'sandwich'),
('Chicken Breast Sandwich', 13.00, 'sandwich', 1, 'Hand-breaded chicken breast sandwich', 'sandwich'),
('Grilled Cheese Melt Sandwich', 12.00, 'sandwich', 1, '3-cheese melt grilled sandwich', 'sandwich'),
('Egg Sandwich', 7.00, 'sandwich', 1, 'Egg sandwich (wheat bread or bagel)', 'sandwich'),

-- Flatbreads
('Flatbread Margherita', 12.00, 'flatbread', 1, 'Margherita flatbread', 'flatbread'),
('Flatbread Pepperoni w/ 2 Sides', 13.00, 'flatbread', 1, 'Pepperoni flatbread with 2 sides', 'flatbread'),
('Flatbread Vegetarian', 12.00, 'flatbread', 1, 'Vegetarian flatbread', 'flatbread'),

-- Desserts
('Banana Bread Loaf', 15.00, 'loaf', 1, 'Homemade banana bread loaf', 'dessert'),
('Banana Bread Slice', 4.00, 'slice', 1, 'Homemade banana bread slice', 'dessert'),
('Chocoflan', 5.00, 'slice', 1, 'Chocoflan dessert', 'dessert'),
('Alfajores w/ Dulce de Leche', 5.00, 'piece', 1, 'Alfajores with dulce de leche', 'dessert'),
('Empanadas w/ Fruit or Cajeta', 5.00, 'empanada', 2, 'Two empanadas with fruit or cajeta filling', 'dessert'),
('Cacao Covered Apple Slices', 4.00, 'slice', 4, 'Four cacao covered apple slices', 'dessert'),
('Cacao Covered Banana Slices', 4.00, 'slice', 4, 'Four cacao covered banana slices', 'dessert'),
('Cinnamon Roll', 5.00, 'roll', 1, 'Cinnamon roll', 'dessert'),
('Carrot Cake', 5.00, 'slice', 1, 'Carrot cake', 'dessert'),
('Assorted Fruit w/ Chamoy & Tajin', 5.00, 'cup', 1, 'Assorted fruit with chamoy & tajin', 'dessert'),
('Sweet Fruit Salad', 5.00, 'cup', 1, 'Sweet fruit salad with condensed milk, cherry sauce & nuts', 'dessert'),
('Mexican Street Corn', 4.00, 'ear', 1, 'Mexican street corn with light mayo, lime, tajin', 'dessert'),
('Agua Fresca Jamaica', 3.00, 'cup', 1, 'Agua fresca, Jamaica flavor', 'dessert'),
('Dubai Pistachio Chocolate Cookie', 5.00, 'cookie', 1, 'Dubai pistachio chocolate cookie', 'dessert'); 