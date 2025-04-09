/**
 * @file
 * Defines the UI plugin.
 */

/**
 * @module specialchars/SpecialcharsUI
 */

import { Plugin } from 'ckeditor5/src/core';
import FormView from './ui/formview';
import {
  ButtonView,
  ContextualBalloon
} from 'ckeditor5/src/ui';
import Icon from '../../../icons/special-btn.svg';

/**
 * The UI plugin. It introduces the button and the forms.
 *
 * It uses the
 * {@link module:ui/panel/balloon/contextualballoon~ContextualBalloon contextual balloon plugin}.
 *
 * @extends module:core/plugin~Plugin
 */
export default class SpecialcharsUI extends Plugin {

  /**
   * @inheritDoc
   */
  static get requires() {
    return [ ContextualBalloon ];
  }

  /**
   * @inheritDoc
   */
  init() {
    // Create the balloon.
    this._balloon = this.editor.plugins.get( ContextualBalloon );
    this.formView = this._createFormView();
    this.isVisible = false;
    this._addToolbarButtons();
  }

/**
   * Creates the form view.
   *
   * @returns {FormView}
   *   The form view instance.
   *
   * @private
   */
  _createFormView() {
    // The FormView defined in src/ui/formview.js
    const textFormatSettings = this.editor.config.get('specialchars')
    const formView = new FormView(this, textFormatSettings);

    this.listenTo(formView.cancelButtonView, 'execute', () => {
      this._hideUI();
    });

    return formView;
  }

  /**
   * Adds the {@link #FormView} to the balloon and sets the form values.
   *
   * @private
   */
  _addFormView() {

    if (this._balloon.hasView(this.formView)) {
      this._balloon.remove(this.formView);
    }

    this._balloon.add({
      view: this.formView,
      position: this._getBalloonPositionData(),
      balloonClassName: 'specialchars_balloon',
    });

//    this.editor.execute('specialcharsCommand', { mode: 'on' });

    // Reset the focus to the first form element.
    this.formView.focus();
  }


  /**
   * Shows the UI.
   *
   * @private
   */
  _showUI() {
    this.isVisible = true;
    this._addFormView();
  }


  /**
   * Hide the UI.
   *
   * @private
   */
  _hideUI() {
    this.isVisible = false;
    const formView = this.formView;

     if (this._balloon.hasView(formView)) {
      this._balloon.remove(formView);
    }

    // Focus the editing view after closing the form view.
    this.editor.editing.view.focus();
  }

  /**
   * Adds the toolbar buttons.
   *
   * @private
   */
  _addToolbarButtons() {
    this._register_button();
  }

  /**
   * Special Chars button
   */
  _register_button() {
    const editor = this.editor;

    editor.ui.componentFactory.add('specialchars', (locale) => {
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t('Special Chars Button'),
        icon: Icon,
        tooltip: true
      });

      // Bind button to the command.
      // The state on the button depends on the command values.
      const command = editor.commands.get('specialcharsCommand');
      buttonView.bind( 'isEnabled' ).to( command, 'isEnabled' );
      buttonView.bind( 'isOn' ).to( command, 'value', value => !!value );

      // On tool button click.
      this.listenTo(buttonView, 'execute', () => {
        if (this.isVisible) {
          this._hideUI();
        } else {
          this._showUI();
        }
      });

      return buttonView;
    });
  }

  /**
   * Gets balloon position.
   *
   * @returns {{target: (function(): *)}}
   *
   * @private
   */
  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;

    // Set a target position by converting view selection range to DOM.
    target = () => view.domConverter.viewRangeToDom(
      viewDocument.selection.getFirstRange()
    );

    return {
      target
    };
  }

}
