SkipToTimestamp
===============

http://wordpress.org/plugins/skip-to-timestamp/

Skip to Timestamp allows two ways of generating links in your posts that automatically skip to a given time
in an embedded media element. You've seen it in the Youtube descriptions, now get it in your embeds!

To create a link, either:

* Use our [skipto] shortcode which takes a "time" (or "timestamp" or "ts") argument and uses that to create a link.
Eg, "Just wait until...or...hold on, you can [skipto time=4:30]skip to[/skipto] this part of the video!"
* Check the "Replace Timestamps Automatically" checkbox in the Settings > Skip to Timestamp, and watch as all your
timestamps in the form "4:30" or "1:23:45" are automatically converted into links.

The links search for and skip to a time in:

* Youtube videos embedded using Wordpress embeds.
* HTML5 &lt;audio&gt; elements. Jetpack, Blubrry Powerpress and other plugins do this automatically using the [audio] shortcode.
* HTML5 &lt;video&gt; elements. Jetpack and other plugins do this automatically using the [video] shortcode.

##Installation##

You don't really need to do anything special to install this plugin. Just:

1. Download using the button above, unzip and place the folder in your wp-content/plugins/ folder. Alternately,
install using Wordpress' built-in plugin installer.
1. Activate the plugin through the Plugins menu in WordPress
1. Configure settings via Settings > Skip to Timestamp. Automatic timestamp replacement is turned off by default.
