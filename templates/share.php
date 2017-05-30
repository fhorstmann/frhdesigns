<div class="sidebar-info hidden-md-down">
  <div class="work-nav">
    <ul>
     <li><a href="<?= esc_url(home_url('/')); ?>work"><span data-toggle='tooltip' data-placement='right' title='go back to all topics' class='tool-tip ion-android-apps back'></span>All Work</a>
      </li>
     <li class="previous-post-link">
        <?php previous_post_link('%link', 'PREV <span data-toggle="tooltip" data-placement="right" title="previous section" class="ion-ios-arrow-right tool-tip"></span>'); ?>
      </li>
      <li class="next-post-link">
        <?php next_post_link('%link', '<span data-toggle="tooltip" data-placement="right" title="next section" class="ion-ios-arrow-left tool-tip"></span> NEXT'); ?>
      </li>
      <?php /*
      <li><span class="counter">2 /  <?php $posts = get_posts('post_type=projects'); 
// if ($post->ID)
//print_r($posts);
$count = count($posts); 
echo $count; 

?></span>
      </li>
      */
      ?>
    </ul>
   
  </div>
  <ul class="list-inline social-icons">
    <li class="linkedin list-inline-item"><a target="_blank" href="http://www.linkedin.com/shareArticle?mini=true&url=<?php echo get_permalink(); ?>" onclick="javascript:void window.open('http://www.linkedin.com/shareArticle?mini=true&url=<?php echo get_permalink(); ?>','1397509324816','width=700,height=550,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');return false;"><i class="ion-social-linkedin"></i></a>
    </li>
    <li class="facebook list-inline-item"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo get_permalink(); ?>" onclick="javascript:void window.open('https://www.facebook.com/sharer/sharer.php?u=<?php echo get_permalink(); ?>','1397509324816','width=700,height=550,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');return false;"><i class="ion-social-facebook"></i></a>
    </li>
    <li class="mailto list-inline-item"><a href="mailto:?subject=<?php echo the_title(); ?>&body=read this article <?php echo get_permalink(); ?>"><i class="ion-android-mail"></i></a>
    </li>
  </ul>
</div>