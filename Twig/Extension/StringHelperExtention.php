<?php

/*
 * This file is part of the RzAdminBundle package.
 *
 * (c) mell m. zamora <mell@rzproject.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rz\AdminBundle\Twig\Extension;

class StringHelperExtention extends \Twig_Extension
{

    /**
     * Returns a list of functions to add to the existing list.
     *
     * @return array An array of functions
     */
    public function getFunctions()
    {
        return array(
            'rz_str_replace' => new \Twig_Function_Method($this, 'strReplace', array('is_safe' => array('html'))),
        );
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'rz_admin_template_loader';
    }

    /**
     * @param $search
     * @param $replace
     * @param $subject
     *
     * @internal param $name
     *
     * @return \Twig_TemplateInterface
     */
    public function strReplace($search , $replace , $subject )
    {
        return str_replace($search , $replace , $subject );
    }
}
