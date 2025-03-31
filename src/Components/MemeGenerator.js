import { useState } from "react";
import { useFetchMeme } from "../Hooks/useFetchMeme";
import Meme from "./Meme";
import MemeList from "./MemeList";

/*

? SHOULD A SEPARATE COMPONENT BE CREATED TO PREVIEW THE MEME? 
- BECAUSE MEME COMPONENT IS REUSED BUT FOR DIFFERENT PURPOSES -> {CHILDREN} ??? BUT PROPS? NOT SURE OF {CHILDREN}
? SHOULD A USER BE GIVEN CHOICE TO CHOOSE PREVIOUS PIC? (COMPLICATED)

+ saves meme in arr of obj 
+ local storage
+ checks for duplicates
! alert user if he has duplicates (lift state to app? not sure, lift isDuplicate state?)

to do:
- Displaying saved memes in a list.
- Improved duplicate handling and user feedback.
- Option to delete or share saved memes.
- Persisting saved memes using `localStorage`.
*/

export default function MemeGenerator() {
  const [caption, setCaption] = useState("");
  const [memes, setMemes] = useState(
    JSON.parse(localStorage.getItem("memes")) || []
  );

  const [notification, setNotification] = useState(null);

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
      memes.some(
        meme => meme.caption === newMeme.caption && meme.image === newMeme.image
      );

    if (isDuplicate) {
      setNotification("This meme already exists!");
      return;
    }

    setMemes(prev => {
      const updated = [...prev, newMeme];
      localStorage.setItem("memes", JSON.stringify(updated));
      return updated;
    });

    setNotification("Meme saved!");
  }

  function handleRemoveMeme(memeId) {
    setMemes(memes => {
      memes.filter(meme => meme.id !== memeId);
    });
  }

  function handleAnotherImage() {
    setNotification(null);
    fetchMeme();
  }

  return (
    <div>
      {image ? (
        <>
          <Meme image={image} caption={caption} />

          <button onClick={handleSaveMeme}>Save</button>

          {/* hide 'another image' button when 'Save' is clicked -> display saved memes ? <MemeList memes={memes} /> : return to something lol
           */}
          <button onClick={handleAnotherImage}>Another Image</button>
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

      {notification && <p>{notification}</p>}

      {memes.length > 0 && (
        <>
          <p>You saved some memes, show them?</p>
          {/* <MemeList memes={memes} onClick={handleRemoveMeme} /> */}
        </>
      )}
    </div>
  );
}
