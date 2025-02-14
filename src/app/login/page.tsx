"use client";
import Image from "next/image";
import "./styles.css";
import Link from "next/link";
import DownloadApp from "@/components/DownloadApp";
import Footer from "@/components/Footer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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

  return (
    <div className="pt-10 px-10 md:px-32">
      <div className="w-[100%] min-h-screen flex justify-center items-center font-sans gap-8">
        <div className="hidden md:flex max-h-screen">
          <Image src={"/phone.webp"} width={400} height={500} alt="phone-login" className=""/>
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
                    className="dark:bg-black"
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
                    className="dark:bg-black"
                  />
                  <label htmlFor="password" className="floating-label text-sm">
                    Contraseña
                  </label>
                </div>
                <button onClick={iniciarSesion} className="w-[100%] bg-blue-400 rounded-lg text-white py-2 font-bold text-sm hover:bg-blue-600">
                  Iniciar sesion
                </button>
                <p className="text-sm mt-1">¿Olvidaste tu contraseña?</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 px-10 py-6 text-center text-sm">
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
