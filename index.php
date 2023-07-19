<!doctype html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="manifest" href="<?php echo get_theme_file_uri('manifest.json') ?>">
    <title><?php bloginfo('name') ?> - <?php bloginfo('description') ?></title>

    <!-- TODO: Add favicon -->
    <?php wp_head(); ?>
</head>
<body>
<div id="app"></div>
<?php wp_footer() ?>
<script>
    var saharaRoutes = {
        menu: "<?php route('menu') ?>",
        posts: "<?php route('posts') ?>",
        archiveUrl: "<?php echo get_post_type_archive_link('post') ?>",
        homeContents: "<?php route('home-contents') ?>",
        footer: "<?php route('footer') ?>",
        comments: "<?php route('comments') ?>",
        comment: "<?php route('comment') ?>",
        category: "<?php route('category') ?>",
        archive: "<?php route('archive') ?>",
        postView: "<?php route('post-view') ?>",
        search: "<?php route('search') ?>"
    };

    var saharaData = {
        logo: "<?php header_image() ?>",
        description: "<?php echo escapeNewLines(get_option('blogdescription')) ?>",
        mainMenu: <?php echo json_encode(getMenuArray('Header')) ?>,
        widgets: <?php echo json_encode(getSidebarWidgets(), true) ?>,
        methods: {},
        storageUrl: "<?php echo get_home_url() . '/wp-content/uploads/' ?>",
        categories: <?php echo json_encode(\App\Customizer\Sections\Categories::Get('categories')) ?>,
        dates: "<?php echo do_shortcode('[english_date] | [hijri_date] | [bangla_date] | [bangla_day] | [bangla_time]') ?>"
    };
</script>

<script src="<?php asset('vendors~main.bundle.js') ?>"></script>
<script src="<?php asset('main.bundle.js') ?>"></script>
</body>
</html>
