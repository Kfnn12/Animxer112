import { memo } from "react"
import Artplayer from "../Components/ArtPlayer"
import "../css/ArtPlayer.css"

function VideoPlayer({
    videoUrl,
    download,
    quality
}) {

    return (
        <Artplayer
            option={{
                setting: true,
                muted: false,
                autoplay: false,
                pip: true,
                autoSize: true,
                autoMini: true,
                screenshot: true,
                loop:true,
                flip: true,
                playbackRate: true,
                aspectRatio: true,
                fullscreen: true,
                fullscreenWeb: true,
                subtitleOffset: false,
                miniProgressBar: true,
                mutex: true,
                backdrop: true,
                playsInline: true,
                volume: 1,
                airplay: true,
                autoPlayback: true,
                theme: '#2196F3',
                quality: quality.map((q) => ({
                    html: `${q.quality}`,
                    url: `${q.url}`,
                })),
                controls: [
                    {
                        position: 'right',
                        html: '<i class="fa-solid fa-download"></i>',
                        index: 1,
                        tooltip: 'Download',
                        style: {
                            marginRight: '0px',
                        },
                        click: function () {
                            window.open(download)
                        },
                    },
                ],

                lang: navigator.language.toLowerCase(),
                whitelist: ["*"],
                moreVideoAttr: {
                    crossOrigin: "anonymous",
                },

            }}
            style={{
                width: '600px',
                height: '400px',
                margin: '60px auto 0',
            }}
            videoUrl={videoUrl}
        />
    )
}

export default memo(VideoPlayer)