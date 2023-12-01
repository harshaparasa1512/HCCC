import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import styles from './waveform.module.scss';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const formWaveSurferOptions = (ref: React.RefObject<HTMLDivElement>): any => ({
   container: ref.current,
   waveColor: '#eee',
   progressColor: 'OrangeRed',
   cursorColor: 'OrangeRed',
   barWidth: 2,
   barRadius: 4,
   responsive: true,
   height: 150,
   normalize: true,
   partialRender: true,
});

interface WaveformProps {
   url: string;
}

export default function Waveform(props: WaveformProps): React.ReactNode {
   const waveformRef = useRef<HTMLDivElement>(null);
   const wavesurfer = useRef<WaveSurfer | null>(null);
   const [playing, setPlay] = useState(false);
   const [volume, setVolume] = useState(0.5);
   const [totalDuration, setTotalDuration] = useState(0);
   const [currentTime, setCurrentTime] = useState(0);
   const [hoveredTime, setHoveredTime] = useState<number | null>(null);
   const [isHovered, setIsHovered] = useState(false);
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [isVolumeSliderVisible, setVolumeSliderVisible] = useState(false);

   useEffect(() => {
      setPlay(false);

      if (waveformRef.current !== null) {
         const options = formWaveSurferOptions(waveformRef);
         wavesurfer.current = WaveSurfer.create(options);

         // eslint-disable-next-line @typescript-eslint/no-floating-promises
         wavesurfer.current.load(props.url);

         wavesurfer.current.on('ready', function () {
            if (wavesurfer.current !== null) {
               wavesurfer.current.setVolume(volume);
               setVolume(volume);
               setTotalDuration(wavesurfer.current.getDuration());
            }
         });

         wavesurfer.current.on('audioprocess', function () {
            if (wavesurfer.current !== null) {
               setCurrentTime(wavesurfer.current.getCurrentTime());
            }
         });

         return () => {
            if (wavesurfer.current !== null) {
               wavesurfer.current.destroy();
            }
         };
      }
   }, [props.url, volume]);

   const handleWaveformHover = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (wavesurfer.current !== null) {
         const boundingRect = waveformRef.current.getBoundingClientRect();
         const mouseX = e.clientX - boundingRect.left;
         const percentage = mouseX / boundingRect.width;
         const seekTime = percentage * totalDuration;
         setHoveredTime(seekTime);
         setIsHovered(true);
      }
   };

   const handleWaveformLeave = (): void => {
      setHoveredTime(null);
      setIsHovered(false);
   };

   const handlePlayPause = (): void => {
      setPlay(!playing);
      if (wavesurfer.current !== null) {
         // eslint-disable-next-line @typescript-eslint/no-floating-promises
         wavesurfer.current.playPause();
      }
   };

   // const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
   //    const { target } = e;
   //    const newVolume = +target.value;

   //    if (newVolume) {
   //       setVolume(newVolume);
   //       if (wavesurfer.current) {
   //          wavesurfer.current.setVolume(newVolume || 1);
   //       }
   //    }
   // };

   const formatTime = (timeInSeconds: number): string => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = Math.floor(timeInSeconds % 60);

      const formattedHours = hours > 0 ? `${hours}:` : '';
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
   };

   const handleVolumeIconHover = (): void => {
      setVolumeSliderVisible(true);
   };

   const handleVolumeIconLeave = (): void => {
      setVolumeSliderVisible(false);
   };

   return (
      <div className={styles.waveFormContainer}>
         <div>
            <div
               id="waveform"
               ref={waveformRef}
               onMouseMove={handleWaveformHover}
               onMouseLeave={handleWaveformLeave}
               className={isHovered ? `${styles.hovered}` : ''}
               style={{ cursor: 'pointer' }}
            />
            {hoveredTime !== null && (
               <React.Fragment>
                  <div
                     className={styles.hoveredLine}
                     style={{ left: `${(hoveredTime / totalDuration) * 100}%` }}
                  />
                  <div
                     className={styles.hoveredTime}
                     style={{ left: `${(hoveredTime / totalDuration) * 100}%` }}
                  >
                     {formatTime(hoveredTime)}
                  </div>
               </React.Fragment>
            )}
         </div>
         <div className={styles.subContainer}>
            <div className={styles.volumeInfo}>
               <div className={styles.duration}>{`${formatTime(currentTime)} / ${formatTime(
                  totalDuration,
               )}`}</div>
               <div
                  className={styles.volumeUpContainer}
                  onMouseEnter={handleVolumeIconHover}
                  onMouseLeave={handleVolumeIconLeave}
               >
                  <VolumeUpIcon className={styles.volumeIcon} />
                  {/* {isVolumeSliderVisible && (
                     <input
                        type="range"
                        id="volume"
                        name="volume"
                        min="0.01"
                        max="1"
                        step=".025"
                        onChange={onVolumeChange}
                        defaultValue={volume}
                        className={styles.volumeSlider}
                     />
                  )} */}
               </div>
            </div>
            <div className={styles.buttonControls}>
               <button disabled className={styles.nextButton}>
                  <SkipPreviousIcon />
               </button>
               <button onClick={handlePlayPause} className={styles.playPauseButton}>
                  {!playing ? (
                     <PlayCircleIcon className={styles.playIcon} />
                  ) : (
                     <PauseCircleIcon className={styles.playIcon} />
                  )}
               </button>
               <button disabled className={styles.nextButton}>
                  <SkipNextIcon />
               </button>
            </div>
         </div>
      </div>
   );
}
