<?php

/*
 * This file is part of the RzAdminBundle package.
 *
 * (c) mell m. zamora <mell@rzproject.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rz\AdminBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;

class TemplateCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritDoc}
     */
    public function process(ContainerBuilder $container)
    {
        foreach ($container->findTaggedServiceIds('sonata.admin') as $id => $tags) {
                $definition = $container->getDefinition($id);
                $this->fixTemplates($container, $definition);
        }
    }

    /**
     * @param  \Symfony\Component\DependencyInjection\ContainerBuilder $container
     * @param  \Symfony\Component\DependencyInjection\Definition       $definition
     * @return void
     */
    public function fixTemplates(ContainerBuilder $container, Definition $definition)
    {
        $defaultTemplates = $container->getParameter('sonata.admin.configuration.templates');
        $definedTemplates = array_merge($defaultTemplates, $container->getParameter('rz_admin.configuration.templates'));

        $methods = array();
        $pos = 0;

        //override all current sonata admin with the Rz Templates
        foreach ($definition->getMethodCalls() as $method) {
            if ($method[0] == 'setTemplates') {
                $definedTemplates = array_merge($definedTemplates, $method[1][0]);
                continue;
            }

            if ($method[0] == 'setTemplate') {
                $definedTemplates[$method[1][0]] = $method[1][1];
                continue;
            }

            $methods[$pos] = $method;
            $pos++;
        }
        $definition->setMethodCalls($methods);
        $definition->addMethodCall('setTemplates', array($definedTemplates));
    }
}
