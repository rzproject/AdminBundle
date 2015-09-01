<?php

/*
 * This file is part of the RzAdminBundle package.
 *
 * (c) mell m. zamora <mell@rzproject.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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

        # Replace SonataAdmin Templates
        $container->setParameter('sonata.admin.configuration.templates', $config['templates']);

        # Merge RzFieldTypeBundle to RzAdminBundle
        $container->setParameter('twig.form.resources',
                                 array_merge(
                                     $container->getParameter('twig.form.resources'),
                                     array('RzAdminBundle:Form:form_admin_fields.html.twig')
                                 ));

        $this->configureClassesToCompile();
    }

    public function configureClassesToCompile()
    {
        $this->addClassesToCompile(array(
            "Rz\\AdminBundle\\Form\\DataTransformer\\ModelsToChoicesTransformer",
            "Rz\\AdminBundle\\Form\\Type\\ModelType",
            "Rz\\AdminBundle\\Form\\Type\\TranslatableChoiceType",
            "Rz\\AdminBundle\\Form\\Type\\TreeType",
            "Rz\\AdminBundle\\Form\\Type\\Filter\\ChoiceType",
            "Rz\\AdminBundle\\Form\\Type\\Filter\\DateRangeType",
            "Rz\\AdminBundle\\Form\\Type\\Filter\\DateTimeRangeType",
            "Rz\\AdminBundle\\Form\\Type\\Filter\\DateTimeType",
            "Rz\\AdminBundle\\Form\\Type\\Filter\\DateType",
            "Rz\\AdminBundle\\Form\\Type\\Filter\\DefaultType",
            "Rz\\AdminBundle\\Form\\Type\\Filter\\NumberType",
            "Rz\\AdminBundle\\Helper\\TemplateLoaderInterface",
            "Rz\\AdminBundle\\Helper\\TemplateLoader",
            "Rz\\AdminBundle\\Twig\\Extension\\RzAdminListExtension",
            "Rz\\AdminBundle\\Twig\\Extension\\StringHelperExtention",
            "Rz\\AdminBundle\\Twig\\Extension\\TemplateLoaderExtension"
        ));
    }
}
