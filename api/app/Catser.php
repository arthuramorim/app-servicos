<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Catser extends Model
{
   //use Notifiable;

    protected $table = 'catser';

    protected $primaryKey = 'catser_id';

    public $timestamps = false;

    protected $fillable = [
        'nome', 'descricao','img_url', 
    ];

}
