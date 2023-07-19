<?php

namespace App\Controllers;

use App\Customizer\Sections\Footer;
use App\Customizer\Sections\Headlines;
use WP_Query;

class HomeController
{
    private $reservedCategories = [];
    private $reservedCategorySlugs = [];
    private $fallbackImage = '';

    public function __construct()
    {
        global $wpdb;

        $categoryNames = ["'post-slider'", "'big-cards'", "'selected-posts'", "'%e0%a6%ab%e0%a6%bf%e0%a6%9a%e0%a6%be%e0%a6%b0'"];
        $query = $wpdb->prepare("SELECT term_id as id, slug FROM {$wpdb->terms} where slug in (%s, " . implode(', ', $categoryNames) . ")", 'uncategorized');
        $results = $wpdb->get_results($query, ARRAY_A);

        foreach ($results as $result) {
            $this->reservedCategorySlugs[$result['slug']] = $result['id'];
        }

        $this->reservedCategories = array_map(function ($item) {
            return $item['id'];
        }, $results);

        $this->fallbackImage = getImage('fallback.png');
    }

    public function index()
    {
        return [
            'slides' => $this->slides(),
            'headlines' => $this->headlines(),
            'postBlock1' => $this->postBlock1(),
            'postBlock2' => $this->postBlock2(),
            'categories' => $this->categories(),
            'gallery' => $this->gallery()
        ];
    }

    public function slides()
    {
        global $wpdb;

        $query = "
        select distinct ID as id, post_name as slug, post_title as title, post_excerpt as excerpt
        from {$wpdb->posts}
          join {$wpdb->term_relationships} on object_id = ID
          join {$wpdb->term_taxonomy} on {$wpdb->term_relationships}.term_taxonomy_id = {$wpdb->term_taxonomy}.term_taxonomy_id
        where post_type = 'post'
          and post_status = 'publish'
          and term_id  = %d
        order by post_date_gmt desc
        limit 4
        ";

        $queryPrepared = $wpdb->prepare($query, $this->reservedCategorySlugs['post-slider']);

        $results = $wpdb->get_results($queryPrepared, ARRAY_A);

        return array_map(function ($post) {
            $thumb = get_the_post_thumbnail_url($post['id'], 'full');
            $post['alt'] = get_post_meta(get_post_thumbnail_id($post['id']), '_wp_attachment_image_alt', true);
            $post['image'] = $thumb ? $thumb : $this->fallbackImage;

            $excerpt = wp_trim_words($post['excerpt'], 45);

            $post['excerpt'] = $excerpt ? $excerpt : wp_trim_words(apply_filters('the_excerpt', apply_filters('the_content', get_post_field('post_content', $post['id']))), 15);
            return $post;
        }, $results);
    }

    public function headlines()
    {
        global $wpdb;

        $query = $wpdb->prepare("SELECT post_name as slug, post_title as title FROM {$wpdb->posts} WHERE post_type = %s and post_status = 'publish' order by post_date_gmt DESC limit 20", 'post');
        $results = $wpdb->get_results($query, ARRAY_A);

        if (!$results) {
            return [];
        }


        return [
            'title' => Headlines::Get('title', 'শিরোনাম'), // Section Title
            'posts' => $results
        ];
    }

    public function postBlock1()
    {
        global $wpdb;

        $query = "
      select distinct ID as id, post_name as slug, post_title as title, post_excerpt as excerpt, post_date_gmt as date
        from {$wpdb->posts}
          join {$wpdb->term_relationships} on object_id = ID
          join {$wpdb->term_taxonomy} on {$wpdb->term_relationships}.term_taxonomy_id = {$wpdb->term_taxonomy}.term_taxonomy_id
        where post_type = 'post'
          and post_status = 'publish'
          and term_id  = %d
        order by post_date_gmt desc
        limit 3
        ";

        $queryPrepared = $wpdb->prepare($query, $this->reservedCategorySlugs['big-cards']);

        $results = $wpdb->get_results($queryPrepared, ARRAY_A);

        return array_map(function ($post) {
            $medium = get_the_post_thumbnail_url($post['id'], MNP_POST_THUMB_MEDIUM);

            if (!$medium) {
                $medium = get_the_post_thumbnail_url($post['id'], 'tie-medium');
            }

            $thumb = $medium ? $medium : get_the_post_thumbnail_url($post['id'], 'full');

            $excerpt = $post['excerpt'];

            $post['excerpt'] = $excerpt ? $excerpt : wp_trim_words(apply_filters('the_excerpt', apply_filters('the_content', get_post_field('post_content', $post['id']))), 30);
            $post['image'] = $thumb ? $thumb : $this->fallbackImage;
            $post['alt'] = get_post_meta(get_post_thumbnail_id($post['id']), '_wp_attachment_image_alt', true);
            $post['categories'] = $this->getCategories($post['id']);
            $post['shares'] = get_post_meta($post['id'], '_total_shares', true);
            $post['comments'] = get_comments_number($post['id']);
            $post['views'] = get_post_meta($post['id'], '_mnp_views', true);

            return $post;
        }, $results);
    }

    public function postBlock2()
    {

        $query = new WP_Query([
            'category__not_in' => $this->reservedCategories,
            'post_type' => 'post',
            'post_status' => 'publish'
        ]);

        return array_map(function (\WP_Post $post) {
            $medium = get_the_post_thumbnail_url($post, MNP_POST_THUMB_MEDIUM);

            if (!$medium) {
                $medium = get_the_post_thumbnail_url($post, 'tie-medium');
            }

            $thumb = $medium ? $medium : get_the_post_thumbnail_url($post, 'full');

            $excerpt = $post->post_excerpt;

            return [
                'slug' => $post->post_name,
                'title' => $post->post_title,
                'excerpt' => $excerpt ? $excerpt : wp_trim_words(apply_filters('the_excerpt', apply_filters('the_content', $post->post_content)), 15),
                'shares' => get_post_meta($post->ID, '_total_shares', true),
                'views' => get_post_meta($post->ID, '_mnp_views', true),
                'comments' => get_comments_number($post->ID),
                'image' => $thumb ? $thumb : $this->fallbackImage,
            ];
        }, $query->get_posts());
    }

    public function categories()
    {
        global $wpdb;

        $categoryQuery = "
        select {$wpdb->terms}.term_id as id, slug, name
          from {$wpdb->terms}
          join {$wpdb->term_taxonomy} on {$wpdb->terms}.term_id = {$wpdb->term_taxonomy}.term_id
          where {$wpdb->terms}.term_id in (" . implode(', ', \App\Customizer\Sections\Categories::Get('categories')) . ") and {$wpdb->term_taxonomy}.taxonomy = %s
        ";

        $categoryQueryPrepared = $wpdb->prepare($categoryQuery, 'category');
        $categories = $wpdb->get_results($categoryQueryPrepared, ARRAY_A);

        $results = [];

        foreach ($categories as $category) {
            $query = new WP_Query([
                'cat' => $category['id'],
                'posts_per_page' => 5
            ]);

            if ($query->have_posts()) {
                $filtered = array_map(function (\WP_Post $post) {
                    $medium = get_the_post_thumbnail_url($post, MNP_POST_THUMB_MEDIUM);
                    $small = get_the_post_thumbnail_url($post, MNP_POST_THUMB_SMALL);

                    if (!$medium) {
                        $medium = get_the_post_thumbnail_url($post, 'tie-medium');
                    }

                    if (!$small) {
                        $medium = get_the_post_thumbnail_url($post, 'tie-small');
                    }

                    $full = '';

                    if (!$medium || !$small) {
                        $full = get_the_post_thumbnail_url($post, 'full');
                    }

                    $thumbMedium = $medium ? $medium : $full;
                    $thumbSmall = $small ? $small : $full;

                    return [
                        'slug' => $post->post_name,
                        'title' => $post->post_title,
                        'images' => [
                            'medium' => $thumbMedium ? $thumbMedium : $this->fallbackImage,
                            'small' => $thumbSmall ? $thumbSmall : $this->fallbackImage,
                        ]
                    ];
                }, $query->get_posts());
                array_push($results, [
                    'slug' => urldecode($category['slug']),
                    'name' => $category['name'],
                    'posts' => $filtered
                ]);
            }
        }

        return $categories;
    }

    public function gallery()
    {
        $query = new WP_Query([
            'post_type' => 'image',
            'post_status' => 'publish'
        ]);

        return array_map(function (\WP_Post $post) {
            $attachment = get_field('file', $post->ID);

            return [
                'original' => $attachment['url'],
                'thumbnail' => $attachment['sizes'][MNP_POST_THUMB_SMALL],
                'alt' => $attachment['alt']
            ];
        }, $query->get_posts());
    }

    public function getFooter()
    {
        return [
            'menu' => getMenuArray('Footer'),
            'description' => escapeNewLines(Footer::Get('description')),
            'copyright' => escapeNewLines(Footer::Get('copyright')),
            'socialMedia' => Footer::Get('social-media')
        ];
    }


    /**
     * @param int $postId
     * @return array|object|null
     */

    public function getCategories($postId)
    {
        global $wpdb;

        $queryPrepared = $wpdb->prepare("select terms.slug 'slug', terms.name 'name'
from {$wpdb->terms} terms,
     {$wpdb->term_relationships} post_term,
     {$wpdb->term_taxonomy} term_taxonomy
where
  post_term.term_taxonomy_id = term_taxonomy.term_taxonomy_id
  and terms.term_id = term_taxonomy.term_id
  and post_term.object_id = %d
and terms.term_id not in (" . implode(', ', $this->reservedCategories) . ")", $postId);
        $results = $wpdb->get_results($queryPrepared, ARRAY_A);

        return $results;
    }

}