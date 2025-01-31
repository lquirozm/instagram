import { UploadButton } from "@/utils/uploadthing";
import React from "react";

interface ImageUploadProps{
    onImageUploadComplete: (url:string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onImageUploadComplete}) => {

  return (
    <div>
      <UploadButton
        className="ut-button:bg-gray-500 ut-button:ut-uploading:bg-gray-300"
        content={{
          button({ ready }) {
            if (ready) return <div>Escoge una foto</div>;}}}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          console.log("Upload Completed");

          // Verifica si la URL está presente en la respuesta
          if (res && res.length > 0 && res[0]?.url) {
            console.log("URL del archivo:", res[0].url); // Verifica la URL del primer archivo
            onImageUploadComplete(res[0].url); 
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default ImageUpload;