<?php  while (have_posts()) : the_post(); ?>
<?php  if (has_post_thumbnail( $post->ID ) ) { 
$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' );}
$index = $wp_query->current_post + 1;
?>

<?php //print_r($wp_query); 
/*
<header class="intro-header">
  <div class="hero-height">
    <div class="hero-img" style="background-image:url(<?= $image[0]; ?>);"></div>
  </div>
</header>
*/
?>
<section class="content-section">
 <div class="container">
      <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12" >
       <div class="intro">
         <div class="row">
         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3">
         <div class="sidebar" id="sidebar" data-aos="fade-in" data-aos-offset="200" data-aos-easing="ease" data-aos-duration="800" data-aos-delay="0">
    <h1><?php the_title();?></h1>
    <div class="intro-meta">
     <span>Case — <?= rwmb_meta( '_project_case_text'); ?></span>
     <span class="visit-site"><a class="shape shape--inline" href="<?= rwmb_meta( '_project_url'); ?>" target="_blank">Visit Site<svg class="icon-big-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.3 5.8" enable-background="new 0 0 29.3 5.8">
        <path class="st0" d="M25.8 0l-.6.8 1.9 1.6h-27.1v1h27.1l-1.9 1.6.6.8 3.5-2.9z"></path></svg></a></span>
    </div>
    
     <?php get_template_part('templates/share'); ?>
         </div>
    
    </div>
 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-9" >
        
         <div class="intro-content" data-aos="fade-in" data-aos-offset="200" data-aos-easing="ease" data-aos-duration="800" data-aos-delay="50">
          <?php the_content();?>
          </div>
          
          <article <?php post_class('project-entry'); ?>>
         <div class="page-builder-styles">
        

    <?php 
   $group_values = rwmb_meta( 'page_builder_group' );
   foreach ( $group_values as $group_value ) {
        //print_r($group_values);
		$grid_gallery = $group_value['grid_gallery'];
		$full_width_page = $group_value['full_width_page'];
		$plain_text = $group_value['plain_text_area'];
		$cover_img = $group_value['full_width_cover'];
		$youtube_player = $group_value['vimeo_player'];
		$icon_values = $group_value['icon_group']; 
		$copy_left = $group_value['copy_left']; 
		$img_right = $group_value['img_right']; 
		
	   //print_r($group_value);
	   $count_array = sizeof($icon_values);
	   switch ($count_array){  
			case '1':
			$class = 'col-xs-12 col-sm-6 col-md-12 col-item';
			break;
			case '2':
			$class = 'col-xs-12 col-sm-6 col-md-6 col-item';
			break;
			case '3':
			$class = 'col-xs-12 col-sm-6 col-md-4 col-item';
			break;
			case '4':
			$class = 'col-xs-12 col-sm-6 col-md-6 col-item';
			break;
			default:
			$class = 'col-xs-12 col-sm-6 col-md-4 col-item';
		  }
			  if ($icon_values) {
				echo '<div class="icon-section">';
				
				echo '<div class="row">';
				$i = 1;
				foreach ($icon_values as $val) {
				$thumb = $val['esw_thumb_img'];
				$title = $val['esw_thumb_title'];
				$copy = $val['esw_thumb_desc'];
				echo "<div class='".$class."'>";
				echo "<div class='thumbnail'>";
				echo "<figure class='img-holder' data-aos='fade-in' data-aos-offset='200' data-aos-easing='ease' data-aos-duration='800' data-aos-delay='100'>";
				
				foreach ($thumb as $thumb_id) {
				$attachment_id = $thumb_id; // attachment ID
				}
				$image_attributes = wp_get_attachment_image_src( $attachment_id, 'full');
				echo "<img src='".$image_attributes[0]."' alt='icon-ing' class='img-fluid'>";
				echo "</figure>";
				echo " <div class='desc-txt wow fadeInUp' data-aos='fade-in' data-aos-offset='200' data-aos-easing='ease' data-aos-duration='800' data-aos-delay='100'>";
				echo "<h3>{$title}</h3>";
				if ($copy) {
				echo "<p>{$copy}</p>";	
				}
				echo "</div>";
				echo "</div>";
				echo "</div>";
				$i++;
				}
				
				echo '</div>';
				
				echo '</div>';
				
				}
				
				if ($plain_text) {
				
				echo "<div class='row'>";
				echo "<div class='col-xs-12 col-sm-12'>";	
				echo "<div class='entry text-entry wow fadeInUp' data-aos='fade-in' data-aos-offset='200' data-aos-easing='ease' data-aos-duration='800' data-aos-delay='100'>$plain_text</div>";
				echo "</div>";
				echo "</div>";
				
				
				}
				
				// Copy Left & Img Right
				if ($copy_left) {
				//$grid_id =  explode(',', $grid_gallery);
				
				
				echo '<div class="row">';
				echo '<div class="col-xs-12 col-sm-12 col-md-5">';
				echo "<div class='text-entry wow fadeInUp' data-aos='fade-in' data-aos-offset='200' data-aos-easing='ease' data-aos-duration='800' data-aos-delay='100'>{$copy_left}</div>";
				echo '</div>';
				//img right
				$img_id =  $img_right;
				foreach ($img_id as $item) {
				if ($item) {
				$attachment_id = $item; // attachment ID
				$image_attributes = wp_get_attachment_image_src( $attachment_id, 'full'); // returns an array
				if( $image_attributes ) { ?>
    <div class="col-xs-12 col-sm-12 col-md-7">
      <figure class="thumbnail full_img wow fadeInUp" data-aos='fade-in' data-aos-offset='200' data-aos-easing='ease' data-aos-duration='800' data-aos-delay='100'><img src="<?php echo $image_attributes[0]; ?>" class="img-fluid"></figure>
    </div>
    <?php }
				//end images attr
				} 
				//e/o $item
				}
				//e/o grid
				
				echo "</div>";
				}
				//e/o gridGallery
				
				
				//Thumbnail Gallery
				if ($grid_gallery) {
				//$grid_id =  explode(',', $grid_gallery);
				$grid_id =  $grid_gallery;
				
				echo '<div class="row">';
				foreach ($grid_id as $item) {
				if ($item) {
				$attachment_id = $item; // attachment ID
				$image_attributes = wp_get_attachment_image_src( $attachment_id, 'full'); // returns an array
				if( $image_attributes ) { ?>
    <div class="col-xs-12 col-sm-6">
      <figure class="thumbnail wow fadeInUp entry" data-aos='fade-in' data-aos-offset='200' data-aos-easing='ease' data-aos-duration='800' data-aos-delay='100'><img class="img-fluid" src="<?php echo $image_attributes[0]; ?>"></figure>
    </div>
    <?php }
				//end images attr
				} 
				//e/o $item
				}
				//e/o grid
				
				echo "</div>";
				}
				//e/o gridGallery
				
				if ($full_width_page) {
				$full_width_id = $full_width_page;
				
				echo '<div class="row">';
				foreach ($full_width_id as $item) {
				if ($item) {
				$attachment_id = $item; // attachment ID
				$image_attributes = wp_get_attachment_image_src( $attachment_id, 'full'); // returns an array
				if( $image_attributes ) { ?>
    <div class="col-xs-12 col-sm-12">
      <figure class="wow fadeInUp full_img" data-aos='fade-in' data-aos-offset='200' data-aos-easing='ease' data-aos-duration='800' data-aos-delay='100'><img class="img-fluid" src="<?php echo $image_attributes[0]; ?>"></figure>
    </div>
    <?php }
				//end images attr
				} 
				//e/o $item
				}
				//e/o full_width_page
				echo '</div>';
				
				}
				//e/o full_width_page	
				if ($cover_img) {
				$cover_img = $cover_img;
				foreach ($cover_img as $item) {
				if ($item) {
				$attachment_id = $item; // attachment ID
				$image_attributes = wp_get_attachment_image_src( $attachment_id, 'full'); // returns an array
				if( $image_attributes ) { ?>
    <div class="full-cover-bg" style="background-image:url(<?php echo $image_attributes[0]; ?>);"></div>
    <?php }
				//end images attr
				} 
				//e/o $item
				}
				//e/o cover_img
				}
				//e/o cover_img
				
				if ($youtube_player) {
				
				echo '<div class="row">';
				echo "<div class='col-xs-12 col-sm-12'>";
				echo "<div class='thumbnail video_wrapper wow fadeInUp' data-aos='fade-in' data-aos-offset='200' data-aos-easing='ease' data-aos-duration='800' data-aos-delay='100'>";
                echo "<iframe id='ytplayer' type='text/html' width='720' height='405'
src='https://www.youtube.com/embed/".$youtube_player."?controls=0&enablejsapi=1&rel=0&showinfo=0&color=white&iv_load_policy=3'
frameborder='0' allowfullscreen></iframe>"; 
				echo "</div>";
				echo "</div>";
				echo "</div>";
				
				
				//end 
				} 
				//e/o vimeo_player
			}
				//e/o group_values
				?>
 
 		
        </div>
        <!--//page-builder-->
		
        
          </article>
          
          
           </div>
         
         </div>
			 </div>
			 <!--//intro-->
        </div>
       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7 offset-lg-4">
         
          
            </div>
         <!--//col-->
         </div>
      <!--//row-->
    
    
    
   
	</div>
	<!--//container-->
 
</section>




<?php endwhile; ?>