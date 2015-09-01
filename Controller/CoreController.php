<?php

/*
 * This file is part of the Sonata package.
 *
 * (c) Thomas Rabaix <thomas.rabaix@sonata-project.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rz\AdminBundle\Controller;

use Sonata\AdminBundle\Admin\AdminInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sonata\AdminBundle\Controller\CoreController as BaseController;
use Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class CoreController.
 *
 * @author  Thomas Rabaix <thomas.rabaix@sonata-project.org>
 */
class CoreController extends BaseController
{

    /**
     * @param Request $request
     *
     * @return Response
     */
    public function dashboardAction(Request $request)
    {
        $response = parent::dashboardAction($request);
        $response->headers->set('X-Frame-Options', 'ALLOW-FROM: *.google.com');
        $response->headers->set('Content-Security-Policy', "default-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' *.google.com *.googleapis.com *.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com *.google.com *.gstatic.com; font-src 'self' 'unsafe-inline' *.google.com *.googleapis.com *.gstatic.com; frame-src 'self' 'unsafe-inline' *.google.com *.googleapis.com; img-src 'self' data: 'unsafe-inline'  *.gstatic.com *.google.com *.googleapis.com ");

        return $response;
    }
}
