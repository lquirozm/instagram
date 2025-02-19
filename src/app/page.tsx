"use client";
import AddPost from "@/components/AddPost";
import BottomNavMenu from "@/components/BottomNavMenu";
import NavBar from "@/components/NavBar";
import Posts from "@/components/Posts";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const user = useAuthContext();
  const router = useRouter();
  const [showPopUp, setShowPopUp] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  const getPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      post: doc.data(),
    }));
    setPosts(postsData);
  };

  useEffect(() => {
    if (user == null) {
      router.push("/login");
    }
    getPosts();
  }, [user, router]);

  return (
    <div className="font-sans">
      {user ? (
        <>
          <NavBar setShowPopUp={setShowPopUp} />
          {showPopUp && <AddPost setShowPopUp={setShowPopUp} setPosts={setPosts} />}
          <div className="flex flex-col justify-center items-center p-3 gap-6">
            {posts.map(({ id, post }) => (
              <Posts
                key={id}
                postId={id}
                user={user} //Persona logueada
                userName={post.userName} //Username de quien subio el post
                texto={post.texto}
                imageUrl={post.imageUrl}
                setPosts={setPosts}
              />
            ))}
          </div>
          <BottomNavMenu setShowPopUp={setShowPopUp} />
          <Toaster />
        </>
      ) : (
        <h1>Cerrando sesion...</h1>
      )}
    </div>
  );
}
