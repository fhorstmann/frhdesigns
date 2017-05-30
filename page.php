
 
<a class="back" href="<?= esc_url(home_url('/')); ?>">Go back</a>
<?php while (have_posts()) : the_post(); ?>
 
  <?php get_template_part('templates/page', 'header'); ?>
  <?php get_template_part('templates/content', 'page'); ?>
<?php endwhile; ?>
