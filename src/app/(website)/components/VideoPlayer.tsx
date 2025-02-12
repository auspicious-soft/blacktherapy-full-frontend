// src/components/VideoPlayer.tsx
"use client";
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface VideoPlayerProps {
  url: string;
  muted?: boolean;
  controls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, muted = true, controls = false }) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        playing={true}
        muted={muted}
        className='react-player'
        url={url}
        width='100%'
        height='100%'
        controls={controls}
        config={{
          file: {
            attributes: {
              playsInline: true,
            },
          },
        }}
      />
    </div>
  )
}

export default VideoPlayer
