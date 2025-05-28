<?php

namespace App\Entity;
use ApiPlatform\Metadata\ApiResource; 
use App\Repository\MessageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource] 

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $contenu = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $date_envoi = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    private ?Utilisateur $utilisateur1 = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    private ?Utilisateur $utilisateur2 = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContenu(): ?string
    {
        return $this->contenu;
    }

    public function setContenu(string $contenu): static
    {
        $this->contenu = $contenu;

        return $this;
    }

    public function getDateEnvoi(): ?\DateTime
    {
        return $this->date_envoi;
    }

    public function setDateEnvoi(\DateTime $date_envoi): static
    {
        $this->date_envoi = $date_envoi;

        return $this;
    }

    public function getUtilisateur1(): ?Utilisateur
    {
        return $this->utilisateur1;
    }

    public function setUtilisateur1(?Utilisateur $utilisateur1): static
    {
        $this->utilisateur1 = $utilisateur1;

        return $this;
    }

    public function getUtilisateur2(): ?Utilisateur
    {
        return $this->utilisateur2;
    }

    public function setUtilisateur2(?Utilisateur $utilisateur2): static
    {
        $this->utilisateur2 = $utilisateur2;

        return $this;
    }
}
