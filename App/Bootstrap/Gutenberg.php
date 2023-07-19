<?php

namespace App\Bootstrap;


class Gutenberg
{
    public function __construct()
    {
        add_action('init', function () {
            wp_register_script(
                'gutenberg-boilerplate-es5-step01', getAsset('gutenberg.bundle.js'),
                ['wp-blocks', 'wp-element']
            );

            register_block_type('mnp/wtf', [
                'editor_script' => 'gutenberg-boilerplate-es5-step01',
            ]);
        });
    }


}