jQuery().ready(function($){

	var boxWidth = $('#Dropzone').data('boxwidth');
	var boxHeight = boxWidth;//$('#Dropzone').data('boxheight');
	var width = $('#Dropzone').data('width');
	var height = $('#Dropzone').data('height');
	var rotate = $('#Dropzone').data('rotate');
	var minWidth = $('#Dropzone').data('minwidth');
	var minHeight = $('#Dropzone').data('minheight');
	var maxWidth = $('#Dropzone').data('maxwidth');
	var maxHeight = $('#Dropzone').data('maxheight');
	var aspect = $('#Dropzone').data('aspect');
	if(boxWidth == 0){
		boxWidth = $('#Dropzone').width();
	}

	var jcrop_api;
  $('#Dropzone').data('dropzoneInterface').backend.on('addedfile',function(){
		$('#oldImagePrev').remove();
		if (this.files[1]!=null){
			this.removeFile(this.files[0]);
		}
	});
	$('#Dropzone').data('dropzoneInterface').backend.on('complete',function(){
		setTimeout(function(){
			var boxHeight = $('#Dropzone').data('boxheight');
			var pic_real_width = document.querySelector('#cropArea').naturalWidth;
			var pic_real_height = document.querySelector('#cropArea').naturalHeight;
			if(pic_real_width < minWidth || pic_real_height < minHeight){
				$('#Dropzone').data('dropzoneInterface').clear();
				alert("Uploaded Image is too Small. must have at least "+minWidth+"x"+minHeight+"px");
			}
			
			$('#cropArea').css("width","auto");
			$('#cropArea').css("height",boxHeight+"px");
			$('.jcrop-holder').css("width","100%");

			$('#cropArea').cropper({
				aspectRatio: 1,
				viewMode: 0,
				dragMode: 'move',
				autoCropArea: 0,
				restore: true,
				modal: false,
				guides: true,
				highlight: false,
				cropBoxMovable: false,
				cropBoxResizable: false,
				minContainerWidth: boxWidth,
				minContainerHeight: boxHeight,
				minCanvasWidth: boxWidth,
				minCanvasHeight: boxHeight,
				minCropBoxWidth: boxWidth,
				minCropBoxHeight: boxHeight,
				crop: function (e) {
					$("#Form_ImageFrom_posX").val(Math.round(e.x));
					$("#Form_ImageFrom_posY").val(Math.round(e.y));
					$("#Form_ImageFrom_height").val(Math.round(e.height));
					$("#Form_ImageFrom_width").val(Math.round(e.width));
					$("#Form_ImageFrom_rotate").val(Math.round(e.rotate));
					setCoords(e);
				},
				ready: function(){
					$('.cropper-container').css("height",boxHeight+"px");
					if(pic_real_width > pic_real_height){
						canvasData = $('#cropArea').cropper('getCanvasData');
						canvasData.left = 0;
						canvasData.top = 0;
						canvasData.width = (boxWidth/pic_real_height)*pic_real_width;
						canvasData.height = boxHeight;
						$('#cropArea').cropper('setCanvasData',canvasData);
						setTimeout(function(){
							cropBoxData = $('#cropArea').cropper('getCropBoxData');
							cropBoxData.top = 0;
							cropBoxData.left = 0;
							cropBoxData.wdith = boxHeight;
							cropBoxData.height = boxHeight;
							$('#cropArea').cropper('setCropBoxData',cropBoxData);
							console.log("cropBoxData:");
							console.log(cropBoxData);
						},100);
					} else{
						canvasData = $('#cropArea').cropper('getCanvasData');
						canvasData.left = 0;
						canvasData.top = 0;
						canvasData.width = boxWidth;
						canvasData.height = boxHeight;
						$('#cropArea').cropper('setCanvasData',canvasData);
						console.log("canvas data 1:");
						console.log($('#cropArea').cropper('getCanvasData'));

						setTimeout(function(){
							cropBoxData = $('#cropArea').cropper('getCropBoxData');
							cropBoxData.top = 0;
							cropBoxData.left = 0;
							cropBoxData.wdith = boxWidth;
							cropBoxData.height = boxHeight;
							$('#cropArea').cropper('setCropBoxData',cropBoxData);
							console.log(cropBoxData);
							console.log("getCropBoxData 2:");
							console.log($('#cropArea').cropper('getCropBoxData'));
						},100);
					}
				}
			});
			
			$('#rotateLeft, #rotateRight, #zoomIn, #zoomOut, #moveLeft, #moveRight, #moveUp, #moveDown').on('click', function () {
				 var options = {
					aspectRatio: 1,
					//viewMode: 3,
					dragMode: 'move',
					//autoCropArea: 1,
					restore: false,
					modal: false,
					guides: true,
					highlight: true,
					cropBoxMovable: false,
					cropBoxResizable: false,
					autoCropArea: 0.8,
					crop: function (e) {
						$("#Form_ImageFrom_posX").val(Math.round(e.x));
						$("#Form_ImageFrom_posY").val(Math.round(e.y));
						$("#Form_ImageFrom_height").val(Math.round(e.height));
						$("#Form_ImageFrom_width").val(Math.round(e.width));
						$("#Form_ImageFrom_rotate").val(Math.round(e.rotate));
						setCoords(e);
					}
				};
				var $this = $(this);
				var $image = $('#cropArea');
				var data = $this.data();
				var cropper = $image.data('cropper');
				var cropped;
				var $target;
				var result;

				if (cropper && data.method) {
					data = $.extend({}, data); // Clone a new one
					if (typeof data.target !== 'undefined') {
						$target = $(data.target);
						if (typeof data.option === 'undefined') {
							try {
								data.option = JSON.parse($target.val());
							} catch (e) {
								console.log(e.message);
							}
						}
					}

					cropped = cropper.cropped;

					switch (data.method) {
						case 'rotate':
							if (cropped && options.viewMode > 0) {
								$image.cropper('clear');
							}
							break;
						case 'zoom':
							if (cropped && options.viewMode > 0) {
								$image.cropper('clear');
							}
							break;
					}

					result = $image.cropper(data.method, data.option, data.secondOption);

					switch (data.method) {
						case 'rotate':
							if (cropped && options.viewMode > 0) {
								$image.cropper('crop');
							}
							break;
					}

					if ($.isPlainObject(result) && $target) {
						try {
							$target.val(JSON.stringify(result));
						} catch (e) {
							console.log(e.message);
						}
					}
				}
			});
		},500);
	});
});

// Simple event handler, called from onChange and onSelect
// event handlers, as per the Jcrop invocation above
function setCoords(e) {

	var fieldname = $('#Dropzone').data('fieldname');
	
	$('#Form_'+fieldname+'From_posX').val(Math.round(e.x));
	$('#Form_'+fieldname+'From_posY').val(Math.round(e.y));
	$('#Form_'+fieldname+'From_width').val(Math.round(e.width));
	$('#Form_'+fieldname+'From_height').val(Math.round(e.height));
	$('#Form_'+fieldname+'From_rotate').val(Math.round(e.rotate));
};

