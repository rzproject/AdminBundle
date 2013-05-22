<?php

namespace Rz\AdminBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class RzAdminExtension extends Extension
{
    /**
     * {@inheritDoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('templates.xml');
        $loader->load('utils.xml');
        $loader->load('twig.xml');
        $loader->load('form_type.xml');
        $loader->load('core.xml');
        $container->setParameter('rz_admin.configuration.templates', $config['templates']);
        //replace
        $container->setParameter('sonata.admin.configuration.templates', $config['templates']);

        // merge RzFieldTypeBundle to RzAdminBundle
        $container->setParameter('twig.form.resources',
                                 array_merge(
                                     $container->getParameter('twig.form.resources'),
                                     array('RzAdminBundle:Form:form_admin_fields.html.twig')
                                 ));

    }
}
