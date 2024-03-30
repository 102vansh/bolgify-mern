import React, { useContext, useState } from "react";
import SideBar from "../layout/Sidebar";
import MyBlogs from "../components/MyBlogs";
import MyProfile from "../components/Myprofile";
import CreateBlog from "../components/CreateBlog";
import Chart from "../components/Chart";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import Footer from "../layout/Footer";
const Dashboard = () => {
  const [component, setComponent] = useState("MyBlogs");
  const { mode, isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <SideBar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Analytics" ? (
        <Chart />
      ) : (
        <MyBlogs />
      )}
    
    </section>
  );
};

export default Dashboard;