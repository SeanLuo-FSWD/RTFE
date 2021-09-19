import React, { useContext, useState, useEffect } from "react";
import { globalContext } from "../../../store/context/globalContext";
import { Helmet } from "react-helmet";
import Navbar from "../../Navbar/Navbar";
import usePostForm from "../../../server_api/usePostForm";
import { server_url } from "../../../env.config";
function HomePg() {
  const [Files, setFiles] = useState(null) as any;
  const { currentUser, setCurrentUser } = useContext(globalContext);

  const [doPostForm] = usePostForm();
  let img_src = "";
  let file_arr: any[] = [];
  let src_arr: string[] = [];
  function getImg(e: any) {
    file_arr = Array.from(e.target.files);

    file_arr.map((img) => {
      let binaryData = [];
      binaryData.push(img);
      const blob = new Blob(binaryData);

      img_src = window.URL.createObjectURL(blob);

      src_arr.push(img_src);
    });
    setFiles({ src_arr, file_arr });
  }

  const postSubmit = (e: any) => {
    e.preventDefault();

    let bodyFormData = new FormData();

    if (Files && Files.file_arr.length > 0) {
      for (let i = 0; i < Files.file_arr.length; i++) {
        bodyFormData.append("filesToUpload[]", Files.file_arr[i]);
      }
    }
    src_arr = [];
    file_arr = [];

    doPostForm("other/image", bodyFormData, (data: any) => {
      setCurrentUser({ ...currentUser, profileImg: data.profileImg });
    });
  };

  return (
    <div>
      <Navbar />
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h2>Home Page</h2>
      <img
        src={`${server_url}${currentUser.profileImg}`}
        width="300"
        height="300"
      />
      <form onSubmit={postSubmit}>
        <input
          type="file"
          id="myFile"
          name="filename"
          // accept="image/png"
          accept="image"
          multiple
          onChange={(e) => getImg(e)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default HomePg;
