<?php snippet('header') ?>

	<div class="side-nav side-nav-left">
		<div></div>
	</div>
	<div class="side-nav side-nav-right">
		<div></div>
	</div>

	<main>

		<article>
			<h1 class="title">
				<?php echo $page->title()->kirbytext() ?>
			</h1>
			<section class="content copy">
				<?php echo $page->text()->kirbytext() ?>
			</section>
			<section class="caption">
				<?php echo $page->links()->kirbytext() ?>
			</section>
		</article>

		<?php snippet("gallery") ?>

	</main>

<?php snippet("footer") ?>