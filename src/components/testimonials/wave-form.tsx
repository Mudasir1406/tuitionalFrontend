"use client";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import WaveSurfer from "wavesurfer.js";
import { Box, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import user from "../../../public/assets/images/static/user.png";
import Image from "next/image";

interface WaveformProps {
  audio: string;
}

const Waveform: React.FC<WaveformProps> = ({ audio }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("0");

  useEffect(() => {
    if (!containerRef.current) return;
    const url =
      "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      barWidth: 2,
      barHeight: 1,
      cursorWidth: 0,
    });
    waveSurfer.load(url);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
    });

    waveSurfer.on("audioprocess", () => {
      setCurrentTime(waveSurfer.getCurrentTime().toFixed(0));
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

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
    waveSurferRef.current?.getDuration() || 0
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: { lg: "580px", md: "500px", sm: "450px", xs: "300px" },
        backgroundColor: "white",
        boxShadow:
          "0px -3px 8px 0px rgba(0, 0, 0, 0.15) inset, 0px 2px 1px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "100px",
        height: { xs: "65px", lg: "100px" },
        paddingX: { lg: "20px", md: "20px", sm: "10px", xs: "10px" },
      }}
    >
      <IconButton
        onClick={handlePlayPause}
        sx={{
          width: { xs: "50px", lg: "70px" },
          height: { xs: "50px", lg: "70px" },
          padding: 0,
          backgroundColor: "rgba(81, 184, 147, 1)",
          marginRight: "10px",
        }}
      >
        {isPlaying ? (
          <PauseIcon sx={styles.icon} />
        ) : (
          <PlayArrowIcon sx={styles.icon} />
        )}
      </IconButton>
      <Typography sx={styles.time}>
        {formattedCurrentTime}/{formattedDuration}
      </Typography>
      <Box ref={containerRef} sx={{ flex: 1, marginRight: "10px" }} />
      <Box
        sx={{
          width: { xs: "50px", lg: "70px" },
          height: { xs: "50px", lg: "70px" },
          borderRadius: "35px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={user.src}
          style={styles.image}
          width={user.width}
          height={user.height}
          alt="User"
        />
      </Box>
    </Box>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
};

export default Waveform;

const styles = {
  image: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: "white",
  },
  time: {
    fontFamily: "League Spartan",
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "16px",
    },
    fontWeight: 500,
    lineHeight: {
      xs: "20px",
      sm: "20px",
      md: "23px",
      lg: "23px",
    },
    marginRight: "10px",
  },
};
