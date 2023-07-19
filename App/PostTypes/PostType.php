<?php

namespace App\PostTypes;


class PostType
{

    /**
     * register_post_type arguments
     *
     * @var array $postArgs
     * */
    protected $postArgs;
    /**
     * ACF fields for the post type
     *
     * @var array $fieldGroups
     * */
    protected $fieldGroups;

    private $defaultPostArgs = [
        "public" => true,
        "publicly_queryable" => true,
        "show_ui" => true,
        "show_in_rest" => false,
        "rest_base" => "",
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "capability_type" => "post",
        "map_meta_cap" => true,
        "hierarchical" => false,
        "query_var" => true
    ];
    private $defaultFieldGroupArgs = [
        'location' => [],
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'active' => 1,
    ];

    /**
     * @return string
     */

    static protected function getType()
    {
        $namespace = static::class;
        $type = strtolower(substr($namespace, strrpos($namespace, '\\') + 1));

        return $type;
    }

    protected function register()
    {
        add_action('init', function () {
            // Register post type
            register_post_type(self::getType(), array_merge_recursive($this->defaultPostArgs, $this->postArgs));

            // Register ACF field groups
            if (function_exists('acf_add_local_field_group')) {
                acf_add_local_field_group(array_merge_recursive($this->defaultFieldGroupArgs, $this->fieldGroups));
            }
        });
    }

    public function __construct()
    {
        $this->defaultFieldGroupArgs['location'] = [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => self::getType(),
                ],
            ]
        ];

        $this->register();
    }
}