import Meme from "./Meme";

export default function MemeList({ memes, onDeleteMeme }) {
  return (
    <>
      <h2>Your created memes</h2>
      <ul>
        {memes.map(meme => (
          <Meme meme={meme} key={meme.id} onDeleteMeme={onDeleteMeme} />
        ))}
      </ul>
    </>
  );
}
