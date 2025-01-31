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
        setShowPopUp((prev) => !prev); // toggle showPopUp state
      };
    const user = useAuthContext();

  return (
    <nav className="flex justify-between py-2 px-5 border-b-2 shadow-md">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image src="/LogosInstagram.svg" alt="logo" width={175} height={51} />
        </Link> 
      </div>
      <div className="flex items-center gap-5">
        <FiPlusSquare size={50} onClick={handleClick} className="cursor-pointer" title="Nueva publicacion"/>
        <Image src="/Heart.svg" alt="like" width={50} height={50} title="Proximamente !" />
        <Link href={"/profile"} className="font-semibold" title="Ir al perfil">{user?.displayName}</Link> 
        <SignOutButton />
      </div>

    </nav>
  );
}

export default NavBar;