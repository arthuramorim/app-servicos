<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'usuario';

    protected $primaryKey = 'usuario_id';

    public $timestamps = false;

    protected $fillable = [
        'nome', 'cpf_cnpj','contato','email','profissional','senha',
    ];

    protected $hidden = [
        'senha',
    ];
}
