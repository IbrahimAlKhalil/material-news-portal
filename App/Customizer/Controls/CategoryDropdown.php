<?php

namespace App\Customizer\Controls;

use WP_Customize_Control;
use WP_Customize_Manager;

class CategoryDropdown extends WP_Customize_Control
{

    /**
     * @var boolean $multiple
     * */
    public $multiple = false;

    public function __construct(WP_Customize_Manager $manager, string $id, array $args = [])
    {
        parent::__construct($manager, $id, $args);

        if (isset($args['multiple'])) {
            $this->multiple[$args['multiple']];
        }
    }

    public function render_content()
    {
        ?>
        <label>
            <span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
            <select <?php echo $this->multiple ? 'multiple' : '' ?> <?php $this->link(); ?>
                    id="<?php echo $this->id ?>" data-placeholder="Select Categories">
                <?php
                foreach ($this->getCategories() as $category) {
                    echo '<option value="' . $category['id'] . '" ' . selected($this->value(), $category['id']) . '>' . $category['name'] . '</option>';
                }
                ?>
            </select>
        </label>

        <script>
            $(document).ready(function () {
                $('#<?php echo $this->id ?>').select2();
            });
        </script>
        <?php
    }


    protected function getCategories()
    {
        global $wpdb;

        $categoryNames = ["'post-slider'", "'big-cards'", "'selected-posts'", "'%e0%a6%ab%e0%a6%bf%e0%a6%9a%e0%a6%be%e0%a6%b0'", "'Uncategorized'"];

        $query = "
        select {$wpdb->terms}.term_id as id, slug, name
          from {$wpdb->terms}
          join {$wpdb->term_taxonomy} on {$wpdb->terms}.term_id = {$wpdb->term_taxonomy}.term_id
          where {$wpdb->terms}.slug not in (" . implode(', ', $categoryNames) . ") and {$wpdb->term_taxonomy}.taxonomy = %s
        ";

        $queryPrepared = $wpdb->prepare($query, 'category');

        return $wpdb->get_results($queryPrepared, ARRAY_A);
    }
}