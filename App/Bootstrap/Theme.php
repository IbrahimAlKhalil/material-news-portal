<?php

namespace App\Bootstrap;

class Theme
{
    public function __construct()
    {
        add_action('after_setup_theme', function () {
            $this->addThemeThemeSupports();
            $this->registerThings();
            $this->addImageSizes();
        });
    }

    public function addThemeThemeSupports()
    {
        add_theme_support('logo');
        add_theme_support('post-thumbnails');
        add_theme_support('custom-header', [
            'default-image' => getImage('logo.png')
        ]);
    }

    public function addImageSizes()
    {
        add_image_size(MNP_POST_THUMB, '440', '320', true);
        add_image_size(MNP_POST_THUMB_MEDIUM, '320', '200', true);
        add_image_size(MNP_POST_THUMB_SMALL, '70', '45', true);
    }

    public function registerThings()
    {
        register_nav_menus([
            'Header' => 'Main Menu',
            'Footer' => 'Footer Menu'
        ]);

        register_sidebar([
            'name' => 'Sidebar',
            'id' => 'main-sidebar',
            'description' => 'Widgets in this area will be shown on home page.',
            'before_widget' => '',
            'after_widget' => '',
            'before_title' => '<div data-widget-title>',
            'after_title' => '</div>'
        ]);

        register_post_meta('post', '_mnp_views', [
            'type' => 'number',
            'single' => true,
            'show_in_rest' => true
        ]);
    }
}