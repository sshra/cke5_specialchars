/**
 * @file
 * Defines the Command plugin.
 */

import { Command } from 'ckeditor5/src/core';

/**
 * The specialchars command.
 *
 * @extends module:core/command~Command
 */
export default class SpecialcharsCommand extends Command {

  /**
   * @inheritDoc
   */
  refresh() {
    // Toolbar button is always enabled.
    this.isEnabled = true;
  }

  /**
   * @inheritDoc / options: { code: TEXT-TO-INSERT }
   */
  execute(options = {} ) {
    const textData = options.code || '';

    const editor = this.editor;
    const { model } = editor;

    model.change((writer) => {
      const selection = model.document.selection;
      const position = selection.getFirstPosition();

      writer.insertText( this._decodeHtmlEntities(textData), position);
    });
  }

  // Функция для декодирования HTML-сущностей
  _decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

}
