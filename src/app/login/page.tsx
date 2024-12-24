"use client"
import Image from "next/image";
import "./styles.css";
import Link from "next/link";
import DownloadApp from "@/components/DownloadApp";
import Footer from "@/components/Footer";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  FacebookAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function login() {
  const router = useRouter();
  const provider = new FacebookAuthProvider();
  const iniciarconFacebook = async () => {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        if(result){
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            router.push('/');     
        }
        
            // IdP data available using getAdditionalUserInfo(result)
            // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="pt-10 px-10 md:px-32">
      <div className="w-[100%] min-h-screen flex justify-center items-center font-sans">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-5 border border-gray-300 px-10 py-8 items-center">
            <Link href="/" className="mb-5">
              <Image
                src="/LogosInstagram.svg"
                alt="logo"
                width={175}
                height={51}
              />
            </Link>
            <div>
              <form action="" className="flex flex-col gap-2 items-center">
                <div className="form-container">
                  <input type="text" id="name" placeholder=" " required />
                  <label htmlFor="name" className="floating-label text-sm">
                    Telefono, usuario o correo electronico
                  </label>
                </div>
                <div className="form-container mb-2">
                  <input
                    type="password"
                    id="password"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="password" className="floating-label text-sm">
                    Contraseña
                  </label>
                </div>
                <button className="w-[100%] bg-blue-400 rounded-lg text-white py-2 font-bold text-sm hover:bg-blue-600">
                  Iniciar sesion
                </button>
                <div className="flex justify-center items-center gap-2 text-gray-600 w-[100%] my-5">
                  <div className="w-[50%] border-t-2 border-gray-300"></div>o
                  <div className="w-[50%] border-t-2 border-gray-300"></div>
                </div>
                <Link
                  href={""}
                  onClick={iniciarconFacebook}
                  className="text-blue-500 font-semibold flex gap-3"
                >
                  <Image
                    src={"/LogoFacebook.svg"}
                    width={20}
                    height={20}
                    alt="logo-fb"
                  />
                  Iniciar sesion con Facebook
                </Link>
                <p>¿Olvidaste tu contraseña?</p>
              </form>
            </div>
          </div>
          <div className="border border-gray-300 px-10 py-6 text-center">
            ¿No tienes una cuenta?{" "}
            <Link href={"/"} className="text-blue-500 font-semibold">
              Registrate
            </Link>
          </div>
          <DownloadApp />
        </div>
      </div>
      <Footer />
    </div>
  );
}
