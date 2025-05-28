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

#[Route('/admin')]
final class AdminController extends AbstractController
{
    #[Route(name: 'app_admin_index', methods: ['GET'])]
    public function index(TouristeRepository $touristeRepository): Response
    {
        return $this->render('admin/index.html.twig', [
            'touristes' => $touristeRepository->findAll(),
        ]);
    }

    
}
