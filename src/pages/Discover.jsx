import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable arrow-body-style */
import { useState } from 'react';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';

import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col ">
      <div className="w-full justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {
            genres.map((genre, index) => (
              <option key={index} value={genre.value}>
                {genre.title}
              </option>
            ))
          }
        </select>
      </div>
      <div
        className="flex flex-wrap justify-center sm:justify-start gap-8"
      >
        {
          data.map((song, i) => (
            <SongCard
              key={i}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Discover;
