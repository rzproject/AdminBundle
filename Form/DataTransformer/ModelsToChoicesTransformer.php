<?php

/*
 * This file is part of the RzAdminBundle package.
 *
 * (c) mell m. zamora <mell@rzproject.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rz\AdminBundle\Form\DataTransformer;

use Symfony\Component\Form\Exception\UnexpectedTypeException;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Symfony\Component\Form\DataTransformerInterface;

use Sonata\AdminBundle\Form\ChoiceList\ModelChoiceList;

class ModelsToChoicesTransformer implements DataTransformerInterface
{
    protected $choiceList;

    /**
     * @param \Sonata\AdminBundle\Form\ChoiceList\ModelChoiceList $choiceList
     */
    public function __construct(ModelChoiceList $choiceList)
    {
        $this->choiceList = $choiceList;
    }

//    /**
//     * {@inheritDoc}
//     */
//    public function transform($collection)
//    {
//        if (null === $collection) {
//            return array();
//        }
//
//        $array = array();
//
//        if (count($this->choiceList->getIdentifier()) > 1) {
//
//            // load all choices
//            $availableEntities = $this->choiceList->getEntities();
//
//            foreach ($collection as $entity) {
//                // identify choices by their collection key
//                $key = array_search($entity, $availableEntities);
//                $array[$key] = (string) $entity;
//            }
//        } else {
//            foreach ($collection as $entity) {
//                $array[] = $entity;
//            }
//        }
//
//        return $array;
//    }

    public function transform($collection)
    {
        if (null === $collection) {
            return array();
        }

        $array = array();

        if (count($this->choiceList->getIdentifier()) > 1) {
            // load all choices
            $availableEntities = $this->choiceList->getEntities();

            foreach ($collection as $entity) {
                // identify choices by their collection key
                $key = array_search($entity, $availableEntities);
                $array[$key] = (string) $entity;
            }
        } else {
            foreach ($collection as $entity) {
                $array[] = $entity;
            }
        }

        return $array;
    }

    /**
     * {@inheritDoc}
     */
    public function reverseTransform($keys)
    {
        $collection = $this->choiceList->getModelManager()->getModelCollectionInstance(
            $this->choiceList->getClass()
        );

        if (!$collection instanceof \Doctrine\Common\Collections\ArrayCollection) {
            throw new UnexpectedTypeException($collection, '\Doctrine\Common\Collections\ArrayCollection');
        }

        if ('' === $keys || null === $keys) {
            return $collection;
        }

        if (!is_array($keys)) {
            throw new UnexpectedTypeException($keys, 'array');
        }

        $notFound = array();

        // optimize this into a SELECT WHERE IN query
        foreach ($keys as $key) {
            if ($entity = $this->choiceList->getEntity($key)) {
                $collection[] = $entity;
            } else {
                $notFound[] = $key;
            }
        }

        if (count($notFound) > 0) {
            throw new TransformationFailedException(sprintf('The entities with keys "%s" could not be found', implode('", "', $notFound)));
        }

        return $collection;
    }
}
