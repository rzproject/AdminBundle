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

interface TemplateLoaderInterface
{
    /**
     * @param array $templates
     *
     * @return void
     */
    public function setTemplates(array $templates);

    /**
     * @return array
     */
    public function getTemplates();

    /**
     * @param string $name
     *
     * @return null|string
     */
    public function getTemplate($name);
}
