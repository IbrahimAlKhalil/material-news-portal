<?php

namespace App\Bootstrap;

class TGMPA
{
    public $config = [
        'is_automatic' => true
    ];

    public $plugins = [
        [
            'name' => 'Kirki',
            'slug' => 'kirki'
        ], [
            'name' => 'Safe Svg',
            'slug' => 'safe-svg'
        ], [
            'name' => 'Social warfare',
            'slug' => 'social-warfare'
        ], [
            'name' => 'Bangla/Hijri Date',
            'slug' => 'bangla-date-display'
        ], [
            'name' => 'Gutenberg',
            'slug' => 'gutenberg'
        ]
    ];

    public function __construct()
    {
        $defaults = [
            'required' => true,
            'force_activation' => true,
            'force_deactivation' => true
        ];

        $plugins = array_map(function ($plugin) use ($defaults) {
            return array_merge_recursive($defaults, $plugin);
        }, $this->plugins);

        tgmpa($plugins, $this->config);
    }
}