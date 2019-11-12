## Basic Usage

This addon exposes a `nypr-player` component that provides a UI to a loaded audio file. The user can provide metadata and inject additional controls into available UI regions.

There are two ways to get a piece of audio into the player interface: you can pass in an argument at render time or you can use the provided `hifi` service to manually load a pice of audio.

### Passing in a piece of audio via template argument
The `nypr-player` component accepts a `sound` parameter which can be a string or a Promise which resolves to a string.


<DocsDemo as |demo|>
  <demo.example>

    <!-- BEGIN-SNIPPET player-example.hbs -->
    {{nypr-player
      sound='https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/bl/bl051914bpod.mp3'
      freestanding=true
    }}
    <!-- END-SNIPPET -->
  </demo.example>

  <demo.snippet @name='player-example.hbs' @label='Usage'/>
  <demo.snippet @name='nypr-player.hbs' @label='nypr-player.hbs'/>
  <demo.snippet @name='nypr-player.js' @label='nypr-player.js'/>
</DocsDemo>





### Manually loading audio using the `hifi` service
If you don't want to show the player immediately or need to otherwise get the player playing from outside its template context, you can use the `hifi` service to manually give it a sound object.

Maybe you've got a play button somewhere that you want to trigger the player. This would do it.

{{#play-button
  onPlay=(action (mut showPlayer) true)
  url='https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/bl/bl051914bpod.mp3'
}}
  open player and play audio
{{/play-button}}

{{#if showPlayer}}
  {{nypr-player freestanding=true}}
{{/if}}
