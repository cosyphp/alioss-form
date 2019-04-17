(function(){
    var ringChart = function(canvas_id, curr) {
        var canvas = document.getElementById(canvas_id);
        var total = 100;
        var constrast = parseFloat(curr / total).toFixed(2); //比例
        if(constrast > 1) {return;}
        canvas.height = canvas.height + 0;
        var context = null;
        if (!canvas.getContext) { return;}
        // 定义开始点的大小
        var startArc = Math.PI * 1.5;
        // 根据占的比例画圆弧
        var endArc = (Math.PI * 2) * constrast;
        context = canvas.getContext("2d");
        // 圆心文字
        context.font = "16px Arial";
        context.fillStyle = '#ff801a';
        context.textBaseline = 'middle';
        var text = (Number(curr / total) * 100).toFixed(0) + "%";
        var tw = context.measureText(text).width;
        context.fillText(text, 45 - tw / 2, 45);
        // 绘制背景圆
        context.save();
        context.beginPath();
        context.strokeStyle = "#e7e7e7";
        context.lineWidth = "4";
        context.arc(45, 45, 30, 0, Math.PI * 2, false);
        context.closePath();
        context.stroke();
        context.restore();
        // 若为百分零则不必再绘制比例圆
        if (curr / total === 0) { return;}
        // 绘制比例圆
        context.save();
        context.beginPath();
        context.strokeStyle = "#ff801a";
        context.lineWidth = "4";
        context.arc(45, 45, 30, startArc, (curr % total === 0 ? startArc : (endArc + startArc)), false);
        context.stroke();
        context.restore();
    };

    var accessid = '', host = '', cdn_url = '', policyBase64 = '',
        signature = '', key = '', expire = 0, file_ext = '';

    //获取签名函数
    function get_signature(callback) {
        var now = timestamp = Date.parse(new Date()) / 1000;
        if (expire < now + 300) {//300s缓冲
            //ajax
            $.ajax({
                url:'/admin/alioss_param',
                type:'get',
                dataType:'json',
                async: false,//同步
                success:function(obj) {
                    accessid = obj['accessid'];
                    host = obj['host'];
                    cdn_url = obj['cdn_url'];
                    policyBase64 = obj['policy'];
                    signature = obj['signature'];
                    expire = parseInt(obj['expire']);
                    key = obj['dir'];
                    callback && callback();
                },
                error:function() {
                    alert("抱歉！获取签名错误！");
                }
            });
        }else{
            callback && callback();
        }
    }
    //重设plupload参数
    function set_upload_param(up, filename) {
        //获取签名
        get_signature(function(){
            new_multipart_params = {
                'key': key + '/' + filename,
                'policy': policyBase64,
                'OSSAccessKeyId': accessid,
                'success_action_status': '200',//让服务端返回200, 默认204
                'signature': signature,
            };
            up.setOption({
                'url': host,
                'multipart_params': new_multipart_params
            });
        });
    }
    //指定长度的随机字符串
    function random_string(len) {
        len = len || 32;
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    // 图片上传
    window.init_upload = function(id, multi, token){
        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button : id,//'pickfiles',
            url : '/admin/upload_file',
            flash_swf_url : './plupload-2.1.2/Moxie.swf',
            silverlight_xap_url : './plupload-2.1.2/Moxie.xap',
            multi_selection: multi,//false单选，true多选
            multipart_params: { '_token' : token },
            //过滤
            filters : {
                max_file_size : '5gb'
            },

            init: {
                FilesAdded: function(up, files) {
                    plupload.each(files, function(file) {
                        $('#progress_box').show();
                        ringChart('progress_canvas', 0);
                    });
                    uploader.start();//选择文件后立即上传
                },
                BeforeUpload: function(up, file) {
                    set_upload_param(up, file.name); //重设参数
                },
                UploadProgress: function(up, file) {
                    ringChart('progress_canvas', file.percent);
                },
                FileUploaded: function(up, file, info) {
                    var path = key + '/' + file.name;
                    $('input.Js_upload_input').val(path);
                    $('#progress_box').hide();
                },
                Error: function(up, err) {
                    alert("抱歉！出错了：" + err.message);
                }
            }
        });
        //初始化上传
        uploader.init();
    }
})();
