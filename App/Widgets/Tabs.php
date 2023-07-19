<?php

namespace App\Widgets;

use WP_Query;
use WP_Widget;

class Tabs extends WP_Widget
{
    public function __construct()
    {
        parent::__construct('mnp-widget-tabs', 'Tabs');
    }

    public function widget($args, $instance)
    {
        echo json_encode(['name' => 'tabs', 'data' => [
            'mostViewed' => $this->getMostViewedPosts(),
            'mostCommented' => $this->getMostCommented(),
            'selected' => $this->getSelected()
        ]]);
    }

    public function getMostViewedPosts()
    {
        global $wpdb;

        $query = "
        select post_name as slug, post_title as title
        from {$wpdb->posts}
               join {$wpdb->postmeta} on post_id = ID
        where meta_key = %s
          and post_type = 'post'
          and post_status = 'publish'
        order by meta_value desc
        limit 6
        ";

        $queryPrepared = $wpdb->prepare($query, '_mnp_views');

        return $wpdb->get_results($queryPrepared, ARRAY_A);
    }

    public function getMostCommented()
    {
        global $wpdb;

        $query = "
        select posts.post_name as slug, post_title as title
        from {$wpdb->posts} posts
               left outer join {$wpdb->comments} comments on posts.ID = comments.comment_post_ID
               where posts.post_type = 'post'
               and posts.post_status = 'publish'
        group by slug
        order by count(comments.comment_ID) desc
        limit %d
        ";

        $queryPrepared = $wpdb->prepare($query, 6);

        return $wpdb->get_results($queryPrepared, ARRAY_A);
    }

    public function getSelected()
    {

        $query = new WP_Query([
            'post_type' => 'post',
            'post_status' => 'publish',
            'category_name' => 'selected-posts'
        ]);

        return array_map(function (\WP_Post $post) {
            return [
                'slug' => $post->post_name,
                'title' => $post->post_title,
            ];
        }, $query->get_posts());
    }
}