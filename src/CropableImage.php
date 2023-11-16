<?php

namespace TheTigerDuck\Cropfield;

use SilverStripe\ORM\DataExtension;

class CropableImage extends DataExtension{
	public function CroppedFromPos($width, $height, $posX, $posY, $rotate){
		//$return = $this->owner->getFormattedImage('CroppedFromPos', $width, $height, $posX, $posY, $rotate);
        //return $return;
        $variant = $this->owner->variantName(__FUNCTION__, $width, $height, $posX, $posY, $rotate);
        return $this->owner->manipulateImage($variant, function (\SilverStripe\Assets\Image_Backend $backend) use($width, $height, $posX, $posY, $rotate) {
            $clone = clone $backend;
            $resource = clone $backend->getImageResource();
            $resource->rotate($rotate * -1)->crop($width, $height, $posX, $posY);
            $clone->setImageResource($resource);
            return $clone;
        });
	}

	public function generateCroppedFromPos($gd, $width, $height, $posX, $posY, $rotate){
		return $gd->rotate($rotate * -1)->crop($posY, $posX,$width,$height);
	}
}
