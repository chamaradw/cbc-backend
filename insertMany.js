import mongoose from 'mongoose';

// Your product data (JSON)
const products = 
[
  {
    "productId": "BC037",
    "productName": "Ceylon Jasmine Body Lotion",
    "altNames": ["Jasmine Lotion", "Sri Lankan Jasmine Lotion"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A luxurious body lotion infused with the essence of Ceylon Jasmine for a soft, smooth, and fragrant skin.",
    "price": 1200,
    "lastPrice": 1500,
    "discount": 20,
    "stock": 150,
    "ratings": 4.5,
    "totalReviews": 98,
    "images": ["https://britishcosmetics.lk/images/jasmine-lotion.jpg"],
    "ingredients": ["Jasmine Extract", "Coconut Oil", "Shea Butter"],
    "skinType": ["Dry", "Normal"],
    "shades": [],
    "expiryDate": "2026-06-15",
    "isFeatured": true,
    "isBestSeller": true,
    "tags": ["moisturizer", "jasmine", "body care"],
    "createdAt": "2025-02-01T10:00:00Z"
  },
  {
    "productId": "BC038",
    "productName": "Sri Lankan Turmeric Face Mask",
    "altNames": ["Turmeric Glow Mask", "Ceylon Turmeric Mask"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A face mask formulated with organic Ceylon turmeric to brighten, smoothen, and rejuvenate the skin.",
    "price": 800,
    "lastPrice": 1000,
    "discount": 20,
    "stock": 200,
    "ratings": 4.8,
    "totalReviews": 120,
    "images": ["https://britishcosmetics.lk/images/turmeric-mask.jpg"],
    "ingredients": ["Ceylon Turmeric", "Honey", "Aloe Vera"],
    "skinType": ["Oily", "Acne-Prone", "Normal"],
    "shades": [],
    "expiryDate": "2026-07-20",
    "isFeatured": true,
    "isBestSeller": true,
    "tags": ["face mask", "brightening", "turmeric"],
    "createdAt": "2025-02-01T10:10:00Z"
  },
  {
    "productId": "BC039",
    "productName": "Coconut & Lime Lip Balm",
    "altNames": ["Coconut Balm", "Lime Lip Care"],
    "brand": "British Cosmetics",
    "category": "Lip Care",
    "description": "A refreshing lip balm made with the natural goodness of coconut and lime to keep your lips hydrated and smooth.",
    "price": 300,
    "lastPrice": 400,
    "discount": 25,
    "stock": 350,
    "ratings": 4.7,
    "totalReviews": 60,
    "images": ["https://britishcosmetics.lk/images/coconut-lime-balm.jpg"],
    "ingredients": ["Coconut Oil", "Lime Extract", "Beeswax"],
    "skinType": ["All Skin Types"],
    "shades": [],
    "expiryDate": "2027-01-01",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["lip care", "hydrating", "coconut"],
    "createdAt": "2025-02-01T10:20:00Z"
  },
  {
    "productId": "BC040",
    "productName": "Ceylon Tea Green Shampoo",
    "altNames": ["Green Tea Shampoo", "Tea Shampoo"],
    "brand": "British Cosmetics",
    "category": "Hair Care",
    "description": "Revitalize your hair with the energizing Ceylon Tea Green Shampoo, designed to nourish and refresh.",
    "price": 950,
    "lastPrice": 1200,
    "discount": 21,
    "stock": 180,
    "ratings": 4.3,
    "totalReviews": 85,
    "images": ["https://britishcosmetics.lk/images/green-tea-shampoo.jpg"],
    "ingredients": ["Ceylon Green Tea", "Aloe Vera", "Ginseng"],
    "skinType": [],
    "shades": [],
    "expiryDate": "2026-08-10",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["shampoo", "hair care", "green tea"],
    "createdAt": "2025-02-01T10:30:00Z"
  },
  {
    "productId": "BC041",
    "productName": "Sandalwood Face Cream",
    "altNames": ["Sandalwood Moisturizer", "Ceylon Sandalwood Cream"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A soothing face cream enriched with the calming properties of Ceylon Sandalwood to hydrate and rejuvenate the skin.",
    "price": 1100,
    "lastPrice": 1300,
    "discount": 15,
    "stock": 120,
    "ratings": 4.6,
    "totalReviews": 95,
    "images": ["https://britishcosmetics.lk/images/sandalwood-cream.jpg"],
    "ingredients": ["Sandalwood", "Glycerin", "Vitamin E"],
    "skinType": ["Sensitive", "Dry"],
    "shades": [],
    "expiryDate": "2026-09-05",
    "isFeatured": true,
    "isBestSeller": false,
    "tags": ["face cream", "sandalwood", "moisturizing"],
    "createdAt": "2025-02-01T10:40:00Z"
  },
  {
    "productId": "BC042",
    "productName": "Ceylon Cinnamon Body Scrub",
    "altNames": ["Cinnamon Scrub", "Sri Lankan Cinnamon Scrub"],
    "brand": "British Cosmetics",
    "category": "Body Care",
    "description": "A body scrub infused with natural Ceylon Cinnamon for exfoliation and skin rejuvenation.",
    "price": 1500,
    "lastPrice": 1800,
    "discount": 16,
    "stock": 90,
    "ratings": 4.7,
    "totalReviews": 70,
    "images": ["https://britishcosmetics.lk/images/cinnamon-scrub.jpg"],
    "ingredients": ["Ceylon Cinnamon", "Sugar", "Coconut Oil"],
    "skinType": ["Normal", "Oily"],
    "shades": [],
    "expiryDate": "2026-04-20",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["scrub", "cinnamon", "exfoliating"],
    "createdAt": "2025-02-01T10:50:00Z"
  },
  {
    "productId": "BC043",
    "productName": "Coconut Milk Hand Cream",
    "altNames": ["Hand Moisturizer", "Coconut Hand Care"],
    "brand": "British Cosmetics",
    "category": "Hand Care",
    "description": "A nourishing hand cream made with coconut milk to keep hands soft and hydrated throughout the day.",
    "price": 600,
    "lastPrice": 700,
    "discount": 14,
    "stock": 300,
    "ratings": 4.9,
    "totalReviews": 55,
    "images": ["https://britishcosmetics.lk/images/coconut-milk-hand-cream.jpg"],
    "ingredients": ["Coconut Milk", "Aloe Vera", "Vitamin E"],
    "skinType": ["Dry", "Normal"],
    "shades": [],
    "expiryDate": "2026-12-15",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["hand cream", "coconut", "hydrating"],
    "createdAt": "2025-02-01T11:00:00Z"
  },
  {
    "productId": "BC044",
    "productName": "Sri Lankan Rose Facial Toner",
    "altNames": ["Rose Toner", "Ceylon Rose Toner"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A refreshing facial toner made with Ceylon Rose water to hydrate and balance the skin's pH.",
    "price": 750,
    "lastPrice": 900,
    "discount": 17,
    "stock": 220,
    "ratings": 4.4,
    "totalReviews": 110,
    "images": ["https://britishcosmetics.lk/images/rose-toner.jpg"],
    "ingredients": ["Ceylon Rose Water", "Witch Hazel", "Glycerin"],
    "skinType": ["Oily", "Combination"],
    "shades": [],
    "expiryDate": "2026-05-10",
    "isFeatured": true,
    "isBestSeller": false,
    "tags": ["facial toner", "rose water", "hydrating"],
    "createdAt": "2025-02-01T11:10:00Z"
  },
  {
    "productId": "BC045",
    "productName": "Ceylon Papaya Enzyme Peel",
    "altNames": ["Papaya Peel", "Sri Lankan Enzyme Mask"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A gentle enzyme peel that exfoliates the skin, revealing a radiant complexion using the power of papaya.",
    "price": 1300,
    "lastPrice": 1500,
    "discount": 13,
    "stock": 180,
    "ratings": 4.6,
    "totalReviews": 85,
    "images": ["https://britishcosmetics.lk/images/papaya-peel.jpg"],
    "ingredients": ["Papaya Extract", "Aloe Vera", "Vitamin C"],
    "skinType": ["All Skin Types"],
    "shades": [],
    "expiryDate": "2026-11-01",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["exfoliating", "papaya", "enzyme peel"],
    "createdAt": "2025-02-01T11:20:00Z"
  },
  {
    "productId": "BC046",
    "productName": "Ceylon Herbal Bath Salts",
    "altNames": ["Herbal Bath Soak", "Sri Lankan Bath Salt"],
    "brand": "British Cosmetics",
    "category": "Bath Care",
    "description": "Relax your body and mind with Ceylon Herbal Bath Salts, made with a blend of local herbs and minerals.",
    "price": 1100,
    "lastPrice": 1300,
    "discount": 15,
    "stock": 50,
    "ratings": 4.3,
    "totalReviews": 50,
    "images": ["https://britishcosmetics.lk/images/herbal-bath-salts.jpg"],
    "ingredients": ["Lavender", "Cinnamon", "Eucalyptus"],
    "skinType": [],
    "shades": [],
    "expiryDate": "2027-02-01",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["bath salts", "relaxing", "herbal"],
    "createdAt": "2025-02-01T11:30:00Z"
  },
  {
    "productId": "BC047",
    "productName": "Ceylon Aloe Vera Gel",
    "altNames": ["Aloe Vera Hydrating Gel", "Sri Lankan Aloe Gel"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A soothing aloe vera gel made with pure Ceylon Aloe to hydrate and refresh the skin.",
    "price": 850,
    "lastPrice": 1000,
    "discount": 15,
    "stock": 250,
    "ratings": 4.7,
    "totalReviews": 110,
    "images": ["https://britishcosmetics.lk/images/aloe-vera-gel.jpg"],
    "ingredients": ["Aloe Vera", "Coconut Oil", "Vitamin E"],
    "skinType": ["Dry", "Sensitive", "Normal"],
    "shades": [],
    "expiryDate": "2026-06-10",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["aloe vera", "hydrating", "soothing"],
    "createdAt": "2025-02-01T12:00:00Z"
  },
  {
    "productId": "BC048",
    "productName": "Ceylon Ginger Foot Cream",
    "altNames": ["Ginger Foot Care", "Sri Lankan Ginger Cream"],
    "brand": "British Cosmetics",
    "category": "Foot Care",
    "description": "A foot cream made with Ceylon Ginger to revitalize and soften tired feet.",
    "price": 950,
    "lastPrice": 1100,
    "discount": 14,
    "stock": 180,
    "ratings": 4.5,
    "totalReviews": 78,
    "images": ["https://britishcosmetics.lk/images/ginger-foot-cream.jpg"],
    "ingredients": ["Ceylon Ginger", "Shea Butter", "Peppermint"],
    "skinType": ["All Skin Types"],
    "shades": [],
    "expiryDate": "2026-07-15",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["foot care", "ginger", "revitalizing"],
    "createdAt": "2025-02-01T12:10:00Z"
  },
  {
    "productId": "BC049",
    "productName": "Coconut & Lavender Shampoo",
    "altNames": ["Coconut Shampoo", "Lavender Hair Care"],
    "brand": "British Cosmetics",
    "category": "Hair Care",
    "description": "A calming shampoo made with the blend of Ceylon coconut oil and lavender to nourish the scalp and hair.",
    "price": 950,
    "lastPrice": 1200,
    "discount": 21,
    "stock": 150,
    "ratings": 4.6,
    "totalReviews": 92,
    "images": ["https://britishcosmetics.lk/images/coconut-lavender-shampoo.jpg"],
    "ingredients": ["Coconut Oil", "Lavender", "Aloe Vera"],
    "skinType": [],
    "shades": [],
    "expiryDate": "2026-08-20",
    "isFeatured": true,
    "isBestSeller": false,
    "tags": ["shampoo", "hair care", "lavender"],
    "createdAt": "2025-02-01T12:20:00Z"
  },
  {
    "productId": "BC050",
    "productName": "Ceylon Black Tea Anti-Aging Serum",
    "altNames": ["Anti-Aging Tea Serum", "Black Tea Serum"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A rejuvenating serum packed with Ceylon Black Tea antioxidants to fight signs of aging and boost skin elasticity.",
    "price": 2200,
    "lastPrice": 2500,
    "discount": 12,
    "stock": 130,
    "ratings": 4.8,
    "totalReviews": 85,
    "images": ["https://britishcosmetics.lk/images/black-tea-serum.jpg"],
    "ingredients": ["Ceylon Black Tea", "Hyaluronic Acid", "Vitamin C"],
    "skinType": ["Mature", "Dry", "Normal"],
    "shades": [],
    "expiryDate": "2027-02-10",
    "isFeatured": true,
    "isBestSeller": false,
    "tags": ["anti-aging", "serum", "tea"],
    "createdAt": "2025-02-01T12:30:00Z"
  },
  {
    "productId": "BC051",
    "productName": "Papaya & Honey Face Scrub",
    "altNames": ["Papaya Scrub", "Honey Facial Exfoliant"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A gentle exfoliating scrub with papaya and honey to brighten and smooth the skin.",
    "price": 950,
    "lastPrice": 1200,
    "discount": 21,
    "stock": 200,
    "ratings": 4.4,
    "totalReviews": 60,
    "images": ["https://britishcosmetics.lk/images/papaya-honey-scrub.jpg"],
    "ingredients": ["Papaya", "Honey", "Sugar"],
    "skinType": ["All Skin Types"],
    "shades": [],
    "expiryDate": "2026-09-05",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["exfoliating", "scrub", "papaya"],
    "createdAt": "2025-02-01T12:40:00Z"
  },
  {
    "productId": "BC052",
    "productName": "Sri Lankan Cinnamon Lip Scrub",
    "altNames": ["Cinnamon Lip Exfoliant", "Ceylon Lip Scrub"],
    "brand": "British Cosmetics",
    "category": "Lip Care",
    "description": "A sweet and spicy cinnamon lip scrub that exfoliates and nourishes dry lips.",
    "price": 400,
    "lastPrice": 500,
    "discount": 20,
    "stock": 300,
    "ratings": 4.3,
    "totalReviews": 105,
    "images": ["https://britishcosmetics.lk/images/cinnamon-lip-scrub.jpg"],
    "ingredients": ["Ceylon Cinnamon", "Sugar", "Honey"],
    "skinType": ["Dry"],
    "shades": [],
    "expiryDate": "2026-11-10",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["lip scrub", "cinnamon", "exfoliating"],
    "createdAt": "2025-02-01T12:50:00Z"
  },
  {
    "productId": "BC053",
    "productName": "Ceylon Sandalwood Bath Oil",
    "altNames": ["Sandalwood Body Oil", "Sri Lankan Bath Oil"],
    "brand": "British Cosmetics",
    "category": "Body Care",
    "description": "A soothing bath oil made with pure Ceylon Sandalwood to moisturize and calm your skin.",
    "price": 1500,
    "lastPrice": 1800,
    "discount": 17,
    "stock": 100,
    "ratings": 4.6,
    "totalReviews": 92,
    "images": ["https://britishcosmetics.lk/images/sandalwood-bath-oil.jpg"],
    "ingredients": ["Ceylon Sandalwood", "Jojoba Oil", "Lavender"],
    "skinType": ["Sensitive", "Normal"],
    "shades": [],
    "expiryDate": "2027-03-15",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["bath oil", "sandalwood", "moisturizing"],
    "createdAt": "2025-02-01T13:00:00Z"
  },
  {
    "productId": "BC054",
    "productName": "Sri Lankan Rose Water Toner",
    "altNames": ["Rose Toner", "Ceylon Rose Hydration"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A gentle facial toner made with Ceylon Rose Water to tone and hydrate the skin, leaving a refreshing scent.",
    "price": 750,
    "lastPrice": 900,
    "discount": 16,
    "stock": 300,
    "ratings": 4.5,
    "totalReviews": 130,
    "images": ["https://britishcosmetics.lk/images/rose-water-toner.jpg"],
    "ingredients": ["Ceylon Rose Water", "Aloe Vera", "Witch Hazel"],
    "skinType": ["Oily", "Sensitive"],
    "shades": [],
    "expiryDate": "2026-12-01",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["toner", "rose water", "hydrating"],
    "createdAt": "2025-02-01T13:10:00Z"
  },
  {
    "productId": "BC055",
    "productName": "Ceylon Mint & Lime Foot Scrub",
    "altNames": ["Mint Foot Care", "Lime Exfoliating Scrub"],
    "brand": "British Cosmetics",
    "category": "Foot Care",
    "description": "An invigorating foot scrub with a refreshing blend of mint and lime to remove dead skin and refresh tired feet.",
    "price": 700,
    "lastPrice": 850,
    "discount": 18,
    "stock": 220,
    "ratings": 4.4,
    "totalReviews": 115,
    "images": ["https://britishcosmetics.lk/images/mint-lime-foot-scrub.jpg"],
    "ingredients": ["Mint", "Lime", "Sugar"],
    "skinType": [],
    "shades": [],
    "expiryDate": "2026-06-25",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["foot scrub", "mint", "lime"],
    "createdAt": "2025-02-01T13:20:00Z"
  },
  {
    "productId": "BC056",
    "productName": "Ceylon Coconut Soap Bar",
    "altNames": ["Coconut Soap", "Sri Lankan Soap"],
    "brand": "British Cosmetics",
    "category": "Body Care",
    "description": "A moisturizing soap bar made with organic Ceylon Coconut Oil to cleanse and hydrate the skin.",
    "price": 350,
    "lastPrice": 450,
    "discount": 22,
    "stock": 400,
    "ratings": 4.2,
    "totalReviews": 80,
    "images": ["https://britishcosmetics.lk/images/coconut-soap-bar.jpg"],
    "ingredients": ["Ceylon Coconut Oil", "Glycerin", "Olive Oil"],
    "skinType": ["Dry", "Sensitive"],
    "shades": [],
    "expiryDate": "2027-01-15",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["soap", "coconut", "moisturizing"],
    "createdAt": "2025-02-01T13:30:00Z"
  },
  {
    "productId": "BC057",
    "productName": "Ceylon Turmeric Brightening Mask",
    "altNames": ["Turmeric Face Mask", "Ceylon Skin Brightening"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A brightening face mask with Ceylon Turmeric to reduce dark spots and enhance skin radiance.",
    "price": 1200,
    "lastPrice": 1400,
    "discount": 14,
    "stock": 180,
    "ratings": 4.6,
    "totalReviews": 95,
    "images": ["https://britishcosmetics.lk/images/turmeric-brightening-mask.jpg"],
    "ingredients": ["Ceylon Turmeric", "Honey", "Kaolin Clay"],
    "skinType": ["Normal", "Oily", "Combination"],
    "shades": [],
    "expiryDate": "2026-08-15",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["brightening", "turmeric", "face mask"],
    "createdAt": "2025-02-01T13:40:00Z"
  },
  {
    "productId": "BC058",
    "productName": "Sri Lankan Tea Tree Acne Gel",
    "altNames": ["Tea Tree Gel", "Acne Spot Treatment"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A powerful acne gel made with Sri Lankan Tea Tree Oil to combat blemishes and reduce inflammation.",
    "price": 950,
    "lastPrice": 1100,
    "discount": 14,
    "stock": 250,
    "ratings": 4.5,
    "totalReviews": 120,
    "images": ["https://britishcosmetics.lk/images/tea-tree-acne-gel.jpg"],
    "ingredients": ["Tea Tree Oil", "Aloe Vera", "Salicylic Acid"],
    "skinType": ["Oily", "Acne-Prone", "Combination"],
    "shades": [],
    "expiryDate": "2026-07-25",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["acne treatment", "tea tree", "spot treatment"],
    "createdAt": "2025-02-01T13:50:00Z"
  },
  {
    "productId": "BC059",
    "productName": "Ceylon Rose & Jasmine Body Scrub",
    "altNames": ["Rose Jasmine Scrub", "Ceylon Body Exfoliant"],
    "brand": "British Cosmetics",
    "category": "Body Care",
    "description": "A luxurious body scrub made with Ceylon Rose and Jasmine to exfoliate and moisturize the skin.",
    "price": 1200,
    "lastPrice": 1500,
    "discount": 20,
    "stock": 180,
    "ratings": 4.8,
    "totalReviews": 95,
    "images": ["https://britishcosmetics.lk/images/rose-jasmine-body-scrub.jpg"],
    "ingredients": ["Rose Petals", "Jasmine", "Sugar", "Coconut Oil"],
    "skinType": ["All Skin Types"],
    "shades": [],
    "expiryDate": "2026-11-10",
    "isFeatured": true,
    "isBestSeller": false,
    "tags": ["scrub", "rose", "jasmine"],
    "createdAt": "2025-02-01T14:00:00Z"
  },
  {
    "productId": "BC060",
    "productName": "Coconut & Cinnamon Hand Cream",
    "altNames": ["Cinnamon Hand Care", "Ceylon Coconut Cream"],
    "brand": "British Cosmetics",
    "category": "Hand Care",
    "description": "A nourishing hand cream with Ceylon Cinnamon and Coconut to hydrate and repair dry hands.",
    "price": 800,
    "lastPrice": 950,
    "discount": 16,
    "stock": 300,
    "ratings": 4.4,
    "totalReviews": 78,
    "images": ["https://britishcosmetics.lk/images/coconut-cinnamon-hand-cream.jpg"],
    "ingredients": ["Coconut Oil", "Cinnamon", "Shea Butter"],
    "skinType": ["Dry", "Sensitive"],
    "shades": [],
    "expiryDate": "2026-09-05",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["hand cream", "cinnamon", "coconut"],
    "createdAt": "2025-02-01T14:10:00Z"
  },
  {
    "productId": "BC061",
    "productName": "Ceylon Lavender Sleep Mask",
    "altNames": ["Lavender Sleep Mask", "Ceylon Sleep Treatment"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A soothing sleep mask with Ceylon Lavender that helps relax and rejuvenate the skin overnight.",
    "price": 1800,
    "lastPrice": 2200,
    "discount": 18,
    "stock": 150,
    "ratings": 4.7,
    "totalReviews": 112,
    "images": ["https://britishcosmetics.lk/images/lavender-sleep-mask.jpg"],
    "ingredients": ["Ceylon Lavender", "Hyaluronic Acid", "Vitamin E"],
    "skinType": ["Dry", "Sensitive", "Normal"],
    "shades": [],
    "expiryDate": "2027-01-15",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["sleep mask", "lavender", "relaxing"],
    "createdAt": "2025-02-01T14:20:00Z"
  },
  {
    "productId": "BC062",
    "productName": "Ceylon Cinnamon Face Cleanser",
    "altNames": ["Cinnamon Facial Cleanser", "Sri Lankan Face Wash"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A refreshing face cleanser made with Ceylon Cinnamon to cleanse and balance the skin.",
    "price": 900,
    "lastPrice": 1100,
    "discount": 18,
    "stock": 220,
    "ratings": 4.5,
    "totalReviews": 88,
    "images": ["https://britishcosmetics.lk/images/cinnamon-face-cleanser.jpg"],
    "ingredients": ["Ceylon Cinnamon", "Honey", "Glycerin"],
    "skinType": ["Oily", "Combination", "Normal"],
    "shades": [],
    "expiryDate": "2026-10-30",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["cleanser", "cinnamon", "face wash"],
    "createdAt": "2025-02-01T14:30:00Z"
  },
  {
    "productId": "BC063",
    "productName": "Ceylon Green Tea Brightening Serum",
    "altNames": ["Green Tea Serum", "Sri Lankan Brightening Serum"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A serum infused with Ceylon Green Tea to brighten and protect the skin from environmental stress.",
    "price": 2200,
    "lastPrice": 2500,
    "discount": 12,
    "stock": 140,
    "ratings": 4.9,
    "totalReviews": 98,
    "images": ["https://britishcosmetics.lk/images/green-tea-brightening-serum.jpg"],
    "ingredients": ["Ceylon Green Tea", "Vitamin C", "Hyaluronic Acid"],
    "skinType": ["Oily", "Normal", "Combination"],
    "shades": [],
    "expiryDate": "2027-04-20",
    "isFeatured": true,
    "isBestSeller": true,
    "tags": ["brightening", "serum", "green tea"],
    "createdAt": "2025-02-01T14:40:00Z"
  },
  {
    "productId": "BC064",
    "productName": "Ceylon Jasmine & Coconut Body Lotion",
    "altNames": ["Jasmine Body Lotion", "Coconut Lotion"],
    "brand": "British Cosmetics",
    "category": "Body Care",
    "description": "A hydrating body lotion made with Ceylon Jasmine and Coconut to nourish and smooth the skin.",
    "price": 950,
    "lastPrice": 1100,
    "discount": 14,
    "stock": 280,
    "ratings": 4.5,
    "totalReviews": 105,
    "images": ["https://britishcosmetics.lk/images/jasmine-coconut-body-lotion.jpg"],
    "ingredients": ["Ceylon Jasmine", "Coconut Oil", "Shea Butter"],
    "skinType": ["Dry", "Normal", "Sensitive"],
    "shades": [],
    "expiryDate": "2026-12-05",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["body lotion", "jasmine", "coconut"],
    "createdAt": "2025-02-01T14:50:00Z"
  },
  {
    "productId": "BC065",
    "productName": "Ceylon Sandalwood & Vanilla Face Cream",
    "altNames": ["Sandalwood Face Cream", "Vanilla Cream"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A soothing face cream with Ceylon Sandalwood and Vanilla to hydrate and calm sensitive skin.",
    "price": 1300,
    "lastPrice": 1600,
    "discount": 19,
    "stock": 150,
    "ratings": 4.6,
    "totalReviews": 110,
    "images": ["https://britishcosmetics.lk/images/sandalwood-vanilla-face-cream.jpg"],
    "ingredients": ["Ceylon Sandalwood", "Vanilla Extract", "Shea Butter"],
    "skinType": ["Sensitive", "Dry"],
    "shades": [],
    "expiryDate": "2026-09-25",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["face cream", "sandalwood", "vanilla"],
    "createdAt": "2025-02-01T15:00:00Z"
  },
  {
    "productId": "BC066",
    "productName": "Ceylon Green Tea Anti-Aging Serum",
    "altNames": ["Green Tea Anti-Aging", "Sri Lankan Age-Defying Serum"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "An anti-aging serum with Ceylon Green Tea to reduce fine lines and improve skin elasticity.",
    "price": 2400,
    "lastPrice": 2700,
    "discount": 11,
    "stock": 130,
    "ratings": 4.8,
    "totalReviews": 135,
    "images": ["https://britishcosmetics.lk/images/green-tea-anti-aging-serum.jpg"],
    "ingredients": ["Ceylon Green Tea", "Hyaluronic Acid", "Vitamin E"],
    "skinType": ["Mature", "Oily", "Normal"],
    "shades": [],
    "expiryDate": "2027-03-01",
    "isFeatured": true,
    "isBestSeller": true,
    "tags": ["anti-aging", "green tea", "serum"],
    "createdAt": "2025-02-01T15:10:00Z"
  },
  {
    "productId": "BC067",
    "productName": "Ceylon Rose Water Facial Toner",
    "altNames": ["Rose Toner", "Ceylon Rose Mist"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A refreshing facial toner made with Ceylon Rose Water to balance and hydrate the skin.",
    "price": 750,
    "lastPrice": 950,
    "discount": 21,
    "stock": 200,
    "ratings": 4.3,
    "totalReviews": 88,
    "images": ["https://britishcosmetics.lk/images/rose-water-facial-toner.jpg"],
    "ingredients": ["Ceylon Rose Water", "Aloe Vera", "Glycerin"],
    "skinType": ["Sensitive", "Dry", "Normal"],
    "shades": [],
    "expiryDate": "2026-05-10",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["toner", "rose water", "hydrating"],
    "createdAt": "2025-02-01T15:20:00Z"
  },
  {
    "productId": "BC068",
    "productName": "Ceylon Mango & Honey Body Butter",
    "altNames": ["Mango Body Butter", "Honey Body Butter"],
    "brand": "British Cosmetics",
    "category": "Body Care",
    "description": "A rich body butter with Ceylon Mango and Honey to deeply nourish and moisturize the skin.",
    "price": 1500,
    "lastPrice": 1700,
    "discount": 12,
    "stock": 170,
    "ratings": 4.7,
    "totalReviews": 120,
    "images": ["https://britishcosmetics.lk/images/mango-honey-body-butter.jpg"],
    "ingredients": ["Ceylon Mango", "Honey", "Shea Butter"],
    "skinType": ["Dry", "Normal"],
    "shades": [],
    "expiryDate": "2027-02-10",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["body butter", "mango", "honey"],
    "createdAt": "2025-02-01T15:30:00Z"
  }
]


// Define the Mongoose Product schema
const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  altNames: [{ type: String }],
  images: [{ type: String }],
  price: { type: Number, required: true },
  lastPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb+srv://db:801023@cluster0.1tsq9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    // Insert multiple documents at once
    Product.insertMany(products)
      .then((docs) => {
        console.log('Products inserted successfully:', docs);
        mongoose.connection.close(); // Close the connection
      })
      .catch((error) => {
        console.error('Error inserting products:', error);
        mongoose.connection.close(); // Close the connection in case of error
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
