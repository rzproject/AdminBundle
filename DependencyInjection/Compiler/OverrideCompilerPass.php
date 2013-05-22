<?php

namespace Rz\AdminBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;

class OverrideCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritDoc}
     */
    public function process(ContainerBuilder $container)
    {
        //override TextBlockService
        $admin_pool = $container->getDefinition('sonata.admin.pool');
        $admin_pool->addMethodCall('setTemplates', array($container->getParameter('rz_admin.configuration.templates')));

        $admin_controller = $container->getDefinition('sonata.admin.controller.admin');
        $admin_controller->setClass($container->getParameter('rz_admin.controller.admin.class'));

        $classes = array(
            'email'    => 'span8',
            'textarea' => 'span8',
            'text'     => 'span8',
            'choice'   => 'span8',
            'integer'  => 'span8',
            'datetime' => 'sonata-medium-date',
            'date'     => 'sonata-medium-date'
        );

        $container->getDefinition('sonata.admin.form.extension.field')->replaceArgument(0, $classes);
    }
}
