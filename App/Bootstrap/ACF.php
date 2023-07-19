<?php

namespace App\Bootstrap;

class ACF
{
    public function __construct()
    {
        add_filter('acf/settings/path', [$this, 'settingPath']);
        add_filter('acf/settings/dir', [$this, 'settingDir']);
    }

    public function settingPath()
    {
        return get_theme_file_path('App/Inc/acf/');
    }

    public function settingDir()
    {
        return get_theme_file_uri('App/Inc/acf/');
    }
}