
import { MdPlayArrow, MdPause } from 'react-icons/md';
import {AudioPlayer} from './audio-player';
import './box.css'
import React from "react";

export  function AudioPage({songs}: any) {
    const [currentSongIndex, setCurrentSongIndex] = React.useState(-1);

    const currentSong = songs[currentSongIndex];

    return (
        <div className="box-1">
            <div className="box-2">
                <h1 className="box-3">Flexpayz Player</h1>
                <div style={{listStyleType: 'none', width: '80%'}}>
                    {songs.map((song:any, index: number) => (
                        <div key={song.title} style={{width: '100%'}}>
                            <button
                                onClick={() => setCurrentSongIndex(index)}
                                className={'box-4'}
                            >
                <span className="box-5">
                  {index + 1 < 10 ? '0' + (index + 1) : index + 1}
                </span>
                                <h2 className="box-6">{song.title}</h2>
                                <span>
                  {index === currentSongIndex ? (
                      <MdPause size={20} />
                  ) : (
                      <MdPlayArrow size={20} />
                  )}
                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-auto">
                <AudioPlayer
                    key={currentSongIndex}
                    currentSong={currentSong}
                    songCount={songs.length}
                    songIndex={currentSongIndex}
                    onNext={() => setCurrentSongIndex((i) => i + 1)}
                    onPrev={() => setCurrentSongIndex((i) => i - 1)}
                />
            </div>
        </div>
    );
}
