import Ember from 'ember';
import get from 'ember-metal/get';
import { getKeyCode } from 'ember-keyboard';

export default Ember.Mixin.create({
  // Implement these two objects in your class
  // Key values are codes https://www.w3.org/TR/uievents-code/#code-value-tables

  keyboardKeys: {/*
    command1: ['KeyJ', 'ArrowDown'],
    command2: ['KeyK', 'ArrowUp']
  */},

  keyboardCommands: {/*
    command1: {
      keydown() {...},
      keyup() {...}
    },
    command2: {
      keydown() {...},
      keyup() {...}
    }
  */},

  keyDown(e) {
    if (this._triggerKeyboardCommand(e) === false) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
  keyUp(e) {
    this._triggerKeyboardCommand(e);
  },

  _triggerKeyboardCommand(e) {
    let keyboardKeys = get(this, 'keyboardKeys');
    let modifierPressed = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey;
    let propagateEvents = true;
    Object.keys(keyboardKeys).forEach(commandName => {
      if (keyboardKeys[commandName].map(getKeyCode).includes(e.which.toString()) && !modifierPressed) {
        let command = get(this, `keyboardCommands.${commandName}.${e.type}`);
        if (command) {
          // if you want to stopPropagation and preventDefault in a command,
          // you can return false, just like event handlers in jQuery.
          propagateEvents = command.call(this, e);
        }
      }
    });
    return propagateEvents;
  }
});
