<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource; 
use App\Repository\GuideRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: GuideRepository::class)]
#[ApiResource] 
class Guide
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $note_moyenne = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $biographie = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Utilisateur $Utilisateur = null;

    /**
     * @var Collection<int, Tour>
     */
    #[ORM\OneToMany(targetEntity: Tour::class, mappedBy: 'guide')]
    private Collection $Tour;

    public function __construct()
    {
        $this->Tour = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNoteMoyenne(): ?float
    {
        return $this->note_moyenne;
    }

    public function setNoteMoyenne(float $note_moyenne): static
    {
        $this->note_moyenne = $note_moyenne;
        return $this;
    }

    public function getBiographie(): ?string
    {
        return $this->biographie;
    }

    public function setBiographie(string $biographie): static
    {
        $this->biographie = $biographie;
        return $this;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->Utilisateur;
    }

    public function setUtilisateur(?Utilisateur $Utilisateur): static
    {
        $this->Utilisateur = $Utilisateur;
        return $this;
    }

    /**
     * @return Collection<int, Tour>
     */
    public function getTour(): Collection
    {
        return $this->Tour;
    }

    public function addTour(Tour $tour): static
    {
        if (!$this->Tour->contains($tour)) {
            $this->Tour->add($tour);
            $tour->setGuide($this);
        }

        return $this;
    }

    public function removeTour(Tour $tour): static
    {
        if ($this->Tour->removeElement($tour)) {
            if ($tour->getGuide() === $this) {
                $tour->setGuide(null);
            }
        }

        return $this;
    }
}
