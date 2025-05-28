<?php

namespace App\Form;

use App\Entity\Reservation;
use App\Entity\Tour;
use App\Entity\Touriste;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReservationForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('date_reservation')
            ->add('statu')
            ->add('Tour', EntityType::class, [
                'class' => Tour::class,
                'choice_label' => 'id',
            ])
            ->add('Touriste', EntityType::class, [
                'class' => Touriste::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Reservation::class,
        ]);
    }
}
