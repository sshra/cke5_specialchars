<?php

namespace Drupal\specialchars\Plugin\CKEditor5Plugin;

use Drupal\ckeditor5\Plugin\CKEditor5PluginConfigurableInterface;
use Drupal\ckeditor5\Plugin\CKEditor5PluginConfigurableTrait;
use Drupal\ckeditor5\Plugin\CKEditor5PluginDefault;
use Drupal\Core\Form\FormStateInterface;
use Drupal\editor\EditorInterface;

/**
 * CKEditor 5 Specialchars plugin configuration.
 *
 * @internal
 *   Plugin classes are internal.
 */
class Specialchars extends CKEditor5PluginDefault implements CKEditor5PluginConfigurableInterface {

  use CKEditor5PluginConfigurableTrait;

  const T_CONTEXT = ['context' => 'specialchars module'];

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form['chartable'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Define special chars', [], self::T_CONTEXT),
      '#description' => $this->t('One line - one char definition. Each line defines label|code|description. Where label is a button label, code is a html entity code like \'&amp;plusmn;\' or \'&amp;#9668;\', and description is a full symbol name.', [], self::T_CONTEXT),
      '#default_value' => $this->configuration['chartable'],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateConfigurationForm(array &$form, FormStateInterface $form_state) {
    ;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['chartable'] = $form_state->getValue('chartable');
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'chartable' => <<<___table___
π|&pi;|Symbol PI
_|&nbsp;|Non-breakable space
°|&deg;|Symbol Degree
___table___
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getDynamicPluginConfig(array $static_plugin_config, EditorInterface $editor): array {
    return [
      'specialchars' => $this->configuration,
    ];
  }

}
