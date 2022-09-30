import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: artistData, isFetching: isFetchingArtistSongs, error } = useGetArtistDetailsQuery(artistId);

  console.log(artistData, isFetchingArtistSongs);


  if (isFetchingArtistSongs) { return <Loader title="Searching artist details" />; }

  if (error) return <Error />;


  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData}
      />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />

    </div>
  );
};

export default ArtistDetails;
