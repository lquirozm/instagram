import { db } from "@/firebase/config";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import { FaHeart, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import ListLikes from "./ListLikes";

interface PostsProps {
  postId: string;
  user: User;
  userName: string | null;
  texto: string | null;
  imageUrl: string;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
}

const Posts: React.FC<PostsProps> = ({
  postId,
  user,
  userName,
  texto,
  imageUrl,
  setPosts,
}) => {
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);
  const [showListLikes, setShowListLikes] = useState(false);
  const [listLikes, setListLikes] = useState<any[]>([]);

  const handleClick = ()=>{
    setShowListLikes(true)
  }

  //Funcion para agregar un comentario al post en firestore
  const addComment = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      const newDoc = await addDoc(collection(db, "posts", postId, "comments"), {
        userName: user.displayName,
        text: newComment,
        createdAt: serverTimestamp(),
      });

      const currentComment = {
        id: newDoc.id,
        comment: {
          userName: user.displayName,
          text: newComment,
          createdAt: new Date(),
        },
      };
      //Actualizo el estado para mostrar el comentario apenas se envie
      setComments((prev) => [currentComment, ...prev]);
      setNewComment("");
    } catch (err) {
      console.log("Error al agregar el comentario", err);
    }
  };

  //Funcion para obtener los comentarios del post
  const getComments = async () => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const commentsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      comment: doc.data(),
    }));
    setComments(commentsData);
  };

  const deletePost = async () => {
    try {
      // Referencia al documento que deseas eliminar
      const postRef = doc(db, "posts", postId);
      // Eliminar el documento
      await deleteDoc(postRef);
      alert("Post eliminado con éxito!");

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.log("Error al eliminar el documento: ", error);
    }
  };

  const deleteComment = async (id: string) => {
    try {
      // Referencia al documento que deseas eliminar
      const postRef = doc(db, "posts", postId, "comments", id);
      // Eliminar el documento
      await deleteDoc(postRef);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.log("Error al eliminar el comentario: ", error);
    }
  };
  const addLike = async () => {
    try {
      const newDoc = await addDoc(collection(db, "posts", postId, "likes"), {
        uid: user.uid,
        userName: user.displayName 
      });
      const currentLike = {
        id: newDoc.id,
        like: {
            uid: user.uid,
            userName: user.displayName

        }
      }
      setListLikes((prev)=>[currentLike, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };
  const getLikes = async () => {
    const querySnapshot = await getDocs(
      collection(db, "posts", postId, "likes")
    );
    const likesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      like: doc.data(),
    }));
    setListLikes(likesData);
  };
  
  const deleteLike = async (id: string) => {
    try {
        // Referencia al documento que deseas eliminar
        const likeRef = doc(db, "posts", postId, "likes", id);
        // Eliminar el documento
        await deleteDoc(likeRef);
        setListLikes((prevLikes) =>
          prevLikes.filter((like) => like.id !== id)
        );
      } catch (error) {
        console.log("Error al eliminar el comentario: ", error);
      }
  }

  useEffect(() => {
    getComments();
    getLikes();
  }, []);

  console.log(listLikes);

  return (
    <>
      <div className="flex flex-col border md:w-[500px] dark:border-gray-500">
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-2">
            <RxAvatar size={35} />
            <h1 className="font-semibold">{userName}</h1>
          </div>
          <div>
            {user.displayName == userName && (
              <button title="Eliminar post" onClick={deletePost}>
                <FaRegTrashAlt size={20} />
              </button>
            )}
          </div>
        </div>
            {/************** IMAGEN DEL POST ***************/}
        <Image src={imageUrl} width={500} height={500} alt="imagen-post" />

            {/*************     LIKES   ************/}
        <div className="p-2">
          <div className="flex gap-2 items-center">
            {listLikes.some((like)=>like.like.uid === user.uid) ? (
              <FaHeart color="red" size={20} onClick={()=>deleteLike(listLikes.find((like)=>like.like.uid === user.uid).id)} />
            ) : (
              <FaRegHeart
                size={20}
                onClick={addLike}
                className="cursor-pointer"
              />
            )}
            {listLikes.length >= 1 &&
            <button onClick={handleClick}>{listLikes.length}</button> } {/*** Numero de likes ***/}
          </div>
          {
            showListLikes && <ListLikes setShowListLikes={setShowListLikes} listLikes={listLikes} />
          }
        </div>
         {/**  TITULO DEL POST  **/}
        <p className="px-2 pb-2">
            <span className="font-semibold">{userName}&nbsp;</span>
            {texto}
        </p>
        <div className="p-2">
          {comments.map(({ comment, id }) => (
            <div key={id} className="text-sm flex justify-between items-center">
              <div>
                <p className="font-semibold">{comment.userName}</p>
                <p>{comment.text}</p>
              </div>
              <div>
                {(user.displayName === userName ||
                  comment.userName === user.displayName) && (
                  <FaRegTrashAlt
                    size={20}
                    onClick={() => deleteComment(id)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={addComment} className="flex p-2 gap-1">
          <input
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            type="text"
            placeholder="Escribe un comentario..."
            className="w-full focus:outline-none border-2 rounded-lg p-1"
          />
          <button
            type="submit"
            title="Enviar comentario"
            className="bg-blue-500 text-white font-semibold rounded-lg px-3 py-2 disabled:bg-blue-300"
            disabled={!newComment}
          >
            <IoSend size={25} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Posts;
