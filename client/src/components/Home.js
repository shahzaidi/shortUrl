import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [url, setUrl] = useState("");
  console.log(url, "url");
  const navigate = useNavigate();

  let URI = "http://localhost:4000/api/short";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1");

    try {
      const response = await axios.post(URI, {
        url,
      });
      console.log(2, "bbbb");

      console.log(response, "res...............///");
      window.alert(response.data.message);
      setUrl("");
      navigate("/shorturl");
    } catch (error) {
      window.alert(error.response.data.message);
      console.log(error.message);
    }
  };
  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              URL
            </label>
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              value={url}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </Container>
    </>
  );
};

export default Home;
