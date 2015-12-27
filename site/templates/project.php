<?php snippet('header') ?>

	<main class="main" role="main">

		<article>
			<h1 class="title">
				<?php echo $page->title()->kirbytext() ?>
			</h1>
			<h2 class="subtitle">
				<?php echo $page->subtitle()->kirbytext() ?>
			</h2>
			<section class="content">
				<?php foreach ($page->images()->not("thumb.jpg") as $image): ?>
					<figure>
						<img data-original="<?php echo $image->url() ?>"
							src="<?php echo $image->url() ?>"
							class="lazy"
							width="<?php echo $image->width() ?>px"
							height="<?php echo $image->height() ?>px"
						/>
					</figure>
					<?php if ($image == $page->images()->not("thumb.jpg")->first() && $page->text()->kirbytext() != ""): ?>
						<div class="copy">
							<?php echo $page->text()->kirbytext() ?>
						</div>
					<?php endif ?>
				<?php endforeach ?>
			</section>
		</article>

	</main>

<?php snippet('footer') ?>
