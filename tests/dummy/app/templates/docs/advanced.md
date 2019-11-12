## Advanced Usage

Here's a more sophisticated usage of the player.

* `currentTitle` is what the Play/Pause button uses as a tooltip
* `backdropImageUrl` is blurred and stretched across the background of the player
{{#nypr-player
  freestanding=true
  sound=model.sound
  currentTitle=model.title
  backdropImageUrl=model.imageURL
  isAudiostream=isAudiostream
    as |content|}}
  {{#content.for "trackInfo"}}
    {{!
      This appears on the top line of the player's info space
    }}
    <a href={{model.url}}>{{model.title}}</a>
  {{/content.for}}

  {{#content.for "streamInfo"}}
    {{!
      This space is intended to expose additional metadata about an audio stream.
      If the currently playing sound is not determined to be an audio stream,
      then the progress scrubber will be rendered instead.
    }}
    {{model.streamInfo}}
  {{/content.for}}

  {{#content.for "aux" as |args|}}
    {{! auxillary area. This is where WNYC puts their queue button, and chances are you probably will too.}}

    {{args.queueButton
        queueLength  = queueLength
        isOpenModal  = queueModal }}
  {{/content.for}}
{{/nypr-player}}

<p>
  <button {{action (mut isAudiostream) (not isAudiostream)}}>Toggle stream metadata</button>
</p>

### Content Areas

The content areas you saw above show up like this.

[on demand](/assets/screenshots/on-demand.png \"Player when playing an on-demand audio source\")

[live stream](/assets/screenshots/streaming.png \"Player when playing a streaming audio source\")
