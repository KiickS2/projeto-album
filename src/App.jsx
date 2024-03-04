import { useState, useEffect } from "react";

import axios from "axios";

import PhotoList from "./components/PhotoList";
import SearchBar from "./components/SearchBar";
import SelectedPhoto from "./components/SelectedPhoto";

function App() {

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [photos, setPhotos] = useState([]);

  const fetchData = async ({query, category}) => {

    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

    const response = axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: apiKey,
        count: 12,
      }
    });

  }

  useEffect(() => {
    fetchData(query, category);
  }, [])

  return (
    <div className="container">
      <SearchBar />
      <PhotoList photos={photos}/>
      <SelectedPhoto />
    </div>
  )
}

export default App;
