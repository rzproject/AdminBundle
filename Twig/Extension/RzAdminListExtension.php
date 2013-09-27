<?php

namespace Rz\AdminBundle\Twig\Extension;

use Doctrine\Common\Util\ClassUtils;
use Sonata\AdminBundle\Admin\FieldDescriptionInterface;
use Sonata\AdminBundle\Exception\NoValueException;
use Sonata\AdminBundle\Admin\Pool;

class RzAdminListExtension extends \Twig_Extension
{
    /**
     * @var \Twig_Environment
     */
    protected $environment;

    /**
     * @var Pool
     */
    protected $pool;

    /**
     * @param Pool $pool
     */
    public function __construct(Pool $pool)
    {
        $this->pool = $pool;
    }

    /**
     * {@inheritdoc}
     */
    public function initRuntime(\Twig_Environment $environment)
    {
        $this->environment = $environment;
    }

    /**
     * {@inheritDoc}
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('rz_list_element_header', array($this, 'renderListElementHeader')),
        );
    }

    /**
     * {@inheritDoc}
     */
    public function getTokenParsers()
    {
        return array();
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'rz_admin_list';
    }

    /**
     * @param FieldDescriptionInterface $fieldDescription
     * @param string                    $defaultTemplate
     *
     * @return \Twig_TemplateInterface
     */
    protected function getTemplate(FieldDescriptionInterface $fieldDescription, $defaultTemplate)
    {
        $templateName = $fieldDescription->getAdmin()->getTemplate('rz_list_field_header') ? : $defaultTemplate;

        try {
            $template = $this->environment->loadTemplate($templateName);
        } catch (\Twig_Error_Loader $e) {
            $template = $this->environment->loadTemplate($defaultTemplate);
        }

        return $template;
    }

    /**
     * render a list element from the FieldDescription
     *
     * @param mixed                     $object
     * @param FieldDescriptionInterface $fieldDescription
     * @param array                     $params
     *
     * @return string
     */
    public function renderListElementHeader(FieldDescriptionInterface $fieldDescription, $params = array())
    {

        $template = $this->environment->loadTemplate($fieldDescription->getAdmin()->getTemplate('rz_list_field_header'));


        return $template->render(array_merge($params, array(
                                                 'admin'             => $fieldDescription->getAdmin(),
                                                 'field_description' => $fieldDescription)));



//        return $this->output($fieldDescription, $template, array_merge($params, array(
//            'admin'             => $fieldDescription->getAdmin(),
//            'field_description' => $fieldDescription
//        )));
    }

//    /**
//     * @param FieldDescriptionInterface $fieldDescription
//     * @param \Twig_TemplateInterface   $template
//     * @param array                     $parameters
//     *
//     * @return string
//     */
//    public function output(FieldDescriptionInterface $fieldDescription, \Twig_TemplateInterface $template, array $parameters = array())
//    {
//        $content = $template->render($parameters);
//
//        if ($this->environment->isDebug()) {
//            return sprintf("\n<!-- START  \n  fieldName: %s\n  template: %s\n  compiled template: %s\n -->\n%s\n<!-- END - fieldName: %s -->",
//                $fieldDescription->getFieldName(),
//                $fieldDescription->getTemplate(),
//                $template->getTemplateName(),
//                $content,
//                $fieldDescription->getFieldName()
//            );
//        }
//
//        return $content;
//    }
}
