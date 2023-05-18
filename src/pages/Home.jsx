import React from "react";
import CopyWrite1 from "../features/CopyWrite1";
import CopyWrite2 from "../features/CopyWrite2";
import CopyWrite3 from "../features/CopyWrite3";
import Footer from "../components/elem/Footer";
import VideoPlayer from "../features/VideoPlayer";
import { Helmet } from "react-helmet";
import FalseGuard from "../hook/guard/FalseGuard";

function Home() {
  FalseGuard();
  return (
    <>
      <Helmet>
        <title>Home - Netflix</title>
      </Helmet>
      {/* <VideoDesc /> */}
      <VideoPlayer />
      {/* testing */}
      <CopyWrite1 />
      <CopyWrite2 />
      <CopyWrite3 />
      <Footer />
    </>
  );
}
export default Home;
