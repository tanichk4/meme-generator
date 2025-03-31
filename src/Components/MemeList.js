import Meme from "./Meme";

export default function MemeList({ memes }) {
  return (
    <ul>
      {memes.map(meme => (
        <Meme image={meme.image} caption={meme.caption} key={meme.id} />
      ))}
    </ul>
  );
}
