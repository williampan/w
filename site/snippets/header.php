<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0">

	<?php if ($page->template() == "project"): ?>
		<title><?php echo $page->title()->html() ?> — <?php echo $site->title()->html() ?></title>
	<?php else: ?>
		<title><?php echo $site->title()->html() ?></title>
	<?php endif; ?>

	<meta name="description" content="<?php echo $site->description()->html() ?>">
	<link rel="shortcut icon" type="image/png" href="assets/images/re_favicon.png" />

	<?php echo css("assets/css/css.css") ?>
</head>
<body>

	<header>
	 	<?php 	if ($page->prevVisible()):
					$prev = $page->prevVisible();
				else:
					$prev = $site->children()->visible()->last();
				endif;
		?>
		<?php 	if ($page->nextVisible()):
					$next = $page->nextVisible();
				else:
					$next = $site->children()->visible()->first();
				endif;
		?>


		<nav>
			<?php if ($page->template() == "project"): ?>

			<a href="<?php echo $prev->url() ?>" id="top-prev">
				←
			</a>&emsp;
			<a href="<?php echo $next->url() ?>" id="top-next">
				→
			</a>
			<?php endif; ?>
		</nav>

		<?php if ($page->template() == "project"): ?>

		<nav id="index-link">
			<a href="<?php echo $site->url() ?>">Index</a>
		</nav>

		<a href="<?php echo $prev->url() ?>">
			<div class="navigable side-nav side-nav-left">
				<div></div>
				<span>←<br><br>上<br>一<br>件<br><br>←</span>
			</div>
		</a>

		<a href="<?php echo $next->url() ?>">
			<div class="navigable side-nav side-nav-right">
				<div></div>
				<span>→<br><br>下<br>一<br>件<br><br>→</span>
			</div>
		</a>

		<?php endif; ?>
	</header>
