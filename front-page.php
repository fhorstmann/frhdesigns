
<section class="portfolio-grid">
	<div class="container">
  <div class="section-title" data-aos="fade-in" data-aos-offset="200" data-aos-easing="ease" data-aos-duration="800" data-delay="0">
	  <h2>Feaured <span>Work</span></h2>
	  </div>
	<div class="row grid">
	<?php
$args = array(
   'post_type' => 'projects',
   'meta_key' => '_add_project',
   'posts_per_page' => 10,
   'order' => 'DESC',

	'meta_query' => array(
       array(
           'key' => '_add_project',
           'value' => 1,
           'compare' => 'IN',
       )
   )
);
$the_query = new WP_Query( $args );
$count = 0;

if ( $the_query->have_posts() ) {
	while ( $the_query->have_posts() ) {
		$the_query->the_post();
    $terms = '';
      foreach ( (array) wp_get_post_terms( get_the_ID(), 'project-category') as $term ) {
        if ( empty($term->slug ) )
            continue;
        $terms .= ' ' . sanitize_html_class($term->name, $term->term_id);
        $result = preg_replace('/[ ,]+/', ', ', trim($terms));
    } 
    ?>
   <div class="col-item col-xs-12 col-sm-12 col-md-12 col-lg-6">
			<div class="thumbnail">
			<a class="intro-thumb" href="<?php the_permalink();?>">
         		<figure>
         	<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
			   <img class="b-lazy img-fluid" alt="<?php the_title();?>" src="<?= $image[0]; ?>" data-src="<?= $image[0]; ?>">
			 </figure>
			<div class="project-bg" data-color="<?= rwmb_meta( '_project_bg_color'); ?>" style="<?= rwmb_meta( '_project_bg_color'); ?>"></div>
			<div class="project-info">
              <h3><?php the_title();?></h3>
              <p><?php the_excerpt();?></p>
                <span class="category" data-cat=""><?= $result; ?></span>
                       <svg class="icon-big-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.3 5.8" enable-background="new 0 0 29.3 5.8">
                        <style type="text/css">.st0 {
                                fill-rule: evenodd;
                                clip-rule: evenodd;
                                fill: #ffffff;
                            }</style>
                        <path class="st0" d="M25.8 0l-.6.8 1.9 1.6h-27.1v1h27.1l-1.9 1.6.6.8 3.5-2.9z"></path>
                    </svg>
              </div>
				</a>
			</div>
		</div>
 <?php
	  $count++;
	  }

} else {
	// no posts found
}
/* Restore original Post Data */
wp_reset_postdata();

?>
</div>
	</div>
</section>
