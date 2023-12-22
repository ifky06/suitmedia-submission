'use client';
import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({profileName}) {
    const [scrolling, setScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = () => {
        setScrollTop(window.scrollY);
        setScrolling(window.scrollY > scrollTop);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollTop]);

    const opacity = Math.min(1, Math.max(0.8, 1 - scrollTop / 200)); // Adjust the value (200) based on your needs

    return (
        <nav
            className={`py-4 px-32 text-white bg-[#ff6600] sticky top-0 z-50 transition ${
                scrolling ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
            style={{ opacity }}
        >
                <div className="container mx-auto lg:grid lg:grid-cols-2 flex justify-between items-center">
                    <div className="text-2xl font-bold items-center">
                        <Image src={'/images/logo.png'} alt={'suitMediaLogo'} width={110} height={50} />
                    </div>
                    <ul className="lg:flex justify-end space-x-4 hidden">
                        <li><Link href="#" className="hover:text-gray-300 px-3">Work</Link></li>
                        <li><Link href="#" className="hover:text-gray-300 px-3">About</Link></li>
                        <li><Link href="#" className="hover:text-gray-300 px-3">Services</Link></li>
                        <li><Link href="#" className="hover:text-gray-300 font-bold px-3">Ideas</Link>
                        {/*    white line*/}
                            <div className={'h-[3px] bg-white w-full'}/>
                        </li>
                        <li><Link href="#" className="hover:text-gray-300 px-3">Careers</Link></li>
                        <li><Link href="#" className="hover:text-gray-300 px-3">Contact</Link></li>
                    </ul>
                </div>
            </nav>
    )
}


