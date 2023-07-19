<?php

namespace App\Controllers;


class ArchiveController
{
    public $fallbackImage;

    public function __construct()
    {
        $this->fallbackImage = getImage('fallback.png');
    }

    public function index(\WP_REST_Request $request)
    {
        $year = $request->get_param('year');
        $month = $request->get_param('month');
        $date = $request->get_param('date');

        $paged = $request->get_param('paged');

        $query = new \WP_Query([
            'date_query' => [
                'year' => $year,
                'month' => $month,
                'day' => $date,
            ],
            'post_status' => 'publish',
            'post_type' => 'post',
            'paged' => $paged
        ]);

        return array_map(function (\WP_Post $post) {
            $medium = get_the_post_thumbnail_url($post, MNP_POST_THUMB_MEDIUM);

            if(!$medium) {
                $medium = get_the_post_thumbnail_url($post, 'tie-medium');
            }

            $thumb = $medium ? $medium : get_the_post_thumbnail_url($post, 'full');
            $excerpt = wp_trim_words($post->post_excerpt, 15);

            return [
                'id' => $post->ID,
                'title' => $post->post_title,
                'excerpt' => $excerpt ? $excerpt : wp_trim_words(apply_filters('the_excerpt', apply_filters('the_content', $post->post_content)), 15),
                'image' => $thumb ? $thumb : $this->fallbackImage,
                'shares' => get_post_meta($post->ID, '_total_shares', true),
                'views' => get_post_meta($post->ID, '_mnp_views', true),
                'comments' => get_comments_number($post->ID),
            ];
        }, $query->get_posts());
    }
}