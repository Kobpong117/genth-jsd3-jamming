import { useState, useEffect } from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylitsName] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([])

  useEffect(() => {
    Spotify.getAccessToken()
  }, [])

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    } else {
      setPlaylistTracks(savedTrack => [...savedTrack, track])
    }
  }

  const removeTrack = (track) => {
    const updatedTracks = playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    setPlaylistTracks([...updatedTracks])
  }

  const updatePlaylistName = (name) => {
    setPlaylitsName(name)
  }

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri)
    Spotify.savePlaylist(playlistName, trackUris)
      .then(() => {
        setPlaylitsName('New Playlist')
        setPlaylistTracks([])
    })
  }

  const search = (term) => {
    Spotify.search(term)
      .then(getResults => setSearchResults(getResults))
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar 
          onSearch={search}
        />
        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults}
            onAdd={addTrack}
          />
          <Playlist 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
