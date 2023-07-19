<?php

namespace App\Bootstrap;

use WP_REST_Request;

class Route
{
    private static $routes = [];

    public function __construct($namespace = 'mnp')
    {
        add_action('rest_api_init', function () use ($namespace) {

            foreach (static::$routes as $route) {
                register_rest_route($namespace, $route['uri'], [
                    'methods' => $route['method'],
                    'callback' => function (WP_REST_Request $request) use ($route) {
                        return $this->handleRequest($request, $route['callback']);
                    },
                    'args' => $route['args']
                ]);
            }

        });
    }

    /**
     * @param WP_REST_Request $request
     * @param callable | string $action
     * @return array
     * @throws null
     */

    private function handleRequest($request, $action)
    {
        $data = null;

        if (is_string($action)) {
            $exploded = explode('@', $action);
            $controllerName = $exploded[0];
            $methodName = $exploded[1];
            $controllerFile = __DIR__ . "/../Controllers/$controllerName.php";

            if (file_exists($controllerFile)) {
                $controllerClass = 'App\\Controllers\\' . $controllerName;
                $controller = new $controllerClass;

                if (method_exists($controller, $methodName)) {
                    $data = $controller->$methodName($request);
                }
            }
        } elseif (is_callable($action)) {
            $data = $action($request);
        }

//        header('Content-Type', 'application/json');
        return $data;
    }

    /**
     * @param $uri string
     * @param $args array
     * @param $action callable | string
     * @return void
     * */

    public static function get($uri, $action, $args = [])
    {
        array_push(static::$routes, [
            'uri' => $uri,
            'method' => 'GET',
            'callback' => $action,
            'args' => $args
        ]);
    }

    /**
     * @param $uri string
     * @param $action callable | string
     * @param $args array
     * @return void
     * */

    public static function post($uri, $action, $args = [])
    {
        array_push(static::$routes, [
            'uri' => $uri,
            'method' => 'POST',
            'callback' => $action,
            'args' => $args
        ]);
    }

    /**
     * @param $uri string
     * @param $action callable
     * */

    public static function ajax($uri, $action)
    {
        add_action("wp_ajax_$uri", $action);
        add_action("wp_ajax_nopriv_$uri", $action);
    }


    // TODO: Start Here
    public static function __callStatic($name, $arguments)
    {
        $methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];


    }
}