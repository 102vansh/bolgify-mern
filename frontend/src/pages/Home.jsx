import React from 'react'
import HeroSection from '../components/HeroSection';
import TrendingBlogs from '../components/TrendingBlog';
import LatestBlogs from '../components/LatestBlog';
import PopularAuthor from '../components/PopularAuthor';
import { useContext } from 'react';
import { Context } from '../main';
const Home = () => {
  const { mode, blogs } = useContext(Context);
  const filteredBlogs = blogs.slice(0, 6);
  return (
    <>
      <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
        <HeroSection />
        <TrendingBlogs />
        <LatestBlogs heading={"Latest Blogs"} blogs={filteredBlogs}/>
        {/* <LatestBlogs heading={"Latest Blogs"} blogs={filteredBlogs} /> */}
        <PopularAuthor />
      </article>
    </>
  );
};

export default Home;