<?php

/*
 * This file is part of the RzAdminBundle package.
 *
 * (c) mell m. zamora <mell@rzproject.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rz\AdminBundle\Helper;

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
        $this->templates = array_merge($this->templates, $templates);
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
