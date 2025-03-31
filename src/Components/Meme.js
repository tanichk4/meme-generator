import styles from "../Styles/Meme.module.css";

export default function Meme({ image, caption }) {
  return (
    <div className={styles.memeContainer}>
      <img
        src={image}
        alt={caption || "Random Meme"}
        className={styles.memeImage}
      />
      <p className={styles.memeCaption}>{caption}</p>
    </div>
  );
}
