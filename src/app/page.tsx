"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";

export default function Home() {
  const { t } = useTranslation();

  const tours = [
    {
      id: "vip",
      name: t.home.tours.tourList.vip.name,
      description: t.home.tours.tourList.vip.description,
      image: "/tour-images/vip/Yesan/01.jpg",
      duration: t.home.tours.tourList.vip.duration,
      price: t.home.tours.tourList.vip.price,
      rating: 4.8,
      reviewCount: 127,
      tags: t.home.tours.tourList.vip.tags,
      featured: true,
    },
    {
      id: "yeongdong",
      name: t.home.tours.tourList.yeongdong.name,
      description: t.home.tours.tourList.yeongdong.description,
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1440",
      duration: t.home.tours.tourList.yeongdong.duration,
      price: t.home.tours.tourList.yeongdong.price,
      rating: 4.8,
      reviewCount: 127,
      tags: t.home.tours.tourList.yeongdong.tags,
      featured: true,
    },
    {
      id: "sinabro",
      name: t.home.tours.tourList.sinabro.name,
      description: t.home.tours.tourList.sinabro.description,
      image: "/tour-images/sinabro/00.jpg",
      duration: t.home.tours.tourList.sinabro.duration,
      price: t.home.tours.tourList.sinabro.price,
      rating: 4.8,
      reviewCount: 127,
      tags: t.home.tours.tourList.sinabro.tags,
      featured: true,
    },
    {
      id: "chunbi",
      name: t.home.tours.tourList.chunbi.name,
      description: t.home.tours.tourList.chunbi.description,
      image: "/tour-images/chunbi/00.jpg",
      duration: t.home.tours.tourList.chunbi.duration,
      price: t.home.tours.tourList.chunbi.price,
      rating: 4.8,
      reviewCount: 127,
      tags: t.home.tours.tourList.chunbi.tags,
      featured: true,
    },
    {
      id: "jookhwa",
      name: t.home.tours.tourList.jookhwa.name,
      description: t.home.tours.tourList.jookhwa.description,
      image: "/tour-images/jookhwa/00.jpg",
      duration: t.home.tours.tourList.jookhwa.duration,
      price: t.home.tours.tourList.jookhwa.price,
      rating: 4.8,
      reviewCount: 127,
      tags: t.home.tours.tourList.jookhwa.tags,
      featured: true,
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative mt-16 overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.home.hero.title.main}
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {t.home.hero.title.highlight}
              </span>
              {t.home.hero.title.suffix}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-blue-100 lg:text-xl">
              {t.home.hero.description.line1}
              <br />
              {t.home.hero.description.line2}
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 h-20 w-20 animate-bounce rounded-full bg-white/10"></div>
        <div className="absolute top-20 right-20 h-16 w-16 animate-pulse rounded-full bg-yellow-400/20"></div>
        <div className="absolute bottom-10 left-1/4 h-12 w-12 animate-spin rounded-full bg-purple-400/20"></div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t.home.features.safety.title}
              </h3>
              <p className="text-gray-600">
                {t.home.features.safety.description}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t.home.features.convenience.title}
              </h3>
              <p className="text-gray-600">
                {t.home.features.convenience.description}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t.home.features.experience.title}
              </h3>
              <p className="text-gray-600">
                {t.home.features.experience.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t.home.tours.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {t.home.tours.description}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <Link key={tour.id} href={`/detail/${tour.id}`}>
                <Card className="group h-full overflow-hidden py-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {tour.featured && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                        {t.home.tours.badge.popular}
                      </Badge>
                    )}
                    {/* 평점 미사용 (임시) */}
                    {/* <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-sm text-white">
                      <svg
                        className="h-4 w-4 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{tour.rating}</span>
                      <span className="text-gray-300">
                        ({tour.reviewCount})
                      </span>
                    </div> */}
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <CardTitle className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600">
                          {tour.name}
                        </CardTitle>
                        <p className="mb-3 min-h-10 text-sm text-gray-600">
                          {tour.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {tour.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {tour.duration}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {t.common.label.startingPrice}
                        </div>
                        <div className="text-xl font-bold text-blue-600">
                          {tour.price}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {t.home.cta.title}
          </h2>
          <p className="mb-8 text-xl text-blue-100">{t.home.cta.description}</p>
          <Link href="/detail/vip" className="inline-block">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              {t.home.cta.button}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
