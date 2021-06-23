import React, { useEffect, useState } from "react";

function Uploadfile4() {
  const [file, setFile] = React.useState("");

  function handleUpload(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div id="upload-box">
      <input type="file" onChange={handleUpload} />
    </div>
  );
}

export default Uploadfile4;
