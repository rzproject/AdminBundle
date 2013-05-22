<?php

namespace Rz\AdminBundle\Helper;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Rz\AdminBundle\Helper\TemplateLoaderInterface;

class TemplateLoader implements TemplateLoaderInterface
{
    protected $templates    = array();

    /**
     * @param array $templates
     *
     * @return void
     */
    public function setTemplates(array $templates)
    {
        $this->templates = $templates;
    }

    /**
     * @return array
     */
    public function getTemplates()
    {
        return $this->templates;
    }

    /**
     * @param string $name
     *
     * @return null|string
     */
    public function getTemplate($name)
    {
        if (isset($this->templates[$name])) {
            return $this->templates[$name];
        }

        return null;
    }
}
