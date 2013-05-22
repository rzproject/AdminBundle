<?php


namespace Rz\AdminBundle\Form\Type\Filter;

use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\FormBuilderInterface;

use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class DefaultType extends AbstractTypeExtension
{
    /**
     * {@inheritDoc}
     */
    public function getExtendedType()
    {
        return 'sonata_type_filter_default';
    }

    /**
     * {@inheritDoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $settings = $options['operator_options'] ? array_merge(array('required' => false), $options['operator_options']) :  array('required' => false);
        $builder
            ->add('type', $options['operator_type'], $settings)
            ->add('value', $options['field_type'], array_merge(array('required' => false), $options['field_options']))
        ;
    }

    /**
     * {@inheritDoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'operator_type'    => 'hidden',
            'operator_options' => array(),
            'field_type'       => 'text',
            'field_options'    => array()
        ));
    }
}
