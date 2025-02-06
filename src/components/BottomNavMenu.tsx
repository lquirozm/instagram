import Link from "next/link";
import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";


interface BottomNavProps {
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomNavMenu: React.FC<BottomNavProps> = ({ setShowPopUp }) => {
  const handleClick = () => {
    setShowPopUp((prev) => !prev);
  };
  return (
    <nav className="relative md:hidden">
        <div className="fixed bottom-0 w-full py-2.5 bg-white dark:bg-black">
            <ul className="flex justify-around">
                <li>
                    <Link href={'/'} title="Inicio"><MdHome size={30} /></Link>
                </li>
                <li>
                    <FiPlusSquare size={30} onClick={handleClick} className="cursor-pointer" title="Nueva publicacion"/>
                </li>
                <li>
                    <Link href={"/profile"} title="Perfil"><RxAvatar size={30}/></Link> 
                </li>
            </ul>
        </div>
    </nav>
  );
};

export default BottomNavMenu;
