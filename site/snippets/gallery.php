<div class="thumbnails">
	<?php foreach($site->children()->visible() as $project): ?>
	
	<section class="thumbnail">
		<a href="<?php echo $project->url() ?>"> 
			<div class="thumb-image">
				<img class="lazy" 
					data-original="<?php echo $project->image('thumb.jpg')->url() ?>" 
					src="<?php echo $project->image('thumb.jpg')->url() ?>" 
					alt="<?php echo $project->title()->html() ?>" 
				/>
			</div>
			<div class="thumb-title">
				<span class="caption"><?php echo $project->title()->html() ?></span>
			</div>
		</a>
	</section>

	<?php endforeach ?>
</div>