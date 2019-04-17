<?php

namespace Airan\AliOssForm;

use Encore\Admin\Form\Field;

class Image extends Field
{
    protected $view = 'alioss-form::image';
    protected static $css = [
        'vendor/cosyphp/alioss-form/style.css',
    ];
    protected static $js = [
        'vendor/cosyphp/alioss-form/Sortable.min.js',
        'vendor/cosyphp/alioss-form/plupload-2.1.2/js/plupload.full.min.js',
        'vendor/cosyphp/alioss-form/upload.image.js',
    ];
    public function render()
    {
        $name = $this->formatName($this->column);
        $token = csrf_token();
        $this->script = <<<EOT
init_upload('{$name}_upload',true,'{$token}');
EOT;
        return parent::render();
    }
}