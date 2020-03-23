var STT = {
	settings: STTSettings,
	media: undefined,
	skipTo: undefined,
	isHTML5: false,
	isYoutube: false,

	doHTML5Skip: function() {
		STT.media.removeEventListener('canplaythrough', STT.doHTML5Skip);
		STT.media.currentTime = STT.skipTo;
		STT.media.play();
	},

	doYoutubeSkip: function() {
		STT.media.seekTo(STT.skipTo);
		STT.media.playVideo();
	}

};

STTSkipTo = function(time, mediaId, mediaType) {
	var audio 		= document.getElementsByTagName('audio'),
		video 		= document.getElementsByTagName('video'),
		iframe      = document.getElementsByTagName('iframe'),
		timeArray 	= time.split(':').reverse(),
		seconds 	= parseInt(timeArray[0]),
		minutes   	= timeArray.length > 1 ? parseInt(timeArray[1]) : 0,
		hours	 	= timeArray.length > 2 ? parseInt(timeArray[2]) : 0;

	STT.skipTo = seconds + (minutes * 60) + (hours * 3600);

	if (STT.media) {
		STT.doSkip();
		return;
	}
	
	const doAudio = (mediaType !== 'video' && mediaType !== 'youtube') && (parseInt(STT.settings.link_audio) && audio.length);
	const doVideo = (mediaType !== 'audio' && mediaType !== 'youtube') && (parseInt(STT.settings.link_video) && video.length);
	const doYoutube = (mediaType !== 'audio' && mediaType !== 'video') && (parseInt(STT.settings.link_youtube && iframe.length));

	if (doAudio || doVideo)
	{
		STT.doSkip = STT.doHTML5Skip;

		if (doAudio) {
		    if (mediaId > audio.length) {
		        mediaId = audio.length;
		    }
			STT.media = audio[mediaId - 1];
		} else {
		    if (mediaId > video.length) {
		        mediaId = video.length;
		    }
			STT.media = video[mediaId - 1];
		}

		var playbackRate = STT.media.playbackRate;
		STT.media.addEventListener('canplaythrough', STT.doHTML5Skip);
		STT.media.load();
		STT.media.playbackRate = playbackRate;
		STT.media.play();
		return;
	} else if (doYoutube) {
	    // Search last youtube frame
	    var lastYoutubeFrameIndex = 1;
	    for (var j = 0; j < iframe.length; j++) {
			if (iframe[j].src.search('youtube') !== -1) {
			    lastYoutubeFrameIndex = j + 1;
			}
	    }
	    if (mediaId > lastYoutubeFrameIndex) {
	        mediaId = lastYoutubeFrameIndex;
	    }
		// Inspect the iframes, looking for a src with youtube in the URI
		for (var i = 0; i < iframe.length; i++) {
			if (iframe[i].src.search('youtube') !== -1) {
		        var foundYoutubeIndex = i + 1;
		        if (mediaId !== foundYoutubeIndex) {
		            continue;
		        }
			    
				// Set up the JS interface
				STT.doSkip = STT.doYoutubeSkip;

				iframe[i].id = 'stt-youtube-player';
				STT.media = new YT.Player('stt-youtube-player', {
					events: {
						onReady: STT.doYoutubeSkip
					}
				});
				return;
			}
		}
	}

	console.log('Skip to Timestamp: No media player found!');
	return;
}

// Listen to all clicks on the document
document.addEventListener('click', function (event) {
    var elem = event.target;
	// If the event target doesn't match bail
	if (!elem.hasAttribute('data-stt-time')) {
	    return;
    }
    var media_id = 1;
    if (elem.hasAttribute('media-id')) {
        const media_id_attr = elem.getAttribute('media-id');
        var parsed = parseInt(media_id_attr, 10);
        if (!isNaN(parsed)) {
            if (parsed > 0) {
                media_id = parsed;
            }
        }
    }
    var media_type = 'unset';
    if (elem.hasAttribute('media-type')) {
        const media_type_attr = elem.getAttribute('media-type');
        if (media_type_attr === 'audio' || media_type_attr === 'video' || media_type_attr === 'youtube') {
            media_type = media_type_attr;
        }
    }
	var time = elem.getAttribute('data-stt-time');
    STTSkipTo(time, media_id, media_type);
}, false);
