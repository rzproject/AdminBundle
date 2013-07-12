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

use Rz\AdminBundle\Helper\TemplateLoaderInterface;

class TemplateLoaderExtension extends \Twig_Extension
{
    /**
     * @var \Twig_Environment
     */
    protected $environment;

    /**
     * @var \Rz\AdminBundle\Helper\TemplateLoaderInterface
     */
    protected $loader;

    /**
     * @param \Rz\AdminBundle\Helper\TemplateLoaderInterface $loader
     */
    public function __construct(TemplateLoaderInterface $loader)
    {
        $this->loader = $loader;
    }

    /**
     * {@inheritdoc}
     */
    public function initRuntime(\Twig_Environment $environment)
    {
        $this->environment = $environment;
    }

    /**
     * Returns a list of functions to add to the existing list.
     *
     * @return array An array of functions
     */
    public function getFunctions()
    {
        return array(
             new \Twig_SimpleFunction('rz_admin_get_template', array($this, 'getTemplate')),
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
     * @param $name
     *
     * @throws \Exception|\Twig_Error_Loader
     * @return \Twig_TemplateInterface
     */
    public function getTemplate($name)
    {
        $templateName = $this->loader->getTemplate($name);
        try {
            $template = $this->environment->loadTemplate($templateName);
        } catch (\Twig_Error_Loader $e) {
            throw $e;
        }

        return $template;
    }
}
