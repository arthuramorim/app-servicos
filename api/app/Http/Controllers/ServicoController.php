<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ServicoController extends Controller
{
   public function listar(Request $request)
	{
		//$categoria   = $request->input('categoria');
        $query  = DB::table('servico')
            ->select('*')
            //->where('catser_id', $categoria)
            ->orderBy('nome')
            ->get();                                                     

	    if ($query) {
	    	return $query;
	    	$token = JWTAuth::fromUser($query);
	    	return response()->json(['status' => 'sucesso', '01' => 'token gerado com sucesso', 'token' => $token, 'dados_do_usuario' => $query], 200);
	    } else {
	    	return response()->json(['status' => 'erro', '02' => 'dados de entrada incorretos'], 401);
	    }
	    return response()->json(['status' => 'erro', '03' => 'erro interno do servidor'], 500);
	}

}
