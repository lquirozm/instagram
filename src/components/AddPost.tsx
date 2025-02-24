import { IoIosCloseCircle } from "react-icons/io";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";

interface AddPostProps {
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddPost: React.FC<AddPostProps> = ({ setShowPopUp, setPosts }) => {
  const [texto, setTexto] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const user = useAuthContext();

  const userName = user?.displayName || "Nombre de usuario no disponible";
  
  const handleClick = () => {
    setShowPopUp((prev) => !prev); //Cerrar el popup
  };

  const uploadPost = async () => {
    try {
      const newDoc = await addDoc(collection(db, "posts"), {
        createdAt: serverTimestamp(),
        texto: texto,
        imageUrl: imageUrl,
        userName: userName,
        uid: user?.uid
      });

      // Agregar el nuevo post al estado de posts en el componente Home
      const newPost = {
        id: newDoc.id,
        post: {
          texto,
          imageUrl,
          userName: user?.displayName,
          createdAt: new Date().toISOString(),
        },
      };

      // Actualizar el estado en Home sin tener que hacer una nueva consulta
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Se agrega al principio de la lista

      alert("Post compartido con exito!");
      setShowPopUp(false); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative max-h-[100vh]">
        <div className="flex justify-end">
          <IoIosCloseCircle
            size={30}
            className="cursor-pointer"
            onClick={handleClick}
          />
        </div>
        <h2 className="font-semibold text-center mb-5 text-xl">
          Nueva Publicacion
        </h2>
        <div className="flex flex-col gap-3">
          <ImageUpload onImageUploadComplete={(url) => setImageUrl(url)} />
          {imageUrl && (
            <>
              <div className="flex justify-center h-[250px] mb-2">
                <Image
                  src={imageUrl}
                  width={300}
                  height={300}
                  alt="image-upload"
                />
              </div>
            </>
          )}

          <input
            onChange={(e) => setTexto(e.target.value)}
            value={texto}
            type="text"
            placeholder="Escribe un texto..."
            className="focus:outline-none border-2 rounded-lg p-1"
          />
          <button
            onClick={uploadPost}
            disabled={!imageUrl}
            className="bg-blue-600 rounded-lg text-white font-semibold p-2 disabled:bg-blue-300"
          >
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
