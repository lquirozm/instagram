import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

interface ListLikesProps {
  setShowListLikes: React.Dispatch<React.SetStateAction<boolean>>;
  listLikes: any[];
}
const ListLikes: React.FC<ListLikesProps> = ({ setShowListLikes, listLikes }) => {
  const handleClick = () => {
    setShowListLikes(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative max-h-[100vh] dark:bg-[#121212]">
        <div className="flex justify-end">
          <IoIosCloseCircle
            size={30}
            className="cursor-pointer"
            onClick={handleClick}
          />
        </div>
        <h2 className="font-semibold text-center mb-5 text-xl">
          Me gusta
        </h2>
        <hr />
        <div>
          {listLikes.map(({ like, id }) => (
            <div className="flex items-center gap-2" key={id}>
              <RxAvatar size={35} />
              <h1 className="font-semibold">{like.userName}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListLikes