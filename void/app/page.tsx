'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ReactAudioPlayer from 'react-audio-player';

export default function Home() {
  const [value, setValue] = useState('');
  const [songArray, setSongArray] = useState([]);
  const [initialPos, setInitialPos] = useState(
    'Search for high quality songs!'
  );
  const [currentSongPlayer, setcurrentSongPlayer] = useState('');

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const getMusic = async (song_name) => {
    try {
      const response = await axios.get(
        `https://void-proxy-server.onrender.com/proxy/${song_name}`
      );
      if (response.status >= 200 && response.status <= 299) {
        const details = response.data;
        setSongArray(details);
      } else {
        console.log('Server responded with an error:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  const handleSearch = () => {
    getMusic(value);
  };

  const handleSubmit = (e) => {
    setInitialPos('Loading...');
    e.preventDefault();
    handleSearch();
  };

  const handlePlaying = (song_url: string) => {
    setcurrentSongPlayer(song_url);
    console.log(song_url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="text-8xl tracking-tight font-bold text-center mb-4">
        VOID
      </div>
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex items-center flex-wrap"
      >
        <input
          type="text"
          value={value}
          onChange={handleInput}
          className="bg-gray-800 text-white border border-gray-700 p-2 rounded-md focus:outline-none focus:border-blue-500 mx-6 flex-grow mb-2 sm:mb-0 sm:mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
        >
          Submit
        </button>
      </form>
      <section className="flex flex-wrap justify-center">
        {songArray.length > 0 ? (
          songArray.map((song) => (
            <div
              key={song.id}
              className="mb-4 mx-4 bg-gray-800 p-4 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <h1 className="text-2xl font-bold mb-2">{song.name}</h1>
              <Image
                src={song.image}
                alt={song.name}
                width={150}
                height={100}
                className="rounded-md"
              />
              <h2 className="text-lg mt-2">{song.subtitle}</h2>
              <button
                onClick={() => handlePlaying(song.url)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Play
              </button>
            </div>
          ))
        ) : (
          <h1>{initialPos}</h1>
        )}
      </section>

      <section className="fixed bottom-0 min-w-full">
        {/* <audio controls>
          <source src={currentSongPlayer} type="audio/mp3" />
        </audio> */}
        <ReactAudioPlayer
          className="my-0 mx-auto"
          src={currentSongPlayer}
          autoPlay
          controls
        />
      </section>
    </div>
  );
}
