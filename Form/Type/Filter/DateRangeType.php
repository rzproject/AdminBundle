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

use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class DateRangeType extends AbstractTypeExtension
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
        return 'sonata_type_filter_date_range';
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
            ->add('value', 'sonata_type_date_range', array('field_options' => $options['field_options']))
        ;
    }

    /**
     * {@inheritDoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'field_type'       => 'sonata_type_date_range',
            'field_options'    => array('format' => 'yyyy-MM-dd'),
            'operator_type'    => 'choice',
            'operator_options' => array(),
        ));
    }
}
