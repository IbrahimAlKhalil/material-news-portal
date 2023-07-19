<?php

namespace App\Controllers;

use WP_REST_Request;

class MenuController
{
    public function index(WP_REST_Request $request)
    {
        return getMenuArray($request->get_param('menu'));
    }
}