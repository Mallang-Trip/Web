"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLangStore } from "@/stores/lang-store";
import Image from "next/image";

type Lang = "ko" | "en";

type I18nText = {
  ko: string;
  en: string;
};

type Restaurant = {
  name: I18nText;
  menu: I18nText;
  price: I18nText;
  hours: I18nText;
  atmosphere: I18nText;
  review: I18nText;
  mapUrl: string;
  imageUrl: string;
};

type Section = {
  title: I18nText;
  restaurants: Restaurant[];
};

const sections: Section[] = [
  {
    title: { ko: "예산사과와인 주변", en: "Near Yesan Apple Wine" },
    restaurants: [
      {
        name: { ko: "수목가든", en: "Sumok Garden" },
        menu: {
          ko: "돼지석갈비, 버섯전골",
          en: "Grilled Pork Galbi, Mushroom Hot Pot",
        },
        price: {
          ko: "₩15,000 - ₩25,000 (1인)",
          en: "₩15,000 - ₩25,000 (p.p.)",
        },
        hours: {
          ko: "11:00 - 21:00 (월요일 휴무)",
          en: "11:00 - 21:00 (Closed Mondays)",
        },
        atmosphere: {
          ko: "넓고 깨끗한 공간을 갖추고 있어 가족 식사나 단체 모임에 적합합니다. 전용 주차 공간과 유아용 의자가 마련되어 있어 편안하고 전형적인 한국식 외식 경험을 즐기기에 부족함이 없습니다.",
          en: "With its spacious and clean interior, it's well-suited for family meals or group gatherings. Equipped with a private parking lot and high chairs for infants, it provides everything needed for a comfortable and classic Korean dining experience.",
        },
        review: {
          ko: "'수목가든'은 한국의 정겨운 가족 외식 문화를 경험할 수 있는 가장 확실한 선택지입니다. 이곳의 대표 메뉴인 '돼지석갈비'는 주방에서 최적의 상태로 구워낸 뒤 뜨거운 돌판에 담아 제공되므로, 테이블에서 직접 고기를 구워야 하는 번거로움 없이 완벽하게 조리된 요리를 즐길 수 있습니다. 잘 숙성된 돼지고기는 감칠맛 나는 양념과 어우러져 부드러운 식감을 자랑하며, 함께 끓여 먹는 '버섯전골'은 신선한 채소와 버섯이 내는 깊고 시원한 국물 맛이 일품입니다. 여러 세대가 함께 모여 편안하고 만족스러운 식사를 즐기기에 더할 나위 없이 좋은 곳입니다.",
          en: "'Sumok Garden' is the most reliable choice for experiencing Korea's warm family dining culture. Its signature dish, 'Dwaeji Seokgalbi' (Pork Ribs on a Stone Plate), is grilled to perfection in the kitchen and served on a hot stone plate, allowing you to enjoy a perfectly cooked meal without the hassle of grilling at the table. The well-marinated pork boasts a tender texture and savory flavor, while the accompanying 'Mushroom Hot Pot' offers a deep, refreshing broth made from fresh vegetables and mushrooms. It is an ideal place for multiple generations to gather for a comfortable and satisfying meal.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=예산+수목가든",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noonATOQRgZ8UPWv_Cz2PhzMTw8dEmTYHkDeg1s5mLu8AwQYLK804wLX9ris0Mu9KjfcgD8Pa4QJk8X8yNR9xUyiscJbjtBXlBuzpTjgDn-a0IuFFJvhIEhNgwIT16t-jL3a6wR=w408-h544-k-no",
      },
      {
        name: { ko: "고덕갈비", en: "Godeok Galbi" },
        menu: { ko: "한우갈비", en: "Marinated Hanwoo Beef Ribs" },
        price: { ko: "약 ₩45,000 (1인)", en: "~ ₩45,000 (p.p.)" },
        hours: {
          ko: "11:00 - 20:00 (명절 당일 휴무)",
          en: "11:00 - 20:00 (Closed on major holidays)",
        },
        atmosphere: {
          ko: "'구수한 옛날 느낌'으로 묘사되는 이곳은 오랜 역사가 느껴지는 전통적인 분위기를 자아냅니다. 숯불(연탄불)의 열기가 가득한 실내는 항상 손님들로 붐비지만, 넓고 깨끗하게 관리되고 있어 식사에 불편함이 없습니다. 이곳은 단순한 식당을 넘어, 한우 갈비라는 하나의 요리에 대한 장인의 집념과 자부심이 공간 전체에 배어 있는 듯한 인상을 줍니다.",
          en: "Described as having a 'hearty, old-fashioned feel,' this place exudes a traditional atmosphere steeped in history. The interior, filled with the heat of charcoal briquettes, is always bustling with customers, yet it's spacious and well-maintained for comfortable dining. It's more than just a restaurant; the entire space seems imbued with the artisan's dedication and pride in the single dish of Hanwoo galbi.",
        },
        review: {
          ko: "'고덕갈비'는 최상급 한우가 지닌 본연의 맛을 탐미하는 미식가를 위한 성전과도 같은 곳입니다. 30년 넘게 이어온 비법 양념에 재운 갈비는 과하지 않은 단맛으로 육향을 극대화하며, 뜨거운 연탄불 위에서 구워내어 깊은 훈연향을 더합니다. 지방을 세심하게 제거하여 살코기만으로 구성된 갈비는 입안에서 부드럽게 녹아내리며 최상의 식감을 선사합니다. 높은 가격은 프리미엄 식재료와 수십 년간 완성된 장인 정신에 대한 당연한 가치이며, 진정한 한우 구이의 정수를 경험하고자 하는 이에게는 그 이상의 만족감을 선사할 것입니다.",
          en: "'Godeok Galbi' is a sanctuary for gourmets who savor the authentic taste of premium Hanwoo beef. Marinated in a secret sauce passed down for over 30 years, the ribs have a subtle sweetness that maximizes the meat's aroma, enhanced by a deep smoky flavor from the hot briquette grill. The fat is meticulously removed, leaving only lean meat that melts in your mouth, offering an exquisite texture. The high price reflects the value of premium ingredients and decades of perfected craftsmanship, promising more than satisfaction for those who wish to experience the true essence of grilled Hanwoo.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=예산+고덕갈비",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noDTpxfHi1R-cNN269axy9IO6i78k9Hmjv7WemO919VGod8sZZEVJNLhiXqkcqHhsULvWoEaZPhN6TMtXEUhvkJy61nNqcJCFWspontL4aEPPjHrBr9dgTmw4gHi7y-fQyIkMACnK3qAHnl=w408-h306-k-no",
      },
      {
        name: { ko: "유가네추어탕", en: "Yugane" },
        menu: { ko: "추어탕, 뼈해장국", en: "Loach Soup, Pork Back-bone Stew" },
        price: { ko: "약 ₩11,000 (1인)", en: "~ ₩11,000 (p.p.)" },
        hours: {
          ko: "06:00-20:00 (토: ~15:00)",
          en: "06:00-20:00 (Sat: ~15:00)",
        },
        atmosphere: {
          ko: "이른 아침부터 문을 열어 든든한 국물 요리를 제공하는 전형적인 한국의 서민 식당입니다. 화려함보다는 기능성에 초점을 맞춘 공간으로, 현지인들이 원기 회복을 위해 즐겨 찾는 곳입니다. '숨은 맛집'으로 불리며, 정갈한 집밥 스타일의 반찬이 함께 제공되어 푸짐한 한 끼를 완성합니다.",
          en: "This is a typical Korean working-class restaurant that opens early to serve hearty soups. The space focuses on functionality over flair and is a favorite spot for locals seeking to restore their energy. Known as a 'hidden gem,' it completes a generous meal with neat, home-style side dishes.",
        },
        review: {
          ko: "'유가네추어탕'은 모험심 있는 미식가에게 가장 진솔한 한국의 맛을 선사하는 곳입니다. 대표 메뉴인 '추어탕'은 미꾸라지를 곱게 갈아 끓여낸 한국의 대표적인 보양식으로, 비린 맛 없이 고소하고 진한 풍미가 특징입니다. 들깻가루와 산초 가루를 취향에 맞게 더하면 그 맛의 깊이가 한층 더해집니다. 함께 인기 있는 '뼈해장국'은 돼지 등뼈를 오랜 시간 끓여내 진하고 칼칼한 국물 맛이 일품입니다. 이른 아침, 이곳에서 뜨끈한 탕 한 그릇으로 시작하는 하루는 어떤 호텔 조식보다 더 특별하고 기억에 남는 경험이 될 것입니다.",
          en: "'Yugane Chueotang' offers the most authentic taste of Korea to the adventurous gourmet. Its signature dish, 'Chueotang' (Loach Soup), is a representative Korean health food made by boiling finely ground loach. It has a savory, rich flavor without any fishiness. Adding perilla seed powder and prickly ash powder to taste enhances its depth. The popular 'Ppyeohaejangguk' (Pork Back-bone Stew) is also excellent, with a rich, spicy broth from long-simmered pork spine. Starting the day with a hot bowl of soup here will be a more special and memorable experience than any hotel breakfast.",
        },
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=예산+유가네추어탕",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrYtTQiUKkUDjQ5p4T5IpBB6lP-RqW1yW7mtW9v9simolhZkGYkuGj7BuToQpNZqu7epRNIxNd1Tt6Y-srjmIdwm9jb-CBVYcpBCNeXSh7PGLS0JSNFnia73AD1XruupOopyLIP=w513-h240-k-no",
      },
      {
        name: { ko: "성미식당", en: "Seongmi Sikdang" },
        menu: {
          ko: "콩국수(여름), 칼국수(겨울)",
          en: "Cold Soy Milk Noodle (Summer), Noodle Soup (Winter)",
        },
        price: { ko: "약 ₩10,000 (1인)", en: "~ ₩10,000 (p.p.)" },
        hours: { ko: "-", en: "-" },
        atmosphere: {
          ko: "오직 현지인들만이 아는 '진정한 노포'의 정수를 보여주는 곳입니다. 주인장 혼자 운영하는 작은 식당으로, 꾸밈없는 소박한 공간은 오직 음식의 맛에만 모든 것을 집중하게 만듭니다. 이곳의 분위기는 상업적인 레스토랑이라기보다, 요리 장인의 작은 개인 부엌에 초대받은 듯한 특별한 느낌을 줍니다.",
          en: "This place showcases the essence of a 'true old restaurant' known only to locals. As a small eatery run by the owner alone, the unadorned, simple space makes you focus solely on the taste of the food. The atmosphere feels less like a commercial restaurant and more like a special invitation to a master chef's small, private kitchen.",
        },
        review: {
          ko: "'성미식당'은 계절에 따라 단 두 가지 메뉴에만 집중함으로써 전문성의 극치를 보여줍니다. 여름철 별미인 '콩국수'는 맷돌로 직접 간 콩을 사용하여 인공적인 단맛 없이 오직 콩 본연의 진하고 고소한 맛으로 승부합니다. 걸쭉하면서도 부드러운 콩 국물은 더위에 지친 입맛을 단숨에 사로잡습니다. 겨울에 선보이는 '칼국수'는 멸치로 맛을 낸 따뜻하고 맑은 국물과 손으로 직접 반죽하고 썰어낸 쫄깃한 면발이 조화를 이루어, 소박하지만 깊은 위로를 주는 맛입니다. 이곳에서의 식사는 단순한 미식 경험을 넘어, 한 가지 요리를 평생의 업으로 삼은 장인의 철학을 맛보는 것과 같습니다.",
          en: "'Seongmi Sikdang' demonstrates the pinnacle of specialization by focusing on only two seasonal menus. The summer delicacy, 'Kong-guksu' (Cold Soy Milk Noodle Soup), is made with soybeans ground by hand in a millstone, competing only with the deep, nutty flavor of the beans themselves, without any artificial sweetness. The thick yet smooth soy milk broth instantly captivates a palate weary from the heat. The winter's 'Kalguksu' (Noodle Soup) offers a simple yet deeply comforting taste, harmonizing a warm, clear anchovy broth with chewy, hand-kneaded and hand-cut noodles. A meal here is more than a culinary experience; it's like tasting the philosophy of a master who has dedicated a lifetime to a single dish.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=예산+성미식당",
        imageUrl:
          "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png",
      },
      {
        name: { ko: "약산골", en: "Yaksangol" },
        menu: { ko: "누룽지 닭백숙", en: "Scorched Rice & Whole Chicken Soup" },
        price: { ko: "약 ₩20,000 (1인)", en: "~ ₩20,000 (p.p.)" },
        hours: {
          ko: "사전 예약 필수 (월요일 휴무)",
          en: "Reservation required (Closed Mondays)",
        },
        atmosphere: {
          ko: "고즈넉하고 한적한 분위기의 한옥(전통 가옥)에 자리 잡고 있어, 식사하는 내내 평화로운 시간을 보낼 수 있습니다. 특별한 날의 가족 모임이나 중요한 손님을 대접하기에 최적의 장소로, 한국 전통의 미를 느끼며 건강한 음식을 즐길 수 있습니다.",
          en: "Nestled in a serene and tranquil Hanok (traditional Korean house), you can enjoy a peaceful time throughout your meal. It is the perfect place for special family gatherings or entertaining important guests, where you can appreciate traditional Korean beauty while enjoying healthy food.",
        },
        review: {
          ko: "'약산골'은 한국의 대표적인 보양식이자 공동체 음식인 '백숙'을 가장 전통적인 공간에서 경험할 수 있는 곳입니다. 닭 한 마리를 통째로 오랜 시간 끓여낸 백숙은 육질이 매우 부드럽고, 기름기 없이 담백한 국물은 몸과 마음을 편안하게 해줍니다. 이 요리의 진정한 묘미는 백숙을 다 먹어갈 즈음 뚝배기에 넣어 함께 끓여내는 '누룽지'에 있습니다. 구수한 누룽지가 닭 육수를 머금어 부드러우면서도 쫀득한 식감을 내며, 전혀 다른 차원의 맛을 선사합니다. 한옥의 정취 속에서 나누어 먹는 닭백숙은 단순한 식사를 넘어, 건강과 행복을 기원하는 한국의 따뜻한 정서를 체험하는 시간이 될 것입니다.",
          en: "'Yaksangol' is where you can experience 'Baeksuk,' a representative Korean health food and communal dish, in the most traditional setting. The whole chicken, simmered for a long time, is extremely tender, and the clean, light broth soothes both body and soul. The true delight of this dish is the 'Nurungji' (scorched rice), which is added to the pot and boiled as you finish the chicken. The savory nurungji absorbs the chicken broth, creating a soft yet chewy texture and a completely different dimension of flavor. Sharing this chicken soup in the ambiance of a Hanok is more than just a meal; it's a time to experience the warm Korean sentiment of wishing for health and happiness.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=예산+약산골",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrzUX-Om7BYc69aA7rjO8FEdBxmhX2qX1n34bs5DqMyfgO017Haxthc7vlYJfZCKJC5o9C6bQapyOQWZk8Vhp25RzhaV83u2gosXEWY7hGyQbZGfMXYTlbAZ28tjr2Z3NDvl2iY=w408-h725-k-no",
      },
      {
        name: { ko: "또순네식당", en: "Ttosunne" },
        menu: {
          ko: "밴댕이찌개, 청국장",
          en: "Spicy Beltfish Stew, Fermented Soybean Stew",
        },
        price: { ko: "약 ₩10,000 (1인)", en: "~ ₩10,000 (p.p.)" },
        hours: {
          ko: "07:00 - 20:00 (월요일 휴무)",
          en: "07:00 - 20:00 (Closed Mondays)",
        },
        atmosphere: {
          ko: "덕산 온천 관광지 인근에 위치한 소박한 현지 식당으로, 화려한 인테리어보다는 음식의 맛 자체에 집중하는 곳입니다. 다른 지역에서는 쉽게 맛볼 수 없는 희소성 있는 향토 음식을 제공하며, 진정한 로컬 미식 경험을 원하는 이들의 발길이 끊이지 않습니다.",
          en: "A humble local restaurant located near the Deoksan Hot Springs tourist area, focusing on the taste of the food rather than a fancy interior. It serves rare regional dishes not easily found elsewhere, attracting a steady stream of visitors seeking a true local culinary experience.",
        },
        review: {
          ko: "'또순네식당'은 예산 지역의 식문화를 가장 강렬하게 경험할 수 있는 곳입니다. 대표 메뉴인 '밴댕이찌개'는 서해안에서 잡히는 작은 생선인 밴댕이를 넣어 칼칼하게 끓여낸 음식으로, 첫맛은 맵지만 뒤이어 깊은 감칠맛이 올라옵니다. 밴댕이는 뼈가 억센 편이므로 조심스럽게 살을 발라 먹어야 하지만, 그 불편함을 감수할 만큼 독특하고 매력적인 맛을 지니고 있습니다. 함께 제공되는 상추에 밥과 밴댕이 살을 올려 쌈을 싸 먹으면 매운맛이 중화되며 더욱 풍성한 맛을 즐길 수 있습니다. 진정한 미식 모험가라면 반드시 도전해봐야 할, 잊지 못할 향토의 맛입니다.",
          en: "'Ttosunne Sikdang' is where you can most intensely experience the food culture of the Yesan region. The signature dish, 'Bandaengi-jjigae' (Spicy Beltfish Stew), is a spicy stew made with beltfish, a small fish from the West Sea. It's spicy at first but followed by a deep, savory flavor. The beltfish has tough bones, so you must carefully debone it, but its unique and charming taste is worth the effort. Wrapping the fish and rice in the provided lettuce leaves neutralizes the spiciness and enriches the flavor. It's an unforgettable local taste that true culinary adventurers must try.",
        },
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=예산+또순네식당",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npHWcqGg_VhgK7_Yn1toR_c5_zlb981mwBTPWoyEJPfyZZ_fMznUxON2gZfiDevW3ptB7zxLkhIewc1VaPRy64ijJU3MlBz_hWy3ZSKOSxUnqhvlGbm9yKRO-xxFrKc2gKAzWoV=w426-h240-k-no",
      },
      {
        name: { ko: "사과나무", en: "Sagwanamu" },
        menu: {
          ko: "보리밥과 나물, 돈까스",
          en: "Barley Rice w/ Vegetables, Pork Cutlet",
        },
        price: { ko: "약 ₩12,000 (1인)", en: "~ ₩12,000 (p.p.)" },
        hours: {
          ko: "10:00 - 15:00 (월요일 휴무)",
          en: "10:00 - 15:00 (Closed Mondays)",
        },
        atmosphere: {
          ko: "시골의 오래된 주택을 개조한 듯한 매력적인 공간으로, 아름다운 정원과 그네, 아늑하고 소박한 실내 장식이 어우러져 목가적인 분위기를 자아냅니다. 매우 인기가 높아 긴 대기 시간이 발생할 수 있지만, 예쁜 대기 공간과 인접한 카페 덕분에 기다림마저 즐거운 경험이 됩니다. 주인장의 친절하고 유쾌한 응대 또한 이곳의 매력을 더합니다.",
          en: "A charming space resembling a renovated old country house, creating a pastoral atmosphere with its beautiful garden, swing, and cozy, rustic interior. It's very popular, so long waits can occur, but even the wait is a pleasant experience thanks to a pretty waiting area and an adjacent cafe. The owner's kind and cheerful service adds to its charm.",
        },
        review: {
          ko: "'사과나무'는 전원 속에서 즐기는 완벽한 점심 식사를 위한 이상적인 장소입니다. 짧은 영업시간과 긴 대기 줄은 이곳이 '기다릴 만한 가치가 있는' 맛집임을 증명합니다. 대표 메뉴인 '보리밥과 나물'은 신선한 제철 나물과 직접 담근 듯한 깊은 맛의 된장찌개가 어우러져 건강하고 편안한 맛을 선사합니다. 의외의 인기 메뉴인 '사과나무 돈까스'는 옛날 경양식 스타일로, 부드러운 고기와 달콤한 소스가 조화를 이룹니다. 전통 한식인 보리밥과 서양식인 돈까스의 예기치 않은 조합은 이 식당만의 독특한 매력으로, 다양한 입맛을 가진 일행 모두를 만족시킬 수 있는 현명한 선택이 될 것입니다.",
          en: "'Sagwanamu' is the ideal place for a perfect lunch in the countryside. The short business hours and long queues prove it's a 'worth the wait' restaurant. The signature 'Barley Rice with Vegetables' offers a healthy and comforting taste, combining fresh seasonal greens with a rich, homemade-style soybean paste stew. A surprisingly popular dish is the 'Sagwanamu Pork Cutlet,' an old-fashioned Western-style cutlet with tender meat and a sweet sauce. The unexpected combination of traditional Korean barley rice and Western-style pork cutlet is a unique charm of this restaurant, making it a wise choice that can satisfy everyone in a group with diverse tastes.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=예산+사과나무",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npNq2CFvJh42EVwuAm_4DWSNFoIQWPBMUNrg2-mrnAFPbITuEONu7o8TS4ayahU_opTD_O_DtvGuzXw_rJN2np6CSsH5jU_UuMl1Ie2gDF63bdOU_qhlwBlIgQ90pfA9BMDogeQ=w408-h612-k-no",
      },
    ],
  },
  {
    title: { ko: "신평양조장 주변", en: "Near Sinpyeong Brewery" },
    restaurants: [
      {
        name: { ko: "우렁이박사", en: "Ureongi Baksa" },
        menu: { ko: "우렁쌈밥 정식", en: "River Snail & Veggie Wraps Set" },
        price: {
          ko: "₩10,000 - ₩15,000 (1인)",
          en: "₩10,000 - ₩15,000 (p.p.)",
        },
        hours: {
          ko: "08:00 - 19:30 (연중무휴)",
          en: "08:00 - 19:30 (Open Daily)",
        },
        atmosphere: {
          ko: "현지인과 여행객들로 항상 활기가 넘치는 곳입니다. 분위기는 격식 없이 서민적이며, 푸짐한 음식을 나누어 먹는 즐거움에 초점이 맞춰져 있습니다.",
          en: "Always bustling with locals and tourists alike. The atmosphere is informal and down-to-earth, focused on the joy of sharing a generous meal.",
        },
        review: {
          ko: "'우렁이박사'는 한국의 '쌈' 문화를 가장 맛있고 건강하게 체험할 수 있는 곳입니다. 이 식당의 핵심 식재료인 '우렁이(River Snail)'는 기분 좋게 쫄깃한 식감이 특징이며, 흙내 없이 깔끔하게 손질되어 나옵니다. 된장을 베이스로 한 구수한 '우렁쌈장'과 매콤한 '우렁덕장'을 갓 지은 밥, 신선한 쌈 채소와 함께 싸 먹는 순간, 입안 가득 건강한 맛의 향연이 펼쳐집니다. 이곳은 당진 미식의 필수 방문 코스로, 활기찬 분위기 속에서 독특한 지역 특산 요리에 흠뻑 빠져볼 수 있는 최고의 기회를 제공합니다.",
          en: "'Ureongi Baksa' is the best place to experience Korea's 'ssam' (wrap) culture in a delicious and healthy way. The key ingredient, 'ureongi' (river snail), has a pleasantly chewy texture and is served cleanly without any earthy taste. The moment you wrap the savory, soybean paste-based 'ureong ssamjang' or the spicy 'ureong deokjang' with freshly cooked rice and fresh greens, a festival of healthy flavors unfolds in your mouth. This is a must-visit spot for Dangjin's culinary tour, offering the best opportunity to immerse yourself in a unique regional specialty in a lively atmosphere.",
        },
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=당진+우렁이박사",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqRrky8Rv5bHIF8znqr9vXQ922N9q9ZRG-N9slDrgtG7MFaNX8HY2_5fccpRmJaPF99wdJoyK6ytSRtEgGcuMnk5YOHGsbmH9pg3kCFigTzFjIaSlMflZbllvg6iSexFkXPODA=w408-h306-k-no",
      },
      {
        name: { ko: "준이네 분식", en: "Junine Bunsik" },
        menu: { ko: "제육볶음, 비빔밥", en: "Spicy Stir-fried Pork, Bibimbap" },
        price: { ko: "약 ₩10,000 (1인)", en: "~ ₩10,000 (p.p.)" },
        hours: {
          ko: "10:00 - 21:00 (연중무휴)",
          en: "10:00 - 21:00 (Open Daily)",
        },
        atmosphere: {
          ko: "저렴하고 맛있는 음식을 제공하는 소박한 '분식집'입니다. 화려함보다는 기능성에 충실한 공간으로, 빠르고 만족스러운 식사를 원하는 현지인들이 즐겨 찾는 곳입니다.",
          en: "A humble 'bunsik-jip' (snack restaurant) that serves affordable and tasty food. The space is more functional than fancy, frequented by locals looking for a quick and satisfying meal.",
        },
        review: {
          ko: "'준이네 분식'은 한국인의 소박한 일상을 엿볼 수 있는 정직한 맛을 제공합니다. '분식'은 한국 외식 문화의 중요한 한 축을 담당하며, 이곳은 그중에서도 가장 대중적인 메뉴들을 충실하게 선보입니다. 매콤달콤한 양념에 볶아낸 '제육볶음'은 남녀노소 누구나 좋아하는 밥도둑이며, '비빔밥'은 신선한 나물과 고추장의 조화가 일품입니다. 특히 간단한 요청을 통해 비건 메뉴로 변경이 가능하다는 점은 다양한 식단을 가진 방문객에게 매우 유용한 정보입니다. 꾸밈없고 진솔한 한국의 가정식을 경험하고 싶을 때 추천하는 곳입니다.",
          en: "'Junine Bunsik' offers an honest taste that provides a glimpse into the simple daily life of Koreans. 'Bunsik' is an important part of Korean dining culture, and this place faithfully serves some of its most popular dishes. The 'Jeyuk-bokkeum' (spicy stir-fried pork) with its sweet and spicy sauce is a beloved 'rice thief' for all ages, and the 'Bibimbap' is excellent with its harmony of fresh vegetables and gochujang. A particularly useful piece of information for visitors with various dietary needs is that dishes can be made vegan upon simple request. It is recommended for those who want to experience unpretentious and sincere Korean home-style cooking.",
        },
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=당진+준이네분식",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqa1EJlZ51DmvIVfw-IlICELhiD1ItW78RcwcbJ2c6fc-9nwIOxp4L-q3nQtfKCifhF6AmIe1FW7vtFqjPrBVFlAY72tk3ZzXl8kpi1evykNTpMRVBvCObpFlaoB0GqX3wKebT1=w408-h306-k-no",
      },
      {
        name: { ko: "안녕함박", en: "Annyeong Hambak" },
        menu: { ko: "함박스테이크, 돈까스", en: "Hamburg Steak, Pork Cutlet" },
        price: {
          ko: "₩10,000 - ₩12,000 (1인)",
          en: "₩10,000 - ₩12,000 (p.p.)",
        },
        hours: {
          ko: "11:00-20:00 (일: ~14:00), 월요일 휴무",
          en: "11:00-20:00 (Sun: ~14:00), Closed Mondays",
        },
        atmosphere: {
          ko: "작지만 세련되고 아기자기한 '감성 식당'으로, 카페 같은 분위기를 자아냅니다. 오픈 키친 형태라 위생에 대한 신뢰를 주며, 깨끗하고 아늑한 실내는 편안한 식사 경험을 제공합니다.",
          en: "A small but stylish and charming 'trendy eatery' with a cafe-like atmosphere. The open kitchen instills confidence in its hygiene, and the clean, cozy interior provides a comfortable dining experience.",
        },
        review: {
          ko: "'안녕함박'은 시골 마을에서 발견한 보석처럼 반가운 공간입니다. 전통 한식에서 잠시 벗어나고 싶을 때 완벽한 대안이 되어주는 이곳은, 수준 높은 일본-서양식 가정 요리를 선보입니다. 두툼한 패티에서 터져 나오는 육즙이 매력적인 '함박스테이크'와 바삭한 튀김옷 속 부드러운 육질이 돋보이는 '안심카츠'는 이곳의 대표 메뉴입니다. 특히 고소한 크림소스에 매콤함을 더한 '매콤크림파스타'는 많은 이들이 추천하는 별미입니다. 조용하고 세련된 식사를 원하는 커플이나 소규모 그룹에게 이상적인 장소입니다.",
          en: "'Annyeong Hambak' is a welcome discovery, like a gem found in a country village. It's a perfect alternative when you want a break from traditional Korean food, serving high-quality Japanese-Western home-style cuisine. The signature dishes are the 'Hamburg Steak,' with its juicy, thick patty, and the 'Ansim-katsu' (pork tenderloin cutlet), which stands out for its tender meat inside a crispy coating. The 'Spicy Cream Pasta,' adding a kick to a savory cream sauce, is a specialty recommended by many. It's an ideal place for couples or small groups looking for a quiet, stylish meal.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=당진+안녕함박",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nokwL3hv2HY-HJZhS-TSVWC6Yt44ooCTKnWe2zOyTAKVv3B3dtIakN0jSOcp-KQAWlk19v3EAJnK40mcqbRrSv-6Tk8NIqRee8GT-diJmq3F7MQM49pHfQmaugDdKDUUpQgW0h0=w506-h240-k-no",
      },
      {
        name: { ko: "청기와가든", en: "Cheonggiwa Garden" },
        menu: { ko: "돌솥밥 백반", en: "Hot Stone Pot Rice Set" },
        price: { ko: "₩8,000 - ₩20,000 (1인)", en: "₩8,000 - ₩20,000 (p.p.)" },
        hours: {
          ko: "09:30 - 22:00 (일요일 휴무)",
          en: "09:30 - 22:00 (Closed Sundays)",
        },
        atmosphere: {
          ko: "오래된 주택을 개조하여 고풍스럽고 역사적인 분위기를 풍기는 식당입니다. 현지인들 사이에서는 '상다리가 휘어질' 정도로 푸짐하고 맛있는 반찬이 나오는 곳으로 명성이 자자합니다.",
          en: "A restaurant with an old-fashioned and historic atmosphere, converted from an old house. It is renowned among locals for serving so many delicious side dishes that the 'table legs might break.'",
        },
        review: {
          ko: "'청기와가든'은 한국의 넉넉한 인심과 '한정식'의 정수를 경험할 수 있는 곳입니다. 이곳의 주인공은 단순히 뜨거운 돌솥에 담겨 나오는 밥이 아니라, 그 밥상을 가득 채우는 화려한 반찬의 향연입니다. 제철 식재료로 정성껏 만든 수십 가지의 반찬은 하나하나가 독립된 요리처럼 훌륭한 맛을 자랑합니다. 갓 지어 김이 모락모락 나는 돌솥밥의 밥을 덜어낸 후, 솥에 남은 누룽지에 뜨거운 물을 부어 만드는 구수한 '숭늉'으로 식사를 마무리하는 것은 한국 식문화의 또 다른 즐거움입니다. 이곳에서의 식사는 다채로운 맛의 조화를 통해 한국 가정식의 깊이와 폭을 체험하는 감동적인 경험이 될 것입니다.",
          en: "'Cheongmyeongjeong' is for those seeking a 'healthy and authentic taste of Korea.' The signature dish, 'Mugeunji Dakbokkeumtang' (Aged Kimchi Chicken Stew), uses long-fermented kimchi (mugeunji) to create a deep, complex umami flavor that regular kimchi cannot produce. The chicken is tender and well-seasoned, and the broth, simmered with the aged kimchi, is a fantastic dish in itself. The restaurant's philosophy of highlighting the natural flavors of ingredients without artificial additives will strongly appeal to health-conscious VIP clients.",
        },
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=당진+청기와가든",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npFEJdA7IEGGQpcAqwJnCijmb5cTLnV_H70fTpa7KclRoNqhRHABPbPLKzyQYcn4peFkEPjJ2NU6zKXgoyfp9C1VJCz1eTANwoV21d2rJFCfXHqMBsksWs5ojEB5sans5RimHj4=w408-h306-k-no",
      },
      {
        name: { ko: "곤지암할매소머리국밥", en: "Gonjiam Halmae" },
        menu: { ko: "소머리국밥, 갈비탕", en: "Beef Head Soup, Beef Rib Soup" },
        price: {
          ko: "₩10,000 - ₩15,000 (1인)",
          en: "₩10,000 - ₩15,000 (p.p.)",
        },
        hours: {
          ko: "문의 필요 (매월 1, 15일 휴무)",
          en: "Call for hours (Closed 1st & 15th of month)",
        },
        atmosphere: {
          ko: "60년 전통을 자랑하는 프랜차이즈의 지점으로, 깨끗하고 일관된 품질의 음식을 효율적으로 제공하는 데 중점을 둡니다. 진하고 든든한 전통 국밥 한 그릇을 즐기기에 최적화된 공간입니다.",
          en: "A branch of a 60-year-old franchise, it focuses on efficiently providing clean, consistent-quality food. The space is optimized for enjoying a rich, hearty bowl of traditional gukbap (soup with rice).",
        },
        review: {
          ko: "'곤지암할매소머리국밥'은 오랜 세월 한국인에게 사랑받아 온 국밥의 진수를 선보입니다. 14시간 이상 가마솥에서 푹 고아낸 100% 한우 사골 육수는 콜라겐이 풍부하여 입술에 쩍 달라붙을 만큼 진하고 깊은 맛을 냅니다. 대표 메뉴인 '소머리국밥'은 잡내 없이 깔끔하면서도 구수한 국물과 쫄깃한 소머리 고기가 푸짐하게 들어 있어, 한 그릇만으로도 몸과 마음이 든든해지는 만족감을 줍니다. 이는 한국인이 추운 날씨나 기력이 없을 때 즐겨 찾는 대표적인 위로 음식으로, 진솔하고 힘 있는 맛의 경험을 원하는 이에게 강력히 추천합니다.",
          en: "'Gonjiam Halmae Someori Gukbap' presents the essence of gukbap, beloved by Koreans for generations. The 100% Hanwoo beef bone broth, simmered in a cauldron for over 14 hours, is so rich in collagen that it's sticky on the lips, with a deep flavor. The signature 'Someori-gukbap' (Beef Head Soup) is satisfying with its clean yet savory broth and generous portions of chewy beef head meat, making you feel full and content in body and soul with just one bowl. It's a representative comfort food for Koreans, especially on cold days or when feeling low on energy, and is highly recommended for those seeking a sincere and powerful taste experience.",
        },
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=당진+곤지암할매소머리국밥",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noIRDBuQoV53Jtj-Htk43cQVYC71RITMPlfydyXE8z12kytwXGJeZQpX3hIGcOwejCHdIENTr3rrUzRLEweKvv9GdB9xpLQiDh8gVxHxrikjgpoq0NJX7n4NvJx1TFVow2rcmzO_A=w408-h306-k-no",
      },
      {
        name: { ko: "삼태기", en: "Samtaegi" },
        menu: {
          ko: "오리불고기, 오리백숙",
          en: "Spicy Duck Bulgogi, Whole Duck Soup",
        },
        price: {
          ko: "₩10,000 - ₩25,000 (1인)",
          en: "₩10,000 - ₩25,000 (p.p.)",
        },
        hours: {
          ko: "11:30 - 21:00 (연중무휴)",
          en: "11:30 - 21:00 (Open Daily)",
        },
        atmosphere: {
          ko: "단체 손님을 수용할 수 있는 넓고 깨끗한 공간을 갖춘 식당입니다. 한국에서 건강식(보양식)으로 인식되는 오리와 닭 요리를 전문으로 합니다.",
          en: "A restaurant with a spacious and clean area capable of accommodating large groups. It specializes in duck and chicken dishes, which are considered health foods (boyang-sik) in Korea.",
        },
        review: {
          ko: "'삼태기'는 한국의 일상적인 식단에서 돼지고기나 소고기보다 덜 흔한 오리고기를 전문적으로 맛볼 수 있는 특별한 기회를 제공합니다. 이곳에서는 두 가지 상반된 매력의 오리 요리를 즐길 수 있습니다. 얇게 썬 오리고기를 매콤한 양념에 볶아 먹는 '오리불고기'는 역동적이고 자극적인 맛으로 입맛을 돋우며, 오리 한 마리를 통째로 푹 삶아낸 '오리백숙'은 부드러운 육질과 맑고 담백한 국물로 몸을 보하는 건강한 맛을 선사합니다. 특히 백숙 요리는 조리 시간이 길어 사전 예약이 필수라는 점을 기억해야 합니다. 건강을 중시하는 미식가나 여럿이 함께 즐기는 특별한 식사를 원할 때 훌륭한 선택이 될 것입니다.",
          en: "'Samtaegi' offers a special opportunity to professionally taste duck meat, which is less common than pork or beef in the everyday Korean diet. Here, you can enjoy two duck dishes with contrasting charms. 'Ori-bulgogi,' thinly sliced duck stir-fried in a spicy sauce, stimulates the appetite with its dynamic and piquant flavor. 'Ori-baeksuk,' a whole duck simmered until tender, offers a healthy taste that nourishes the body with its soft meat and clear, light broth. It's important to remember that the baeksuk dish requires a reservation in advance due to its long cooking time. It's an excellent choice for health-conscious gourmets or for a special meal enjoyed with a group.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=당진+삼태기",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq1qwfiB6fQdsz7wOvwmJs90554A9nDbJ0pX-Gigu7vViGQA-2it3ArZGGY-Qb_EtkuykbHasN44_hZW3tK1WydaRCcfx75G-Cht63joqSXF86mXeTUAVdcUPHoM5smTqU1XJX1vQ=w408-h306-k-no",
      },
      {
        name: { ko: "대성정육점식당", en: "Daeseong Butcher-Restaurant" },
        menu: {
          ko: "생삼겹살, 한우 등심",
          en: "Fresh Pork Belly, Hanwoo Sirloin",
        },
        price: { ko: "₩20,000 이상 (1인)", en: "₩20,000+ (p.p.)" },
        hours: {
          ko: "11:30 - 21:30 (일요일 휴무)",
          en: "11:30 - 21:30 (Closed Sundays)",
        },
        atmosphere: {
          ko: "'정육식당'이라는 이름에서 연상되는 투박한 이미지와는 달리, 최근 리모델링을 통해 고급 레스토랑과 같은 세련되고 현대적인 분위기를 갖추게 되었습니다. 정육점을 함께 운영하여 신선한 고기를 제공하며, 넓고 쾌적한 공간은 가족 모임이나 비즈니스 저녁 식사 장소로도 손색이 없습니다.",
          en: "Contrary to the rustic image that the name 'butcher-restaurant' might suggest, a recent renovation has given it a stylish and modern atmosphere like that of a high-end restaurant. It operates alongside a butcher shop to provide fresh meat, and its spacious, pleasant area is perfect for family gatherings or business dinners.",
        },
        review: {
          ko: "'대성정육점식당'은 '정육식당'이라는 한국 특유의 시스템을 가장 세련된 방식으로 경험할 수 있는 곳입니다. 정육식당은 식당에서 직접 고기를 판매하므로 중간 유통 과정 없이 최상의 신선도와 품질을 자랑하는 고기를 합리적인 가격에 맛볼 수 있다는 장점이 있습니다. 이곳의 '생삼겹살'은 두툼한 두께와 선명한 지방층이 특징으로, 불판 위에서 노릇하게 구워내면 고소한 육즙이 폭발합니다. 최상급 '한우 등심' 역시 부드러운 육질과 풍부한 풍미로 미식가의 입맛을 사로잡습니다. 이곳은 전통적인 한국 바비큐의 맛과 현대적인 편안함을 동시에 추구하는 이들을 위한 최고의 선택지입니다.",
          en: "'Daeseong Butcher-Restaurant' is where you can experience the unique Korean 'butcher-restaurant' system in its most refined form. These establishments sell meat directly, which means you can enjoy the freshest, highest-quality meat at a reasonable price without intermediaries. Their 'Saeng-samgyeopsal' (fresh pork belly) is characterized by its thickness and distinct layers of fat; when grilled to a golden brown, it bursts with savory juices. The top-grade 'Hanwoo Sirloin' also captivates gourmets with its tender texture and rich flavor. This is the ultimate choice for those who seek both the traditional taste of Korean barbecue and modern comfort.",
        },
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=당진+대성정육점식당",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4no62SmfAGE-YMr8-XNuryOebTCpivaszSpLqrLcz7vkrN_cpCmAtUWiOeDqBrh0XEJmscHmmrgSbwLdbzP6s9-xIyY9oRazVOk7_BaIMt3ZcuSzowWz2VnGpEEAtQhrNGEq03Ht5A=w426-h240-k-no",
      },
    ],
  },
  {
    title: { ko: "좋은술 천비향 주변", en: "Near JoeunSul Cheonbihyang" },
    restaurants: [
      {
        name: { ko: "빅쭌부대찌개", en: "Big Jjun" },
        menu: { ko: "부대찌개", en: "Spicy Sausage Stew (Budae-jjigae)" },
        price: {
          ko: "₩15,000 - ₩20,000 (1인)",
          en: "₩15,000 - ₩20,000 (p.p.)",
        },
        hours: {
          ko: "09:00 - 21:00 (연중무휴)",
          en: "09:00 - 21:00 (Open Daily)",
        },
        atmosphere: {
          ko: "넓은 주차장을 갖춘 크고 현대적이며 매우 깨끗한 식당입니다. 밥과 라면사리를 무제한으로 제공하고, 식사 후에는 커피와 슬러시를 무료로 즐길 수 있는 코너까지 마련되어 있어 압도적인 가성비로 유명합니다. 활기차고 가족 친화적인 분위기입니다.",
          en: "A large, modern, and very clean restaurant with a spacious parking lot. It is famous for its overwhelming value, offering unlimited rice and ramen noodles, and even a corner with free coffee and slushies after the meal. The atmosphere is lively and family-friendly.",
        },
        review: {
          ko: "'빅쭌부대찌개'는 현대적인 편안함과 놀라운 가치를 동시에 제공하는 곳입니다. 한국 전쟁 이후의 역사적 배경을 지닌 '부대찌개'는 햄, 소시지 등 다양한 서양 식재료와 김치가 만나 탄생한 한국의 독특한 퓨전 요리입니다. 이곳의 부대찌개는 사골 육수를 사용하여 자극적이지 않고 깊은 맛을 내며, 푸짐한 건더기와 함께 끓여 먹는 라면 사리는 특별한 즐거움을 선사합니다. 단순히 맛있는 찌개를 넘어, 넉넉한 리필과 후식까지 완벽하게 갖춰진 이곳에서의 식사는 즐겁고 만족스러운 경험 그 자체입니다.",
          en: "'Big Jjun Budae-jjigae' offers both modern comfort and incredible value. 'Budae-jjigae,' with its historical roots in the post-Korean War era, is a unique Korean fusion dish created from a mix of Western ingredients like ham and sausage with kimchi. Here, the stew uses a beef bone broth for a deep, non-irritating flavor, and boiling ramen noodles with the generous ingredients is a special treat. It's more than just a tasty stew; the meal here, complete with ample refills and dessert, is a joyful and satisfying experience in itself.",
        },
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=평택+빅쭌부대찌개",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqZMVGcHOppT6OgQuVOqrCdzN_R0_2oKYulhE5QrErxowLEOonBR1k5JinPkHA3w7W_byEuakjV7jI8bsbEsLHuOVnl1VIrCiKCiu2oOyhygoZ5TfjTK-qQLzNVAUf8tPd_OaBd=w408-h306-k-no",
      },
      {
        name: { ko: "청명정", en: "Cheongmyeongjeong" },
        menu: { ko: "묵은지닭볶음탕", en: "Aged Kimchi Chicken Stew" },
        price: {
          ko: "₩10,000 - ₩25,000 (1인)",
          en: "₩10,000 - ₩25,000 (p.p.)",
        },
        hours: {
          ko: "11:30 - 22:00 (연중무휴)",
          en: "11:30 - 22:00 (Open Daily)",
        },
        atmosphere: {
          ko: "시골집 같은 편안한 분위기를 자아내는 대형 식당으로, 화학조미료를 사용하지 않는 건강한 집밥 스타일의 요리로 유명합니다. 깨끗하고 편안한 환경 덕분에 단체 모임이나 가족 식사 장소로 인기가 높습니다.",
          en: "A large restaurant with a comfortable, country-house-like atmosphere, famous for its healthy, home-style cooking that uses no chemical seasonings. Its clean and comfortable environment makes it popular for group gatherings and family meals.",
        },
        review: {
          ko: "'청명정'은 '건강하고 진정한 한국의 맛'을 찾는 이들을 위한 곳입니다. 대표 메뉴인 '묵은지닭볶음탕'은 오랜 시간 숙성된 김치(묵은지)를 사용하여 일반 김치로는 낼 수 없는 깊고 복합적인 감칠맛을 자랑합니다. 닭고기는 부드럽고 양념이 잘 배어 있으며, 묵은지와 함께 끓여낸 국물은 그 자체로 훌륭한 요리입니다. 인공적인 첨가물 없이 자연 재료 본연의 맛을 살리려는 식당의 철학은 건강을 중시하는 VIP 고객에게 큰 매력으로 다가갈 것입니다.",
          en: "'Cheongmyeongjeong' is for those seeking a 'healthy and authentic taste of Korea.' The signature dish, 'Mugeunji Dakbokkeumtang' (Aged Kimchi Chicken Stew), uses long-fermented kimchi (mugeunji) to create a deep, complex umami flavor that regular kimchi cannot produce. The chicken is tender and well-seasoned, and the broth, simmered with the aged kimchi, is a fantastic dish in itself. The restaurant's philosophy of highlighting the natural flavors of ingredients without artificial additives will strongly appeal to health-conscious VIP clients.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=평택+청명정",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nou_biQWkZolSfEn-_SISM0i4dzfF2-tdm8yMFGP3q9cB3E6oXuROk3l5rrGCLuk3JKfwUHrTeoEVBUI5TsvPahXzzozndDMY2QxcpH-h2XEqyybggPVE3t9TOPzdYHITpAYdX-=w426-h240-k-no",
      },
      {
        name: { ko: "연탄불구이", en: "Yeontan-bulgui" },
        menu: {
          ko: "연탄불구이 (단일 메뉴)",
          en: "Charcoal Grilled Pork (single menu)",
        },
        price: { ko: "약 ₩20,000 (1인)", en: "~ ₩20,000 (p.p.)" },
        hours: {
          ko: "12:00 - 22:00 (월요일 휴무)",
          en: "12:00 - 22:00 (Closed Mondays)",
        },
        atmosphere: {
          ko: "간판도 없이 자갈이 깔린 바닥과 야외에 놓인 단순한 테이블이 전부인, 극도로 소박하고 거친 분위기의 식당입니다. 현지인들만 아는 진정한 '숨은 맛집'으로, 모든 반찬은 셀프 서비스로 직접 가져와야 합니다.",
          en: "An extremely rustic and raw-feeling restaurant with no sign, a gravel floor, and simple outdoor tables. It's a true 'hidden gem' known only to locals, where all side dishes are self-service.",
        },
        review: {
          ko: "'연탄불구이'에서의 식사는 미식 모험가들을 위한 특별한 이벤트입니다. 간판도, 메뉴판도 없다는 사실은 오직 단 하나의 요리에 대한 식당의 절대적인 자신감을 드러냅니다. 연탄불에서 피어오르는 구수한 연기와 고기 익는 소리가 가득한 야외 공간은 그 자체로 독특한 매력을 발산합니다. 초벌구이를 거친 두툼한 돼지고기는 겉은 바삭하고 속은 촉촉하며, 은은하게 밴 연탄의 향이 풍미를 한층 더 끌어올립니다. 이곳은 단순한 저녁 식사가 아니라, 한국 바비큐 문화의 가장 원초적이고 진솔한 심장부를 경험하는 잊지 못할 모험이 될 것입니다.",
          en: "A meal at 'Yeontan-bulgui' is a special event for culinary adventurers. The absence of a sign or a menu reveals the restaurant's absolute confidence in its single dish. The outdoor space, filled with the savory smoke from briquettes and the sound of grilling meat, exudes a unique charm. The thick pork, pre-grilled, is crispy on the outside and moist on the inside, with a subtle briquette aroma that enhances the flavor. This is not just a dinner; it will be an unforgettable adventure into the most primal and sincere heart of Korean barbecue culture.",
        },
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=평택+연탄불구이",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqMGvmf-65JqD5DIf8AOliRxdAERXg-wQe6H1FOmKTqfQ5mZ2xsMQa4PRKjzHqailL_IvQi-lueK-7ZZGllj_Lx77z-IdWMlkBAZt2dF17O9zO066aFmnf-sfk6Q9IsXKgCz5gG=w532-h240-k-no",
      },
      {
        name: { ko: "소담촌", en: "Sodamchon" },
        menu: { ko: "월남쌈 샤브샤브", en: "Vietnamese Wraps & Shabu-Shabu" },
        price: { ko: "약 ₩20,000 (1인)", en: "~ ₩20,000 (p.p.)" },
        hours: {
          ko: "11:00 - 21:30 (연중무휴)",
          en: "11:00 - 21:30 (Open Daily)",
        },
        atmosphere: {
          ko: "넓고 현대적이며 매우 깨끗한 인테리어를 자랑합니다. 아이들을 위한 놀이방과 식사 후 디저트를 즐길 수 있는 별도의 카페 공간까지 완벽하게 갖추고 있어 가족 및 단체 모임에 최적화되어 있습니다. 신선한 채소와 다양한 사리를 무제한으로 가져올 수 있는 셀프 바는 매우 잘 관리되고 있습니다.",
          en: "It boasts a spacious, modern, and very clean interior. Perfectly equipped with a playroom for children and a separate cafe area for post-meal desserts, it is optimized for family and group gatherings. The self-service bar with unlimited fresh vegetables and various add-ins is very well-managed.",
        },
        review: {
          ko: "'소담촌'은 건강하고 다채로우며 모두가 즐겁게 참여할 수 있는 식사를 위한 완벽한 선택지입니다. 끓는 육수에 얇게 썬 고기와 채소를 살짝 익혀 먹는 '샤브샤브'와, 라이스페이퍼에 신선한 채소와 고기를 싸 먹는 '월남쌈'의 조합은 가벼우면서도 만족스러운 미식 경험을 제공합니다. 특히 무제한으로 제공되는 신선한 채소 바는 이곳의 가장 큰 매력입니다. 편안하고 쾌적한 환경에서 건강한 음식을 즐기고 싶을 때, 실패 없는 선택이 될 것입니다.",
          en: "'Sodamchon' is the perfect choice for a healthy, diverse, and interactive meal that everyone can enjoy. The combination of 'shabu-shabu,' where you lightly cook thinly sliced meat and vegetables in a boiling broth, and 'wolnamssam' (Vietnamese spring rolls), where you wrap fresh vegetables and meat in rice paper, offers a light yet satisfying culinary experience. The unlimited fresh vegetable bar is a major highlight. When you want to enjoy healthy food in a comfortable and pleasant environment, this will be a fail-safe choice.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=평택+소담촌",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq2xViXm9W4l9QMQpHwGvrJVVtt48inOYr1n75PqcKOgU6F3nbcDwrLH8UTiR81KBCHmMgmF6kSoRPdzV-b2VuZzwWWM6DXpIdp-coN_6By5ThQDbkPT0mkOLtxypiAwaxQ9Ng8uA=w408-h306-k-no",
      },
      {
        name: { ko: "가봉루", en: "Gabongru" },
        menu: {
          ko: "짜장면, 하얀짬뽕",
          en: "Black Bean Noodles, White Jjamppong",
        },
        price: {
          ko: "₩10,000 - ₩20,000 (1인)",
          en: "₩10,000 - ₩20,000 (p.p.)",
        },
        hours: {
          ko: "문의 필요 (휴무 비정기적)",
          en: "Call for hours (Irregular Closures)",
        },
        atmosphere: {
          ko: "건물 2층에 위치해 눈에 잘 띄지 않을 수 있지만, 점심시간이면 인근 직장인과 주민들로 붐비는 전형적인 동네 맛집입니다. 화려함보다는 편안하고 익숙한 분위기에서 식사를 즐길 수 있는, 정감 있는 공간입니다.",
          en: "Located on the second floor, it might not be easily noticeable, but it's a typical neighborhood favorite that gets crowded with nearby office workers and residents at lunchtime. It's a friendly space where you can enjoy a meal in a comfortable and familiar atmosphere rather than a flashy one.",
        },
        review: {
          ko: "'가봉루'는 인근 주민과 직장인들에게 꾸준히 사랑받는, 신뢰할 수 있는 동네 중식당의 정석을 보여주는 곳입니다. 대표 메뉴인 '짜장면'과 바삭한 '탕수육'은 언제나 만족스러운 선택이지만, 이곳의 숨은 매력은 맵지 않은 '하얀짬뽕'에서 찾을 수 있습니다. 다양한 채소와 해산물이 어우러져 시원하고 담백한 국물 맛을 내는 하얀짬뽕은, 자극적인 맛에서 벗어나 편안한 한 끼를 원하는 이들에게 훌륭한 대안이 되어줍니다.",
          en: "'Gabongru' is the epitome of a reliable neighborhood Chinese restaurant, consistently loved by local residents and office workers. The signature 'Jajangmyeon' (black bean noodles) and crispy 'Tangsuyuk' (sweet and sour pork) are always satisfying choices, but the hidden charm here is the non-spicy 'White Jjamppong.' With its refreshing and clean broth made from various vegetables and seafood, the white jjamppong is an excellent alternative for those who want a comfortable meal away from strong flavors.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=평택+가봉루",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrpU6_zvnyqmsPlAo_yxqmuMXW79hApSkZ_-Ya9HRrmul-1Sw4R38kip3SxMpKUK72kzwAuYS-hyWKRWUMX1l9ilqx9vX3DrZx7KfEYIbmXbE08Xe0btOiuJFk1OwKFfheBEQg=w408-h306-k-no",
      },
      {
        name: { ko: "당거리국수", en: "Danggeori Guksu" },
        menu: {
          ko: "콩국수, 비빔국수",
          en: "Cold Soy Milk Noodle, Spicy Mixed Noodles",
        },
        price: { ko: "약 ₩10,000 (1인)", en: "~ ₩10,000 (p.p.)" },
        hours: {
          ko: "11:00 - 19:00 (월요일 휴무)",
          en: "11:00 - 19:00 (Closed Mondays)",
        },
        atmosphere: {
          ko: "오성강변의 아름다운 풍경을 따라 위치한 현대적이고 깨끗하며 밝은 분위기의 식당입니다. 미국에서 요리 경력을 쌓은 젊은 셰프가 아버지의 고향으로 돌아와 문을 연 곳으로, 그의 열정과 세심함이 공간 곳곳에 묻어납니다.",
          en: "A modern, clean, and bright restaurant located along the beautiful scenery of the Oseong riverside. Opened by a young chef with culinary experience in the US who returned to his father's hometown, his passion and meticulousness are evident throughout the space.",
        },
        review: {
          ko: "'당거리국수'는 음식에 담긴 이야기와 맛이 모두 훌륭한 곳입니다. 젊은 셰프의 배경은 이곳 국수 요리의 높은 완성도를 설명해 줍니다. 특히 국산 서리태 콩으로 만들어 극도로 진하고 고소한 '콩국수'와, 직접 개발한 특제 소스로 맛을 낸 '비빔국수'는 반드시 맛보아야 할 메뉴입니다. 아름다운 강변 풍경을 감상하며 즐기는 정성스러운 국수 한 그릇은 평화롭고 만족스러운 미식의 순간을 선사할 것입니다.",
          en: "'Danggeori Guksu' is a place where both the story behind the food and its taste are excellent. The young chef's background explains the high quality of the noodle dishes here. The 'Kong-guksu,' made with domestic black soybeans for an extremely rich and nutty flavor, and the 'Bibim-guksu,' seasoned with a special house-made sauce, are must-try items. A heartfelt bowl of noodles enjoyed while admiring the beautiful riverside scenery will provide a peaceful and satisfying culinary moment.",
        },
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=평택+당거리국수",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrg-D72620mW6WSbHO2R_ogKAl4BE9M1u2PZ_442I2-awbY6IVcWfRI-5cWNrb_RTTiwkHiojmCznvVXdC2ooprD6E8SwThU80lTeTLWlMqxgI1w7t1zKEKafXONp8IGNXrwfag=w426-h240-k-no",
      },
      {
        name: { ko: "천강수산", en: "Cheongang Susan" },
        menu: { ko: "장어 소금구이", en: "Salt-grilled Freshwater Eel" },
        price: { ko: "약 ₩25,000 (1인)", en: "~ ₩25,000 (p.p.)" },
        hours: {
          ko: "11:00 - 21:00 (연중무휴)",
          en: "11:00 - 21:00 (Open Daily)",
        },
        atmosphere: {
          ko: "약 6,600 제곱미터(1.6 에이커)에 달하는 거대한 부지에 자리한 '데스티네이션 다이닝'의 정수를 보여줍니다. 아름답게 조경된 정원, 연못, 조각상들이 어우러져 단순한 식당을 넘어 하나의 공원과 같은 인상을 줍니다. 특히 조명이 켜지는 저녁 시간에는 더욱 환상적인 분위기를 자아냅니다.",
          en: "This place showcases the essence of 'destination dining,' situated on a vast 1.6-acre (approx. 6,600 sq. meter) property. With its beautifully landscaped gardens, ponds, and sculptures, it feels more like a park than just a restaurant. The atmosphere becomes even more magical in the evening when the lights are on.",
        },
        review: {
          ko: "'천강수산'은 한국에서 귀한 보양식으로 여겨지는 '장어'를 가장 인상적인 환경에서 즐길 수 있는 최고의 장소입니다. 이곳의 장어는 오직 참숯과 소금만을 이용하여 구워내, 식재료 본연의 담백하고 고소한 맛을 극대화합니다. 통통하고 살이 오른 장어를 향긋한 숯불 위에서 직접 구워 먹는 경험은 미각뿐만 아니라 모든 감각을 만족시킵니다. 눈앞에 펼쳐진 아름다운 정원과 주인장의 따뜻한 환대는 이곳에서의 식사를 잊지 못할 축제의 시간으로 만들어 줄 것입니다.",
          en: "'Cheongang Susan' is the best place to enjoy 'jangeo' (freshwater eel), a prized health food in Korea, in the most impressive setting. The eel here is grilled using only charcoal and salt, maximizing the ingredient's natural, light, and savory flavor. The experience of grilling the plump, meaty eel yourself over fragrant charcoal satisfies not just the palate but all the senses. The beautiful garden spread out before you and the owner's warm hospitality will make your meal here an unforgettable festive occasion.",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=평택+천강수산",
        imageUrl:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npvFn9KGLNcQlwbgfZMAcbl17ItpZzxAsv37wCuZX99rAPZFLMGrNUZEzENNmJrkEN7_eUfjW-T3ghrU5ZrGtob3c5hFFBLCwuRs7C3WxAHjx9V_6XWBY6Pbyrsp8Goqk3-ATrgVQ=w408-h544-k-no",
      },
    ],
  },
];

export default function VipGuidePage() {
  const { currentLanguage } = useLangStore();
  const lang: Lang = currentLanguage === "en" ? "en" : "ko";

  return (
    <div className="mt-16 min-h-screen bg-[#FAF9F6]">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* 헤더 타이틀 */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {lang === "ko" ? "VIP 투어 미식 가이드" : "VIP Tour Dining Guide"}
          </h1>
          <p className="mt-2 text-gray-600">
            {lang === "ko"
              ? "안목 있는 여행자를 위한 큐레이션 가이드"
              : "A Curated Guide for the Discerning Traveler"}
          </p>
        </div>

        {/* 섹션 렌더 */}
        {sections.map((section) => (
          <section key={section.title.ko} className="brewery-section mt-10">
            <h2 className="mb-6 border-b-2 border-amber-700 pb-2 text-xl font-semibold text-amber-800">
              {section.title[lang]}
            </h2>

            <div className="grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2">
              {section.restaurants.map((r) => (
                <Card key={r.name.ko} className="overflow-hidden pt-0">
                  <div className="relative h-64 w-full bg-slate-100 sm:h-72 md:h-80">
                    {r.imageUrl ? (
                      <Image
                        src={r.imageUrl}
                        alt={r.name[lang]}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-cover"
                        priority={false}
                      />
                    ) : null}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-xl font-semibold text-gray-900">
                      {r.name[lang]}
                    </h3>

                    <div className="mb-4 rounded-md border-l-4 border-blue-800 bg-blue-50 px-4 py-3 text-sm text-gray-700">
                      <div className="grid gap-1 sm:grid-cols-3 sm:gap-3">
                        <span>
                          <strong className="mr-1">
                            {lang === "ko" ? "메뉴:" : "Menu:"}
                          </strong>
                          {r.menu[lang]}
                        </span>
                        <span>
                          <strong className="mr-1">
                            {lang === "ko" ? "가격:" : "Price:"}
                          </strong>
                          {r.price[lang]}
                        </span>
                        <span>
                          <strong className="mr-1">
                            {lang === "ko" ? "운영:" : "Hours:"}
                          </strong>
                          {r.hours[lang]}
                        </span>
                      </div>
                    </div>

                    <h4 className="mt-4 border-b pb-2 text-sm font-semibold text-gray-800">
                      {lang === "ko" ? "분위기" : "Atmosphere"}
                    </h4>
                    <p className="mt-2 leading-7 text-gray-700">
                      {r.atmosphere[lang]}
                    </p>

                    <h4 className="mt-6 border-b pb-2 text-sm font-semibold text-gray-800">
                      {lang === "ko" ? "미식평" : "Gourmet Review"}
                    </h4>
                    <p className="mt-2 leading-7 text-gray-700">
                      {r.review[lang]}
                    </p>
                  </CardContent>
                  <div className="px-6 pb-6">
                    <Link
                      href={r.mapUrl}
                      target="_blank"
                      className="inline-block"
                    >
                      <Button>
                        {lang === "ko" ? "지도 보기" : "View Map"}
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
// (Note) Remove accidental duplicate default export
