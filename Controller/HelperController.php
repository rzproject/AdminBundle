<?php

/*
 * This file is part of the RzAdminBundle package.
 *
 * (c) mell m. zamora <mell@rzproject.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rz\AdminBundle\Controller;

use Sonata\AdminBundle\Controller\HelperController as BaseHelperController;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PropertyAccess\PropertyPath;
use Symfony\Component\HttpFoundation\Request;
use Sonata\AdminBundle\Admin\Pool;
use Sonata\AdminBundle\Admin\AdminHelper;

class HelperController extends BaseHelperController
{
        /**
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException|\RuntimeException
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getShortObjectDescriptionAction(Request $request)
    {
        $code           = $request->get('code');
        $objectId       = $request->get('objectId');
        $uniqid         = $request->get('uniqid');
        $linkParameters = $request->get('linkParameters', array());

        $admin = $this->pool->getInstance($code);

        if (!$admin) {
            throw new NotFoundHttpException();
        }

        $admin->setRequest($request);

        if ($uniqid) {
            $admin->setUniqid($uniqid);
        }

        if (!$objectId){
            $objectId = null;
        }

        $object = $admin->getObject($objectId);

        if (!$object && 'html' == $request->get('_format')) {
            return new Response();
        }

        if ('json' == $request->get('_format')) {
            return new JsonResponse(array('result' => array(
                'id'    => $admin->id($object),
                'label' => $admin->toString($object)
            )));
        } elseif ('html' == $request->get('_format')) {
            return new Response($this->twig->render($admin->getTemplate('short_object_description'), array(
                'admin'           => $admin,
                'description'     => $admin->toString($object),
                'object'          => $object,
                'link_parameters' => $linkParameters
            )));
        } else {
            throw new \RuntimeException('Invalid format');
        }
    }
}
