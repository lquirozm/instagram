"use client";
import Image from "next/image";
import "./styles.css";
import Link from "next/link";
import DownloadApp from "@/components/DownloadApp";
import Footer from "@/components/Footer";
import {
  signInWithRedirect,
  FacebookAuthProvider,
  getRedirectResult,
  signInWithEmailAndPassword,
  
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const provider = new FacebookAuthProvider();

  const iniciarSesion = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log(result)
      if(result){
        router.push("/")
      }
    } catch (error) {
        console.log(error);
        alert("Credenciales invalidas")
    }
  }

  const iniciarconFacebook = async () => {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        if (result) {
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          if(token){
            router.push("/");
          } 
        }
      })
      .catch((error) => {
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log("Error: ",credential);
        
      });
  };

  return (
    <div className="pt-10 px-10 md:px-32">
      <div className="w-[100%] min-h-screen flex justify-center items-center font-sans">
        <div>
          <Image src={"/phone.webp"} width={450} height={600} alt="phone-login"/>
        </div>
        <div className="flex flex-col gap-2 mt-10">
          <div className="flex flex-col gap-5 border border-gray-300 px-10 py-8 items-center">
            <Link href="/login" className="mb-5">
              <Image
                src="/LogosInstagram.svg"
                alt="logo"
                width={175}
                height={51}
              />
            </Link>
            <div>
              <div className="flex flex-col gap-2 items-center">
                <div className="form-container">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="name"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="name" className="floating-label text-sm">
                    Telefono, usuario o correo electronico
                  </label>
                </div>
                <div className="form-container mb-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="password" className="floating-label text-sm">
                    Contraseña
                  </label>
                </div>
                <button onClick={iniciarSesion} className="w-[100%] bg-blue-400 rounded-lg text-white py-2 font-bold text-sm hover:bg-blue-600">
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
              </div>
            </div>
          </div>
          <div className="border border-gray-300 px-10 py-6 text-center">
            ¿No tienes una cuenta?{" "}
            <Link href={"/register"} className="text-blue-500 font-semibold">
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
