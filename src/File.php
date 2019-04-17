<?php

namespace Airan\AliOssForm;

use Encore\Admin\Form\Field;

class File extends Field
{
    protected $view = 'alioss-form::file';
    protected static $css = [
        'vendor/cosyphp/alioss-form/style.css',
    ];
    protected static $js = [
        'vendor/cosyphp/alioss-form/plupload-2.1.2/js/moxie.js',
        'vendor/cosyphp/alioss-form/plupload-2.1.2/js/plupload.dev.js',
        'vendor/cosyphp/alioss-form/upload.file.js',
    ];
    public function render()
    {
        $name = $this->formatName($this->column);
        $token = csrf_token();
        $this->script = <<<EOT
init_upload_file('{$name}_upload',false,'{$token}');
EOT;
        return parent::render();
    }
}
