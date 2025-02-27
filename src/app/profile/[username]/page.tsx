"use client";
import AddPost from "@/components/AddPost";
import BottomNavMenu from "@/components/BottomNavMenu";
import NavBar from "@/components/NavBar";
import Posts from "@/components/Posts";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

export default function Profile() {
  const user = useAuthContext();
  const router = useRouter();
  const params = useParams();
  const { username } = params;
  const [showPopUp, setShowPopUp] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [popupPostId, setPopupPostId] = useState<string | null>(null);
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);

  const handleClick = (id: string) => {
    setPopupPostId(id);
  };

  const handleClosePopup = () => {
    setPopupPostId(null);
  };

  const getPosts = async () => {
    const q = query(
      collection(db, "posts"),
      where("userName", "==", username),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      post: doc.data(),
    }));
    setPosts(postsData);
  };

  const getUserUidByUsername = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Se asume que los displayName son únicos, así que tomamos el primer documento
        const userDoc = querySnapshot.docs[0];
        return userDoc.id; // Este es el uid del usuario
      } else {
        console.log("No se encontró el usuario");
        return null;
      }
    } catch (error) {
      console.error("Error obteniendo el uid del usuario:", error);
      return null;
    }
  };

  const followUser = async () => {
    if (user) {
      const targetUid = await getUserUidByUsername();
      const newFollow = await addDoc(
        collection(db, "users", user?.uid, "following"),
        {
          uid: targetUid,
          displayName: username,
        }
      );
      const currentFollow = {
        id: newFollow.id,
        following: {
          uid: targetUid,
          displayName: username,
        },
      };
      setFollowing((prev) => [currentFollow, ...prev]);
      if (targetUid) {
        const q = query(
          collection(db, "users", targetUid, "followers"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          //Si no lo sigue agrega a Followers
          const newFollower = await addDoc(
            collection(db, "users", targetUid, "followers"),
            {
              uid: user.uid,
              displayName: user.displayName,
            }
          );
          const currentFollower = {
            id: newFollower.id,
            follower: {
              uid: user.uid,
              displayName: user.displayName,
            },
          };
          setFollowers((prev) => [currentFollower, ...prev]);
          console.log(newFollow, newFollower);
        }
      }
    }
  };

  const getFollowers = async () => {
    try {
      const targetUid = await getUserUidByUsername();
      if (targetUid) {
        const querySnapshot = await getDocs(
          collection(db, "users", targetUid, "followers")
        );
        const followersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          follower: doc.data(),
        }));
        setFollowers(followersData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowings = async () => {
    try {
      const targetUid = await getUserUidByUsername();
      if (targetUid) {
        const querySnapshot = await getDocs(
          collection(db, "users", targetUid, "following")
        );
        const followingData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          following: doc.data(),
        }));
        setFollowing(followingData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const unFollow = async (id: string) => {
  //     try {
  //       const targetUid = await getUserUidByUsername();
  //       if (targetUid && user){
  //          // Referencia al documento que deseas eliminar
  //          const followerRef = doc(db, "users", targetUid, "followers", id);
  //          // Eliminar el documento
  //          await deleteDoc(followerRef);
  //          setFollowers((prev) =>
  //            prev.filter((follower) => follower.id !== id)
  //          );
  //          const followingRef = doc(db, "users", user?.uid, "following", id);
  //          // Eliminar el documento
  //          await deleteDoc(followingRef);
  //          setFollowing((prev) =>
  //            prev.filter((following) => following.id !== id)
  //          );
  //       }

  //       } catch (error) {
  //         console.log("Error al eliminar el comentario: ", error);
  //       }
  //   }

  useEffect(() => {
    if (user == null) {
      router.push("/login");
    }
    getPosts();
    getFollowers();
    getFollowings();
  }, [user, router]);

  return (
    <div className="font-sans">
      <NavBar setShowPopUp={setShowPopUp} />
      {showPopUp && <AddPost setShowPopUp={setShowPopUp} setPosts={setPosts} />}
      <div className="px-5 py-3">
        <div className="flex gap-5 items-center">
          <RxAvatar size={150} />
          <h1 className="font-semibold text-xl">{username}</h1>
          <div>
            <span className="font-semibold">{posts.length}</span>
            <h2 className="text-xs">Publicaciones</h2>
          </div>
          <div>
            <span className="font-semibold">{followers.length}</span>
            <h2 className="text-xs">Seguidores</h2>
          </div>
          <div>
            <span className="font-semibold">{following.length}</span>
            <h2 className="text-xs">Siguiendo</h2>
          </div>
        </div>
        <div className="text-center mb-2">
            {followers.some(
              (follower) => follower.follower.uid == user?.uid
            ) ? (
              <button className="bg-gray-500 px-4 py-1 rounded-lg text-white">
                Siguiendo
              </button>
            ) : (
              <button
                onClick={followUser}
                className="bg-blue-500 px-4 py-1 rounded-lg text-white"
              >
                Seguir
              </button>
            )}
          </div>

        <hr />
        <h2 className="text-center font-semibold mt-2">Mis publicaciones</h2>
        <div className="grid grid-cols-3 gap-2 mt-5 px-1 md:px-5">
          {posts.map(({ id, post }) => (
            <div key={id} className="h-60 md:h-auto">
              <Image
                src={post.imageUrl}
                width={500}
                height={500}
                alt={post.texto}
                title="Clic para ver la publicacion"
                className="h-60 md:h-full object-cover cursor-pointer hover:shadow-md"
                onClick={() => handleClick(id)}
              />
              {popupPostId == id && user && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-8 relative max-h-[100vh] overflow-y-auto overflow-x-hidden dark:bg-[#121212]">
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
          ))}
        </div>
      </div>
      <BottomNavMenu setShowPopUp={setShowPopUp} />
    </div>
  );
}
