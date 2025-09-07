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
          ko: "'수목가든'은 한국의 정겨운 가족 외식 문화를 경험할 수 있는 가장 확실한 선택지입니다. 돼지석갈비는 완벽하게 조리된 상태로 제공되며, 버섯전골은 깊고 시원한 국물 맛이 일품입니다.",
          en: "'Sumok Garden' is the most reliable choice for experiencing Korea's warm family dining culture. The 'Dwaeji Seokgalbi' is served perfectly cooked, and the 'Mushroom Hot Pot' offers a deep, refreshing broth.",
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
          ko: "오랜 역사가 느껴지는 전통적인 분위기. 연탄불의 열기가 가득하지만 넓고 깨끗하게 관리되어 식사에 불편함이 없습니다.",
          en: "Traditional atmosphere steeped in history. Always bustling yet spacious and well-maintained for comfortable dining.",
        },
        review: {
          ko: "30년 넘게 이어온 비법 양념에 재운 갈비는 육향을 극대화하며, 연탄불에서 구워 깊은 훈연향을 더합니다.",
          en: "Ribs marinated in a 30-year-old secret sauce maximize the meat aroma, enhanced by a deep smoky flavor from briquettes.",
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
          ko: "이른 아침부터 문을 여는 전형적 서민 식당. 기능성에 초점, 현지인들이 즐겨 찾는 곳.",
          en: "Typical working-class eatery open early; functional space favored by locals.",
        },
        review: {
          ko: "추어탕은 비린 맛 없이 고소하고 진한 풍미가 특징. 뼈해장국은 진하고 칼칼한 국물이 일품.",
          en: "Chueotang has a rich, savory flavor without fishiness; the pork spine stew boasts a deep, spicy broth.",
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
          ko: "현지인만 아는 진정한 노포. 소박한 공간에서 오직 음식의 맛에 집중.",
          en: "A true old eatery known to locals; simple space focusing solely on taste.",
        },
        review: {
          ko: "맷돌로 간 콩의 진하고 고소한 콩국수, 겨울엔 맑은 멸치국물의 칼국수로 위로를 주는 맛.",
          en: "Millstone-ground soybeans make for rich kong-guksu; winter noodle soup soothes with clear anchovy broth.",
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
          ko: "고즈넉한 한옥 공간에서 평화로운 식사.",
          en: "Serene Hanok setting for a peaceful meal.",
        },
        review: {
          ko: "닭백숙과 누룽지의 조합으로 전혀 다른 차원의 맛을 선사.",
          en: "Baeksuk with nurungji creates a different dimension of flavor.",
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
          ko: "덕산 온천 관광지 인근의 소박한 현지 식당.",
          en: "Humble local restaurant near Deoksan Hot Springs.",
        },
        review: {
          ko: "밴댕이찌개는 맵지만 깊은 감칠맛. 쌈과 함께 먹으면 풍성한 맛.",
          en: "Spicy yet deeply savory; lettuce wraps enrich the flavor.",
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
          ko: "전원 주택 같은 목가적 분위기, 인기 높은 맛집.",
          en: "Pastoral vibe like a country house; very popular spot.",
        },
        review: {
          ko: "보리밥과 나물, 된장찌개가 조화로운 건강한 맛. 경양식 스타일 돈까스도 인기.",
          en: "Healthy taste with barley rice and soybean paste stew; old-style pork cutlet is popular.",
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
          ko: "현지인과 여행객들로 활기찬, 서민적이고 푸짐한 분위기.",
          en: "Lively, down-to-earth, generous portions.",
        },
        review: {
          ko: "우렁쌈장과 우렁덕장을 신선한 채소와 함께 즐기는 건강한 맛의 향연.",
          en: "Healthy flavor festival with savory ssamjang and spicy deokjang.",
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
          ko: "저렴하고 맛있는 소박한 분식집.",
          en: "Affordable and tasty humble snack restaurant.",
        },
        review: {
          ko: "정직한 분식의 맛. 간단 요청으로 비건 메뉴도 가능.",
          en: "Honest bunsik flavors; can make dishes vegan upon request.",
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
          ko: "작지만 세련된 감성 식당. 오픈 키친이 주는 신뢰.",
          en: "Small, stylish, cafe-like eatery with open kitchen.",
        },
        review: {
          ko: "함박스테이크와 안심카츠가 대표 메뉴. 매콤크림파스타 추천.",
          en: "Signature hamburg steak and tenderloin cutlet; spicy cream pasta recommended.",
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
          ko: "고풍스럽고 역사적인 분위기. 풍성한 반찬으로 유명.",
          en: "Old-fashioned, historic vibe; renowned for plentiful side dishes.",
        },
        review: {
          ko: "수십 가지 반찬과 돌솥밥, 숭늉까지 즐기는 한국 한정식의 정수.",
          en: "Essence of Korean table d'hôte with dozens of side dishes, stone pot rice, and sungnyung.",
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
          ko: "깨끗하고 일관된 품질의 음식을 효율적으로 제공.",
          en: "Clean, consistent-quality food efficiently served.",
        },
        review: {
          ko: "오랜 시간 푹 고아낸 사골 육수의 깊은 맛. 든든한 위로 음식.",
          en: "Deep flavor from long-simmered beef bone broth; quintessential comfort food.",
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
          ko: "단체도 가능한 넓고 깨끗한 공간. 보양식으로 인기.",
          en: "Spacious, clean, suits groups; popular for health foods.",
        },
        review: {
          ko: "오리불고기의 자극적 매력과 오리백숙의 담백함을 모두 즐길 수 있음.",
          en: "Enjoy both piquant duck bulgogi and clean-tasting duck baeksuk.",
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
          ko: "리모델링으로 세련된 현대적 분위기. 정육점 운영으로 신선한 고기 제공.",
          en: "Renovated, modern vibe; butcher-operated for fresh meat.",
        },
        review: {
          ko: "두툼한 생삼겹과 최상급 한우 등심으로 전통 바비큐와 현대적 편안함을 동시에.",
          en: "Thick fresh pork belly and top-grade sirloin deliver traditional BBQ and modern comfort.",
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
          ko: "넓고 매우 깨끗한 현대적 식당. 무제한 리필 등 가성비 우수.",
          en: "Large, very clean modern restaurant; great value with refills.",
        },
        review: {
          ko: "사골 육수로 깊은 맛, 라면사리와 풍성한 건더기의 즐거움.",
          en: "Deep flavor with beef bone broth; joy of noodles and generous ingredients.",
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
          ko: "시골집 같은 편안한 분위기의 대형 식당.",
          en: "Large, comfortable country-house-like vibe.",
        },
        review: {
          ko: "묵은지로 낸 깊고 복합적인 감칠맛. 자연 재료 본연의 맛 강조.",
          en: "Deep umami from long-fermented kimchi; highlights natural flavors.",
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
          ko: "간판 없는 극도로 소박한 야외 식당, 셀프 반찬.",
          en: "Extremely rustic outdoor spot with self-service side dishes.",
        },
        review: {
          ko: "바삭한 겉, 촉촉한 속. 은은한 연탄 향이 뛰어난 돼지고기.",
          en: "Crispy outside, juicy inside; subtle briquette aroma elevates pork.",
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
          ko: "넓고 현대적이며 매우 깨끗. 놀이방/카페 등 가족/단체 최적.",
          en: "Spacious, modern, clean; playroom and cafe ideal for families/groups.",
        },
        review: {
          ko: "샤브샤브와 월남쌈의 가벼우면서 만족스러운 조합. 신선 채소 바가 매력.",
          en: "Light yet satisfying combo; unlimited fresh vegetable bar is a highlight.",
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
          ko: "점심 시간 붐비는 동네 맛집. 편안하고 익숙한 분위기.",
          en: "Neighborhood favorite crowded at lunch; comfortable, familiar vibe.",
        },
        review: {
          ko: "짜장면/탕수육도 좋지만 맵지 않은 하얀짬뽕이 숨은 매력.",
          en: "Hidden charm is the non-spicy white jjamppong.",
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
          ko: "오성강변의 현대적이고 밝은 식당. 젊은 셰프의 정성이 담김.",
          en: "Modern, bright riverside spot; passion of a young chef shows.",
        },
        review: {
          ko: "극도로 진하고 고소한 콩국수와 특제 소스의 비빔국수는 필수.",
          en: "Must-try rich kong-guksu and house-sauced bibim-guksu.",
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
          ko: "넓은 부지의 데스티네이션 다이닝. 공원 같은 아름다운 공간.",
          en: "Destination dining on vast grounds; feels like a park.",
        },
        review: {
          ko: "참숯과 소금만으로 구워내 담백하고 고소한 장어의 정수.",
          en: "Charcoal-and-salt grilled eel maximizing natural savoriness.",
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
    <div className="mt-16 min-h-screen bg-gray-50">
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

        {/* 언어 스위처 제거: 전역 언어 상태를 사용합니다 */}

        {/* 섹션 렌더 */}
        {sections.map((section) => (
          <section key={section.title.ko} className="brewery-section mt-10">
            <h2 className="mb-6 border-b-2 border-amber-700 pb-2 text-xl font-semibold text-amber-800">
              {section.title[lang]}
            </h2>

            <div className="space-y-6">
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
