import { useState } from "react";

import MemeForm from "./MemeForm";
import Message from "./Message";
import Error from "./Error";

import { useLocalStorageState } from "../Hooks/useLocalStorageState";
import { useFetchImage } from "../Hooks/useFetchImage";
import MemeList from "./MemeList";

export default function MemeGenerator() {
  const [message, setMessage] = useState(null);
  const [caption, setCaption] = useState("");
  const [memes, setMemes] = useLocalStorageState([], "memes");
  const { loading, error, image, fetchImage } = useFetchImage();

  function handleFetchImage() {
    fetchImage();
  }

  function handleSaveMeme() {
    if (!caption.trim()) return setMessage("Enter a caption!");

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
      setMessage("This meme already exists!");
      return;
    }

    setMemes(prev => [...prev, newMeme]);

    setMessage("Meme saved!");
  }

  function handleChangeCaption(e) {
    setCaption(e.target.value);
  }

  function handleDeleteMeme(id) {
    setMemes(memes => memes.filter(meme => meme.id !== id));
  }

  return (
    <div>
      {!image ? (
        <button onClick={handleFetchImage}>Fetch an image to start</button>
      ) : (
        <MemeForm
          image={image}
          caption={caption}
          onChangeCaption={handleChangeCaption}
          onSaveMeme={handleSaveMeme}
          onFetchImage={handleFetchImage}
        />
      )}

      {message && <Message message={message} />}

      {memes.length !== 0 && (
        <MemeList memes={memes} onDeleteMeme={handleDeleteMeme} />
      )}

      {error && <Error message={error.message} />}
    </div>
  );
}
