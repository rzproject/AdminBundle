<?php

/*
 * This file is part of the RzAdminBundle package.
 *
 * (c) mell m. zamora <mell@rzproject.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rz\AdminBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Rz\AdminBundle\DependencyInjection\Compiler\TemplateCompilerPass;
use Rz\AdminBundle\DependencyInjection\Compiler\OverrideCompilerPass;

class RzAdminBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'SonataAdminBundle';
    }

    /**
     * {@inheritDoc}
     */
    public function build(ContainerBuilder $container)
    {
        //$container->addCompilerPass(new TemplateCompilerPass());
        $container->addCompilerPass(new OverrideCompilerPass());
    }
}
