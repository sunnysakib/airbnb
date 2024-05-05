import Image from "next/image";
import Link from "next/link";
import DesktopLogo from '../../public/assets/images/airbnb-desktop.png'
import MobileLogo from '../../public/assets/images/airbnb-mobile.webp'
import { UserNav } from "./UserNav";
export default function Navbar () {
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto lg:px-10 py-5">
                <Link href={"/"}>
                <Image src={DesktopLogo}
                alt="desktop logo"
                className="w-32 hidden lg:block"
                />
                 <Image src={MobileLogo}
                alt="mobile logo"
                className="w-12 block lg:hidden"
                />
                </Link>
                
                <div className=" rounded-full border px-5 py-2">
                    Airbnb search
                </div>
                <UserNav/>
                
            </div>
        </nav>
    );
};
