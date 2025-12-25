import { useState } from "react";
import Loading from "../Loading/Loading";
import "./ImageLoader.css";

export default function ImageLoader({ src, alt, variant = "" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`image-loader-wrapper ${variant}`}>
      {!loaded && (
        <div className="image-loader-overlay">
          <Loading />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`image-loader-img ${loaded ? "show" : "hide"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}