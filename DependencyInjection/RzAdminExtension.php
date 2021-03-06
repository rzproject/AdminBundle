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
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('core.xml');

        #set options
        $container->setParameter('rz.admin.options.use_footable', $config['options']['use_footable']);
        #pool class
        if (isset($config['pool']['base_admin_class'])) {
            $container->setParameter('rz.admin.pool.base_admin.class', $config['pool']['base_admin_class']);
        }

        #pool class
        if (isset($config['footable_settings'])) {
            $container->setParameter('rz.admin.settings.footable', $config['footable_settings']);
        }

        $this->configureClassesToCompile();
    }

    public function configureClassesToCompile()
    {
        $this->addClassesToCompile(array(
            'Rz\\AdminBundle\\Admin\\Pool'
        ));
    }
}
