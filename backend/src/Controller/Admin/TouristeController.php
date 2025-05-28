<?php

namespace App\Controller\Admin; 

use App\Entity\Touriste;
use App\Form\TouristeForm;
use App\Repository\TouristeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin/touriste')]
final class TouristeController extends AbstractController
{
    #[Route(name: 'app_touriste_index', methods: ['GET'])]
    public function index(TouristeRepository $touristeRepository): Response
    {
        return $this->render('touriste/index.html.twig', [
            'touristes' => $touristeRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_touriste_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $touriste = new Touriste();
        $form = $this->createForm(TouristeForm::class, $touriste);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($touriste);
            $entityManager->flush();

            return $this->redirectToRoute('app_touriste_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('touriste/new.html.twig', [
            'touriste' => $touriste,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_touriste_show', methods: ['GET'])]
    public function show(Touriste $touriste): Response
    {
        return $this->render('touriste/show.html.twig', [
            'touriste' => $touriste,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_touriste_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Touriste $touriste, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TouristeForm::class, $touriste);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_touriste_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('touriste/edit.html.twig', [
            'touriste' => $touriste,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_touriste_delete', methods: ['POST'])]
    public function delete(Request $request, Touriste $touriste, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$touriste->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($touriste);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_touriste_index', [], Response::HTTP_SEE_OTHER);
    }
}
