<?php

namespace Rz\AdminBundle\Form\Type;

use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;

/**
 * This type define a standard select input with a + sign to add new associated object
 *
 */
class ModelType extends AbstractTypeExtension
{

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        //* TODO: enable via config
        if (!$options['expanded'] && $options['multiple']) {
            $view->vars['chosen_enabled'] = $options['chosen_enabled'];
            //enable selectpicker by default
            if ($view->vars['chosen_enabled']) {
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
     */
//    public function buildForm(FormBuilderInterface $builder, array $options)
//    {
//        if (!$options['expanded'] && $options['multiple']) {
//            $builder
//                ->addEventSubscriber(new MergeCollectionListener($options['model_manager']))
//                ->addViewTransformer(new ModelsToChoicesTransformer($options['choice_list']), true);
//        }
//    }

    /**
     * {@inheritDoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setOptional(array('selectpicker_enabled',
                                     'selectpicker_data_style',
                                     'selectpicker_title',
                                     'selectpicker_selected_text_format',
                                     'selectpicker_show_tick',
                                     'selectpicker_data_width',
                                     'selectpicker_data_size',
                                     'selectpicker_disabled',
                                     'selectpicker_dropup',
                                     'chosen_enabled',
                                     'chosen_data_placeholder',
                                     'chosen_no_results_text',
                                     'multiselect_enabled',
                                     'multiselect_search_enabled',
                                    )
                                );
        $resolver->setDefaults(array('compound' => function (Options $options) {
                                                        return isset($options['expanded']) ? ($options['expanded'] ? true: false) : false;
                                     },
                                     'chosen_enabled' => false,
                                     'selectpicker_enabled' => false,
                                     'multiselect_enabled' => false,
                                     'multiselect_search_enabled' => false,
                                     'error_bubbling'=> true
                               )
        );
    }

    /**
     * {@inheritDoc}
     */
    public function getExtendedType()
    {
        return 'sonata_type_model';
    }
}
