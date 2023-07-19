<?php

namespace App\PostTypes\Types;

use App\PostTypes\PostType;

class Video extends PostType
{
    protected $postArgs = [
        "label" => 'Videos',
        "labels" => [
            "name" => 'Videos',
            "singular_name" => 'Video',
            "menu_name" => 'Videos',
        ],
        "description" => "Add Video to the Video Widget",
        "has_archive" => false,
        "rewrite" => [
            "slug" => "video",
            "with_front" => true
        ],
        "menu_position" => 5,
        "menu_icon" => "dashicons-video-alt3",
        "supports" => ["title"],
        "taxonomies" => ["category", "post_tag"],
    ];

    protected $fieldGroups = [
        'key' => 'group_5c4ee5229d549',
        'title' => 'Video',
        'fields' => [
            [
                'key' => 'field_5c4ee52f6ce11',
                'label' => 'Url',
                'name' => 'url',
                'type' => 'url',
                'instructions' => 'Please paste the video url',
                'required' => 1,
                'conditional_logic' => 0
            ],
        ],
        'hide_on_screen' => [
            0 => 'permalink',
            1 => 'excerpt',
        ]
    ];
}