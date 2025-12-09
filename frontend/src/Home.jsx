import "./home.css";

export default function Home() {
  const videoId = import.meta.env.VITE_BACKGROUND_VIDEO_ID || "SZQIthwdb6E";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0`;

  return (
    <div className="home-container">
      <div className="background-video">
        <iframe
          src={embedUrl}
          title="Background video"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="video-overlay"></div>

      <div className="text-overlay">
        <h1 className="main-title">Happy Birthday Mum</h1>
        <h3 className="sub-title">You are the light of our lives</h3>
      </div>
    </div>
  );
}
