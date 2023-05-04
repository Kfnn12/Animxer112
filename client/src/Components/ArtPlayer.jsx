import { useEffect, useRef, memo } from "react"
import Artplayer from "artplayer"
import Hls from "hls.js"

function ArtPlayer({
	option,
	getInstance,
	subtitles,
	videoUrl,
	intro,
	selectedSub,
	...rest
}) {
	const artRef = useRef()

	useEffect(() => {
		if (videoUrl[0].url.includes(".mp4")) {
			const art = new Artplayer({
				...option,
				url: videoUrl[0].url,
				container: artRef.current,
			})
			return () => {
				if (art && art.destroy) {
					art.destroy(false)
				}
			}
		} else {
			function playM3u8(video, url, art) {
				if (Hls.isSupported()) {
					const hls = new Hls()
					hls.loadSource(url)
					hls.attachMedia(video)
					hls.once(Hls.Events.MANIFEST_PARSED, function (event, data) {
						hls.startLevel = -1
					})
					// optional
					art.hls = hls
					art.once("url", () => hls.destroy())
					art.once("destroy", () => hls.destroy())
				} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
					video.src = url
				} else {
					art.notice.show = "Unsupported playback format: m3u8"
				}
			}

	

			const art = new Artplayer({
				...option,
				url:  videoUrl[0].url,
				type: "m3u8",
				customType: {
					m3u8: playM3u8,
				},
				container: artRef.current,
			})
			return () => {
				if (art && art.destroy) {
					art.destroy(false)
				}
			}
		}
	}, [option, selectedSub, subtitles, videoUrl, intro, getInstance])

	return (
		<div
			ref={artRef}
			{...rest}
		></div>
	)
}

export default memo(ArtPlayer)