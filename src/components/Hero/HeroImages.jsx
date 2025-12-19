export default function HeroImages({ images }) {
    return (
      <div className="hero-images">
        {images.map((img, i) => (
          <img key={i} src={img} alt="recipe" loading="lazy" />
        ))}
      </div>
    );
}