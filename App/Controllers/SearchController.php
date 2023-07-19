<?php

namespace App\Controllers;


class SearchController
{
    public $fallbackImage;

    public function __construct()
    {
        $this->fallbackImage = getImage('fallback.png');
    }

    public function index(\WP_REST_Request $request)
    {

        $query = new \WP_Query([
            's' => $request->get_param('s'),
            'post_status' => 'publish',
            'post_type' => 'post',
            'posts_per_page' => 5
        ]);

        return array_map(function (\WP_Post $post) use ($request) {
            $small = get_the_post_thumbnail_url($post, MNP_POST_THUMB_SMALL);

            if (!$small) {
                $small = get_the_post_thumbnail_url($post, 'tie-small');
            }

            $thumb = $small ? $small : get_the_post_thumbnail_url($post, 'full');

            return [
                'title' => $post->post_title,
                'image' => $thumb ? $thumb : $this->fallbackImage,
                'slug' => $post->post_name
            ];
        }, $query->get_posts());
    }
}