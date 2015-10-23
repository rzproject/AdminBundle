<?php

/*
 * This file is part of the RzAdminBundle package.
 *
 * (c) mell m. zamora <mell@rzproject.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rz\AdminBundle\Form\Type\Filter;

use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Translation\TranslatorInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class DateTimeRangeType extends AbstractTypeExtension
{
    const TYPE_BETWEEN = 1;
    const TYPE_NOT_BETWEEN = 2;

    protected $translator;

    /**
     * @param \Symfony\Component\Translation\TranslatorInterface $translator
     */
    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * {@inheritDoc}
     */
    public function getExtendedType()
    {
        return 'sonata_type_filter_datetime_range';
    }

    /**
     * {@inheritDoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $choices = array(
            self::TYPE_BETWEEN    => $this->translator->trans('label_date_type_between', array(), 'SonataAdminBundle'),
            self::TYPE_NOT_BETWEEN    => $this->translator->trans('label_date_type_not_between', array(), 'SonataAdminBundle'),
        );

        $settings = $options['operator_options'] ? array_merge(array('choices' => $choices, 'required' => false), $options['operator_options']) :  array('choices' => $choices, 'required' => false);



        $builder
            ->add('type', 'choice', $settings)
            ->add('value', 'sonata_type_datetime_range', array('field_options_start' => array('widget'         => 'single_text',
                                                                                          'format'         => 'MMMM dd, yyyy HH:mm',
                                                                                          'date_format'         => 'MMMM dd, yyyy',
                                                                                          'picker_enable' =>true,
                                                                                          'picker_settings'    => array('data-date-format'=>'MM dd, yyyy hh:ii'),
                                                                                          'picker_container_class' => 'span5',
                                                                                          'error_bubbling'     => false)))
        ;
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        if ($options['widget'] == 'single_text') {
            $view->vars['picker_enable'] = array_key_exists('picker_enable', $options) ? $options['picker_enable'] : true;

            if ($view->vars['picker_enable']) {
                $view->vars['attr']['readonly'] = 'readonly';
                $view->vars['picker_use_js_init'] = (array_key_exists('picker_use_js_init', $options)) ? $options['picker_use_js_init'] : false;

                if ($view->vars['picker_use_js_init']) {
                    $view->vars['picker_class_attr'] =  $this->mergePickerAttr($options, true);
                    $view->vars['picker_options'] = array_key_exists('picker_class_attr', $options) ? array_merge($options['picker_options'], array('autoclose'=>true)) : array('weekStart'=>0, 'viewMode'=>0, 'minViewMode'=>0, 'autoclose'=>true);
                } else {
                    $view->vars['picker_class_attr'] = $this->mergePickerAttr($options);
                }

                $view->vars['picker_settings'] =  $options['picker_settings'];

                $view->vars['picker_container_class'] =  $options['picker_container_class'];
            }

        }
    }

    /**
     * {@inheritDoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $optionalOptions = array('picker_settings', 'picker_enable', 'picker_options', 'picker_use_js_init', 'picker_class_attr', 'picker_container_class');

        if (method_exists($resolver, 'setDefined')) {
            $resolver->setDefined($optionalOptions);
        } else {
            // To keep Symfony <2.6 support
            $resolver->setOptional($optionalOptions);
        }

        $resolver->setDefaults(array(
            'widget'         => 'single_text',
            'field_type'       => 'sonata_type_datetime_range',
            'field_options'    => array('date_format' => 'yyyy-MM-dd'),
            'operator_type'    => 'choice',
            'operator_options' => array(),
            'picker_settings'    => array('data-date-format'=>'MM dd, yyyy hh:ii'),
            'picker_container_class' => 'span5',
        ));
    }

    protected function mergePickerAttr($pickerAttr, $isCustom = false)
    {
        if (array_key_exists('picker_class_attr', $pickerAttr)) {
            $class = implode(array_merge(array('input-append', 'datetime'), $pickerAttr['picker_class_attr']),' ');
        } else {
            $class = 'input-append date';
        }

        return array('class'=>$class.sprintf(" %s", $isCustom ? 'rz-custom-datetimepicker' : 'rz-datetimepicker'));
    }
}
