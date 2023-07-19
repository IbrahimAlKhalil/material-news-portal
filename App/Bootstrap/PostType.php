<?php

namespace App\Bootstrap;


class PostType
{
    public function __construct()
    {
        $postTypes = [
            \App\PostTypes\Types\Image::class,
            \App\PostTypes\Types\Video::class
        ];

        foreach ($postTypes as $postType) {
            new $postType;
        }
    }
}