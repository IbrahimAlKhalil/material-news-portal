<?php

namespace App\Customizer\Sections;


use App\Customizer\Section;

class Headlines extends Section
{

    protected $section = [
        'title' => 'Headlines',
        'description' => 'Header Customization',
    ];

    protected function fields()
    {
        return [
            'title' => [
                'type' => 'text',
                'label' => 'Headlines Section Title',
                'default' => 'শিরোনাম',
                'selector' => '#section-headlines .headline-title'
            ]
        ];
    }
}