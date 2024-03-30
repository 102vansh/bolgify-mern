import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { BeatLoader, BounceLoader } from "react-spinners";
import Footer from "../layout/Footer";

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const { mode } = useContext(Context);
  useEffect(() => {
    const fetchAuthors = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/user/allauthor",
        { withCredentials: true }
      );
      console.log(data)
      setAuthors(data.authors);
    };
    fetchAuthors();
  }, []);

  return (
    <article
      className={
        mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"
      }
    >
      <h2>ALL AUTHORS</h2>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.map((element) => {
            return (
              <div className="card" key={element._id}>
                {/* {authors && authors.avatar.url && (  */}
               <img src={element.avatar.url} alt="author_avatar" /> 
                 {/* )}  */}
                <h3>{element.name}</h3>
                <p>{element.role}</p>
              </div>
            );
          })
        ) : (
          <BeatLoader color="gray" size={50} style={{ padding: "200px 0" }} />
        )}
      </div>
      <Footer/>
    </article>
  );
};

export default AllAuthors;