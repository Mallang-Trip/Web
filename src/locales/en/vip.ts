const vip = {
  metadata: {
    title: "Private Door-to-Door - Brewery Tour",
    description:
      "The only all-inclusive curated journey into the world of Korean traditional spirits & wine artisans",
  },
  hero: {
    title: "Door-to-Door Traditional Liquor Tour",
    subtitle:
      "The Only All-Inclusive Curated Journey\nInto the World of Korean Traditional Spirits & Wine Artisans",
  },
  features: {
    doorToDoor: {
      title: "Door-to-Door Service",
      description:
        "Pick-up from your hotel or residence\nand comfortable return",
    },
    allInclusive: {
      title: "All-Inclusive",
      description:
        "Seoul-Brewery round-trip private transportation (approx. 200km), tolls, fuel, parking, and lunch all included",
    },
    safety: {
      title: "Safe Tour",
      description:
        "No drunk driving worries \nenjoy tastings to your heart's content",
    },
  },
  breweries: {
    title: "Breweries to Visit",
    yesan: {
      number: "1",
      name: "Yesan Apple Winery",
      tagline: "A Legacy of Generational Orchards",
      story:
        "This story begins not with liquor, but with the land. The orchard carries the life's work of Master Seo Jeong-hak, an apple artisan with 40 years of experience understanding the history of this soil is the first step to understanding this place. His son-in-law, CEO Jeong Je-min, who experienced farm winery culture in Canada, decided to breathe new life into the master's perfect apples.",
      experienceTitle: "Special Experience",
      experienceText:
        "The moment you step into the cool underground cellar from the beautiful European countryside-style winery, the sweet fermentation aromas filling the air and the deep scent of oak barrels make you forget the noise of the city. You can experience the aging process by tasting raw extract directly from barrels, and enjoy a special time creating handcrafted cocktails with apple brandy alongside a professional bartender.",
      signatureTitle: "Signature: Chusa 40",
      signatureText:
        "A premium apple brandy distilled twice in the noble French Calvados tradition and aged in oak barrels for over 3 years. The concentrated sweetness of ripe apples harmonizes with oak's vanilla, honey, and toffee flavors.",
      address: "107-25 Daemong-ro, Godeok-myeon, Yesan-gun, Chungcheongnam-do",
    },
    sinpyeong: {
      number: "2",
      name: "Sinpyeong Brewery",
      tagline: "Taste 100 Years of Time",
      story:
        'Established in 1933, this is one of Korea\'s oldest breweries that survived steadfastly through the plunder of Japanese colonial rule and the bombardment of the Korean War. Its history is a microcosm of modern Korean history. Through the innovation of adding "white lotus leaves" to makgeolli, which was once a rough farm liquor, 2nd-generation Master Kim Yong-se elevated it into a refined masterpiece that graced the Blue House state dinner table.',
      experienceTitle: "Special Experience",
      experienceText:
        "Discover living history at the \"Baengnyeon Brewing Cultural Center\" housed in a rice mill from 1933. After a special barrel tasting that explores the soul of makgeolli at different stages of maturation, you'll brew your own unique makgeolli the only one of its kind in the world under the master's guidance. This delicate process goes beyond a mere experience; it's a moment of creating a work that contains your own story. The bottle in your hands after the tour will be a living heritage that preserves the emotion of your journey.",
      signatureTitle: "Signature: Baengnyeon Makgeolli",
      signatureText:
        "Premium makgeolli selected as the official toast liquor for Blue House state dinners. The subtle, clean fragrance of white lotus leaves magically captures the heaviness of rice, delivering a remarkably smooth and clean taste.",
      address:
        "813 Sinpyeong-ro, Sinpyeong-myeon, Dangjin-si, Chungcheongnam-do",
    },
    cheonbi: {
      number: "3",
      name: "Joeun-sul Cheonbihyang",
      tagline: "An Alchemist's Passion for Perfection",
      story:
        'This brewery began with founder and CEO Lee Ye-ryeong\'s personal wish to "create good liquor without hangovers for her husband." This pure passion evolved into an obsession to revive the high-difficulty traditional method of "Oyangju (五釀酒)," which involves adding more ingredients five times. In 2025, it received the prestigious Presidential Award at the Korean Traditional Liquor Evaluation, officially recognized as Korea\'s finest traditional spirit.',
      experienceTitle: "Special Experience",
      experienceText:
        "This is not a factory, but an atelier where the breath of a Korean master craftsman resides. In this space granted only to a select few visitors, you'll have the special experience of directly filtering the \"base liquor\" the heart of the spirit and bottling your own unique soju through sojugori distillation under the master's guidance. Beyond tasting rare masterpiece liquors unavailable on the market, the bottle born from your own hands will become the most precious souvenir of this journey.",
      signatureTitle: "Signature: Cheonbihyang Yakju",
      signatureText:
        "Official toast liquor at the ASEAN Summit and Presidential Award winner. Through five fermentations and 9 months of cold aging, it achieves perfect balance with complex aromas of honey, butterscotch, and ripe pear, with a silk-smooth texture.",
      address:
        "108 Sukseong-ddeul-gil, Oseong-myeon, Pyeongtaek-si, Gyeonggi-do",
    },
  },
  timeline: {
    title: "Tour Schedule",
    items: [
      {
        time: "10:00",
        activity: "Hotel/Residence Pick-up",
        description: "Private vehicle arrives at your door",
      },
      {
        time: "11:30",
        activity: "First Brewery",
        description: "1-hour experience + 30 minutes free time",
      },
      {
        time: "13:00",
        activity: "Lunch box lunch",
        description: "Lunch box lunch with accompaniment in the brewery",
      },
      {
        time: "14:30",
        activity: "Second Brewery",
        description: "1-hour experience + 30 minutes free time",
      },
      {
        time: "18:00",
        activity: "Hotel/Residence Arrival",
        description: "Safe return to your door",
      },
    ],
  },
  pricing: {
    title: "Pricing Information",
    table: {
      people: "People",
      total: "Total Price",
      perPerson: "Per Person",
      vehicle: "Vehicle",
      sedan: "Sedan",
      van: "Large Van",
    },
    peopleOptions: [
      { value: "2", label: "2 people" },
      { value: "3", label: "3 people" },
      { value: "4", label: "4 people" },
      { value: "5", label: "5 people" },
      { value: "6", label: "6 people" },
      { value: "7", label: "7 people" },
      { value: "8", label: "8 people" },
      { value: "9+", label: "9+ people (contact us)" },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is included in the tour price?",
        answer:
          "The tour price is structured as an all-inclusive package for your comfortable journey. It includes private vehicle and professional driver service with pick-up and drop-off at designated locations in downtown Seoul, all admission and experience fees at two carefully selected breweries, and premium traditional liquor tastings provided at each brewery.",
      },
      // {
      //   question: "Which restaurants do you recommend?",
      //   answer:
      //     "Rather than guiding you to a fixed restaurant, we provide a carefully curated",
      //   linkText: "'Culinary Guide'",
      //   answerCont:
      //     "to enhance your tour experience. This guide is our exclusive recommendation list of the highest-rated restaurants near the breweries you'll visit. We'll provide the guide after your tour is confirmed, and you can freely choose according to your preferences. While you can certainly visit restaurants outside the list, we kindly ask for your understanding that we recommend places close to the breweries you're visiting to ensure smooth tour timing.",
      //   buttonText: "View Restaurant List",
      // },
      // {
      //   question: "Can I adjust the tour time to exclude lunch?",
      //   answer:
      //     "Yes, absolutely. Mallangtrip is happy to support your precious journey to fully align with your rhythm. We can customize the schedule so you can enjoy lunch at your leisure and start the tour at your preferred time. If you request this during the booking process, we will provide you with a final quote excluding meal costs along with a special payment link via email or text message.",
      // },
      {
        question: "Is lunch included?",
        answer:
          "Yes, it is included. Basically, we provide a lunch box for you to eat with accompaniment in the brewery. If you have any restrictions on your diet or allergies, we will coordinate your food.",
      },
      {
        question: "Which breweries will we visit? Can I choose them myself?",
        answer:
          "This tour is not just a visit, but carefully curated to deliver the finest experience. Our expert team will select the optimal two breweries that will provide you with the most perfect experience, comprehensively considering the day's reservation status, the breweries' conditions, and seasonal characteristics. Trust Mallangtrip's discernment, and you will experience satisfaction beyond expectations.",
      },
      {
        question:
          "(For foreigners) Are there any English communication difficulties?",
        answer:
          "The Malang Trip VIP Tour provides English services. For foreign customers, the brewery experience, which is the core of the tour, is conducted directly in English by experts in the field, and for Korean customers, all guidance and experiences are provided comfortably in Korean. If you need a language other than English, we will accompany you with an interpretation guide with additional costs. We will inform you of the additional costs when inquiring about your reservation.",
      },
      {
        question: "Can non-drinkers or children participate in the tour?",
        answer:
          "Yes, participation is possible. This tour is a cultural journey that goes beyond simple tasting to deeply experience Korean fermentation culture and craftsmanship. However, please understand that no price discounts are offered as the core experiences are centered around traditional liquor. You may also bring minor children, but tastings are restricted in accordance with Korean liquor laws.",
      },
      {
        question: "What type of vehicle will we travel in?",
        answer:
          "Your journey should maintain the highest level of comfort from start to finish. We allocate comfortable and clean sedans, SUVs, or large van vehicles according to the number of people to ensure private and comfortable transportation.",
      },
      {
        question: "Can I bring luggage or large bags?",
        answer:
          "Yes, it is possible. For smooth vehicle allocation, please let me know in advance the quantity of large luggage such as carriers when making a reservation. In some cases, vehicle upgrades may incur additional costs.",
      },
      {
        question: "What are the cancellation and refund policies?",
        answer:
          "If you cancel your reservation 4 days before the start date of the tour, we will refund the full amount of the payment. However, the refund will not be possible within 3 days from the start date of the tour, so please make a careful reservation.",
      },
      {
        question: "Does the tour proceed even in bad weather?",
        answer:
          "Yes, since most of the tour experiences take place indoors, it proceeds normally regardless of weather. However, in the event of severe natural disasters that make travel impossible, we will adjust the schedule or provide a full refund with your safety as our top priority.",
      },
    ],
  },
  cta: {
    title: "Start Your Special Journey Today",
    description:
      "Experience the essence of Korean traditional spirits with an all-inclusive VIP tour",
    button: "Book Now",
  },
};

export default vip;
