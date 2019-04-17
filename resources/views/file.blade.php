<div class="{{$viewClass['form-group']}} {!! !$errors->has($errorKey) ? '' : 'has-error' !!}">
    <label for="{{$id}}" class="{{$viewClass['label']}} control-label">{{$label}}</label>
    <div class="{{$viewClass['field']}}">
        @include('admin::form.error')
        <?php $oss_url = config('alioss')['OSS_URL'];?>
        @if(old($column, $value))
            <div class="input-group file-caption-main">
                <div class="file-caption form-control  kv-fileinput-caption icon-visible" tabindex="500">
                    <span class="file-caption-icon"><i class="glyphicon glyphicon-file"></i></span>
                    <input id="js_upload_file" class="Js_upload_input file-caption-name" name="{{$column}}" placeholder="Select file..." value="{{old($column, $value)}}">
                </div>
                <div class="input-group-btn input-group-append">
                    <div id="{{$column}}_upload" tabindex="500" class="btn btn-primary btn-file">
                        <i class="glyphicon glyphicon-folder-open"></i>&nbsp;  <span class="hidden-xs">浏览</span>
                    </div>
                </div>
            </div>
        @else
            <div class="input-group file-caption-main">
                <div class="file-caption form-control  kv-fileinput-caption icon-visible" tabindex="500">
                    <span class="file-caption-icon"><i class="glyphicon glyphicon-file"></i></span>
                    <input id="js_upload_file" class="Js_upload_input file-caption-name" name="{{$column}}" placeholder="Select file..." value="">
                </div>
                <div class="input-group-btn input-group-append">
                    <div id="{{$column}}_upload" tabindex="500" class="btn btn-primary btn-file">
                        <i class="glyphicon glyphicon-folder-open"></i>&nbsp;  <span class="hidden-xs">浏览</span>
                    </div>
                </div>
            </div>
        @endif
        @include('admin::form.help-block')
    </div>
    <div id="progress_box" style="position:absolute;z-index:99;width:100%;text-align:center;display:none;">
        <canvas id="progress_canvas" width="90px" height="90px" style="margin-top: 10px;"></canvas>
    </div>
</div>