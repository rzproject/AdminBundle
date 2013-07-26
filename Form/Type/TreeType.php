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

use Symfony\Component\Form\Extension\Core\ChoiceList\SimpleChoiceList;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Sonata\NewsBundle\Model\CategoryManagerInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;


class TreeType extends AbstractType
{

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars['current'] = $options['current'] ?: null;
        $view->vars['tree_enabled'] = $options['tree_enabled'] ?: null;
        $view->vars['expanded'] = $options['expanded'] ?: null;
    }

    /**
     * {@inheritDoc}
     */
    public function getParent()
    {
        return 'sonata_type_model';
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
//        $that = $this;

        $resolver->setDefaults(
            array(
                'expanded' => true,
                'current' => null,
                'tree_enabled' => true,
//                'choice_list' => function (Options $opts, $previousValue) use ($that) {
//                    return new SimpleChoiceList($that->getChoices($opts));
//                },
            ));
    }

    /**
     * @param Options $options
     *
     * @return array
     */
//    public function getChoices(Options $options)
//    {
//        $categories = $this->manager->fetchCategories();
//        $choices = array();
//        foreach ($categories as $category) {
//            $choices[$category->getId()] = $category;
//        }
//        return $choices;
//    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'rz_type_tree';
    }
}
