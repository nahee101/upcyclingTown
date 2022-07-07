import YouTube from 'react-youtube';

const VideoItem = ({video}) => {

    const opts = {
        height: '240',
        width: '426',
        playerVars: {
            autoplay: 0,
        }
    };
    
    const onReady = (e) => {
        e.target.pauseVideo();
    }

    console.log(video.id.videoId)
    return (
        <>
            <YouTube videoId={video.id.videoId} opts={opts} onReady={onReady} />
        </>
    )
};

export default VideoItem;