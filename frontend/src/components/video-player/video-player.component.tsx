import { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player';

videojs.getAllPlayers();
export const VideoPlayer = (props: { url: string }): JSX.Element => {
  const videoRef = useRef<HTMLElement>();
  const playerRef = useRef<Player | null>();
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fluid: true,
    responsive: true,
    sources: [
      {
        src: props.url,
        type: 'application/x-mpegURL',
      },
    ],
  };

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!videoRef.current) {
      return;
    }
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      playerRef.current = videojs(videoElement, videoJsOptions, () => {
        videojs.log('player is ready');
      });

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(videoJsOptions.autoplay);
      player.src(videoJsOptions.sources);
    }
  }, [videoJsOptions, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return (): void => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*  @ts-ignore */}
      <div ref={videoRef} />
    </div>
  );
};
