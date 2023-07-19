<?php

namespace App\Bootstrap;


class Widgets
{
    public function __construct()
    {
        $widgets = [
            \App\Widgets\Tabs::class,
            \App\Widgets\Videos::class,
        ];

        add_action('widgets_init', function () use (&$widgets) {
            foreach ($widgets as $widget) {
                register_widget($widget);
            }
        });
    }
}