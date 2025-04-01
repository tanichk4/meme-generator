import styles from "../Styles/Meme.module.css";
export default function Meme({ meme, onDeleteMeme }) {
  return (
    <div className={styles.memeContainer}>
      <img
        src={meme.image}
        alt={meme.caption || "Random Meme"}
        className={styles.memeImage}
      />
      <p className={styles.memeCaption}>{meme.caption}</p>
      <button onClick={() => onDeleteMeme(meme.id)}>Delete meme</button>
    </div>
  );
}
