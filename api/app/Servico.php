<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Servico extends Model
{
    //use Notifiable;

    protected $table = 'servico';

    protected $primaryKey = 'servico_id';

    public $timestamps = false;

    protected $fillable = [
        'catser_id', 'nome','descricao','img_url', 
    ];
}
