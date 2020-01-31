<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Illuminate\Support\Facades\DB;

class AuthenticateController extends Controller
{
    public function authJwt(Request $request)
    {
        $user   = $request->input('user');
        $pwd    = $request->input('pwd');
        $query  = DB::table('usuario')
            ->where('cpf_cnpj', $user)
            ->where('senha', $pwd)
            ->select('*')
            ->get();

        if (count($query) == 1) {
            return $query;
            $token = JWTAuth::fromUser($query);
            return response()->json(['status' => 'sucesso', '01' => 'token gerado com sucesso', 'token' => $token, 'dados_do_usuario' => $query], 200);
        } else {
            return response()->json(['status' => 'erro', '02' => 'dados de entrada incorretos'], 401);
        }
        return response()->json(['status' => 'erro', '03' => 'erro interno do servidor'], 500);
    }
}
