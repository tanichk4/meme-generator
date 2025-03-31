import { useState } from "react";
import { useFetchMeme } from "../Hooks/useFetchMeme";
import Meme from "./Meme";

/*
+ saves meme in arr of obj 
+ checks for duplicates
! alert user if he has duplicates (lift state to app? not sure, lift is duplicate state?)

to do:
- Displaying saved memes in a list.
- Improved duplicate handling and user feedback.
- Option to delete or share saved memes.
- Persisting saved memes using `localStorage`.
*/

export default function MemeGenerator() {
  const [caption, setCaption] = useState("");
  const [memes, setMemes] = useState([]);

  const { loading, error, image, fetchMeme } = useFetchMeme();

  function handleSubmit(e) {
    e.preventDefault();
    if (!caption) return;

    fetchMeme();
  }

  function handleSaveMeme() {
    // !isDuplicate + saved: display message your meme was saved! You have X meme(s) saved, want to see?
    // isDuplicate ? this meme is already saved.
    // maybe even check if the titles match even without photos and inform user the same lol

    const newMeme = {
      id: crypto.randomUUID(),
      caption,
      image,
    };

    const isDuplicate =
      memes.length !== 0 &&
      memes.every(
        meme => meme.caption === newMeme.caption && meme.image === newMeme.image
      );

    if (isDuplicate) return;
    setMemes(prevMemes => [...prevMemes, newMeme]);
  }

  return (
    <div>
      {image ? (
        <>
          <Meme image={image} caption={caption} />

          <button onClick={handleSaveMeme}>Save</button>

          {/* hide 'another image' button when 'Save' is clicked -> display saved memes ? <MemeList memes={memes} /> : return to something lol
           */}
          <button onClick={fetchMeme}>Another Image</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter meme caption"
            value={caption}
            onChange={e => setCaption(e.target.value.trim())}
          />
          <button disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      )}

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>{error.message}</div>
      )}

      {/* {Object.keys(savedMemes).length !== 0 && (
        <>
          <p>You saved some memes, show them?</p>
          <button onClick={null}>Yes!</button>
        </>
      )} */}
    </div>
  );
}
