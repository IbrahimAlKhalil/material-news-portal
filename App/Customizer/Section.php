<?php

namespace App\Customizer;


use App\Customizer\Controls\CategoryDropdown;
use Kirki;
use WP_Customize_Manager;


abstract class Section
{

    /**
     * Kirki config id
     *
     * @var string $configId
     * */

    public static $configId = 'mnpit-news-portal';

    /**
     * Prefix for all the customizer section, fields and settings
     *
     * @var string $prefix
     * */
    public static $prefix = 'mnp';

    /**
     * Section info
     *
     * @var array $section
     * */
    protected $section;

    protected static $sectionPriority = 15;

    /**
     * @return array
     * */

    protected abstract function fields();

    /**
     * @return string
     */

    protected static function getSectionId()
    {
        $namespace = static::class;
        $sectionId = strtolower(substr($namespace, strrpos($namespace, '\\') + 1));

        return $sectionId;
    }


    /**
     * Glue for get_theme_mode
     *
     * @param string $field
     * @param mixed $default
     * @return mixed
     */

    public static function Get($field, $default = '')
    {
        $sectionId = self::getSectionId();

        $prefix = static::$prefix;

        return get_theme_mod("$prefix-$sectionId-$field", $default);
    }

    public function __construct()
    {
        $prefix = static::$prefix;

        $sectionInfo = $this->section;
        $fields = $this->fields();

        $sectionId = $prefix . '-' . self::getSectionId();

        // Register section

        Kirki::add_section($sectionId, [
            'title' => $sectionInfo['title'],
            'description' => $sectionInfo['description'],
            'priority' => self::$sectionPriority += 5
        ]);

        // Register settings and fields

        $fieldPriority = 10;

        foreach ($fields as $key => $field) {

            // Register settings

            $settingId = "$sectionId-$key";
            $transport = !isset($field['postMessage']) ? 'postMessage' : ($field['postMessage'] ? 'postMessage' : 'refresh');

            add_action('customize_register', function (WP_Customize_Manager $customizer) use ($sectionId, $settingId, $transport) {
                $customizer->add_setting($settingId, [
                    'type' => 'theme_mod',
                    'capability' => 'edit_theme_options',
                    'transport' => $transport
                ]);
            });

            if ($field['type'] == 'class') {
                add_action('customize_register', function (WP_Customize_Manager $customizer) use ($sectionId, $settingId, $field) {
                    $args = array_merge_recursive($field['args'], [
                        'section' => $sectionId
                    ]);

                    $customizer->add_control(new $field['class']($customizer, $settingId, $args));
                });

                continue;
            }


            // Register Field

            $args = array_merge_recursive([
                'priority' => $fieldPriority += 5,
                'section' => $sectionId,
                'settings' => $settingId
            ], $field);

            if (isset($field['selector'])) {
                $args['partial_refresh'] = [
                    "$settingId" => [
                        'selector' => $field['selector'],
                        'container_inclusive' => false,
                        'render_callback' => function () use ($settingId) {
                            return get_theme_mod($settingId);
                        }
                    ]
                ];
            }

            Kirki::add_field(static::$configId, $args);
        }
    }
}