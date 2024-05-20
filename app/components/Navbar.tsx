import Image from "next/image";
import Link from "next/link";
import DesktopLogo from '../../public/assets/images/airbnb-desktop.png'
import MobileLogo from '../../public/assets/images/airbnb-mobile.webp'
import { SearchComponent } from "./SearchComponent";
import { UserNav } from "./UserNav";
export default function Navbar () {
    
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between mx-auto 2xl:px-20 px-5 lg:px-10 py-5">
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
                
                <SearchComponent/>
                {/*  @ts-expect-error Async Server Component  */}
                <UserNav/>
                
            </div>
        </nav>
    );
};
