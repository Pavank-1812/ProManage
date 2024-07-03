import React from "react";
import bannerStyles from "./Banner.module.css";
import BannerImage from "../../Assets/Images/Banner.png";
const Banner = () => {
  return (
    <div className={bannerStyles.banner_Container}>
      <img
        src={BannerImage}
        alt="Banner"
        className={bannerStyles.banner_Image}
      />

      <div className={bannerStyles.banner_textContent}>
        <div style={{ fontSize: "1.3rem", fontWeight: "500" }}>
          Welcome aboard my friend
        </div>
        <div style={{ fontSize: "0.rem", fontWeight: "300" }}>
          just a couple of clicks and we start
        </div>
      </div>
    </div>
  );
};

export default Banner;
