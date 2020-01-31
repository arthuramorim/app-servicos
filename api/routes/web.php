<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return 'API';
});

Route::post('api/v1/auth/entrar', 'AuthenticateController@authJwt');

Route::post('api/v1/auth/categoria/listar', 'CategoriaController@listar');

Route::post('api/v1/auth/servico/listar', 'ServicoController@listar');

Route::post('api/v1/auth/profissional/listar', 'ProfissionalController@listar');
Route::post('api/v1/auth/profissional/perfil', 'ProfissionalController@perfil');

Route::post('api/v1/auth/comentario/listar', 'QualificacaoController@listar');

//Route::get('api/v1/auth/perfil/imagem', 'Perfil@imagem');