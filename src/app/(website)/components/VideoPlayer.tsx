// src/components/VideoPlayer.tsx
"use client";
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        playing={true}
        muted={true}
        className='react-player'
        url={url}
        width='100%'
        height='100%'
        controls={false}
      />
    </div>
  )
}

export default VideoPlayer
