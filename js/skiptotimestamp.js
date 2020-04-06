var STT = {
    settings: STTSettings,
    media: undefined,
    skipTo: undefined,
    isHTML5: false,
    isYoutube: false,
    youtubeFrames: [],

    doHTML5Skip: function() {
        STT.doHTML5Clear();
        STT.media.currentTime = STT.skipTo;
        STT.media.play();
    },

    doYoutubeSkip: function() {
        STT.doYoutubeClear();
        STT.media.seekTo(STT.skipTo);
        STT.media.playVideo();
    },

    doHTML5Clear: function() {
        STT.media.removeEventListener("canplaythrough", STT.doHTML5Skip);
    },

    doYoutubeClear: function() {
    }
};

STTSkipTo = function(time, mediaId, mediaType, urlMediaUsed, urlMediaContains) {
    var audio       = document.getElementsByTagName("audio"),
        video       = document.getElementsByTagName("video"),
        iframe      = document.getElementsByTagName("iframe"),
        timeArray   = time.split(":").reverse(),
        seconds     = parseInt(timeArray[0]),
        minutes     = timeArray.length > 1 ? parseInt(timeArray[1]) : 0,
        hours       = timeArray.length > 2 ? parseInt(timeArray[2]) : 0;

    STT.skipTo = seconds + (minutes * 60) + (hours * 3600);

    if (STT.media) {
        STT.doClear();
    }
    
    const doAudio = (mediaType !== "video" && mediaType !== "youtube") && (parseInt(STT.settings.link_audio) && audio.length);
    const doVideo = (mediaType !== "audio" && mediaType !== "youtube") && (parseInt(STT.settings.link_video) && video.length);
    const doYoutube = (mediaType !== "audio" && mediaType !== "video") && (parseInt(STT.settings.link_youtube && iframe.length));

    if (doAudio || doVideo)
    {
        STT.doClear = STT.doHTML5Clear;

        if (doAudio) {
            if (mediaId > audio.length) {
                mediaId = audio.length;
            }
            if (urlMediaUsed) {
                for (var i_a = 0; i_a < audio.length; i_a++) {
                    var audioURL = audio[i_a].currentSrc;
                    if (audioURL.includes(urlMediaContains)) {
                        mediaId = i_a + 1;
                        break;
                    }
                }
            }
            STT.media = audio[mediaId - 1];
        } else {
            if (mediaId > video.length) {
                mediaId = video.length;
            }
            if (urlMediaUsed) {
                for (var i_v = 0; i_v < video.length; i_v++) {
                    var videoURL = video[i_v].currentSrc;
                    if (videoURL.includes(urlMediaContains)) {
                        mediaId = i_v + 1;
                        break;
                    }
                }
            }
            STT.media = video[mediaId - 1];
        }

        var playbackRate = STT.media.playbackRate;
        STT.media.addEventListener("canplaythrough", STT.doHTML5Skip);
        STT.media.load();
        STT.media.playbackRate = playbackRate;
        STT.media.play();
        return;
    } else if (doYoutube) {
        // Search last youtube frame
        var lastYoutubeFrameIndex = 1;
        for (var j = 0; j < iframe.length; j++) {
            if (iframe[j].src.search("youtube") !== -1) {
                lastYoutubeFrameIndex = j + 1;
            }
        }
        if (mediaId > lastYoutubeFrameIndex) {
            mediaId = lastYoutubeFrameIndex;
        }
        var foundYoutubeIndex = 0;
        if (urlMediaUsed) {
            for (var i_y = 0; i_y < iframe.length; i_y++) {
                if (iframe[i_y].src.search("youtube") !== -1) {
                    foundYoutubeIndex++;
                    if (iframe[i_y].src.includes(urlMediaContains)) {
                        mediaId = foundYoutubeIndex;
                        break;
                    }
                }
            }
        }
        // Inspect the iframes, looking for a src with youtube in the URI
        foundYoutubeIndex = 0;
        for (var i = 0; i < iframe.length; i++) {
            if (iframe[i].src.search("youtube") !== -1) {
                foundYoutubeIndex++;
                if (mediaId !== foundYoutubeIndex) {
                    continue;
                }
                
                // Set up the JS interface
                STT.doClear = STT.doYoutubeClear;

                var frameId = "stt-youtube-player_".concat(i.toString());
                if (iframe[i].id) {
                    STT.media = STT.youtubeFrames[i];
                    STT.doYoutubeSkip();
                } else {
                    iframe[i].id = frameId;
                    STT.media = new YT.Player(frameId, {
                        events: {
                            onReady: STT.doYoutubeSkip
                        }
                    });
                    STT.youtubeFrames[i] = STT.media;
                }
                return;
            }
        }
    }

    console.log("Skip to Timestamp: No media player found!");
    return;
};

// Listen to all clicks on the document
document.addEventListener("click", function (event) {
    var elem = event.target;
    // If the event target doesn't match bail
    if (!elem.hasAttribute("data-stt-time")) {
        return;
    }
    const mediaIdAttribute = "media-id";
    var media_id = 1;
    if (elem.hasAttribute(mediaIdAttribute)) {
        const mediaIdAttr = elem.getAttribute(mediaIdAttribute);
        var parsed = parseInt(mediaIdAttr, 10);
        if (!isNaN(parsed)) {
            if (parsed > 0) {
                media_id = parsed;
            }
        }
    }
    const urlMediaContainsAttribute = "url-media-contains";
    var urlMediaContains = "";
    var urlMediaUsed = false;
    if (elem.hasAttribute(urlMediaContainsAttribute)) {
        urlMediaContains = elem.getAttribute(urlMediaContainsAttribute);
        urlMediaUsed = true;
    }
    const mediaTypeAttribute = "media-type";
    var mediaType = "unset";
    if (elem.hasAttribute(mediaTypeAttribute)) {
        const mediaTypeAttr = elem.getAttribute(mediaTypeAttribute);
        if (mediaTypeAttr === "audio" || mediaTypeAttr === "video" || mediaTypeAttr === "youtube") {
            mediaType = mediaTypeAttr;
        }
    }
    var time = elem.getAttribute("data-stt-time");
    STTSkipTo(time, media_id, mediaType, urlMediaUsed, urlMediaContains);
}, false);
