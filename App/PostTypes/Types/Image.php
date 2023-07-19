<?php

namespace App\PostTypes\Types;


use App\PostTypes\PostType;

class Image extends PostType
{

    protected $postArgs = [
        "label" => 'Images',
        "labels" => [
            "name" => 'Images',
            "singular_name" => 'Image',
            "menu_name" => 'Images',
        ],
        "description" => "Add Image for the gallery on the homepage.",
        "has_archive" => "gallery",
        "rewrite" => [
            "slug" => "image",
            "with_front" => true
        ],
        "menu_position" => 5,
        "menu_icon" => "dashicons-format-gallery",
        "supports" => ["title"],
        "taxonomies" => ["category", "post_tag"],
    ];

    protected $fieldGroups = [
        'key' => 'group_5c4ee5229d548',
        'title' => 'Image',
        'fields' => array(
            array(
                'key' => 'field_5c5fd909196c7',
                'label' => 'Image',
                'name' => 'file',
                'type' => 'image',
                'instructions' => '',
                'required' => 1,
                'conditional_logic' => 0,
                'return_format' => 'array',
                'preview_size' => 'full',
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
                'placeholder' => '',
            ),
        ),
        'hide_on_screen' => [
            0 => 'permalink',
            1 => 'excerpt',
        ]
    ];

}