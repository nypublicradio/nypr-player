# nypr-player Changelog

## 0.4.4
- [ENHANCEMENT] Update ember-hifi to 1.19.0

## 0.4.3
- [BUGFIX] Update component invocation (from `(component 'nypr-player.queue-button')` to `(component 'nypr-player/queue-button')` and referenced version of `ember-holygrail-layout` so this addon works in newer ember versions.

## 0.4.2
- [BUGFIX] Update Circle config so Cypress tests pass

## 0.4.1
- [ENHANCEMENT] Use more accessible nypr-ui ^0.5.0

## 0.4.0
- [ENHANCEMENT] Fastboot compatibility

## 0.3.0
- [FEATURE] analytics upgrade

## 0.2.3
- [BUGFIX] update styles to fix NewSounds Safari 10 player issue. see https://jira.wnyc.org/browse/RT-906 and https://github.com/nypublicradio/nypr-player/tree/bscharenberg/RT-906

## 0.2.2
- [BIGFIX] fix player controls in iOS10

## 0.2.1
- [CHORE] loosen in house deps

## 0.2.0
- [CHORE] upgrade to Ember 3.0 and new module syntax

## 0.1.2
- [CHORE] upgrade `ember-hifi`

## 0.1.1
- [CHORE] upgrade ember holygrail layout

## 0.1.0
- [CHORE] Upgrade ember-cli and ember source
- [ENHANCEMENT] Adds docs site
- [ENHANCEMENT] Make fixed positioning optional with `freestanding` param
- [ENHANCEMENT] Only import the parts of `nypr-ui` that we actually use. this should drastically reduce the size of the bundled CSS
- [FEATURE] Adds a static dev server that sets the correct response headers on dummy audio

## 0.0.6
- [CHORE] bump nypr-ui

## 0.0.5
- [BUGFIX] wire up variable for progress player color

## 0.0.4

- [CHORE] adds changelog :/
- [CHORE] versions nypr-ui
