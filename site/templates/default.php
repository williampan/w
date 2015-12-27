<?php snippet('header') ?>

	<div class="side-nav side-nav-left">
	  <div></div>
	</div>
	<div class="side-nav side-nav-right">
	  <div></div>
	</div>

  <main>

  <article> 
  	<h1 class="post-title"><?php echo $page->title()->html() ?></h1>
  	<section class="post-content">
  		<?php echo $page->text()->kirbytext() ?>
  	</section>
  </article>

  </main>

<?php snippet('footer') ?>