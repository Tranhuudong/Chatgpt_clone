import React, { useEffect, useRef, useState } from "react";
import "./NewPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";

const NewPrompt = () => {
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage 
         urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
         path={img.dbData?.filePath}
         width="380"
         transformation={[{with: 380}]}
        
        />
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm">
        <Upload setImg={setImg}/>

        {/* <label htmlFor="file">
          <img src="/attachment.png" alt="" />
        </label> */}
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" placeholder="Ask anything..." name="text" />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
