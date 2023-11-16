<div class="$CSSSize" style="background: #fff;">
    <input type="hidden" id="Form_{$Name}From_posX" class="numeric text hidden" name="{$Name}[posX]" value="$posX">
	<input type="hidden" id="Form_{$Name}From_posY" class="numeric text hidden" name="{$Name}[posY]" value="$posY">
	<input type="hidden" id="Form_{$Name}From_width" class="numeric text hidden" name="{$Name}[width]" value="$width">
	<input type="hidden" id="Form_{$Name}From_height" class="numeric text hidden" name="{$Name}[height]" value="$height">
	<input type="hidden" id="Form_{$Name}From_rotate" class="numeric text hidden" name="{$Name}[rotate]" value="$rotate">
	<img id="cropArea" data-dz-thumbnail style="max-height: {$max_height}px; max-width: 100%;">
	<span class="file-progress-holder">
		<span class="file-progress-wrap">
			<span class="file-progress" data-dz-uploadprogress></span>
		</span>
	</span>
	<button id="rotateLeft" type="button" class="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left">
		<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="" data-original-title="$().cropper(&quot;rotate&quot;, -45)">
			&#8630;
		</span>
	</button>
	<button id="rotateRight" type="button" class="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right">
		<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="" data-original-title="$().cropper(&quot;rotate&quot;, 45)">
			&#8631;
		</span>
	</button>
	<button id="zoomIn" type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="Zoom In">
		<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="" data-original-titel="$().cropper(&quot;zoom&quot;, 0.1)">
			&#8853;
		</span>
	</button>
	<button id="zoomOut" type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="Zoom Out">
		<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="" data-original-title="$().cropper(&quot;zoom&quot;, -0.1)">
			&#8854;
		</span>
	</button>
	<button id="moveLeft" type="button" class="btn btn-primary" data-method="move" data-option="-10" data-second-option="0" title="Move Left">
		<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;move&quot;, -10, 0)">
			&#8592;
		</span>
	</button>
	<button id="moveRight" type="button" class="btn btn-primary" data-method="move" data-option="10" data-second-option="0" title="Move Right">
		<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;move&quot;, 10, 0)">
			&#8594;
		</span>
	</button>
	<button id="moveUp" type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="-10" title="Move Up">
		<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;move&quot;, 0, -10)">
			&#8593;
		</span>
	</button>
	<button id="moveDown" type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="10" title="Move Down">
		<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;move&quot;, 0, 10)">
			&#8595;
		</span>
	</button>
	<style>
		.btn-primary{
			display: inline-block;
			padding: 0;
			text-align: center;
			margin: 5px 0 0;
		}
	</style>
</div>
