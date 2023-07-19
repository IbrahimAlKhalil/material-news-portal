<?php

namespace App\Controllers;


use WP_REST_Request;

class PostController
{
    public function getSinglePost(WP_REST_Request $request)
    {
        global $wpdb;

        $slug = $request->get_param('slug');

        $query = "
        select
       posts.ID                as id,
       posts.post_title        as title,
       posts.post_content      as content,
       posts.post_date_gmt     as date,
       posts.post_type         as type,
       users.ID                as author_id,
       users.user_nicename,
       attached.meta_value     as thumbnail,
       alt.meta_value          as alt,
       attachment.post_title   as thumbnailTitle,
       attachment.post_excerpt as caption,
       attachment.post_content as description

from {$wpdb->posts} posts
       left outer join {$wpdb->users} users on users.ID = posts.post_author
       left outer join {$wpdb->postmeta} thumbnail on thumbnail.post_id = posts.ID and thumbnail.meta_key = '_thumbnail_id'

       left outer join {$wpdb->postmeta} attached
                       on attached.post_id = thumbnail.meta_value and attached.meta_key = '_wp_attached_file'

       left outer join {$wpdb->postmeta} alt
                       on alt.post_id = thumbnail.meta_value and alt.meta_key = '_wp_attachment_image_alt'
       left outer join {$wpdb->posts} attachment on attachment.ID = alt.post_id

where posts.post_name = %s
limit 1;
        ";

        $queryPrepared = $wpdb->prepare($query, $slug);
        $post = $wpdb->get_row($queryPrepared);

        if (!$post) {
            return response(['message' => 'Sorry! the article you requested is not found in our server',], 404);
        }

        $post->socialButtons = do_shortcode("[social_warfare id={$post->id}]");
        $post->avatar = get_avatar_url($post->id);

        return $post;
    }

    public function updatePostView(WP_REST_Request $request)
    {
        $id = $request->get_param('id');

        global $wpdb;

        $query = "
                select count(ID) as count
                  from {$wpdb->posts}
                  where ID = %d
                  limit 1
                ";

        $result = $wpdb->get_row($wpdb->prepare($query, (int)$id));

        if (!!$result) {
            $previous = get_post_meta($id, '_mnp_views', true);
            $value = $previous ? $previous : 0;

            update_post_meta($id, '_mnp_views', ++$value);
        }
    }
}