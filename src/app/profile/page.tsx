"use client";
import AddPost from "@/components/AddPost";
import BottomNavMenu from "@/components/BottomNavMenu";
import NavBar from "@/components/NavBar";
import Posts from "@/components/Posts";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

const Page = () => {
  const user = useAuthContext();
  const router = useRouter();
  const [showPopUp, setShowPopUp] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [popupPostId, setPopupPostId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setPopupPostId(id);
  };
  
  const handleClosePopup = () => {
    setPopupPostId(null);
  };

  //Verificar si el usuario esta logueado
  useEffect(() => {
    console.log("User from context:", user);
    if (user == null) router.push("/login");
  }, [user, router]);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      }));
      setPosts(postsData);
    };
    getPosts();
  }, []);

  return (
    <div className="font-sans">
      <NavBar setShowPopUp={setShowPopUp} />
      {showPopUp && <AddPost setShowPopUp={setShowPopUp} setPosts={setPosts} />}
      <div className="px-5 py-3">
        <div className="flex gap-5 items-center">
          <RxAvatar size={150} />
          <h1 className="font-semibold text-xl">{user?.displayName}</h1>
          <h2>Seguidores</h2><h2>Siguiendo</h2>
        </div>
        <hr />
        <h2 className="text-center font-semibold mt-2">Mis publicaciones</h2>
        <div className="grid grid-cols-3 gap-2 mt-5 px-10">
          {posts.map(
            ({ id, post }) =>
              post.userName === user?.displayName && (
                <div key={id} className="">
                  <Image
                    src={post.imageUrl}
                    width={500}
                    height={400}
                    alt={post.texto}
                    title="Clic para ver la publicacion"
                    className="object-contain cursor-pointer hover:shadow-md"
                    onClick={() => handleClick(id)}
                  />
                  {popupPostId == id && user && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-8 relative max-h-[100vh] overflow-y-auto overflow-x-hidden">
                        <div className="flex justify-end">
                          <IoIosCloseCircle
                            size={30}
                            className="cursor-pointer mb-2"
                            onClick={handleClosePopup}
                          />
                        </div>
                        <Posts
                            key={id}
                            postId={id}
                            user={user} //Persona logueada
                            userName={post.userName} //Username de quien subio el post
                            texto={post.texto}
                            imageUrl={post.imageUrl}
                            setPosts={setPosts}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      </div>
      <BottomNavMenu setShowPopUp={setShowPopUp} />
    </div>
  );
};

export default Page;
