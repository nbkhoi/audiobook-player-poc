import React, { useState } from "react";
import "./App.css";
import { FaPlay, FaPause } from "react-icons/fa";

interface Audiobook {
  id: number;
  title: string;
  url: string;
}

const App: React.FC = () => {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [currentBook, setCurrentBook] = useState<Audiobook | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    // Load audiobook list
    fetch("/audiobooks.json")
      .then((response) => response.json())
      .then((data) => setAudiobooks(data));
  }, []);

  const handlePlay = (book: Audiobook) => {
    if (currentBook?.id === book.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentBook(book);
      setIsPlaying(true);
    }
  };

  return (
    <div className="App">
      <h1>Audiobook Player</h1>
      <div className="playlist">
        {audiobooks.map((book) => (
          <div
            key={book.id}
            className={`playlist-item ${currentBook?.id === book.id ? "active" : ""}`}
            onClick={() => handlePlay(book)}
          >
            <div className="info">
              <h3>{book.title}</h3>
            </div>
            <button className="play-button">
              {currentBook?.id === book.id && isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        ))}
      </div>

      {currentBook && (
        <div className="player">
          <h2>Now Playing: {currentBook.title}</h2>
          <audio
            src={currentBook.url}
            controls
            autoPlay={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          ></audio>
        </div>
      )}
    </div>
  );
};

export default App;
