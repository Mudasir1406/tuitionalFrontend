"use client";

import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import user from "../../../public/assets/images/static/user.png";

interface WaveformProps {
  audio: string;
  image: string;
}

const Waveform: React.FC<WaveformProps> = ({ audio, image }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("0");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudioUrl = async () => {
      const storage = getStorage();
      const audioRef = ref(storage, audio);
      const url = await getDownloadURL(audioRef);
      setAudioUrl(url);
    };
    if (audio) fetchAudioUrl();
  }, [audio]);

  useEffect(() => {
    if (!audioUrl || !containerRef.current) return;

    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      barWidth: 2,
      barHeight: 0.5,
      cursorWidth: 0,
    });
    waveSurfer.load(audioUrl);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
    });
    waveSurfer.on("audioprocess", () => {
      setCurrentTime(waveSurfer.getCurrentTime().toFixed(0));
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
      setIsPlaying(waveSurferRef.current.isPlaying());
    }
  };

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0
      ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      : `${m}:${s.toString().padStart(2, "0")}`;
  };

  const formattedCurrentTime = formatTime(Number(currentTime));
  const formattedDuration = formatTime(
    waveSurferRef.current?.getDuration() || 0,
  );

  return (
    <div
      className="flex h-[65px] w-[300px] items-center rounded-[100px] bg-white px-[10px] shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)] sm:w-[450px] md:w-[500px] lg:h-[100px] lg:w-[580px] lg:px-5"
    >
      <button
        type="button"
        onClick={handlePlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="me-[10px] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-success p-0 lg:h-[70px] lg:w-[70px]"
      >
        {isPlaying ? (
          <Pause className="text-white" />
        ) : (
          <Play className="text-white" />
        )}
      </button>
      <span className="me-[10px] text-[12px] font-medium leading-[20px] sm:text-[14px] sm:leading-[20px] md:text-[16px] md:leading-[23px] lg:text-[16px] lg:leading-[23px]">
        {formattedCurrentTime}/{formattedDuration}
      </span>
      <div ref={containerRef} className="me-[10px] flex-1" />
      <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full lg:h-[70px] lg:w-[70px]">
        <Image
          src={image || user.src}
          width={user.width}
          height={user.height}
          alt="User"
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default Waveform;
