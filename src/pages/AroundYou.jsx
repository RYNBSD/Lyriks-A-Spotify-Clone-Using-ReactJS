import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

import { geokey } from '../redux/keys';

const CountryTracks = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  console.log(data, isFetching, country);
  
  useEffect(() => {
    axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${geokey}`)
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [country]);

  // console.log(country);

  if (isFetching || loading) return <Loader title="Loading songs around you" />;

  if (error) return <Error title="Error fetching songs around you" />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you 
        <span className="font-black">
          {country}
        </span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {
                data?.map((song, i) => (
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

export default CountryTracks;
