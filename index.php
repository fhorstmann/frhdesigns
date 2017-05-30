<section class="portfolio-grid">
  <div class="container">
    <div class="section-title" data-aos="fade-in" data-aos-offset="200" data-aos-easing="ease" data-aos-duration="800" data-aos-delay="0">
           <h2>My <span>Work</span></h2>
           
           
           <a class="filter-work" href="#" data-toggle="collapse" data-target="#filter-categories" aria-expanded="false" aria-controls="filter-categories">Filter</a>
           
           </div>
           
           <div class="filter-wrapper collapse" id="filter-categories">
             <div id="options">
  
  
  <div id="filters" class="button-group">
  <button class="button is-checked" data-filter="*">show all</button>
  <button class="button" data-filter=".metal">metal</button>
  
  
  
   <?php
			$args = array(
			'orderby'           => 'name', 
			'order'             => 'ASC',
			'hide_empty'        => false, 
			'exclude'           => array(), 
			'exclude_tree'      => array(), 
			'include'           => array(),
			'number'            => '', 
			'fields'            => 'all', 
			'slug'              => '',
			'parent'            => '',
			'hierarchical'      => true, 
			'child_of'          => 0,
			'childless'         => false,
			'get'               => '', 
			'name__like'        => '',
			'description__like' => '',
			'pad_counts'        => false, 
			'offset'            => '', 
			'search'            => '', 
			'cache_domain'      => 'core'
		); 

$terms = get_terms( 'project-category', $args );
if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
    $count = count( $terms );
    $i = 0;
    $term_list = '<ul class="my_term-archive">';
	 $term_list .= '<li><a href="'.esc_url(home_url('/')).'work">Everything</a></li>';
    foreach ( $terms as $term ) {
        $i++;
    	$term_list .= '<li><a href="' . get_term_link( $term ) . '" title="' . sprintf( __( 'View all post filed under %s', 'my_localization_domain' ), $term->name ) . '">' . $term->name . '</a></li>';
    	if ( $count != $i ) {
            $term_list .= '';
        }
        else {
            $term_list .= '</ul>';
        }
    }
    echo $term_list;
}

?>
  
  
</div>
  
 
 
</div>
             
             
           </div>
           
           
    <div class="row grid">
      
      <?php if (!have_posts()) : ?>
  <div class="alert alert-warning">
    <?php _e('Sorry, no results were found.', 'sage'); ?>
  </div>
  <?php get_search_form(); ?>
<?php endif; ?>

<?php while (have_posts()) : the_post(); ?>
  
  <div class="col-item col-xs-12 col-sm-12 col-md-6 metal" data-category="metal">
        <div class="thumbnail">
          <a class="intro-thumb" href="<?php the_permalink();?>">
            <figure>
              <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
              <img class="b-lazy img-fluid" alt="<?php the_title();?>" src="<?= $image[0]; ?>" data-src="<?= $image[0]; ?>">
            </figure>
            <div class="project-bg" data-color="<?= rwmb_meta( '_project_bg_color'); ?>" style="<?= rwmb_meta( '_project_bg_color'); ?>"></div>
            <div class="project-info">
              <h3>
                <?php the_title();?>
              </h3>
              <p>
                <?php the_excerpt();?>
              </p>
              <span class="category" data-cat="">Web</span>
              <svg class="icon-big-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.3 5.8" enable-background="new 0 0 29.3 5.8">
                <style type="text/css">
                  .st0 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #ffffff;
                  }
                </style>
                <path class="st0" d="M25.8 0l-.6.8 1.9 1.6h-27.1v1h27.1l-1.9 1.6.6.8 3.5-2.9z"></path>
              </svg>
               </div>
           </a>
        </div>
      </div>
  

      
      
      <?php endwhile; ?>
    </div>
  </div>
</section>
