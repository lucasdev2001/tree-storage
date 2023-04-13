import { useState } from "react";

import axios from "axios";
import { useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [storageFiles, setStorageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    setInput(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", input);

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_ENDPOINT}/${input.name}`,
        input,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStorageFiles = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + '/?fields=timeModified');
      setStorageFiles(response.data.objects);
      console.log(storageFiles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStorageFiles();
    console.log(storageFiles);
  }, [isLoading]);

  return (
    <>
      <section className="container">
        <center>
          <h1>🌳 Tree Storage 📦 </h1>
        </center>
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="file"
            id="file"
            placeholder="escolha um arquivo"
            onChange={handleInputChange}
            required
          />

          <button type="submit" aria-busy={isLoading}>Enviar Arquivo</button>
        </form>
      </section>
      <section className="container">
        <center>
          <h2>Nossos arquivos</h2>
        </center>
        <center>
          <div aria-busy={isLoading}></div>
          {storageFiles.map((e) => (
            <>
              <a
                href={`${import.meta.env.VITE_API_ENDPOINT}/${e.name}`}
                download={true}
              >
                {e.name}
              </a>
              <br />
            </>
          ))}
        </center>
      </section>
    </>
  );
}

export default App;
