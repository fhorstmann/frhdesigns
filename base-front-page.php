<?php

use Roots\Sage\Setup;
use Roots\Sage\Wrapper;

?>

<!doctype html>
<html <?php language_attributes(); ?>>
  <?php get_template_part('templates/head'); ?>
  <body <?php body_class(); ?>>
   
    <!--[if IE]>
      <div class="alert alert-warning">
        <?php _e('You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'sage'); ?>
      </div>
    <![endif]-->
    <div id='preloader'><div id='status'><div id='icons'></div></div></div>
<div id="barba-wrapper">
  <?php
      do_action('get_header');
      get_template_part('templates/header');
    ?>
  <div class="barba-container" data-namespace="<?= $post->post_name; ?>">
  
    <main class="main">
          <?php include Wrapper\template_path(); ?>
        </main><!-- /.main -->
     <?php
      do_action('get_footer');
      get_template_part('templates/footer');
      wp_footer();
    ?>
    </div>
</div>
     
     
    
  </body>
</html>
