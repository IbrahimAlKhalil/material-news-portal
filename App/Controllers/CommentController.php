<?php

namespace App\Controllers;


class CommentController
{
    public function index(\WP_REST_Request $request)
    {
        $id = (int)$request->get_param('id');

        $comments = get_comments([
            'post_id' => $id,
            'status' => 'approve'
        ]);


        return [
            'commentsEnabled' => comments_open($id),
            'comments' => $this->organizeComments($comments),
        ];
    }

    function organizeComments($comments)
    {
        $organized = [];

        foreach ($comments as $comment) {
            array_push($organized, $this->findChild($comment, $comments));
        }

        $cleaned = [];
        foreach ($organized as $item) {
            if (!$item->comment_parent) {
                array_push($cleaned, $item);
            }
        }

        $cleared = [];

        foreach ($cleaned as $item) {
            array_push($cleared, $this->clearComment($item));
        }

        return $cleared;
    }

    public function findChild(\WP_Comment $parent, $comments)
    {
        $children = [];

        foreach ($comments as $comment) {
            if ($comment->comment_parent == $parent->comment_ID) {
                array_push($children, $this->findChild($comment, $comments));
            }
        }

        $parent->comment_children = $children;

        return $parent;
    }

    public function clearComment(\WP_Comment $comment)
    {
        $children = [];

        if ($comment->comment_children) {
            foreach ($comment->comment_children as $child) {
                array_push($children, [
                    'id' => $child->comment_ID,
                    'author' => $child->comment_author,
                    'email' => $child->comment_author_email,
                    'date' => $child->comment_date_gmt,
                    'comment' => $child->comment_content,
                    'children' => $children,
                    'avatar' => get_avatar_url($child->comment_author_email)
                ]);
            }
        }

        return [
            'id' => $comment->comment_ID,
            'author' => $comment->comment_author,
            'email' => $comment->comment_author_email,
            'date' => $comment->comment_date_gmt,
            'comment' => $comment->comment_content,
            'children' => $children,
            'avatar' => get_avatar_url($comment->comment_author_email)
        ];
    }

    public function store(\WP_REST_Request $request)
    {
        $params = $request->get_body_params();
        $response = [
            'success' => false,
            'message' => 'প্রদত্ত তথ্য সঠিক নয় ।'
        ];

        $rules = [
            'post-id' => function () use ($params) {
                global $wpdb;

                $query = "
                select count(ID) as count
                  from {$wpdb->posts}
                  where ID = %d
                  limit 1
                ";


                $result = $wpdb->get_row($wpdb->prepare($query, (int)$params['post-id']));

                return !!$result;
            },
            'comment-id' => function () use ($params) {

                if ($params['comment-id'] == 0) {
                    return true;
                }

                global $wpdb;

                $query = "
                select count(*) as count
                  from {$wpdb->comments}
                  where comment_ID = %d
                    and comment_post_ID = %d
                  limit 1
                ";


                $result = $wpdb->get_row($wpdb->prepare($query, (int)$params['comment-id'], (int)$params['post-id']));

                return !!$result;
            },
            'name' => FILTER_SANITIZE_STRING,
            'email' => FILTER_VALIDATE_EMAIL,
            'comment' => FILTER_SANITIZE_STRING
        ];


        foreach ($rules as $name => $filters) {
            if (!array_key_exists($name, $params)) {
                return [
                    'success' => false,
                    'message' => 'সব ক্ষেত্র পূরণ করুন'
                ];
            }

            if (is_callable($filters)) {
                $valid = call_user_func($filters);
                if (!$valid) {
                    return $response;
                }

                continue;
            }

            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    if (!filter_var($params[$name], $filter)) {
                        return $response;
                    }
                }

                continue;
            }

            if (!filter_var($params[$name], $filters)) {
                return $response;
            }
        }

        wp_insert_comment([
            'comment_approved' => 0,
            'comment_author' => $params['name'],
            'comment_author_email' => $params['email'],
            'comment_author_IP' => $this->getClientIp(),
            'comment_content' => $params['comment'],
            'comment_post_ID' => (int)$params['post-id'],
            'comment_parent' => (int)$params['comment-id'],
            'comment_type' => 'comment'
        ]);

        return [
            'success' => true,
            'message' => 'মন্তব্য করার জন্য আপনাকে ধন্যবাদ ।'
        ];
    }

    public function getClientIp()
    {
        $ipAddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
        else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_X_FORWARDED']))
            $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
        else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_FORWARDED']))
            $ipAddress = $_SERVER['HTTP_FORWARDED'];
        else if (isset($_SERVER['REMOTE_ADDR']))
            $ipAddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipAddress = 'UNKNOWN';
        return $ipAddress;
    }
}