import React, {useEffect, useState} from "react";
import {
    MdPlayArrow,
    MdPause,
    MdSkipNext,
    MdSkipPrevious,
    MdVolumeUp,
    MdVolumeOff,
} from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';
import {IconButton} from "./icon-button";
import {AudioProgressBar} from './audio-progress-bar';
import {VolumeInput} from './volume-input';

function formatDurationDisplay(duration: number) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);

    const formatted = [min, sec].map((n) => (n < 10 ? '0' + n : n)).join(':');

    return formatted;
}

interface AudioPlayerProps {
    currentSong?: { title: string; src: string };
    songIndex: number;
    songCount: number;
    onNext: () => void;
    onPrev: () => void;
}

export function AudioPlayer({
                                        currentSong,
                                        songCount,
                                        songIndex,
                                        onNext,
                                        onPrev,
                                    }: AudioPlayerProps) {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const [isReady, setIsReady] = React.useState(false);
    const [duration, setDuration] = React.useState(0);
    const [currrentProgress, setCurrrentProgress] = React.useState(0);
    const [buffered, setBuffered] = React.useState(0);
    const [volume, setVolume] = React.useState(0.2);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const durationDisplay = formatDurationDisplay(duration);
    const elapsedDisplay = formatDurationDisplay(currrentProgress);

    React.useEffect(() => {
        audioRef.current?.pause();

        const timeout = setTimeout(() => {
            audioRef.current?.play();
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [songIndex]);

    const handleNext = () => {
        onNext();
    };

    const handlePrev = () => {
        onPrev();
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            audioRef.current?.play();
            setIsPlaying(true);
        }
    };

    const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
        e
    ) => {
        const audio = e.currentTarget;
        const dur = audio.duration;
        if (dur > 0) {
            for (let i = 0; i < audio.buffered.length; i++) {
                if (
                    audio.buffered.start(audio.buffered.length - 1 - i) <
                    audio.currentTime
                ) {
                    const bufferedLength = audio.buffered.end(
                        audio.buffered.length - 1 - i
                    );
                    setBuffered(bufferedLength);
                    break;
                }
            }
        }
    };

    const handleMuteUnmute = () => {
        if (!audioRef.current) return;

        if (audioRef.current.volume !== 0) {
            audioRef.current.volume = 0;
        } else {
            audioRef.current.volume = 1;
        }
    };

    const handleVolumeChange = (volumeValue: number) => {
        if (!audioRef.current) return;
        audioRef.current.volume = volumeValue;
        setVolume(volumeValue);
    };

    return (
        <div className="box-7">
            {currentSong && (
                <audio
                    ref={audioRef}
                    preload="metadata"
                    onDurationChange={(e) => setDuration(e.currentTarget.duration)}
                    onPlaying={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={handleNext}
                    onCanPlay={(e) => {
                        e.currentTarget.volume = volume;
                        setIsReady(true);
                    }}
                    onTimeUpdate={(e) => {
                        setCurrrentProgress(e.currentTarget.currentTime);
                        handleBufferProgress(e);
                    }}
                    onProgress={handleBufferProgress}
                    onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
                >
                    <source type="audio/mpeg" src={currentSong.src} />
                </audio>
            )}
            <AudioProgressBar
                duration={duration}
                currentProgress={currrentProgress}
                buffered={buffered}
                onChange={(e) => {
                    if (!audioRef.current) return;

                    audioRef.current.currentTime = e.currentTarget.valueAsNumber;

                    setCurrrentProgress(e.currentTarget.valueAsNumber);
                }}
            />

            <div className="box-9">
                <div className="box-10">
                    <p className="box-11">
                        {currentSong?.title ?? 'Select a song'}
                    </p>
                </div>
            </div>
            <div className="box-13">
        <span className="box-14">
          {elapsedDisplay} / {durationDisplay}
        </span>
                <div className="box-15">
                    <IconButton
                        onClick={handlePrev}
                        disabled={songIndex === 0}
                        aria-label="go to previous"
                        intent="secondary"
                    >
                        <MdSkipPrevious size={24} />
                    </IconButton>
                    <IconButton
                        disabled={!isReady}
                        onClick={togglePlayPause}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                        size="lg"
                    >
                        {!isReady && currentSong ? (
                            <CgSpinner size={24} className="box-16" />
                        ) : isPlaying ? (
                            <MdPause size={30} />
                        ) : (
                            <MdPlayArrow size={30} />
                        )}
                    </IconButton>
                    <IconButton
                        onClick={handleNext}
                        disabled={songIndex === songCount - 1}
                        aria-label="go to next"
                        intent="secondary"
                    >
                        <MdSkipNext size={24} />
                    </IconButton>
                </div>

                <div className="box-17">
                    <IconButton
                        intent="secondary"
                        size="sm"
                        onClick={handleMuteUnmute}
                        aria-label={volume === 0 ? 'unmute' : 'mute'}
                    >
                        {volume === 0 ? (
                            <MdVolumeOff size={20} />
                        ) : (
                            <MdVolumeUp size={20} />
                        )}
                    </IconButton>
                    <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
                </div>
            </div>
        </div>
    );
}
