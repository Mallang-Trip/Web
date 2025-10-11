"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";

type Restaurant = {
  name: string;
  menu: string;
  price: string;
  hours: string;
  atmosphere: string;
  review: string;
  mapUrl: string;
  imageUrl: string;
};

type Section = {
  title: string;
  restaurants: Restaurant[];
};

export default function VipGuidePage() {
  const { t } = useTranslation();

  // 섹션 구성 - 번역 텍스트 사용
  const sections: Section[] = [
    {
      title: t.vipGuide.sections.yesan,
      restaurants: [
        {
          name: t.vipGuide.restaurants.sumokGarden.name,
          menu: t.vipGuide.restaurants.sumokGarden.menu,
          price: t.vipGuide.restaurants.sumokGarden.price,
          hours: t.vipGuide.restaurants.sumokGarden.hours,
          atmosphere: t.vipGuide.restaurants.sumokGarden.atmosphere,
          review: t.vipGuide.restaurants.sumokGarden.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=예산+수목가든",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noonATOQRgZ8UPWv_Cz2PhzMTw8dEmTYHkDeg1s5mLu8AwQYLK804wLX9ris0Mu9KjfcgD8Pa4QJk8X8yNR9xUyiscJbjtBXlBuzpTjgDn-a0IuFFJvhIEhNgwIT16t-jL3a6wR=w408-h544-k-no",
        },
        {
          name: t.vipGuide.restaurants.godeokGalbi.name,
          menu: t.vipGuide.restaurants.godeokGalbi.menu,
          price: t.vipGuide.restaurants.godeokGalbi.price,
          hours: t.vipGuide.restaurants.godeokGalbi.hours,
          atmosphere: t.vipGuide.restaurants.godeokGalbi.atmosphere,
          review: t.vipGuide.restaurants.godeokGalbi.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=예산+고덕갈비",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noDTpxfHi1R-cNN269axy9IO6i78k9Hmjv7WemO919VGod8sZZEVJNLhiXqkcqHhsULvWoEaZPhN6TMtXEUhvkJy61nNqcJCFWspontL4aEPPjHrBr9dgTmw4gHi7y-fQyIkMACnK3qAHnl=w408-h306-k-no",
        },
        {
          name: t.vipGuide.restaurants.yugane.name,
          menu: t.vipGuide.restaurants.yugane.menu,
          price: t.vipGuide.restaurants.yugane.price,
          hours: t.vipGuide.restaurants.yugane.hours,
          atmosphere: t.vipGuide.restaurants.yugane.atmosphere,
          review: t.vipGuide.restaurants.yugane.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=예산+유가네추어탕",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrYtTQiUKkUDjQ5p4T5IpBB6lP-RqW1yW7mtW9v9simolhZkGYkuGj7BuToQpNZqu7epRNIxNd1Tt6Y-srjmIdwm9jb-CBVYcpBCNeXSh7PGLS0JSNFnia73AD1XruupOopyLIP=w513-h240-k-no",
        },
        {
          name: t.vipGuide.restaurants.seongmi.name,
          menu: t.vipGuide.restaurants.seongmi.menu,
          price: t.vipGuide.restaurants.seongmi.price,
          hours: t.vipGuide.restaurants.seongmi.hours,
          atmosphere: t.vipGuide.restaurants.seongmi.atmosphere,
          review: t.vipGuide.restaurants.seongmi.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=예산+성미식당",
          imageUrl:
            "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png",
        },
        {
          name: t.vipGuide.restaurants.yaksangol.name,
          menu: t.vipGuide.restaurants.yaksangol.menu,
          price: t.vipGuide.restaurants.yaksangol.price,
          hours: t.vipGuide.restaurants.yaksangol.hours,
          atmosphere: t.vipGuide.restaurants.yaksangol.atmosphere,
          review: t.vipGuide.restaurants.yaksangol.review,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=예산+약산골",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrzUX-Om7BYc69aA7rjO8FEdBxmhX2qX1n34bs5DqMyfgO017Haxthc7vlYJfZCKJC5o9C6bQapyOQWZk8Vhp25RzhaV83u2gosXEWY7hGyQbZGfMXYTlbAZ28tjr2Z3NDvl2iY=w408-h725-k-no",
        },
        {
          name: t.vipGuide.restaurants.ttosunne.name,
          menu: t.vipGuide.restaurants.ttosunne.menu,
          price: t.vipGuide.restaurants.ttosunne.price,
          hours: t.vipGuide.restaurants.ttosunne.hours,
          atmosphere: t.vipGuide.restaurants.ttosunne.atmosphere,
          review: t.vipGuide.restaurants.ttosunne.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=예산+또순네식당",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npHWcqGg_VhgK7_Yn1toR_c5_zlb981mwBTPWoyEJPfyZZ_fMznUxON2gZfiDevW3ptB7zxLkhIewc1VaPRy64ijJU3MlBz_hWy3ZSKOSxUnqhvlGbm9yKRO-xxFrKc2gKAzWoV=w426-h240-k-no",
        },
        {
          name: t.vipGuide.restaurants.sagwanamu.name,
          menu: t.vipGuide.restaurants.sagwanamu.menu,
          price: t.vipGuide.restaurants.sagwanamu.price,
          hours: t.vipGuide.restaurants.sagwanamu.hours,
          atmosphere: t.vipGuide.restaurants.sagwanamu.atmosphere,
          review: t.vipGuide.restaurants.sagwanamu.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=예산+사과나무",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npNq2CFvJh42EVwuAm_4DWSNFoIQWPBMUNrg2-mrnAFPbITuEONu7o8TS4ayahU_opTD_O_DtvGuzXw_rJN2np6CSsH5jU_UuMl1Ie2gDF63bdOU_qhlwBlIgQ90pfA9BMDogeQ=w408-h612-k-no",
        },
      ],
    },
    {
      title: t.vipGuide.sections.sinpyeong,
      restaurants: [
        {
          name: t.vipGuide.restaurants.ureongi.name,
          menu: t.vipGuide.restaurants.ureongi.menu,
          price: t.vipGuide.restaurants.ureongi.price,
          hours: t.vipGuide.restaurants.ureongi.hours,
          atmosphere: t.vipGuide.restaurants.ureongi.atmosphere,
          review: t.vipGuide.restaurants.ureongi.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=당진+우렁이박사",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqRrky8Rv5bHIF8znqr9vXQ922N9q9ZRG-N9slDrgtG7MFaNX8HY2_5fccpRmJaPF99wdJoyK6ytSRtEgGcuMnk5YOHGsbmH9pg3kCFigTzFjIaSlMflZbllvg6iSexFkXPODA=w408-h306-k-no",
        },
        {
          name: t.vipGuide.restaurants.junine.name,
          menu: t.vipGuide.restaurants.junine.menu,
          price: t.vipGuide.restaurants.junine.price,
          hours: t.vipGuide.restaurants.junine.hours,
          atmosphere: t.vipGuide.restaurants.junine.atmosphere,
          review: t.vipGuide.restaurants.junine.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=당진+준이네분식",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqa1EJlZ51DmvIVfw-IlICELhiD1ItW78RcwcbJ2c6fc-9nwIOxp4L-q3nQtfKCifhF6AmIe1FW7vtFqjPrBVFlAY72tk3ZzXl8kpi1evykNTpMRVBvCObpFlaoB0GqX3wKebT1=w408-h306-k-no",
        },
        {
          name: t.vipGuide.restaurants.annyeongHambak.name,
          menu: t.vipGuide.restaurants.annyeongHambak.menu,
          price: t.vipGuide.restaurants.annyeongHambak.price,
          hours: t.vipGuide.restaurants.annyeongHambak.hours,
          atmosphere: t.vipGuide.restaurants.annyeongHambak.atmosphere,
          review: t.vipGuide.restaurants.annyeongHambak.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=당진+안녕함박",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nokwL3hv2HY-HJZhS-TSVWC6Yt44ooCTKnWe2zOyTAKVv3B3dtIakN0jSOcp-KQAWlk19v3EAJnK40mcqbRrSv-6Tk8NIqRee8GT-diJmq3F7MQM49pHfQmaugDdKDUUpQgW0h0=w506-h240-k-no",
        },
        {
          name: t.vipGuide.restaurants.cheonggiwa.name,
          menu: t.vipGuide.restaurants.cheonggiwa.menu,
          price: t.vipGuide.restaurants.cheonggiwa.price,
          hours: t.vipGuide.restaurants.cheonggiwa.hours,
          atmosphere: t.vipGuide.restaurants.cheonggiwa.atmosphere,
          review: t.vipGuide.restaurants.cheonggiwa.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=당진+청기와가든",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npFEJdA7IEGGQpcAqwJnCijmb5cTLnV_H70fTpa7KclRoNqhRHABPbPLKzyQYcn4peFkEPjJ2NU6zKXgoyfp9C1VJCz1eTANwoV21d2rJFCfXHqMBsksWs5ojEB5sans5RimHj4=w408-h306-k-no",
        },
        {
          name: t.vipGuide.restaurants.gonjiamHalmae.name,
          menu: t.vipGuide.restaurants.gonjiamHalmae.menu,
          price: t.vipGuide.restaurants.gonjiamHalmae.price,
          hours: t.vipGuide.restaurants.gonjiamHalmae.hours,
          atmosphere: t.vipGuide.restaurants.gonjiamHalmae.atmosphere,
          review: t.vipGuide.restaurants.gonjiamHalmae.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=당진+곤지암할매소머리국밥",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noIRDBuQoV53Jtj-Htk43cQVYC71RITMPlfydyXE8z12kytwXGJeZQpX3hIGcOwejCHdIENTr3rrUzRLEweKvv9GdB9xpLQiDh8gVxHxrikjgpoq0NJX7n4NvJx1TFVow2rcmzO_A=w408-h306-k-no",
        },
        {
          name: t.vipGuide.restaurants.samtaegi.name,
          menu: t.vipGuide.restaurants.samtaegi.menu,
          price: t.vipGuide.restaurants.samtaegi.price,
          hours: t.vipGuide.restaurants.samtaegi.hours,
          atmosphere: t.vipGuide.restaurants.samtaegi.atmosphere,
          review: t.vipGuide.restaurants.samtaegi.review,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=당진+삼태기",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq1qwfiB6fQdsz7wOvwmJs90554A9nDbJ0pX-Gigu7vViGQA-2it3ArZGGY-Qb_EtkuykbHasN44_hZW3tK1WydaRCcfx75G-Cht63joqSXF86mXeTUAVdcUPHoM5smTqU1XJX1vQ=w408-h306-k-no",
        },
        {
          name: t.vipGuide.restaurants.daeseong.name,
          menu: t.vipGuide.restaurants.daeseong.menu,
          price: t.vipGuide.restaurants.daeseong.price,
          hours: t.vipGuide.restaurants.daeseong.hours,
          atmosphere: t.vipGuide.restaurants.daeseong.atmosphere,
          review: t.vipGuide.restaurants.daeseong.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=당진+대성정육점식당",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4no62SmfAGE-YMr8-XNuryOebTCpivaszSpLqrLcz7vkrN_cpCmAtUWiOeDqBrh0XEJmscHmmrgSbwLdbzP6s9-xIyY9oRazVOk7_BaIMt3ZcuSzowWz2VnGpEEAtQhrNGEq03Ht5A=w426-h240-k-no",
        },
      ],
    },
    {
      title: t.vipGuide.sections.cheonbi,
      restaurants: [
        {
          name: t.vipGuide.restaurants.bigJjun.name,
          menu: t.vipGuide.restaurants.bigJjun.menu,
          price: t.vipGuide.restaurants.bigJjun.price,
          hours: t.vipGuide.restaurants.bigJjun.hours,
          atmosphere: t.vipGuide.restaurants.bigJjun.atmosphere,
          review: t.vipGuide.restaurants.bigJjun.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=평택+빅쭌부대찌개",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqZMVGcHOppT6OgQuVOqrCdzN_R0_2oKYulhE5QrErxowLEOonBR1k5JinPkHA3w7W_byEuakjV7jI8bsbEsLHuOVnl1VIrCiKCiu2oOyhygoZ5TfjTK-qQLzNVAUf8tPd_OaBd=w408-h306-k-no",
        },
        {
          name: t.vipGuide.restaurants.cheongmyeongjeong.name,
          menu: t.vipGuide.restaurants.cheongmyeongjeong.menu,
          price: t.vipGuide.restaurants.cheongmyeongjeong.price,
          hours: t.vipGuide.restaurants.cheongmyeongjeong.hours,
          atmosphere: t.vipGuide.restaurants.cheongmyeongjeong.atmosphere,
          review: t.vipGuide.restaurants.cheongmyeongjeong.review,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=평택+청명정",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nou_biQWkZolSfEn-_SISM0i4dzfF2-tdm8yMFGP3q9cB3E6oXuROk3l5rrGCLuk3JKfwUHrTeoEVBUI5TsvPahXzzozndDMY2QxcpH-h2XEqyybggPVE3t9TOPzdYHITpAYdX-=w426-h240-k-no",
        },
        {
          name: t.vipGuide.restaurants.yeontanBulgui.name,
          menu: t.vipGuide.restaurants.yeontanBulgui.menu,
          price: t.vipGuide.restaurants.yeontanBulgui.price,
          hours: t.vipGuide.restaurants.yeontanBulgui.hours,
          atmosphere: t.vipGuide.restaurants.yeontanBulgui.atmosphere,
          review: t.vipGuide.restaurants.yeontanBulgui.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=평택+연탄불구이",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqMGvmf-65JqD5DIf8AOliRxdAERXg-wQe6H1FOmKTqfQ5mZ2xsMQa4PRKjzHqailL_IvQi-lueK-7ZZGllj_Lx77z-IdWMlkBAZt2dF17O9zO066aFmnf-sfk6Q9IsXKgCz5gG=w532-h240-k-no",
        },
        {
          name: t.vipGuide.restaurants.sodamchon.name,
          menu: t.vipGuide.restaurants.sodamchon.menu,
          price: t.vipGuide.restaurants.sodamchon.price,
          hours: t.vipGuide.restaurants.sodamchon.hours,
          atmosphere: t.vipGuide.restaurants.sodamchon.atmosphere,
          review: t.vipGuide.restaurants.sodamchon.review,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=평택+소담촌",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq2xViXm9W4l9QMQpHwGvrJVVtt48inOYr1n75PqcKOgU6F3nbcDwrLH8UTiR81KBCHmMgmF6kSoRPdzV-b2VuZzwWWM6DXpIdp-coN_6By5ThQDbkPT0mkOLtxypiAwaxQ9Ng8uA=w408-h306-k-no",
        },
        {
          name: t.vipGuide.restaurants.gabongru.name,
          menu: t.vipGuide.restaurants.gabongru.menu,
          price: t.vipGuide.restaurants.gabongru.price,
          hours: t.vipGuide.restaurants.gabongru.hours,
          atmosphere: t.vipGuide.restaurants.gabongru.atmosphere,
          review: t.vipGuide.restaurants.gabongru.review,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=평택+가봉루",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrpU6_zvnyqmsPlAo_yxqmuMXW79hApSkZ_-Ya9HRrmul-1Sw4R38kip3SxMpKUK72kzwAuYS-hyWKRWUMX1l9ilqx9vX3DrZx7KfEYIbmXbE08Xe0btOiuJFk1OwKFfheBEQg=w408-h306-k-no",
        },
        {
          name: t.vipGuide.restaurants.danggeori.name,
          menu: t.vipGuide.restaurants.danggeori.menu,
          price: t.vipGuide.restaurants.danggeori.price,
          hours: t.vipGuide.restaurants.danggeori.hours,
          atmosphere: t.vipGuide.restaurants.danggeori.atmosphere,
          review: t.vipGuide.restaurants.danggeori.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=평택+당거리국수",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrg-D72620mW6WSbHO2R_ogKAl4BE9M1u2PZ_442I2-awbY6IVcWfRI-5cWNrb_RTTiwkHiojmCznvVXdC2ooprD6E8SwThU80lTeTLWlMqxgI1w7t1zKEKafXONp8IGNXrwfag=w426-h240-k-no",
        },
        {
          name: t.vipGuide.restaurants.cheongang.name,
          menu: t.vipGuide.restaurants.cheongang.menu,
          price: t.vipGuide.restaurants.cheongang.price,
          hours: t.vipGuide.restaurants.cheongang.hours,
          atmosphere: t.vipGuide.restaurants.cheongang.atmosphere,
          review: t.vipGuide.restaurants.cheongang.review,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=평택+천강수산",
          imageUrl:
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npvFn9KGLNcQlwbgfZMAcbl17ItpZzxAsv37wCuZX99rAPZFLMGrNUZEzENNmJrkEN7_eUfjW-T3ghrU5ZrGtob3c5hFFBLCwuRs7C3WxAHjx9V_6XWBY6Pbyrsp8Goqk3-ATrgVQ=w408-h544-k-no",
        },
      ],
    },
  ];

  return (
    <div className="mt-16 min-h-screen bg-[#FAF9F6]">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* 헤더 타이틀 */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {t.vipGuide.pageTitle}
          </h1>
          <p className="mt-2 text-gray-600">{t.vipGuide.pageSubtitle}</p>
        </div>

        {/* 섹션 렌더 */}
        {sections.map((section, index) => (
          <section key={index} className="brewery-section mt-10">
            <h2 className="mb-6 border-b-2 border-amber-700 pb-2 text-xl font-semibold text-amber-800">
              {section.title}
            </h2>

            <div className="grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2">
              {section.restaurants.map((r, rIndex) => (
                <Card key={rIndex} className="overflow-hidden pt-0">
                  <div className="relative h-64 w-full bg-slate-100 sm:h-72 md:h-80">
                    {r.imageUrl ? (
                      <Image
                        src={r.imageUrl}
                        alt={r.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-cover"
                        priority={false}
                      />
                    ) : null}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-xl font-semibold text-gray-900">
                      {r.name}
                    </h3>

                    <div className="mb-4 rounded-md border-l-4 border-blue-800 bg-blue-50 px-4 py-3 text-sm text-gray-700">
                      <div className="grid gap-1 sm:grid-cols-3 sm:gap-3">
                        <span>
                          <strong className="mr-1">{t.vipGuide.menu}</strong>
                          {r.menu}
                        </span>
                        <span>
                          <strong className="mr-1">{t.vipGuide.price}</strong>
                          {r.price}
                        </span>
                        <span>
                          <strong className="mr-1">{t.vipGuide.hours}</strong>
                          {r.hours}
                        </span>
                      </div>
                    </div>

                    <h4 className="mt-4 border-b pb-2 text-sm font-semibold text-gray-800">
                      {t.vipGuide.atmosphere}
                    </h4>
                    <p className="mt-2 leading-7 text-gray-700">
                      {r.atmosphere}
                    </p>

                    <h4 className="mt-6 border-b pb-2 text-sm font-semibold text-gray-800">
                      {t.vipGuide.gourmetReview}
                    </h4>
                    <p className="mt-2 leading-7 text-gray-700">{r.review}</p>
                  </CardContent>
                  <div className="px-6 pb-6">
                    <Link
                      href={r.mapUrl}
                      target="_blank"
                      className="inline-block"
                    >
                      <Button>{t.vipGuide.viewMap}</Button>
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
