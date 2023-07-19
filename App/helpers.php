<?php

/**
 * @param string $file
 * @return string
 *
 * Alias for get_theme_file_url
 */

function getAsset($file)
{
    return get_theme_file_uri('assets/dist/' . $file);
}

/**
 * @param string $file
 * @return void
 *
 * Echos getAsset
 */

function asset($file)
{
    echo getAsset($file);
}


/**
 * @param string $file
 * @return string
 *
 * Returns image url from assets/src/images
 */
function getImage($file)
{
    return get_theme_file_uri('assets/src/images/' . $file);
}

/**
 * @param string $file
 * @return void
 *
 * Echos image url from assets/src/images
 */
function image($file)
{
    echo getImage($file);
}


/**
 * @param string $str
 * @param string $hash
 * @return bool
 */

function sha256Check($str, $hash)
{
    return hash('sha256', $str) == $hash;
}


/**
 * @param string $uri
 * @return void
 */
function route($uri)
{
    echo get_rest_url(null, "mnp/$uri");
}


/**
 * @param string $menuName
 * @return array|false
 */

function getMenuItems($menuName)
{
    if (($locations = get_nav_menu_locations()) && isset($locations[$menuName])) {
        $menu = wp_get_nav_menu_object($locations[$menuName]);
        $items = wp_get_nav_menu_items($menu->term_id);


        return array_map(function ($item) {
            return [
                'id' => $item->ID,
                'parent' => $item->menu_item_parent,
                'title' => $item->title,
                'link' => str_replace(get_home_url(), '', $item->url)
            ];
        }, $items ? $items : []);
    }

    return [];
}


/**
 * @param array $elements
 * @param int $parentId
 * @return array
 */

function buildTree(&$elements, $parentId = 0)
{

    $branch = [];

    foreach ($elements as &$element) {
        if ($element['parent'] == $parentId) {
            $children = buildTree($elements, $element['id']);
            if ($children) {
                $element['children'] = $children;
            }

            array_push($branch, $element);
            unset($element);
        }
    }
    return $branch;
}


function getMenuArray($menuName)
{
    return buildTree(getMenuItems($menuName));
}


/**
 * Replaces newline with \n in string.
 *
 * @param $str string
 * @return string
 * */

function escapeNewLines($str)
{
    return preg_replace('/\n/', '\\n', $str);
}


/**
 * @param callable $callback
 * @param array $arr
 * @return bool
 */

function arraySome($callback, $arr)
{
    foreach ($arr as $element) {
        if ($callback($element)) {
            return true;
        }
    }
    return false;
}


/**
 * @param $widgetName
 * @param string $index
 * @return false|string
 */

function getWidget($widgetName, $index = 'main-sidebar')
{
    ob_start();

    global $wp_registered_sidebars, $wp_registered_widgets;

    $sidebars_widgets = wp_get_sidebars_widgets();


    if (!isset($wp_registered_sidebars[$index])) {
        // Handle sidebar not found
        return false;
    }

    if (!isset($wp_registered_widgets[$widgetName])) {
        // Handle widget not found
        return false;
    }

    $checkWidget = function ($widget) use ($widgetName) {
        return $widget == $widgetName;
    };
    if (!arraySome($checkWidget, $sidebars_widgets[$index])) {
        // Handle widget not found in this sidebar
        return false;
    }


    $index = sanitize_title($index);
    foreach ((array)$wp_registered_sidebars as $key => $value) {
        if (sanitize_title($value['name']) == $index) {
            $index = $key;
            break;
        }
    }

    do_action('dynamic_sidebar_before', $index, true);
    $sidebar = $wp_registered_sidebars[$index];

    $params = array_merge(
        [array_merge($sidebar, ['widget_id' => $widgetName, 'widget_name' => $wp_registered_widgets[$widgetName]['name']])],
        (array)$wp_registered_widgets[$widgetName]['params']
    );

    // Substitute HTML id and class attributes into before_widget
    $classname_ = '';
    foreach ((array)$wp_registered_widgets[$widgetName]['classname'] as $cn) {
        if (is_string($cn))
            $classname_ .= '_' . $cn;
        elseif (is_object($cn))
            $classname_ .= '_' . get_class($cn);
    }
    $classname_ = ltrim($classname_, '_');
    $params[0]['before_widget'] = sprintf($params[0]['before_widget'], $widgetName, $classname_);

    $params = apply_filters('dynamic_sidebar_params', $params);

    $callback = $wp_registered_widgets[$widgetName]['callback'];

    do_action('dynamic_sidebar', $wp_registered_widgets[$widgetName]);

    if (is_callable($callback)) {
        call_user_func_array($callback, $params);
    }

    do_action('dynamic_sidebar_after', $index, true);


    if (preg_match('/^mnp-widget-[a-zA-Z]+-\d+/', $widgetName)) {
        $data = json_decode(ob_get_clean());
    } else {
        $data = ob_get_clean();
    }

    return $data;
}


/**
 * @param string $sidebar
 * @return array
 */

function getSidebarWidgets($sidebar = 'main-sidebar')
{
    $sidebars = wp_get_sidebars_widgets();
    $widgets = [];

    if (!isset($sidebars[$sidebar])) {
        return [];
    }

    $widgetNames = $sidebars[$sidebar];

    foreach ($widgetNames as $widget) {
        array_push($widgets, getWidget($widget));
    }

    return $widgets;
}


/**
 * @param $data array
 * @param int $status
 * @param string $contentType
 * @return WP_REST_Response
 */

function response($data, $status = 200, $contentType = 'application/json')
{
    $data['status'] = $status;

    return new WP_REST_Response($data, $status, [
        'Content-Type' => $contentType
    ]);
}