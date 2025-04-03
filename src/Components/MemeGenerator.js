import { useState } from "react";

import MemeForm from "./MemeForm";
import MemeList from "./MemeList";
import Message from "./Message";
import Error from "./Error";

import { useLocalStorageState } from "../Hooks/useLocalStorageState";
import { useFetchImage } from "../Hooks/useFetchImage";

export default function MemeGenerator() {
  const [memes, setMemes] = useLocalStorageState([], "memes");

  const [message, setMessage] = useState(null);

  const [caption, setCaption] = useState("");
  const { loading, error, image, fetchImage } = useFetchImage();

  function handleFetchImage() {
    fetchImage();
  }

  function handleChangeCaption(e) {
    setCaption(e.target.value);
  }

  function handleDeleteMeme(id) {
    setMemes(memes => memes.filter(meme => meme.id !== id));
  }

  function handleSaveMeme() {
    function isDuplicate(memes, newMeme) {
      return memes.some(
        meme =>
          meme.caption.toLowerCase() === newMeme.caption.toLowerCase() &&
          meme.image === newMeme.image
      );
    }

    if (!caption.trim()) return setMessage("Enter a caption!");

    const newMeme = {
      id: crypto.randomUUID(),
      caption,
      image,
    };

    if (isDuplicate(memes, newMeme)) {
      setMessage("This meme already exists!");
      return;
    }

    setMemes(prev => [...prev, newMeme]);

    setMessage("Meme saved!");
  }

  return (
    <div>
      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          <MemeForm
            image={image}
            caption={caption}
            onChangeCaption={handleChangeCaption}
            onSaveMeme={handleSaveMeme}
            onFetchImage={handleFetchImage}
          />

          {message && <Message message={message} />}

          {memes.length >= 1 && (
            <MemeList memes={memes} onDeleteMeme={handleDeleteMeme} />
          )}
        </>
      )}

      {error && !loading && <Error message={error.message} />}
    </div>
  );
}
