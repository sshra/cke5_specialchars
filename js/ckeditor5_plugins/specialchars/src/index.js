/**
 * @file
 * Defines the Specialchars plugin.
 */

/**
 * @module specialchars/Specialchars
 */

import { Plugin } from 'ckeditor5/src/core';
import SpecialcharsEditing from './editing';
import SpecialcharsUI from './ui';

/**
 * The Specialchars plugin.
 *
 * This is a "glue" plugin that loads
 *
 * @extends module:core/plugin~Plugin
 */
class Specialchars extends Plugin {

  /**
   * @inheritdoc
   */
  static get requires() {
    return [SpecialcharsEditing, SpecialcharsUI];
  }

  /**
   * @inheritdoc
   */
  static get pluginName() {
    return 'plugSpecialchars';
  }

}

export default {
  Specialchars,
};
