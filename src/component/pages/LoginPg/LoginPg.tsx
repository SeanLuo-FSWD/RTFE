import React, { useContext, useState } from "react";
import { globalContext } from "../../../store/context/globalContext";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import usePost from "../../../server_api/usePost";

function LoginPg() {
  const { currentUser } = useContext(globalContext);
  const [Files, setFiles] = useState(null) as any;
  const [doPost] = usePost();

  const googleLogin = () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };
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
        console.log("fffffffffffffffffffffff");
        console.log(Files.file_arr[i]);

        bodyFormData.append("filesToUpload[]", Files.file_arr[i]);
      }
    }
    src_arr = [];
    file_arr = [];

    // DO NOT DELETE
    console.log("000000000000000000000");
    console.log(bodyFormData);

    doPost("other/image", bodyFormData, () => {
      console.log("post success");
    });
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <h2 data-cy="LoginPg_title">Login page</h2>

      <button onClick={googleLogin}>Google Login</button>

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

export default LoginPg;
