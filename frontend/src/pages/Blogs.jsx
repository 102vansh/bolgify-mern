import React, { useContext } from "react";
import LatestBlogs from "../components/LatestBlog";
import { Context } from "../main";
import Footer from "../layout/Footer";

const Blogs = () => {
  const { mode, blogs } = useContext(Context);

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <LatestBlogs blogs={blogs} title={"Blogs"} />
      <Footer/>
    </article>
  );
};

export default Blogs;