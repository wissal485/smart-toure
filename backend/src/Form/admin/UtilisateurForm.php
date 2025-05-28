<?php

namespace App\Form;

use App\Entity\Utilisateur;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class UtilisateurForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom')
            ->add('prenom')
            ->add('email')
            ->add('mot_de_passe')
            ->add('role')
             ->add('photo_de_profil', FileType::class, [
                'label' => 'Photo de profil (fichier image)',
                'required' => false,
                'mapped' => false, // مهم باش ما يحاولش يحفظ القيمة مباشرة في قاعدة البيانات، الرفع يدار في الـEntity مع VichUploader
                'attr' => [
                    'accept' => 'image/*'
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Utilisateur::class,
        ]);
    }
}
