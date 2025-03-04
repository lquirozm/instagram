"use client";
import Image from "next/image";
import Link from "next/link";
import DownloadApp from "@/components/DownloadApp";
import Footer from "@/components/Footer";
import "./styles.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const registrarUsuario = async () => {
    try {
      const q = query(collection(db, "users"), where("displayName", "==", userName));
      const querySnapshot = await getDocs(q);
      if(querySnapshot.empty){
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const userRegistered = result.user;
        if (userRegistered) {
          await updateProfile(userRegistered, {
            displayName: userName, // Guardamos el nombre de usuario en displayName
          });
          console.log("Display name actualizado con éxito");
        }
        await setDoc(doc(db, "users", userRegistered.uid),{
          displayName: userName,
          email: email
        })
        alert("Usuario registrado con exito.");
        router.push("/login");
      }
      else{
        alert("El nombre de usuario ya esta en uso,  favor ingrese otro");
      }
      
    }catch (error) {
      alert("Error al registrar el usuario")
      console.log("Error al registrar el usuario:", error);
    }
  };

  return (
    <div className="pt-10 px-10 md:px-32">
      <div className="w-[100%] min-h-screen flex justify-center items-center font-sans">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-5 border border-gray-300 px-10 py-8 items-center max-w-96">
            <Link href="/" className="mb-5">
              <Image
                src="/LogosInstagram.svg"
                alt="logo"
                width={175}
                height={51}
              />
            </Link>

            <h3 className="font-semibold text-[rgb(115,115,115)] text-center">
              Registrate para ver fotos y videos de tus amigos.
            </h3>
            {/* <button className="w-[100%] bg-blue-500 rounded-lg text-white py-2 font-bold text-sm hover:bg-blue-600 flex gap-2 justify-center">
              <Image
                src={"/UilFacebook.svg"}
                width={20}
                height={20}
                alt="logo-fb"
              />
              Iniciar sesion con Facebook
            </button> */}
            {/* <div className="flex justify-center items-center gap-2 text-gray-600 w-[100%] my-1">
              <div className="w-[50%] border-t-2 border-gray-300"></div>o
              <div className="w-[50%] border-t-2 border-gray-300"></div>
            </div> */}

            <div>
              <div
                className="flex flex-col gap-2 items-center" 
              >
                <div className="form-container">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="name"
                    placeholder=" "
                    className="dark:bg-black"
                    required
                  />
                  <label htmlFor="name" className="floating-label text-sm">
                    Correo electronico
                  </label>
                </div>
                <div className="form-container">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    placeholder=" "
                    className="dark:bg-black"
                    required
                  />
                  <label htmlFor="password" className="floating-label text-sm">
                    Contraseña
                  </label>
                </div>
                <div className="form-container">
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    id="username"
                    placeholder=" "
                    className="dark:bg-black"
                    required
                  />
                  <label htmlFor="username" className="floating-label text-sm">
                    Nombre de usuario
                  </label>
                </div>
                <p className="text-xs text-center text-[rgb(115,115,115)]">
                  Es posible que las personas que usan nuestro servicio hayan
                  subido tu información de contacto a Instagram. Más información
                </p>
                <p className="text-xs text-center text-[rgb(115,115,115)]">
                  Al registrarte, aceptas nuestras Condiciones, la Política de
                  privacidad y la Política de cookies.
                </p>
                <button
                  className="w-[100%] bg-blue-400 rounded-lg text-white py-2 font-bold text-sm hover:bg-blue-600"
                  onClick={registrarUsuario}
                >
                  Registrarte
                </button>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 px-10 py-6 text-center">
            ¿Tienes una cuenta?{" "}
            <Link href={"/login"} className="text-blue-500 font-semibold">
              Inicia sesion
            </Link>
          </div>
          <DownloadApp />
        </div>
      </div>
      <Footer />
    </div>
  );
}
