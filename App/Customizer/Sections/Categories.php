<?php

namespace App\Customizer\Sections;


use App\Customizer\Controls\CategoryDropdown;
use App\Customizer\Section;

class Categories extends Section
{
    protected $section = [
        'title' => 'Categories',
        'description' => 'Home Page Category Section',
    ];

    protected function fields()
    {
        return [
            'categories' => [
                'type' => 'class',
                'class' => CategoryDropdown::class,
                'args' => [
                    'label' => 'Select Categories For Homepage Categories Section',
                    'multiple' => true
                ]
            ]
        ];
    }
}