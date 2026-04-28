import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  /** Path to the video file (relative to the public folder, e.g. "/assets/background.mp4") */
  videoSrc?: string;
  /** Overlay opacity (0 to 1). Default: 0.6 */
  overlayOpacity?: number;
  children: React.ReactNode;
}

/**
 * A full-viewport cinematic video background with:
 * - Autoplay, muted, looped video covering the entire screen
 * - A smooth fade-in transition on load
 * - A semi-transparent dark overlay for readability
 * - Children content rendered on top, centered
 */
export const VideoBackground = ({
  videoSrc = "/assets/background.mp4",
  overlayOpacity = 0.6,
  children,
}: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsVideoLoaded(true);
    video.addEventListener("canplaythrough", handleCanPlay);

    // If video is already loaded (cached), trigger immediately
    if (video.readyState >= 4) {
      setIsVideoLoaded(true);
    }

    return () => video.removeEventListener("canplaythrough", handleCanPlay);
  }, []);

  return (
    <div className="video-bg-wrapper">
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`video-bg-video ${isVideoLoaded ? "video-bg-visible" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div
        className="video-bg-overlay"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />

      {/* Content on top */}
      <div className="video-bg-content">
        {children}
      </div>
    </div>
  );
};
