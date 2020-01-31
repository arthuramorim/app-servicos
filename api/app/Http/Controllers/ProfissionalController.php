<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ProfissionalController extends Controller
{
    public function listar(Request $request)
	{
		
		$servico   = $request->input('servico');
		$usuario   = $request->input('usuario');
        
        //$query = $categoria. "-" .$servico;
		
		$query = DB::select("SELECT
								usuario.usuario_id,
								usuario.nome,
								usuario.contato,
								usuario.email,
								usuario.img_perfil,
								servico.nome AS profissao,
								(
									SELECT
										COUNT(contratado_id)
									FROM
										usuqua
									WHERE
										usuqua.contratado_id = usuario.usuario_id
								) AS quantidade,
								(
									SELECT
										SUM(estrelas)
									FROM
										usuqua
									WHERE
										usuqua.contratado_id = usuario.usuario_id
								) AS estrelas
							FROM
								ususer
							INNER JOIN servico ON (
								servico.servico_id = ususer.servico_id
							)
							INNER JOIN usuario ON (
								usuario.usuario_id = ususer.usuario_id
							)
							WHERE
								ususer.servico_id = :servico AND usuario.usuario_id <> :usuario", ['servico' => $servico, 'usuario'=> $usuario]);

		
	    if ($query) {
	    	return $query;
	    	$token = JWTAuth::fromUser($query);
	    	return response()->json(['status' => 'sucesso', '01' => 'token gerado com sucesso', 'token' => $token, 'dados_do_usuario' => $query], 200);
	    } else {
	    	return response()->json(['status' => 'erro', '02' => 'Não foi encontrado'], 401);
	    }
	    return response()->json(['status' => 'erro', '03' => 'erro interno do servidor'], 500);
	}

	public function perfil(Request $request)
	{
		
		$usuario_id   = $request->input('usuario_id');
        
        //$query = $categoria. "-" .$servico;
		
		$query = DB::select("SELECT DISTINCT
								usuario.usuario_id,
								usuario.nome,
								usuario.contato,
								usuario.email,
								usuario.img_perfil,
								usuario.ocupado,
								(
									SELECT
										COUNT(contratado_id)
									FROM
										usuqua
									WHERE
										usuqua.contratado_id = usuario.usuario_id
								) AS quantidade,
								(
									SELECT
										SUM(estrelas)
									FROM
										usuqua
									WHERE
										usuqua.contratado_id = usuario.usuario_id
								) AS estrelas,
								usuario.biografia
							FROM
								ususer
							INNER JOIN servico ON (
								servico.servico_id = ususer.servico_id
							)
							INNER JOIN usuario ON (
								usuario.usuario_id = ususer.usuario_id
							)
							WHERE
								usuario.usuario_id = :usuario_id", ['usuario_id' => $usuario_id]);

		
	    if ($query) {
	    	return $query;
	    	$token = JWTAuth::fromUser($query);
	    	return response()->json(['status' => 'sucesso', '01' => 'token gerado com sucesso', 'token' => $token, 'dados_do_usuario' => $query], 200);
	    } else {
	    	return response()->json(['status' => 'erro', '02' => 'Não foi encontrado'], 401);
	    }
	    return response()->json(['status' => 'erro', '03' => 'erro interno do servidor'], 500);
	}
}
