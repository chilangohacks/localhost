"use client";
import { useState, useEffect } from "react";
import * as m from "@/paraglide/messages";
import { Link } from "@/lib/i18n";
import LanguageChange from "./ui/LanguageChange";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [activeSection, setActiveSection] = useState("");
    const [menuItems, setMenuItems] = useState([
        { title: "Home", href: "/", id: "home" },
        { title: "Donate", href: "/#donate", id: "donate" },
        { title: "FAQ", href: "/#faq", id: "faq" },
        { title: "Team", href: "/#team", id: "team" },
        { title: "Sponsors", href: "/#sponsors", id: "sponsors" },
        { title: "About", href: "/#about", id: "about" },
    ]);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setIsOpen(false);
        };

        setMenuItems([
            { title: m.home(), href: "/", id: "home" },
            { title: m.donate(), href: "/#donate", id: "donate" },
            { title: "FAQ", href: "/#faq", id: "faq" },
            { title: m.our_team().split(/\s/)[1], href: "/#team", id: "team" },
            { title: m.sponsors(), href: "/#sponsors", id: "sponsors" },
            { title: m.about().split(/\s/)[0], href: "/#about", id: "about" },
        ]);

        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);

        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = menuItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="relative w-screen">
            <header className="hidden text-secondary md:flex fixed top-5 w-full z-50">
                <div className="w-fit mx-auto">
                    <nav className="flex justify-center bg-white/70 backdrop-blur-sm border-b border-gray-200 shadow-md rounded-3xl px-8 py-3 uppercase font-medium">
                        <ul className="flex flex-row items-center space-x-8 text-lg">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href} className={cn(activeSection === item.id ? "text-secondary font-bold" : "")}>{item.title}</Link>
                                </li>
                            ))}
                            <li>
                                <LanguageChange />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {isMobile && (
                <button onClick={() => setIsOpen(true)} className="fixed top-5 left-5 p-3 bg-black/70 text-white rounded-full shadow-lg z-50">
                    <Menu className="w-6 h-6" />
                </button>
            )}

            <div
                className={cn(
                    "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 flex items-center justify-center",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 left-6 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Close menu"
                >
                    <X className="w-6 h-6" />
                </button>
                <nav>
                    <ul className="flex flex-col items-center space-y-8">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className={cn("text-white text-xl hover:text-blue-400 transition-colors", activeSection === item.id ? "text-secondary font-bold" : "")}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <LanguageChange />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer
            className="bg-black text-white z-50 pt-8"
            style={{ minHeight: "250px" }}
        >
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-lg font-bold uppercase">
                        © {new Date().getFullYear()}{" "}
                        <a href="https://chilangohacks.co" className="hover:underline">
                            chilangohacks
                        </a>
                    </span>
                    <span className="mt-1">
                        {m.footer_text()}
                    </span>
                </div>
                <ul className="flex flex-wrap justify-center mt-4 md:mt-0">
                    <li className="mr-4 md:mr-6">
                        <a href="#home" className="hover:underline">
                            {m.home()}
                        </a>
                    </li>
                    <li className="mr-4 md:mr-6">
                        <a href="#about" className="hover:underline">
                            {m.about()}
                        </a>
                    </li>
                    <li className="mr-4 md:mr-6">
                        <a href="#faq" className="hover:underline">
                            FAQ
                        </a>
                    </li>
                    <li>
                        <a href="/pdf/codigo_conducta.pdf" className="hover:underline">
                            {m.code_of_conduct()}
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export { Header, Footer };
