/**
 * @file
 * Defines the Editing plugin.
 */

/**
 * @module specialchars/SpecialcharsEditing
 */

import {Plugin} from 'ckeditor5/src/core';
import SpecialcharsCommand from "./command";

/**
 * The editing feature.
 *
 * It introduces the 'Specialchars' aspects in the model.
 *
 * @extends module:core/plugin~Plugin
 */
export default class SpecialcharsEditing extends Plugin {

  /**
   * @inheritDoc
   */
  init() {

    const editor = this.editor;

    // Attaching the command to the editor.
    editor.commands.add(
      'specialcharsCommand',
      new SpecialcharsCommand(editor),
    );

  }

}
