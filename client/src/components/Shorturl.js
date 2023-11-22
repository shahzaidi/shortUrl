import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

const Shorturl = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [shortend, setShortend] = useState([]);

  console.log(shortUrl, "yyy");

  const getAllShortenUrl = async () => {
    const res = await axios.get("http://localhost:4000/getallurl");
    setShortend(res.data.shortenurl);
    console.log(res, "resss");
  };

  useEffect(() => {
    getAllShortenUrl();
  }, []);

  const redirect = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/${shortUrl}`);

      console.log(res.data.originalUrl, "rest");

      window.open(res.data.originalUrl);
    } catch (error) {
      //   window.alert(error.response.data.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    redirect();
  }, [shortUrl]);
  return (
    <>
      <Container>
        {shortend.length < 1 ? (
          <h1>
            No, Url in the Database to show, please add url from Home page
          </h1>
        ) : (
          <form>
            <div className="col-8">
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Short Url's
                </label>
                <select
                  class="form-select"
                  onChange={(e) => setShortUrl(e.target.value)}
                  name="state"
                  aria-label="Default select example"
                >
                  {shortend &&
                    shortend.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </form>
        )}
      </Container>
    </>
  );
};

export default Shorturl;
