const vipGuide = {
  pageTitle: "VIP Tour Dining Guide",
  pageSubtitle: "A Curated Guide for the Discerning Traveler",
  viewMap: "View Map",

  // Section headers
  menu: "Menu:",
  price: "Price:",
  hours: "Hours:",
  atmosphere: "Atmosphere",
  gourmetReview: "Gourmet Review",

  // Section titles
  sections: {
    yesan: "Near Yesan Apple Wine",
    sinpyeong: "Near Sinpyeong Brewery",
    cheonbi: "Near JoeunSul Cheonbihyang",
  },

  // Restaurant information
  restaurants: {
    // Near Yesan Apple Wine
    sumokGarden: {
      name: "Sumok Garden",
      menu: "Grilled Pork Galbi, Mushroom Hot Pot",
      price: "$11 - $18 (p.p.)",
      hours: "11:00 - 21:00 (Closed Mondays)",
      atmosphere:
        "With its spacious and clean interior, it's well-suited for family meals or group gatherings. Equipped with a private parking lot and high chairs for infants, it provides everything needed for a comfortable and classic Korean dining experience.",
      review:
        "'Sumok Garden' is the most reliable choice for experiencing Korea's warm family dining culture. Its signature dish, 'Dwaeji Seokgalbi' (Pork Ribs on a Stone Plate), is grilled to perfection in the kitchen and served on a hot stone plate, allowing you to enjoy a perfectly cooked meal without the hassle of grilling at the table. The well-marinated pork boasts a tender texture and savory flavor, while the accompanying 'Mushroom Hot Pot' offers a deep, refreshing broth made from fresh vegetables and mushrooms. It is an ideal place for multiple generations to gather for a comfortable and satisfying meal.",
    },
    godeokGalbi: {
      name: "Godeok Galbi",
      menu: "Marinated Hanwoo Beef Ribs",
      price: "~ $32 (p.p.)",
      hours: "11:00 - 20:00 (Closed on major holidays)",
      atmosphere:
        "Described as having a 'hearty, old-fashioned feel,' this place exudes a traditional atmosphere steeped in history. The interior, filled with the heat of charcoal briquettes, is always bustling with customers, yet it's spacious and well-maintained for comfortable dining. It's more than just a restaurant; the entire space seems imbued with the artisan's dedication and pride in the single dish of Hanwoo galbi.",
      review:
        "'Godeok Galbi' is a sanctuary for gourmets who savor the authentic taste of premium Hanwoo beef. Marinated in a secret sauce passed down for over 30 years, the ribs have a subtle sweetness that maximizes the meat's aroma, enhanced by a deep smoky flavor from the hot briquette grill. The fat is meticulously removed, leaving only lean meat that melts in your mouth, offering an exquisite texture. The high price reflects the value of premium ingredients and decades of perfected craftsmanship, promising more than satisfaction for those who wish to experience the true essence of grilled Hanwoo.",
    },
    yugane: {
      name: "Yugane",
      menu: "Loach Soup, Pork Back-bone Stew",
      price: "~ $8 (p.p.)",
      hours: "06:00-20:00 (Sat: ~15:00)",
      atmosphere:
        "This is a typical Korean working-class restaurant that opens early to serve hearty soups. The space focuses on functionality over flair and is a favorite spot for locals seeking to restore their energy. Known as a 'hidden gem,' it completes a generous meal with neat, home-style side dishes.",
      review:
        "'Yugane Chueotang' offers the most authentic taste of Korea to the adventurous gourmet. Its signature dish, 'Chueotang' (Loach Soup), is a representative Korean health food made by boiling finely ground loach. It has a savory, rich flavor without any fishiness. Adding perilla seed powder and prickly ash powder to taste enhances its depth. The popular 'Ppyeohaejangguk' (Pork Back-bone Stew) is also excellent, with a rich, spicy broth from long-simmered pork spine. Starting the day with a hot bowl of soup here will be a more special and memorable experience than any hotel breakfast.",
    },
    seongmi: {
      name: "Seongmi Sikdang",
      menu: "Cold Soy Milk Noodle (Summer), Noodle Soup (Winter)",
      price: "~ $7 (p.p.)",
      hours: "-",
      atmosphere:
        "This place showcases the essence of a 'true old restaurant' known only to locals. As a small eatery run by the owner alone, the unadorned, simple space makes you focus solely on the taste of the food. The atmosphere feels less like a commercial restaurant and more like a special invitation to a master chef's small, private kitchen.",
      review:
        "'Seongmi Sikdang' demonstrates the pinnacle of specialization by focusing on only two seasonal menus. The summer delicacy, 'Kong-guksu' (Cold Soy Milk Noodle Soup), is made with soybeans ground by hand in a millstone, competing only with the deep, nutty flavor of the beans themselves, without any artificial sweetness. The thick yet smooth soy milk broth instantly captivates a palate weary from the heat. The winter's 'Kalguksu' (Noodle Soup) offers a simple yet deeply comforting taste, harmonizing a warm, clear anchovy broth with chewy, hand-kneaded and hand-cut noodles. A meal here is more than a culinary experience; it's like tasting the philosophy of a master who has dedicated a lifetime to a single dish.",
    },
    yaksangol: {
      name: "Yaksangol",
      menu: "Scorched Rice & Whole Chicken Soup",
      price: "~ $14 (p.p.)",
      hours: "Reservation required (Closed Mondays)",
      atmosphere:
        "Nestled in a serene and tranquil Hanok (traditional Korean house), you can enjoy a peaceful time throughout your meal. It is the perfect place for special family gatherings or entertaining important guests, where you can appreciate traditional Korean beauty while enjoying healthy food.",
      review:
        "'Yaksangol' is where you can experience 'Baeksuk,' a representative Korean health food and communal dish, in the most traditional setting. The whole chicken, simmered for a long time, is extremely tender, and the clean, light broth soothes both body and soul. The true delight of this dish is the 'Nurungji' (scorched rice), which is added to the pot and boiled as you finish the chicken. The savory nurungji absorbs the chicken broth, creating a soft yet chewy texture and a completely different dimension of flavor. Sharing this chicken soup in the ambiance of a Hanok is more than just a meal; it's a time to experience the warm Korean sentiment of wishing for health and happiness.",
    },
    ttosunne: {
      name: "Ttosunne",
      menu: "Spicy Beltfish Stew, Fermented Soybean Stew",
      price: "~ $7 (p.p.)",
      hours: "07:00 - 20:00 (Closed Mondays)",
      atmosphere:
        "A humble local restaurant located near the Deoksan Hot Springs tourist area, focusing on the taste of the food rather than a fancy interior. It serves rare regional dishes not easily found elsewhere, attracting a steady stream of visitors seeking a true local culinary experience.",
      review:
        "'Ttosunne Sikdang' is where you can most intensely experience the food culture of the Yesan region. The signature dish, 'Bandaengi-jjigae' (Spicy Beltfish Stew), is a spicy stew made with beltfish, a small fish from the West Sea. It's spicy at first but followed by a deep, savory flavor. The beltfish has tough bones, so you must carefully debone it, but its unique and charming taste is worth the effort. Wrapping the fish and rice in the provided lettuce leaves neutralizes the spiciness and enriches the flavor. It's an unforgettable local taste that true culinary adventurers must try.",
    },
    sagwanamu: {
      name: "Sagwanamu",
      menu: "Barley Rice w/ Vegetables, Pork Cutlet",
      price: "~ $9 (p.p.)",
      hours: "10:00 - 15:00 (Closed Mondays)",
      atmosphere:
        "A charming space resembling a renovated old country house, creating a pastoral atmosphere with its beautiful garden, swing, and cozy, rustic interior. It's very popular, so long waits can occur, but even the wait is a pleasant experience thanks to a pretty waiting area and an adjacent cafe. The owner's kind and cheerful service adds to its charm.",
      review:
        "'Sagwanamu' is the ideal place for a perfect lunch in the countryside. The short business hours and long queues prove it's a 'worth the wait' restaurant. The signature 'Barley Rice with Vegetables' offers a healthy and comforting taste, combining fresh seasonal greens with a rich, homemade-style soybean paste stew. A surprisingly popular dish is the 'Sagwanamu Pork Cutlet,' an old-fashioned Western-style cutlet with tender meat and a sweet sauce. The unexpected combination of traditional Korean barley rice and Western-style pork cutlet is a unique charm of this restaurant, making it a wise choice that can satisfy everyone in a group with diverse tastes.",
    },

    // Near Sinpyeong Brewery
    ureongi: {
      name: "Ureongi Baksa",
      menu: "River Snail & Veggie Wraps Set",
      price: "$7 - $11 (p.p.)",
      hours: "08:00 - 19:30 (Open Daily)",
      atmosphere:
        "Always bustling with locals and tourists alike. The atmosphere is informal and down-to-earth, focused on the joy of sharing a generous meal.",
      review:
        "'Ureongi Baksa' is the best place to experience Korea's 'ssam' (wrap) culture in a delicious and healthy way. The key ingredient, 'ureongi' (river snail), has a pleasantly chewy texture and is served cleanly without any earthy taste. The moment you wrap the savory, soybean paste-based 'ureong ssamjang' or the spicy 'ureong deokjang' with freshly cooked rice and fresh greens, a festival of healthy flavors unfolds in your mouth. This is a must-visit spot for Dangjin's culinary tour, offering the best opportunity to immerse yourself in a unique regional specialty in a lively atmosphere.",
    },
    junine: {
      name: "Junine Bunsik",
      menu: "Spicy Stir-fried Pork, Bibimbap",
      price: "~ $7 (p.p.)",
      hours: "10:00 - 21:00 (Open Daily)",
      atmosphere:
        "A humble 'bunsik-jip' (snack restaurant) that serves affordable and tasty food. The space is more functional than fancy, frequented by locals looking for a quick and satisfying meal.",
      review:
        "'Junine Bunsik' offers an honest taste that provides a glimpse into the simple daily life of Koreans. 'Bunsik' is an important part of Korean dining culture, and this place faithfully serves some of its most popular dishes. The 'Jeyuk-bokkeum' (spicy stir-fried pork) with its sweet and spicy sauce is a beloved 'rice thief' for all ages, and the 'Bibimbap' is excellent with its harmony of fresh vegetables and gochujang. A particularly useful piece of information for visitors with various dietary needs is that dishes can be made vegan upon simple request. It is recommended for those who want to experience unpretentious and sincere Korean home-style cooking.",
    },
    annyeongHambak: {
      name: "Annyeong Hambak",
      menu: "Hamburg Steak, Pork Cutlet",
      price: "$7 - $9 (p.p.)",
      hours: "11:00-20:00 (Sun: ~14:00), Closed Mondays",
      atmosphere:
        "A small but stylish and charming 'trendy eatery' with a cafe-like atmosphere. The open kitchen instills confidence in its hygiene, and the clean, cozy interior provides a comfortable dining experience.",
      review:
        "'Annyeong Hambak' is a welcome discovery, like a gem found in a country village. It's a perfect alternative when you want a break from traditional Korean food, serving high-quality Japanese-Western home-style cuisine. The signature dishes are the 'Hamburg Steak,' with its juicy, thick patty, and the 'Ansim-katsu' (pork tenderloin cutlet), which stands out for its tender meat inside a crispy coating. The 'Spicy Cream Pasta,' adding a kick to a savory cream sauce, is a specialty recommended by many. It's an ideal place for couples or small groups looking for a quiet, stylish meal.",
    },
    cheonggiwa: {
      name: "Cheonggiwa Garden",
      menu: "Hot Stone Pot Rice Set",
      price: "$6 - $14 (p.p.)",
      hours: "09:30 - 22:00 (Closed Sundays)",
      atmosphere:
        "A restaurant with an old-fashioned and historic atmosphere, converted from an old house. It is renowned among locals for serving so many delicious side dishes that the 'table legs might break.'",
      review:
        "'Cheonggiwa Garden' is where you can experience Korea's generous hospitality and the essence of 'Hanjeongsik' (Korean table d'hôte). The protagonist here is not simply the rice served in a hot stone pot, but the magnificent feast of side dishes that fill the table. Dozens of side dishes carefully made with seasonal ingredients each boast excellent taste like independent dishes. After scooping out the steaming hot rice from the stone pot, finishing the meal with savory 'Sungnyung' (scorched rice tea) made by pouring hot water over the remaining nurungji in the pot is another pleasure of Korean food culture. A meal here will be a moving experience that allows you to experience the depth and breadth of Korean home-style cooking through a harmony of diverse flavors.",
    },
    gonjiamHalmae: {
      name: "Gonjiam Halmae",
      menu: "Beef Head Soup, Beef Rib Soup",
      price: "$7 - $11 (p.p.)",
      hours: "Call for hours (Closed 1st & 15th of month)",
      atmosphere:
        "A branch of a 60-year-old franchise, it focuses on efficiently providing clean, consistent-quality food. The space is optimized for enjoying a rich, hearty bowl of traditional gukbap (soup with rice).",
      review:
        "'Gonjiam Halmae Someori Gukbap' presents the essence of gukbap, beloved by Koreans for generations. The 100% Hanwoo beef bone broth, simmered in a cauldron for over 14 hours, is so rich in collagen that it's sticky on the lips, with a deep flavor. The signature 'Someori-gukbap' (Beef Head Soup) is satisfying with its clean yet savory broth and generous portions of chewy beef head meat, making you feel full and content in body and soul with just one bowl. It's a representative comfort food for Koreans, especially on cold days or when feeling low on energy, and is highly recommended for those seeking a sincere and powerful taste experience.",
    },
    samtaegi: {
      name: "Samtaegi",
      menu: "Spicy Duck Bulgogi, Whole Duck Soup",
      price: "$7 - $18 (p.p.)",
      hours: "11:30 - 21:00 (Open Daily)",
      atmosphere:
        "A restaurant with a spacious and clean area capable of accommodating large groups. It specializes in duck and chicken dishes, which are considered health foods (boyang-sik) in Korea.",
      review:
        "'Samtaegi' offers a special opportunity to professionally taste duck meat, which is less common than pork or beef in the everyday Korean diet. Here, you can enjoy two duck dishes with contrasting charms. 'Ori-bulgogi,' thinly sliced duck stir-fried in a spicy sauce, stimulates the appetite with its dynamic and piquant flavor. 'Ori-baeksuk,' a whole duck simmered until tender, offers a healthy taste that nourishes the body with its soft meat and clear, light broth. It's important to remember that the baeksuk dish requires a reservation in advance due to its long cooking time. It's an excellent choice for health-conscious gourmets or for a special meal enjoyed with a group.",
    },
    daeseong: {
      name: "Daeseong Butcher-Restaurant",
      menu: "Fresh Pork Belly, Hanwoo Sirloin",
      price: "$14+ (p.p.)",
      hours: "11:30 - 21:30 (Closed Sundays)",
      atmosphere:
        "Contrary to the rustic image that the name 'butcher-restaurant' might suggest, a recent renovation has given it a stylish and modern atmosphere like that of a high-end restaurant. It operates alongside a butcher shop to provide fresh meat, and its spacious, pleasant area is perfect for family gatherings or business dinners.",
      review:
        "'Daeseong Butcher-Restaurant' is where you can experience the unique Korean 'butcher-restaurant' system in its most refined form. These establishments sell meat directly, which means you can enjoy the freshest, highest-quality meat at a reasonable price without intermediaries. Their 'Saeng-samgyeopsal' (fresh pork belly) is characterized by its thickness and distinct layers of fat; when grilled to a golden brown, it bursts with savory juices. The top-grade 'Hanwoo Sirloin' also captivates gourmets with its tender texture and rich flavor. This is the ultimate choice for those who seek both the traditional taste of Korean barbecue and modern comfort.",
    },

    // Near JoeunSul Cheonbihyang
    bigJjun: {
      name: "Big Jjun",
      menu: "Spicy Sausage Stew (Budae-jjigae)",
      price: "$11 - $14 (p.p.)",
      hours: "09:00 - 21:00 (Open Daily)",
      atmosphere:
        "A large, modern, and very clean restaurant with a spacious parking lot. It is famous for its overwhelming value, offering unlimited rice and ramen noodles, and even a corner with free coffee and slushies after the meal. The atmosphere is lively and family-friendly.",
      review:
        "'Big Jjun Budae-jjigae' offers both modern comfort and incredible value. 'Budae-jjigae,' with its historical roots in the post-Korean War era, is a unique Korean fusion dish created from a mix of Western ingredients like ham and sausage with kimchi. Here, the stew uses a beef bone broth for a deep, non-irritating flavor, and boiling ramen noodles with the generous ingredients is a special treat. It's more than just a tasty stew; the meal here, complete with ample refills and dessert, is a joyful and satisfying experience in itself.",
    },
    cheongmyeongjeong: {
      name: "Cheongmyeongjeong",
      menu: "Aged Kimchi Chicken Stew",
      price: "$7 - $18 (p.p.)",
      hours: "11:30 - 22:00 (Open Daily)",
      atmosphere:
        "A large restaurant with a comfortable, country-house-like atmosphere, famous for its healthy, home-style cooking that uses no chemical seasonings. Its clean and comfortable environment makes it popular for group gatherings and family meals.",
      review:
        "'Cheongmyeongjeong' is for those seeking a 'healthy and authentic taste of Korea.' The signature dish, 'Mugeunji Dakbokkeumtang' (Aged Kimchi Chicken Stew), uses long-fermented kimchi (mugeunji) to create a deep, complex umami flavor that regular kimchi cannot produce. The chicken is tender and well-seasoned, and the broth, simmered with the aged kimchi, is a fantastic dish in itself. The restaurant's philosophy of highlighting the natural flavors of ingredients without artificial additives will strongly appeal to health-conscious VIP clients.",
    },
    yeontanBulgui: {
      name: "Yeontan-bulgui",
      menu: "Charcoal Grilled Pork (single menu)",
      price: "~ $14 (p.p.)",
      hours: "12:00 - 22:00 (Closed Mondays)",
      atmosphere:
        "An extremely rustic and raw-feeling restaurant with no sign, a gravel floor, and simple outdoor tables. It's a true 'hidden gem' known only to locals, where all side dishes are self-service.",
      review:
        "A meal at 'Yeontan-bulgui' is a special event for culinary adventurers. The absence of a sign or a menu reveals the restaurant's absolute confidence in its single dish. The outdoor space, filled with the savory smoke from briquettes and the sound of grilling meat, exudes a unique charm. The thick pork, pre-grilled, is crispy on the outside and moist on the inside, with a subtle briquette aroma that enhances the flavor. This is not just a dinner; it will be an unforgettable adventure into the most primal and sincere heart of Korean barbecue culture.",
    },
    sodamchon: {
      name: "Sodamchon",
      menu: "Vietnamese Wraps & Shabu-Shabu",
      price: "~ $14 (p.p.)",
      hours: "11:00 - 21:30 (Open Daily)",
      atmosphere:
        "It boasts a spacious, modern, and very clean interior. Perfectly equipped with a playroom for children and a separate cafe area for post-meal desserts, it is optimized for family and group gatherings. The self-service bar with unlimited fresh vegetables and various add-ins is very well-managed.",
      review:
        "'Sodamchon' is the perfect choice for a healthy, diverse, and interactive meal that everyone can enjoy. The combination of 'shabu-shabu,' where you lightly cook thinly sliced meat and vegetables in a boiling broth, and 'wolnamssam' (Vietnamese spring rolls), where you wrap fresh vegetables and meat in rice paper, offers a light yet satisfying culinary experience. The unlimited fresh vegetable bar is a major highlight. When you want to enjoy healthy food in a comfortable and pleasant environment, this will be a fail-safe choice.",
    },
    gabongru: {
      name: "Gabongru",
      menu: "Black Bean Noodles, White Jjamppong",
      price: "$7 - $14 (p.p.)",
      hours: "Call for hours (Irregular Closures)",
      atmosphere:
        "Located on the second floor, it might not be easily noticeable, but it's a typical neighborhood favorite that gets crowded with nearby office workers and residents at lunchtime. It's a friendly space where you can enjoy a meal in a comfortable and familiar atmosphere rather than a flashy one.",
      review:
        "'Gabongru' is the epitome of a reliable neighborhood Chinese restaurant, consistently loved by local residents and office workers. The signature 'Jajangmyeon' (black bean noodles) and crispy 'Tangsuyuk' (sweet and sour pork) are always satisfying choices, but the hidden charm here is the non-spicy 'White Jjamppong.' With its refreshing and clean broth made from various vegetables and seafood, the white jjamppong is an excellent alternative for those who want a comfortable meal away from strong flavors.",
    },
    danggeori: {
      name: "Danggeori Guksu",
      menu: "Cold Soy Milk Noodle, Spicy Mixed Noodles",
      price: "~ $7 (p.p.)",
      hours: "11:00 - 19:00 (Closed Mondays)",
      atmosphere:
        "A modern, clean, and bright restaurant located along the beautiful scenery of the Oseong riverside. Opened by a young chef with culinary experience in the US who returned to his father's hometown, his passion and meticulousness are evident throughout the space.",
      review:
        "'Danggeori Guksu' is a place where both the story behind the food and its taste are excellent. The young chef's background explains the high quality of the noodle dishes here. The 'Kong-guksu,' made with domestic black soybeans for an extremely rich and nutty flavor, and the 'Bibim-guksu,' seasoned with a special house-made sauce, are must-try items. A heartfelt bowl of noodles enjoyed while admiring the beautiful riverside scenery will provide a peaceful and satisfying culinary moment.",
    },
    cheongang: {
      name: "Cheongang Susan",
      menu: "Salt-grilled Freshwater Eel",
      price: "~ $18 (p.p.)",
      hours: "11:00 - 21:00 (Open Daily)",
      atmosphere:
        "This place showcases the essence of 'destination dining,' situated on a vast 1.6-acre (approx. 6,600 sq. meter) property. With its beautifully landscaped gardens, ponds, and sculptures, it feels more like a park than just a restaurant. The atmosphere becomes even more magical in the evening when the lights are on.",
      review:
        "'Cheongang Susan' is the best place to enjoy 'jangeo' (freshwater eel), a prized health food in Korea, in the most impressive setting. The eel here is grilled using only charcoal and salt, maximizing the ingredient's natural, light, and savory flavor. The experience of grilling the plump, meaty eel yourself over fragrant charcoal satisfies not just the palate but all the senses. The beautiful garden spread out before you and the owner's warm hospitality will make your meal here an unforgettable festive occasion.",
    },
  },
};

export default vipGuide;
