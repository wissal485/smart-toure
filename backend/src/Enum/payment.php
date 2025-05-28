<?php

namespace App\Enum;

enum payment: string
{
    case carte = 'Carte';
    case floussi = 'floussi';
    case virment = 'Virement';
}
