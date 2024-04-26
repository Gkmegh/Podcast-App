import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

function AudioPlayer({audioSrc, image}) {
    const [duration, setDuration]= useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMute, setIsMute] = useState(false)
    const [volume, setVolume] = useState(1)
    const audioRef = useRef();

    const handleDuration = (e) =>{
        setCurrentTime(e.target.value)
        audioRef.current.currentTime =e.target.value
    }

    const togglePlay = ()=>{
        setIsPlaying(!isPlaying)
    }
    const toggleMute = () => {
        setIsMute(!isMute)
    }

    const handleVolume = (e) =>{
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume; 
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
    }

    useEffect(()=>{
        const audio = audioRef.current
        audio.addEventListener("timeupdate", handleTimeUpdate)
        audio.addEventListener("loadedmetadata", handleLoadedMetaData)
        audio.addEventListener("ended", handleEnded)

        return()=>{
            audio.removeEventListener("timeupdate", handleTimeUpdate)
            audio.removeEventListener("loadedmetadata", handleLoadedMetaData)
            audio.removeEventListener("ended", handleEnded)
        }
    },[]);

    const handleTimeUpdate = () =>{
        setCurrentTime(audioRef.current.currentTime)
    };

    const handleLoadedMetaData = () =>{
        setDuration(audioRef.current.duration)
    }
    const handleEnded = () =>  {
        setCurrentTime(0)
        setIsPlaying(false)
    }


    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else  {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (!isMute) {
            audioRef.current.volume = 1;
            setVolume(1)
        } else  {
            audioRef.current.volume = 0;
            setVolume(0)
        }
    }, [isMute]);

    

  return (
    <div className='custom-audio-player'>
      <img src={image} className='audioplayer-image' />
      <audio ref={audioRef} src={audioSrc} />
      <p className='audio-btn' onClick={togglePlay} >{isPlaying ? <FaPause/>: <FaPlay/>}</p>
      <div className='duration-flex'>
        <p>{formatTime(currentTime)}</p>
        <input type='range' max={duration} value={currentTime} step={0.01} onChange={handleDuration} className='duration-range'/>
        <p>{formatTime(duration - currentTime)}</p>
        <p className='audio-btn' onClick={toggleMute}>{!isMute ? <FaVolumeUp/> : <FaVolumeMute/>}</p>

        <input type='range' value={volume} max={1} min={0} step={0.01} onChange={handleVolume} className='volume-range'/>
      </div>
    </div>
  )
}

export default AudioPlayer
