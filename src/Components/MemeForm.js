import styles from "../Styles/Meme.module.css";

export default function MemeForm({
  image,
  caption,
  onChangeCaption,
  onSaveMeme,
  onFetchImage,
}) {
  return (
    <div className={styles.memeContainer}>
      <img
        className={styles.memeImage}
        src={image}
        alt={caption || "Random Meme"}
      />
      <p className={styles.memeCaption}>{caption}</p>
      <input
        className={styles.memeInput}
        type="text"
        placeholder="enter caption"
        value={caption}
        onChange={onChangeCaption}
      />
      <button onClick={onSaveMeme}>Save</button>
      <button onClick={onFetchImage}>Fetch another image</button>
    </div>
  );
}
