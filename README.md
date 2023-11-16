# TheTigerDuck cropfield
CropField creates a ImageUploadField,
allowing to select a CropArea in Frontend using Jcrop
This new Version works with SS5 and does not depend on unclecheese/dropzone anymore.
But it forks part of unclecheese's code.

@author TheTigerDuck <janosch@spleen.de>

<b>Usage</b>

    function ImageFrom(){
        $fields = new FieldList(
            $cf = new CropField("Image", "Image")
        );
        $cf->setBoxWidth(600);
        $cf->setBoxHeight(6000);
        $cf->setMaxWidth(0);
        $cf->setMaxHeight(0);
        $cf->setAspectRatio(1);
        $actions = new FieldList(
            new FormAction("submit", "submit")
        );
        return new Form($this, "ImageFrom", $fields, $actions);
    }

    function submit($data,$form){
        $original = Image::get()->byID($data['Image']['ID']);
        $cropped = $original->CroppedFromPos($data['Image']['width'], $data['Image']['height'], $data['Image']['posX'], $data['Image']['posY']);
        //overwrite the Original Image by the Cropped one
        $file = File::create();
        // Save file into backend
        $config = [
            'conflict' => AssetStore::CONFLICT_OVERWRITE,
            'visibility' => AssetStore::VISIBILITY_PUBLIC
        ];
        //genarate a unique filename to force regenerating image versions
        $hash = md5(rand().$profil->Email.$data['ProfilBild']['width'].$data['ProfilBild']['height'].$data['ProfilBild']['posX'].$data['ProfilBild']['posY'].$data['ProfilBild']['rotate']);
        $file->setFromLocalFile(Director::baseFolder() . "/public/" . $cropped->getSourceURL(), "Profilbilder/cropped/ProfileImage{$profil->ID}-{$hash}.".$cropped->getExtension(), null, null, $config);
        $file->write();
        $file->ClassName = Image::class;
        $file->write();
        $file->publishFile();
        $image = Image::get()->byID($file->ID);
        $image->publishSingle();
        $original->deleteFile();
        $original->doArchive();
        $profil->ImageID = $file->ID;
        $profil->write();
    }
