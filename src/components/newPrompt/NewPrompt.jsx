import React, { useEffect, useRef } from "react";
import "./NewPrompt.css";
import Upload from "../upload/Upload";

const NewPrompt = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({behavior: "smooth"});
  }, []);
  return (
    <>
      {/* ADD NEW CHAT */}
      Test

      <div className="endChat" ref={endRef}></div>
      <form className="newForm">
        <Upload />

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
