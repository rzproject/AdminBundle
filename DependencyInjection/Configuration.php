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

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;
use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;

/**
 * This is the class that validates and merges configuration from your app/config files
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritDoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $node = $treeBuilder->root('rz_admin');
        $this->addAdminServices($node);
        $this->addAdminTemplates($node);

        return $treeBuilder;
    }

    /**
     * @param \Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition $node
     *
     * @return void
     */
    private function addAdminServices(ArrayNodeDefinition $node)
    {
        $node
            ->children()
                ->arrayNode('admin_services')
                    ->useAttributeAsKey('id')
                    ->prototype('array')
                        ->children()
                            ->scalarNode('model_manager')->end()
                            ->scalarNode('form_contractor')->end()
                            ->scalarNode('show_builder')->end()
                            ->scalarNode('list_builder')->end()
                            ->scalarNode('datagrid_builder')->end()
                            ->scalarNode('translator')->end()
                            ->scalarNode('configuration_pool')->end()
                            ->scalarNode('router')->end()
                            ->scalarNode('validator')->end()
                            ->scalarNode('security_handler')->end()
                            ->scalarNode('label')->end()
                        ->end()
                    ->end()
                ->end()
            ->end();
    }

    /**
     * @param \Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition $node
     *
     * @return void
     */
    private function addAdminTemplates(ArrayNodeDefinition $node)
    {
        $node
            ->children()
                ->arrayNode('templates')
                        ->addDefaultsIfNotSet()
                        ->children()
                            //some will directly include sonata admin templates
                            ->scalarNode('user_block')->defaultValue('RzUserBundle:Admin/Core:user_block.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('layout')->defaultValue('RzAdminBundle::standard_layout.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('ajax')->defaultValue('RzAdminBundle::ajax_layout.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('dashboard')->defaultValue('SonataAdminBundle:Core:dashboard.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('list')->defaultValue('SonataAdminBundle:CRUD:list.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('show')->defaultValue('SonataAdminBundle:CRUD:show.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('edit')->defaultValue('SonataAdminBundle:CRUD:edit.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('preview')->defaultValue('SonataAdminBundle:CRUD:preview.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('history')->defaultValue('SonataAdminBundle:CRUD:history.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('history_revision')->defaultValue('SonataAdminBundle:CRUD:history_revision.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('action')->defaultValue('RzAdminBundle:CRUD:action.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('list_block')->defaultValue('SonataAdminBundle:Block:block_admin_list.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('short_object_description')->defaultValue('SonataAdminBundle:Helper:short-object-description.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('delete')->defaultValue('SonataAdminBundle:CRUD:delete.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('batch')->defaultValue('SonataAdminBundle:CRUD:list__batch.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('batch_confirmation')->defaultValue('SonataAdminBundle:CRUD:batch_confirmation.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('inner_list_row')->defaultValue('SonataAdminBundle:CRUD:list_inner_row.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('base_list_field')->defaultValue('SonataAdminBundle:CRUD:base_list_field.html.twig')->cannotBeEmpty()->end()
                            /*********************************
                             * rzAdmin Added Templates
                             *********************************/
                            //** table items */
                            ->scalarNode('rz_base_list_inner_row_header')->defaultValue('RzAdminBundle:CRUD:base_list_inner_row_header.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_list_inner_row_header')->defaultValue('RzAdminBundle:CRUD:list_inner_row_header.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_base_list_field_header')->defaultValue('RzAdminBundle:CRUD:base_list_field_header.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_list_field_header')->defaultValue('RzAdminBundle:CRUD:list_field_header.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_base_list_batch_header')->defaultValue('RzAdminBundle:CRUD:base_list_batch_header.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_list_batch_header')->defaultValue('RzAdminBundle:CRUD:list_batch_header.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_base_list_select_header')->defaultValue('RzAdminBundle:CRUD:base_list_select_header.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_list_select_header')->defaultValue('RzAdminBundle:CRUD:list_select_header.html.twig')->cannotBeEmpty()->end()
                            // table actions and other components
                            ->scalarNode('rz_list_table_footer')->defaultValue('RzAdminBundle:CRUD:list_table_footer.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_list_table_batch')->defaultValue('RzAdminBundle:CRUD:list_table_batch.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_list_table_download')->defaultValue('RzAdminBundle:CRUD:list_table_download.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_list_table_pager')->defaultValue('RzAdminBundle:CRUD:list_table_pager.html.twig')->cannotBeEmpty()->end()
                            ->scalarNode('rz_list_table_per_page')->defaultValue('RzAdminBundle:CRUD:list_table_per_page.html.twig')->cannotBeEmpty()->end()
                        ->end()
                    ->end()
                ->end()
            ->end();
    }
}
