<?php

/*
 * This file is part of the RzAdminBundle package.
 *
 * (c) mell m. zamora <mell@rzproject.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rz\AdminBundle\Form\Type;

use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;

use Symfony\Component\Form\Extension\Core\ChoiceList\ChoiceListInterface;
use Symfony\Component\Form\Extension\Core\ChoiceList\ChoiceList;
use Sonata\AdminBundle\Form\EventListener\MergeCollectionListener;
use Sonata\AdminBundle\Form\ChoiceList\ModelChoiceList;
use Sonata\AdminBundle\Form\DataTransformer\ModelsToArrayTransformer;
use Sonata\AdminBundle\Form\DataTransformer\ModelToIdTransformer;

/**
 * This type define a standard select input with a + sign to add new associated object
 *
 */
class ModelType extends AbstractTypeExtension
{
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars['btn_add'] = $options['btn_add'];
        $view->vars['btn_list'] = $options['btn_list'];
        $view->vars['btn_delete'] = $options['btn_delete'];
        $view->vars['btn_catalogue'] = $options['btn_catalogue'];

        //* TODO: enable via config
        if (!$options['expanded'] && $options['multiple']) {
            $view->vars['select2'] = $options['select2'];
            //enable selectpicker by default
            if ($view->vars['select2']) {
                $view->vars['selectpicker_enabled'] = false;
            } elseif ($options['multiselect_enabled']) {
                $view->vars['selectpicker_enabled'] = false;
            } elseif ($options['multiselect_search_enabled']) {
                $view->vars['selectpicker_enabled'] = false;
            } else {
                $view->vars['selectpicker_enabled'] = $options['selectpicker_enabled'] ? $options['selectpicker_enabled'] : true;
            }
        }
    }

    /**
     * {@inheritDoc}
     *
     * @todo Remove it when bumping requirements to SF 2.7+
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $this->configureOptions($resolver);
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {

        $optionalOptions = array('selectpicker_enabled',
            'selectpicker_data_style',
            'selectpicker_title',
            'selectpicker_selected_text_format',
            'selectpicker_show_tick',
            'selectpicker_data_width',
            'selectpicker_data_size',
            'selectpicker_disabled',
            'selectpicker_dropup',
            'select2',
            'chosen_data_placeholder',
            'chosen_no_results_text',
            'multiselect_enabled',
            'multiselect_search_enabled',
        );

        if (method_exists($resolver, 'setDefined')) {
            $resolver->setDefined($optionalOptions);
        } else {
            // To keep Symfony <2.6 support
            $resolver->setOptional($optionalOptions);
        }

        $resolver->setDefaults(array(
            'compound'          => function (Options $options) {
                if (isset($options['multiple']) && $options['multiple']) {
                    if (isset($options['expanded']) && $options['expanded']) {
                        //checkboxes
                        return true;
                    }

                    //select tag (with multiple attribute)
                    return false;
                }

                if (isset($options['expanded']) && $options['expanded']) {
                    //radio buttons
                    return true;
                }

                //select tag
                return false;
            },
            'select2' => false,
            'selectpicker_enabled' => false,
            'multiselect_enabled' => false,
            'multiselect_search_enabled' => false,
            'error_bubbling'=> true,
            'template'          => 'choice',
            'multiple'          => false,
            'expanded'          => false,
            'model_manager'     => null,
            'class'             => null,
            'property'          => null,
            'query'             => null,
            'choices'           => null,
            'preferred_choices' => array(),
            'btn_add'           => 'link_add',
            'btn_list'          => 'link_list',
            'btn_delete'        => 'link_delete',
            'btn_catalogue'     => 'SonataAdminBundle',
            'choice_list'       => function (Options $options, $previousValue) {
                if ($previousValue instanceof ChoiceListInterface && count($choices = $previousValue->getChoices())) {
                    return $previousValue;
                }
                return new ModelChoiceList(
                    $options['model_manager'],
                    $options['class'],
                    $options['property'],
                    $options['query'],
                    $options['choices']
                );
            }
        ));
    }

    /**
     * {@inheritDoc}
     */
    public function getExtendedType()
    {
        return 'sonata_type_model';
    }
}
