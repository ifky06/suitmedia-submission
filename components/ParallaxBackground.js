'use client';

import {useEffect} from "react";

export default function ParallaxBackground({ImageURL}) {
    const parallaxEffect = () => {
        let parallax = document.getElementById('parallax');
        // if (parallax) {
        let scrollPosition = window.pageYOffset;
            parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        // }
    }

    useEffect(() => {
        window.addEventListener('scroll', parallaxEffect, false);

        return () => {
            window.removeEventListener('scroll', parallaxEffect, false);
        }
    }, []);

    return(
        <div id={'parallax'} className={'absolute inset-0 bg-black bg-opacity-50 -z-10 bg-cover bg-center lg:bg-left-bottom'} style={{
            backgroundImage: `url(${ImageURL})`,
            opacity: 0.4,
        }}></div>
    )
}