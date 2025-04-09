/**
 * @file
 * Defines the FormView View class.
 */

/**
 * @module specialchars/ui/FormView
 */

import {
  ButtonView,
  LabeledFieldView,
  View,
  createLabeledInputText,
  submitHandler,
} from "ckeditor5/src/ui";
import { icons } from "ckeditor5/src/core";
import { default as TagView } from './tag.js';

/**
 * The FormView class.
 *
 * This view displays an editing form.
 *
 * @extends module:ui/view~View
 */
export default class FormView extends View {

  /**
   * @inheritDoc
   */
  constructor( ui, textFormatSettings ) {
    const locale = ui.editor.locale;
    super( locale );

    const symbols = textFormatSettings['chartable']
      .split( '\n' )
      .map( s => s.trim().split('|'))
      .filter( sym => sym.length == 3 )

    this.buttons = {};
    let i = 0;

    for (const symbol of symbols) {
      // Tools.
      this.buttons['sym_' + i] = this._createButton(
        symbol[0], null, ['button', 'form-submit'], symbol[2]
      );

      this.listenTo(this.buttons['sym_' + i], 'execute', () => {
        ui.editor.execute('specialcharsCommand', { code: symbol[1] })
        ui._hideUI();
      });

      i ++;
    }

    // Create the cancel button.
    this.cancelButtonView = this._createButton(
      'Cancel', icons.cancel, ['button', 'form-submit', 'ck-button-cancel']
    );

    this.childViewsCollection = this.createCollection([

      new TagView(this.locale, 'div', {
        attributes: {
          class: [],
          tabindex: '-1',
          style: 'margin: 5px 10px'
        },
        children: [
          new TagView(this.locale, 'strong', {
            text: 'Спец. символы',
          }),
        ]
      }),

      new TagView(this.locale, 'div', {
        attributes: {
          class: [],
          tabindex: '-1',
          style: 'margin: 5px; max-width: 250px; white-space: normal'
        },
        children: Object.values(this.buttons)
      }),

      new TagView(this.locale, 'div', {
        attributes: {
          class: [],
          tabindex: '-1',
          style: 'margin: 5px'
        },
        children: [
          this.cancelButtonView
        ]
      }),
    ]);

    this.setTemplate( {
      tag: 'form',
      attributes: {
        class: [ 'ck', 'ck-bbutton-link-form', 'ck-reset_all-excluded' ],
        // https://github.com/ckeditor/ckeditor5-image/issues/40
        tabindex: '-1'
      },
      children: this.childViewsCollection
    } );

  }

  /**
   * @inheritDoc
   */
  render() {
    super.render();

    // Submit the form when the user clicked the save button
    // or pressed enter in the input.
    submitHandler( {
      view: this
    } );
  }

  /**
   * Focus on the first form element.
   */
  focus() {
    // this.childViewsCollection.get(1).children.get(0).focus();
  }

  /**
   * Creates an input field.
   *
   * @param {string} label
   *   Input field label.
   * @param {object} options
   *   Options.
   *
   * @returns {module:ui/labeledfield/labeledfieldview~LabeledFieldView}
   *   The labeled field view class instance.
   *
   * @private
   */
  _createInput(label, options = {}) {
    const labeledFieldView = new LabeledFieldView(this.locale, createLabeledInputText);
    labeledFieldView.label = label;

    // Sets the required attribute when needed.
    if (options.required && options.required === true) {
      labeledFieldView.fieldView.extendTemplate({
        attributes: {
          required: true,
          class: ['form-text', 'form-element']
        }
      });
    }

    labeledFieldView.setTemplate({
      tag: 'div',
      attributes: {
        class: [ 'form-item' ],
      },
      children: [labeledFieldView.template]
    });

    return labeledFieldView;
  }

  /**
   * Creates button.
   *
   * @param {string} label
   *   Button label.
   * @param {module:ui/icon/iconview~IconView} icon
   *   Button icon.
   * @param {string} className
   *   HTML class.
   *
   * @returns {module:ui/button/buttonview~ButtonView}
   *   The button view class instance.
   *
   * @private
   */
  _createButton( label, icon, className, tooltip ) {
    const button = new ButtonView();

    button.set({
      label,
      icon,
      class: className,
      tooltip,
      withText: true
    });

    return button;
  }

}
