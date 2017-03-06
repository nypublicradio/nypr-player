# nypr-player

## New York Public Radio Audio Player

[![npm version](https://img.shields.io/npm/v/nypr-player.svg?style=flat-square)](https://www.npmjs.com/package/nypr-player) [![CircleCI](https://img.shields.io/circleci/project/github/nypublicradio/nypr-player/master.svg?style=flat-square)](https://circleci.com/gh/nypublicradio/nypr-player)

## What is this?

This is the audio player you may have seen on such sites as [wnyc.org](http://wnyc.org), now available for your use.

![on demand](screenshots/wnyc-player.png "Player on WNYC")

## Install

```shell
ember install nypr-player
```

## Prerequisites

This addon assumes you're using [ember-hifi](http://github.com/nypublicradio/ember-hifi) as your audio service (I mean, why wouldn't you be?)

## Basic Usage

Put this in your CSS:

```css
$nypr-player-primary-color    : #FFF;
$nypr-player-background-color : #333;
$nypr-player-accent-color     : #128cf4;

@import "nypr-player";
```

And something like this in your handlebars template: `currentTitle` is what the Play/Pause button uses as a tooltip, and `backdropImageUrl` is optional.

```javascript
{{#nypr-player currentTitle=currentTitle backdropImageUrl=backdropImageUrl as |content|}}
  {{#content.for 'trackInfo'}}
    {{! put your track info here}}
  {{/content.for}}

  {{#content.for 'streamInfo'}}
    {{! put your stream info here (only shows up when the audio source is a stream)}}
  {{/content.for}}

  {{#content.for 'aux' as |args|}}
    {{! auxillary area. This is where WNYC puts their queue button, and chances are you probably will too.}}

    {{args.queueButton
        queueLength  = queueLength
        showModal    = (action 'showQueueModal')
        closeModal   = (action 'closeQueueModal')
        isOpenModal  = queueModal }}
  {{/content.for}}
{{/nypr-player}}
```

## Content Areas

The content areas you saw above show up like this.

![on demand](screenshots/on-demand.png "Player when playing an on-demand audio source")

![live stream](screenshots/streaming.png "Player when playing a streaming audio source")

## Breakpoints

You may need to use these breakpoints to reformat your content areas for different sizes.

#### Sass Variables
```css
$nypr-player-medium-breakpoint  : 801;
$nypr-player-medium-and-up      : "(min-width: #{$nypr-player-medium-breakpoint}px)";
$nypr-player-small-only         : "(max-width: #{$nypr-player-medium-breakpoint - 1}px)";
```

#### Ember Responsive

If you're using [ember-responsive](https://github.com/freshbooks/ember-responsive), you might want to do something like this in your `breakpoints.js` file:

```javascript
import Ember from 'ember';
import nyprPlayerBreakpoints from 'nypr-player/breakpoints';

export default Ember.assign({
  // your breakpoints
}, nyprPlayerBreakpoints);
```

This will add two new values: `nyprPlayerSmallOnly` and `nyprPlayerMediumAndUp`.

## Additional Customization

If modifying the three main CSS variables (`$nypr-player-primary-color`, `$nypr-player-background-color`, and `$nypr-player-accent-color`) doesn't quite get your player looking the way you want it to, you may also define these variables in the same way:

```css
$nypr-player-zindex                          : 1200 !default;
$nypr-player-backdrop-zindex                 : -1 !default;
$nypr-player-background-image-opacity        : 0.5;

$nypr-player-floating-queue-button-background: $nypr-player-background-color !default;
$nypr-player-button-color                    : $nypr-player-primary-color !default;
$nypr-player-button-hover-color              : rgba($nypr-player-primary-color, 0.8) !default;
$nypr-player-button-active-color             : $nypr-player-accent-color !default;
$nypr-player-slider-handle-color             : $nypr-player-accent-color;

$nypr-player-info-text-color                 : $nypr-player-primary-color !default;
$nypr-player-link-underline-color            : $nypr-player-accent-color !default;
$nypr-player-timelabel-color                 : $nypr-player-primary-color !default;
$nypr-player-timelabel-total-color           : rgba($nypr-player-primary-color, 0.6);

$nypr-player-backdrop-color                  : rgba($nypr-player-background-color, 0.75) !default;
$nypr-player-progress-played-color           : $nypr-player-accent-color !default;
$nypr-player-progress-downloaded-color       : rgba($nypr-player-primary-color, 0.7) !default;
$nypr-player-spinner-primary-color           : rgba($nypr-player-primary-color, 0.5) !default;
$nypr-player-spinner-accent-color            : rgba($nypr-player-primary-color, 0.8) !default;
```
