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

class DateTimeType extends AbstractTypeExtension
{
    const TYPE_GREATER_EQUAL = 1;

    const TYPE_GREATER_THAN = 2;

    const TYPE_EQUAL = 3;

    const TYPE_LESS_EQUAL = 4;

    const TYPE_LESS_THAN = 5;

    const TYPE_NULL = 6;

    const TYPE_NOT_NULL = 7;

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
        return 'sonata_type_filter_datetime';
    }

    /**
     * {@inheritDoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $choices = array(
            self::TYPE_EQUAL            => $this->translator->trans('label_date_type_equal', array(), 'SonataAdminBundle'),
            self::TYPE_GREATER_EQUAL    => $this->translator->trans('label_date_type_greater_equal', array(), 'SonataAdminBundle'),
            self::TYPE_GREATER_THAN     => $this->translator->trans('label_date_type_greater_than', array(), 'SonataAdminBundle'),
            self::TYPE_LESS_EQUAL       => $this->translator->trans('label_date_type_less_equal', array(), 'SonataAdminBundle'),
            self::TYPE_LESS_THAN        => $this->translator->trans('label_date_type_less_than', array(), 'SonataAdminBundle'),
            self::TYPE_NULL             => $this->translator->trans('label_date_type_null', array(), 'SonataAdminBundle'),
            self::TYPE_NOT_NULL         => $this->translator->trans('label_date_type_not_null', array(), 'SonataAdminBundle'),
        );

        $settings = $options['operator_options'] ? array_merge(array('choices' => $choices, 'required' => false), $options['operator_options']) :  array('choices' => $choices, 'required' => false);
        $builder
            ->add('type', 'choice', $settings)
            ->add('value', 'datetime', array_merge(array('required' => false), $options['field_options']))
        ;
    }

    /**
     * {@inheritDoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'field_type'       => 'datetime',
            'field_options'    => array('date_format' => 'yyyy-MM-dd'),
            'operator_type'    => 'choice',
            'operator_options' => array(),
        ));
    }
}
