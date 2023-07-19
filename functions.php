<?php

require_once 'vendor/autoload.php';

add_filter('show_admin_bar', '__return_false');

/********** Constants ***********/

// Define theme prefix

const SAHARA_POST_THUMB = 'sahara-post-thumb';
const SAHARA_POST_THUMB_MEDIUM = 'sahara-post-thumb-medium';
const SAHARA_POST_THUMB_SMALL = 'sahara-post-thumb-small';

/**********/


$bootstraps = [
    \App\Bootstrap\Route::class,
    \App\Bootstrap\Customizer::class,
    App\Bootstrap\Theme::class,
    \App\Bootstrap\Widgets::class,

    \App\Bootstrap\PostType::class
];

$adminBootstraps = [
    App\Bootstrap\TGMPA::class,
    \App\Bootstrap\ACF::class
];

if (is_admin()) {
    foreach ($adminBootstraps as $bootstrap) {
        new $bootstrap;
    }
}

foreach ($bootstraps as $bootstrap) {
    new $bootstrap;
}