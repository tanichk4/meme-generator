import axios from "axios";
import { useState } from "react";

export function useFetchMeme() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  async function fetchMeme() {
    try {
      setLoading(true);
      const res = await axios.get("https://api.imgflip.com/get_memes");

      const data = await res.data;
      if (!data.success) throw new Error("Something went wrong");

      const randomMeme = Math.floor(Math.random() * data.data.memes.length);
      setImage(data.data.memes[randomMeme].url);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, image, fetchMeme };
}
