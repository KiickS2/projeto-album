import { useState, useEffect } from "react";

import axios from "axios";

import PhotoList from "./components/PhotoList";
import SearchBar from "./components/SearchBar";
import SelectedPhoto from "./components/SelectedPhoto";

function App() {

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeSearch, setActiveSearch] = useState(false);

  const fetchData = async ({ query, category }) => {

    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

    if (query || category) {
      let searchQuery = query;

      if (query && category) {
        searchQuery = `${query} ${category}`;
      } else if (category) {
        searchQuery = category;
      }

      const response = await axios.get(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            client_id: apiKey,
            query: searchQuery,
          },
        }
      );

      setPhotos(response.data.results);

      return;
    }

    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: apiKey,
        count: 10,
      }
    });

    console.log(response.data)
    setPhotos(response.data);
  }

  useEffect(() => {
    fetchData(query, category);
  }, [])

  useEffect(() => {

    if (activeSearch) {
      fetchData({ query, category });
      setActiveSearch(false);
    }
  }, [activeSearch])

  return (
    <div className="container">
      <SearchBar setQuery={setQuery} setCategory={setCategory} setActiveSearch={setActiveSearch} />
      <PhotoList photos={photos} setSelectedPhoto={setSelectedPhoto} />
      {selectedPhoto && <SelectedPhoto photo={selectedPhoto} setSelectedPhoto={setSelectedPhoto} />}
    </div>
  )
}

export default App;
