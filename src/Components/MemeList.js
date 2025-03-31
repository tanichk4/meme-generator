import Meme from "./Meme";

export default function MemeList({ memes, onClick }) {
  return (
    <ul>
      {memes.map(meme => (
        <Meme meme={meme} key={meme.id} onClick={onClick} />
      ))}
    </ul>
  );
}
