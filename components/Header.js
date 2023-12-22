import ParallaxBackground from "@/components/ParallaxBackground";
import Profile from "@/models/Profile";
import BannerText from "@/components/BannerText";

export default async function Header() {
    const data = await Profile.getProfile();

    return(
        <div className={'lg:container flex items-start lg:mx-auto  pt-40 max-w-screen h-screen bg-fixed overflow-hidden'}>
            <ParallaxBackground ImageURL={data['bgUrl']} />
            {/*white div triangle components bottom left to bottom right*/}
            <div className={'absolute top-[70vh] left-0 w-screen max-w-full h-[300px] bg-white'}
                style={{
                    clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)',
                }}
            ></div>
            {/*<div className={'absolute top-[500px] left-0 w-screen h-screen bg-[#ffffff] transform -skew-y-6'}></div>*/}
            <div className={'flex flex-col w-screen justify-items-center items-center transition-all duration-300 delay-100'}>
                <BannerText />

            </div>
        </div>
    )
}