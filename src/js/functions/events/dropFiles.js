define([
    "js/functions/core/layoutReady"
], function () {
    $AEE.layoutReady(function(){
        var oneFile = false;
        var isMultiupload = true;
        var dragLeaveT;
        var uploads = [];
        var hasHtml = false;
        var htmlUrl;
        $AEE.inputs.dropFiles.input().fileupload({
            url: $AA.u.images,
            dataType: 'json',
            dropZone: $AEE.elements.$widget,
            formData: {directory: 'emaileditor'},
            beforeSend: function(xhr, data) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + $AA.token().get());
            },
            submit: function (e, data) {
                if (data.originalFiles.length == 1) {
                    oneFile = true;
                }
                if (!isMultiupload) {
                    return false;
                }
            },
            dragover: function () {
                $AEE.elements.$dropFilesCover.show();
                clearTimeout(dragLeaveT);
            },
            dragleave: function () {
                dragLeaveT = setTimeout(function () {
                    $AEE.elements.$dropFilesCover.hide();
                }, 100);
            },
            send: function (e, data) {
                console.log('UPLOAD FILE: '+data.files[0].name);
            },
            done: function (e, data) {
                var res = data.result;
                var url = res[Object.keys(res)[0]].url;
                var name = Object.keys(res)[0];
                var ext = $AEE.getExtension(name);
                uploads.push({
                    name: name,
                    url: url,
                    ext: ext
                });
                if (ext == 'html' || ext == 'htm' || ext == 'xhtml') {
                    hasHtml = true;
                    htmlUrl = url;
                }
                console.log('FILE UPLOADED: '+name);
            },
            fail: function (e, data) {
                console.log("FAIL:", data.errorThrown);
            },
            start: function (e) {
                $AEE.elements.$dropFilesCover.hide();
                $AEE.elements.$dropFilesProgressCover.show();
                $AEE.elements.$dropFilesProgressBar.width(0+'%');
                $AEE.elements.$dropFilesProgressBarText.text(0+'%');
            },
            progressall: function (e, data) {
                var progress = Math.min(100, parseInt(data.loaded / data.total * 100, 10));
                $AEE.elements.$dropFilesProgressBar.width(progress+'%');
                $AEE.elements.$dropFilesProgressBarText.text(progress+'%');
            },
            stop: function (e) {
                if (hasHtml) {
                    setTimeout(function () {
                        $AEE.elements.$dropFilesProgressCover.hide();
                        uploads = [];
                    }, 1500);
                    $.ajax({
                        url: htmlUrl,
                        timeout: 600000,
                        dataType: 'html',
                        type: 'GET',
                        cache: false,
                        ifModified: false,
                        success: function (data) {
                            var $block = $AEE.newBlock().appendTo($AEE.elements.$document).addClass('aee-html-block-item');
                            var $content = $block.data('$contentCell');
                            $content.html(data);
                            $content.css('padding', 0);
                            $content.css('border', 'none');
                            $content.find("a").each(function () {
                                $(this).removeAttr('target');
                            });
                            for (var i = 0; i < uploads.length; i++) {
                                if(typeof uploads[0] != 'undefined'){
                                    var $img = $content.find('img').filter(function(index){
                                        var src = $(this).attr('src');
                                        var index = src.lastIndexOf("/") + 1;
                                        var filename = src.substr(index);
                                        return uploads[i].name === filename;
                                    }).attr('src', uploads[i].url).attr('title', uploads[0].name).attr('alt', uploads[0].name);
                                }
                            }
                            $AEE.elements.$dropFilesProgressCover.hide();
                            $AEE.buildBlockListSetDisplay();
                            uploads = [];
                        },
                        error: function () {
                        },
                        beforeSend: function () {
                        },
                        complete: function () {
                        }
                    });
                } else {
                    if (oneFile) {
                        if (typeof uploads[0] != 'undefined' && $.inArray(uploads[0].ext, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'ico']) >= 0) {
                            var $block = $AEE.newBlock().appendTo($AEE.elements.$document).addClass('aee-image-block-item');
                            var $img = $('<img/>').attr({
                                src:uploads[0].url,
                                alt:uploads[0].name,
                                title:uploads[0].name
                            }).css({maxWidth: '100%'}).addClass('aee-image-block-image');
                            $block.data('$contentCell').html($img);
                            setTimeout(function () {
                                $block.data('automizy-dropped', true);
                                $AEE.setBlockSettings($block);
                            }, 20);
                        }
                    }
                    $AEE.elements.$dropFilesProgressCover.hide();
                    uploads = [];
                }
                hasHtml = false;
                oneFile = false;
            }
        });
    });
});