import Image from "next/image";
import Link from "next/link";
import SignOutButton from "./SignOut";
import { FiPlusSquare } from "react-icons/fi";
import { useAuthContext } from "@/context/AuthContext";

interface NavBarProps {
    setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  }

const NavBar: React.FC<NavBarProps> = ({ setShowPopUp }) => {
    const handleClick = () => {
        setShowPopUp((prev) => !prev); 
      };
    const user = useAuthContext();

  return (
    <nav className="flex justify-between py-2 px-2 md:border-b-2 shadow-md dark:border-b-gray-500 md:px-5">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image src="/LogosInstagram.svg" alt="logo" width={175} height={51} className="" />
        </Link> 
      </div>
      <div className="flex items-center gap-2 md:gap-5">
        <FiPlusSquare size={50} onClick={handleClick} className="cursor-pointer hidden md:flex" title="Nueva publicacion"/>
        <Image src="/Heart.svg" alt="like" width={50} height={50} title="Proximamente !" className="hidden md:flex" />
        <Link href={"/profile"} className="font-semibold hidden md:flex" title="Ir al perfil">{user?.displayName}</Link> 
        <SignOutButton />
      </div>
    </nav>
  );
}

export default NavBar;