import { useRef, useEffect } from "react";
import "./home.css";

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Video play error:", err);
      });
    }
  }, []);

  return (
    <div className="home-container">
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline 
        className="background-video"
      >
        <source src="/carole slideshow.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="video-overlay"></div>

      <div className="text-overlay">
        <h1 className="main-title">Happy Birthday Mum</h1>
        <h3 className="sub-title">You are the light of our lives</h3>
      </div>
    </div>
  );
}
