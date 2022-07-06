import YouTube from 'react-youtube';

const VideoItem = ({video}) => {

    const opts = {
        height: '360',
        width: '640',
        playerVars: {
            autoplay: 1,
        }
    };
    
    const onReady = (e) => {
        // access to player in all event handlers via event.target
        e.target.pauseVideo();
    }

    return (
        <>
            <YouTube videoId={video.id} opts={opts} onReady={onReady} />
        </>
    )
};

export default VideoItem;