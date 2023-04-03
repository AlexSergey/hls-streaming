import { useState } from 'react';

import { useFetchMoviesQuery } from '../../store/slices/movies.slice';
import { VideoPlayer } from '../video-player/video-player.component';

import styles from './movies-list.module.scss';

export const MoviesListComponent = (): JSX.Element => {
  const [url, setUrl] = useState<string | boolean>(false);
  const { data, isLoading, isError } = useFetchMoviesQuery();

  console.log(data);
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (!data) {
    return <div>Error</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  const playVideo = (videoUrl: string): void => {
    setUrl(`${process.env.API_URL}/${videoUrl}`);
  };

  return (
    <div className={styles['list-wrapper']}>
      <div className={styles.video}>{typeof url === 'string' ? <VideoPlayer url={url} /> : null}</div>
      <ul className={styles.list}>
        {data.map((movie) => (
          <li
            key={movie.url}
            onClick={(): void => {
              playVideo(movie.url);
            }}
          >
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
