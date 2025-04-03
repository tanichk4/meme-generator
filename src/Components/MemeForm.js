import styles from "../Styles/Meme.module.css";

export default function MemeForm({
  image,
  caption,
  onChangeCaption,
  onSaveMeme,
  onFetchImage,
}) {
  return (
    <>
      {!image ? (
        <button onClick={onFetchImage}>Click to start</button>
      ) : (
        <div className={styles.memeContainer}>
          <img className={styles.memeImage} src={image} alt={"Meme"} />
          <p className={styles.memeCaption}>{caption}</p>
          <input
            className={styles.memeInput}
            type="text"
            placeholder="enter caption"
            value={caption}
            onChange={onChangeCaption}
          />
          <button onClick={onFetchImage}>Another image</button>
          {caption && <button onClick={onSaveMeme}>Save</button>}
        </div>
      )}
    </>
  );
}
