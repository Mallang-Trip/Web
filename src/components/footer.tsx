"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 px-5 py-10 text-sm leading-relaxed text-gray-400">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-5">
          <p className="mb-2">
            <span>{t.footer.company.title}</span>: {t.footer.company.name} |{" "}
            <span>{t.footer.company.ceoLabel}</span>: {t.footer.company.ceo} |{" "}
            <span>{t.footer.company.businessNumberLabel}</span>:{" "}
            {t.footer.company.businessNumber}
          </p>
          <p className="mb-2">
            {t.footer.company.postalCode && `${t.footer.company.postalCode} | `}
            {t.footer.company.address}
          </p>
          <p>
            {t.footer.company.inquiryLabel}: {t.footer.company.inquiry} |{" "}
            {t.footer.company.emailLabel}: {t.footer.company.email}
          </p>
        </div>

        <div className="mb-5">
          <p className="mb-2">
            <Link
              href="https://www.instagram.com/mallang_trip/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-gray-300 hover:underline"
            >
              {t.footer.social.instagram}
            </Link>
          </p>
          <p className="mb-2">
            <Link
              href="/policy/service"
              className="mx-2 text-gray-300 hover:underline"
            >
              {t.footer.links.serviceTerms}
            </Link>{" "}
            ·{" "}
            <Link
              href="/policy/travel"
              className="mx-2 text-gray-300 hover:underline"
            >
              {t.footer.links.travelTerms}
            </Link>{" "}
            ·{" "}
            <Link
              href="/policy/privacy"
              className="mx-2 text-gray-300 hover:underline"
            >
              {t.footer.links.privacyPolicy}
            </Link>{" "}
            ·{" "}
            <Link
              href="/policy/thirdparty"
              className="mx-2 text-gray-300 hover:underline"
            >
              {t.footer.links.thirdPartyTerms}
            </Link>
          </p>
          <p>
            {t.footer.company.telecomSalesNumber} |{" "}
            {t.footer.company.tourismBusinessNumber}
          </p>
        </div>

        <p className="mt-7 text-xs text-gray-500">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
