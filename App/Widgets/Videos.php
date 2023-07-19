<?php

namespace App\Widgets;


use WP_Widget;

class Videos extends WP_Widget
{
    public function __construct()
    {
        parent::__construct('mnp-widget-videos', 'Youtube Videos');
    }

    public function widget($args, $instance)
    {
        echo json_encode(['name' => 'videos', 'data' => $this->getVideos()]);
    }

    public function getVideos()
    {
        $query = new \WP_Query([
            'post_type' => 'video',
            'post_status' => 'publish',
            'posts_per_page' => 3
        ]);

        return array_map(function (\WP_Post $post) {
            return get_field('url', $post->ID);
        }, $query->get_posts());
    }
}