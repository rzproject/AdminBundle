<?php
namespace Rz\AdminBundle\Form\Type\Filter;

use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Translation\TranslatorInterface;

use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ChoiceType extends AbstractTypeExtension
{
    const TYPE_CONTAINS = 1;

    const TYPE_NOT_CONTAINS = 2;

    const TYPE_EQUAL = 3;

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
        return 'sonata_type_filter_choice';
    }

    /**
     * {@inheritDoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $choices = array(
            self::TYPE_CONTAINS        => $this->translator->trans('label_type_contains', array(), 'SonataAdminBundle'),
            self::TYPE_NOT_CONTAINS    => $this->translator->trans('label_type_not_contains', array(), 'SonataAdminBundle'),
            self::TYPE_EQUAL           => $this->translator->trans('label_type_equals', array(), 'SonataAdminBundle'),
        );

        $settings = $options['operator_options'] ? array_merge(array('choices' => $choices, 'required' => false), $options['operator_options']) :  array('choices' => $choices, 'required' => false);
        $builder
            ->add('type', 'choice', $settings)
            ->add('value', $options['field_type'], array_merge(array('required' => false), $options['field_options']))
        ;
    }

    /**
     * {@inheritDoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
                                   'field_type'       => 'choice',
                                   'field_options'    => array(),
                                   'operator_type'    => 'choice',
                                   'operator_options' => array(),
                               ));
    }
}
