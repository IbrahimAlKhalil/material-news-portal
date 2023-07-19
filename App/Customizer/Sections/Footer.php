<?php

namespace App\Customizer\Sections;


use App\Customizer\Section;

class Footer extends Section
{
    protected $section = [
        'title' => 'Footer',
        'description' => 'Footer Customization'
    ];

    protected function fields()
    {
        
        return [
            'copyright' => [
                'type' => 'textarea',
                'label' => 'Copyright Info',
                'default' => 'Copyright © since 2018 Ibrahim Al Khalil | Powered by React and Wordpress',
                'selector' => '#footer small'
            ],
            'description' => [
                'type' => 'editor',
                'label' => 'Description',
                'default' => 'Lorem ipsum dolor sit amet, mattis consectetuer adipiscing suspendisse et justo. Praesent mattis ugue.',
                'selector' => '#footer-description'
            ],
            'social-media' => [
                'type' => 'repeater',
                'label' => 'Social Media Links',
                'button_label' => 'Link',
                'postMessage' => false,
                'row_label' => [
                    'type' => 'text',
                    'value' => 'Link',
                ],
                'default' => [
                    [
                        'link' => 'https://www.facebook.com'
                    ],
                    [
                        'link' => 'https://www.instagram.com'
                    ],
                ],
                'fields' => [
                    'link' => [
                        'type' => 'text',
                        'label' => 'Social Media Link'
                    ]
                ]
            ]
        ];
    }
}