"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LanguageChange() {
    const router = useRouter();

    const getCookie = (name: string) => {
        const match = document.cookie.match(
            new RegExp("(^| )" + name + "=([^;]+)")
        );
        return match ? decodeURIComponent(match[2]) : null;
    };

    const setCookie = (name: string, value: string, days: number) => {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(
            value
        )}; expires=${date.toUTCString()}; path=/; SameSite=Strict`;
    };

    const [currentLocale, setCurrentLocale] = useState("en");

    useEffect(() => {
        const locale = getCookie("NEXT_LOCALE") || "en";
        setCurrentLocale(locale);
    }, []);

    const changeLanguage = (locale: string) => {
        setCookie("NEXT_LOCALE", locale, 7);
        setCurrentLocale(locale);
        router.refresh();
    };

    return (
        <div className="flex items-center mx-1 text-white">
            <button
                onClick={() => changeLanguage("es")}
                className={`w-8 h-8 flex flex-row space-x-3 md:space-x-0 items-center justify-center ${currentLocale === "es" ? "hidden" : ""
                    }`}
                aria-label="Change to Spanish"
            >
                <span role="img" aria-label="Mexico Flag" className="text-4xl md:text-2xl">
                    🇲🇽
                </span>
                <span className="block md:hidden text-xl">Español</span>
            </button>
            <button
                onClick={() => changeLanguage("en")}
                className={`w-8 h-8 flex flex-row space-x-3 md:space-x-0 items-center justify-center ${currentLocale === "en" ? "hidden" : ""
                    }`}
                aria-label="Change to English"
            >
                <span role="img" aria-label="US Flag" className="text-4xl md:text-2xl">
                    🇺🇸
                </span>
                <span className="block md:hidden text-xl">English</span>
            </button>
        </div>
    );
}
