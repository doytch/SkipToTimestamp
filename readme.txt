=== Plugin Name ===
Contributors: doytch
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=mark%2edeutsch%40utoronto%2eca&lc=US&item_name=Coffee%20Donation%20%3d%29&amount=10%2e00&currency_code=USD&button_subtype=services&bn=PP%2dBuyNowBF%3abtn_buynowCC_LG%2egif%3aNonHosted
Tags: audio, embed, html5, media, plugin, shortcode, video, youtube
Requires at least: 3.0.1
Tested up to: 4.9.13
Stable tag: 1.6.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Adds clickable links via shortcode or search-and-replace that skip to a time in a media player.

== Description ==

Skip to Timestamp allows two ways of generating links in your posts that automatically skip to a given time
in an embedded media element. You've seen it in the Youtube descriptions, now get it in your embeds!

To create a link, either:

* Use our [skipto] shortcode which takes a "time" (or "timestamp" or "ts") argument and uses that to create a link.
Eg, "Just wait until...or...hold on, you can [skipto time=4:30]skip to[/skipto] this part of the video!"
* Check the "Replace Timestamps Automatically" checkbox in the Settings > Skip to Timestamp, and watch as all your
timestamps in the form "4:30" or "1:23:45" are automatically converted into links.

If many media (audio, video, YouTube) exist in the same page, you can select among them:
[skipto time=4:30 media-id=2]skip to[/skipto]
For the 2nd media in the page (it is equivalent to the order in the page: 1st, 2nd...).

If the page contains a mix of media of different kind: audio, video or YouTube, you can select among them:
[skipto time=2:37 media-type="video"]2:37[/skipto]
[skipto time=5:56 media-id=2 media-type="audio"]5:56[/skipto]
[skipto time=13:05 media-id=4 media-type="video"]13:05[/skipto]
[skipto time=29:14 media-id=3 media-type="youtube"]29:14[/skipto]

A more convenient way to select a media is to refer to it using its URL. Media order is not robust to
changes (adding or moving a media).
[skipto time=5:56 url-media-contains="https://www.domain.com/path/myAudioFile.mp3" media-type="audio"]5:56[/skipto]
[skipto time=13:05 url-media-contains="https://www.domain.com/path/myVideoFile.mp3" media-type="video"]13:05[/skipto]
"url-media-contains" and "media-id" are not usable together.
It is not necessary to give the whole URL:
[skipto time=5:56 url-media-contains="myAudioFile.mp3" media-type="audio"]5:56[/skipto]
[skipto time=13:05 url-media-contains="myVideoFile.mp3" media-type="video"]13:05[/skipto]
Only a part of the URL may be enough, give the minimum necessary:
[skipto time=5:56 url-media-contains="path1/myAudioFile.mp3" media-type="audio"]5:56[/skipto]
[skipto time=5:56 url-media-contains="path2/myAudioFile.mp3" media-type="audio"]5:56[/skipto]

For the YouTube case, you may have some trouble with the following:
[skipto time=4:14 url-media-contains="https://www.youtube.com/watch?v=9ptyprXFPX0" media-type="youtube"]4:14[/skipto]
Instead prefer:
[skipto time=4:14 url-media-contains="9ptyprXFPX0" media-type="youtube"]4:14[/skipto]

The links search for and skip to a time in:

* Youtube videos embedded using Wordpress embeds. Make sure you're just pasting in the Youtube video link into your post editor and let WordPress embed things for you to ensure that the correct player is inserted into your post.
* HTML5 &lt;audio&gt; elements. Jetpack, Blubrry Powerpress and other plugins do this automatically using the [audio] shortcode.
* HTML5 &lt;video&gt; elements. Jetpack and other plugins do this automatically using the [video] shortcode.

== Installation ==

You don't really need to do anything special to install this plugin. Just:

1. Download using the button above, unzip and place the folder in your wp-content/plugins/ folder. Alternately,
install using Wordpress' built-in plugin installer.
1. Activate the plugin through the Plugins menu in WordPress
1. Configure settings via Settings > Skip to Timestamp. Automatic timestamp replacement is turned off by default.

== Frequently Asked Questions ==
= Will this work with ____ player? =
If it adds an &lt;audio&gt; or &lt;video&gt; tag, then maybe. The plugin uses the currentTime parameter of those elements
to set the location to skip to. If you open your browsers developer console and see a message saying
'Skip to Timestamp: No media player found!', then that player isn't currently supported. I'd like to help you
though, so please submit a request for that player on the Wordpress plugin page. It's the only way I know
which players to prioritise!

= Can I use both shortcodes and automatically-replaced timestamps? =
Yes, as long as you don't use both in the same post. Each post can contain either shortcodes OR timestamps to
auto-replace. If both are present, then timestamps will not be automatically replaced.

= It's not working! =
Please leave me a message with information about the media you embedded, how you tried to create the link, and what
browser and operating system you're running. If it's a bug, I'll get right to work on it!

== Screenshots ==
1. Timestamps in your posts can be automatically converted into links that jump to that time.
2. Control the text of the link by using our [skipto] shortcode.

== Changelog ==

= 1.6.0 =
* Add media selection using URL
* Bug fix: Unable to skip into another YouTube video once done in a given one.

= 1.5.0 =
* Add possibility to select a media when many of them of a given type (audio, video or YouTube) exist on the same page
* Add possibility to select among every existing media type in page (audio, video or YouTube)
* Fix bug with YouTube frame

= 1.4.4 = 
* Fixed bug with autolinks on timestamps.

= 1.4.1 =
* Switched links back to <a> from <span>

= 1.4 =
* Fixed issue where playbackRate wouldn't be preserved.
* Switched to dataset tags and global event handlers.
* Thanks Lewis Cowles for the pull request!

= 1.3 =
* Housekeeping

= 1.2 =
* Added ability to turn off automatic linking on a per-page basis.

= 1.1 =
* Support for older versions of WordPress

= 1.0 =
* Initial release
