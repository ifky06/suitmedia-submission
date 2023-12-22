'use client';
import React, {useEffect, useState} from "react";
import Profile from "@/models/Profile";

export default function BannerText() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const titleParallax = -scrollY / 2;
    const subtitleParallax = -scrollY / 2;

    return (
        <>
            <div className={'row-span-1 color-white transition-all'}
                 style={{transform: `translateY(${titleParallax}px)`}}>
                <h1 className={'text-6xl text-white'}>Ideas</h1>
            </div>
            <div className={'row-span-1 text-white items-center transition-all'}
                 style={{transform: `translateY(${subtitleParallax}px)`}}>
                <p className={'text-center'}>
                    Where all our great things begin
                </p>
            </div>
        </>
    )
}