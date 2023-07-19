<?php

namespace App\Bootstrap;


use App\Customizer\Sections\Categories;
use Kirki;
use App\Customizer\Section;
use App\Customizer\Sections\Footer;
use App\Customizer\Sections\Headlines;

class Customizer
{

    public function __construct()
    {
        if (!class_exists('Kirki')) {
            return null;
        }
        // Config

        $this->setPath();
        $this->addConfig();

        // Customizer Sections
        $sections = [
            Headlines::class,
            Footer::class,
            Categories::class
        ];

        // Register Sections

        foreach ($sections as $section) {
            new $section;
        }
    }

    public function setPath()
    {
        add_filter('kirki/config', function () {
            return ['url_path' => get_theme_file_uri('Inc/kirki/')];
        });
    }

    public function addConfig()
    {
        Kirki::add_config(Section::$configId, [
            'capability' => 'edit_theme_options',
            'option_type' => 'theme_mod',
        ]);
    }
}