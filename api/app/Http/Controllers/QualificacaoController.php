<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
class QualificacaoController extends Controller
{
    public function listar(Request $request)
	{
		
		$usuario_id   = $request->input('usuario_id');
		//$servico_id   = $request->input('usuario_id');
        
		$query = DB::select("SELECT * FROM usuqua WHERE contratado_id = :usuario_id", ['usuario_id' => $usuario_id]);

		
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
