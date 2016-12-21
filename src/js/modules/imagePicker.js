define([
    "js/functions/core/ready",
    "js/functions/core/layoutReady"
], function () {
    $AEE.layoutReady(function(){
        var ImagePicker = function (obj) {
            var t = this;
            t.d = {
                $content:$('<div id="automizy-image-picker-content"></div>'),
                $previewBox:$('<div id="automizy-image-picker-preview-box"></div>'),
                $previewImageHelper:$('<span id="automizy-image-picker-preview-image-helper"></span>'),
                $previewImage:$('<img id="automizy-image-picker-preview-image" />'),
                $controlImageBox:$('<div id="automizy-image-picker-control-box"></div>'),

                image:false,

                inputs:{},
                buttons:{},
                dialogs:{},
                forms:{},

                img:{
                    src:'',
                    link:'',
                    alt:'',
                    title:'',
                    align:'center',
                    style:'',
                    width:'',
                    $elem:false,
                    $img:false
                },
                save:function(){},
                delete:function(){}
            };

            t.d.$previewBox.appendTo(t.d.$content);
            t.d.$previewImageHelper.appendTo(t.d.$previewBox);
            t.d.$previewImage.appendTo(t.d.$previewBox);
            t.d.$controlImageBox.appendTo(t.d.$content);

            t.d.buttons.cancel = $A.newButton({
                text: $A.translate('Cancel'),
                click: function () {
                    t.d.dialogs.widget.close();
                }
            });
            t.d.buttons.save = $A.newButton({
                skin: 'simple-orange',
                text: $A.translate('Save'),
                click: function () {
                    t.save();
                    t.d.dialogs.widget.close();
                }
            });
            t.d.buttons.delete = $A.newButton({
                text: $A.translate('Delete image'),
                click: function () {
                    t.delete();
                }
            });
            t.d.buttons.cancelGallery = $A.newButton({
                text: $A.translate('Cancel'),
                click: function () {
                    t.d.dialogs.gallery.close();
                }
            });

            t.d.dialogs.widget = $A.newDialog({
                id:'automizy-image-picker',
                positionY:'30px',
                content:t.d.$content,
                buttons:[
                    t.d.buttons.cancel,
                    t.d.buttons.save,
                    t.d.buttons.delete
                ]
            });
            t.d.dialogs.gallery = $A.newDialog({
                id:'automizy-image-picker-gallery',
                title:$A.translate('Image gallery'),
                buttons:[
                    t.d.buttons.cancelGallery
                ],
                open:function(){
                    $A.ajaxDocumentCover(true);
                    $.ajax({
                        url: $AEE.imageGalleryApiUrl(),
                        type:'GET',
                        dataType: 'json',
                        headers: {Authorization: 'Bearer ' + $AA.token().get()},
                        beforeSend: function (xhr, data) {
                            data.url = $AEE.imageGalleryApiUrl();
                        }
                    }).complete(function(){
                        $A.ajaxDocumentCover(false);
                    }).done(function(data){
                        t.d.dialogs.gallery.content().empty();
                        var $content = $('<div id="automizy-image-picker-gallery-content"></div>');
                        for(var i = 0; i < data.length; i++){
                            if(data[i].type !== 'file' || $.inArray(data[i].extension, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'ico']) <= -1){
                                continue;
                            }
                            var $box = $('<span class="automizy-image-picker-gallery-element"></span>').data({
                                src:data[i].url,
                                alt:data[i].alt,
                                title:data[i].title
                            }).click(function(){
                                var $this = $(this);
                                t.d.img.src = $this.data('src');
                                t.d.img.alt = $this.data('alt');
                                t.d.img.title = $this.data('title');
                                t.d.$previewImage.attr({
                                    src:t.d.img.src
                                }).show();
                                t.d.inputs.url.val(t.d.img.src);
                                t.d.inputs.alt.val(t.d.img.alt);
                                t.d.inputs.title.val(t.d.img.title);
                                t.d.dialogs.gallery.close();
                            });
                            var $helper = $('<span class="automizy-image-picker-gallery-image-helper"></span>');
                            var $img = $('<img/>').attr({
                                src:data[i].thumbnailUrl,
                                alt:data[i].alt,
                                title:data[i].title
                            }).data('url', data[i].url).error(function() {
                                var $t = $(this);
                                $t.attr('src', $t.data('url'));
                            });
                            $box.appendTo($content);
                            $helper.appendTo($box);
                            $img.appendTo($box);
                        }
                        t.d.dialogs.gallery.content($content);
                    })
                }
            });

            t.d.inputs.upload = $A.newInput({
                type:'file',
                name:'upload_file',
                target: t.d.$controlImageBox,
                accept: ['.jpg', '.jpeg', '.bmp', '.gif', '.png', '.ico'],
                create:function(){
                    t.d.inputs.upload.data('$automizyTd1').hide();
                    t.d.inputs.upload.data('automizyButton').width('300px');
                }
            });
            t.d.inputs.upload.input().change(function(){
                /*if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        t.d.$previewImage.attr('src', e.target.result).show();
                    };
                    reader.readAsDataURL(this.files[0]);
                }*/
            }).fileupload({
                url: $AEE.imageUploadApiUrl(),
                dataType: 'json',
                singleFileUploads: true,
                formData: {directory: 'emaileditor'},
                dropZone: t.d.dialogs.gallery.widget(),
                beforeSend: function (xhr, data) {
                    data.url = $AEE.imageUploadApiUrl();
                    var file = data.files[0];
                    xhr.setRequestHeader('Authorization', 'Bearer ' + $AA.token().get());
                    t.d.inputs.upload.data('automizyButton').disable();
                    t.d.inputs.upload.widget().find('input[type="file"]').prop('disabled', true);
                    t.d.inputs.url.disable();
                    t.d.buttons.gallery.disable();
                    t.d.buttons.cancel.disable();
                    t.d.buttons.save.disable();
                    t.closable(false);
                },
                progressall: function (e, data) {
                    t.d.inputs.upload.data('automizyButton').text(parseInt(data.loaded / data.total * 100, 10) + '%');
                },
                complete: function () {
                    t.d.inputs.upload.data('automizyButton').enable().text($A.translate('Select an other image from local computer'));
                    t.d.inputs.upload.widget().find('input[type="file"]').prop('disabled', false);
                    t.d.inputs.url.enable();
                    t.d.buttons.gallery.enable();
                    t.d.buttons.cancel.enable();
                    t.d.buttons.save.enable();
                    t.closable(true);
                },
                error: function () {
                    alert('Something wrong');
                },
                done: function (e, data) {
                    t.d.img.src = data.result[Object.keys(data.result)[0]].url;
                    t.d.$previewImage.attr({
                        src:t.d.img.src
                    }).show();
                    t.d.inputs.url.val(t.d.img.src);
                }
            });

            t.d.buttons.gallery = $A.newButton({
                id:'automizy-image-picker-gallery-button',
                text:$A.translate('Select image from gallery'),
                target: t.d.$controlImageBox,
                width:'300px',
                click:function(){
                    t.d.dialogs.gallery.open();
                }
            });

            t.d.inputs.url = $A.newInput({
                placeholder:$A.translate('Enter the image url here'),
                target:t.d.$controlImageBox,
                type:'text',
                labelWidth: 'auto',
                breakInput: false,
                create:function(){
                    this.input().focus(function(){
                        var $this = $(this);
                        $this.select();
                        $this.mouseup(function() {
                            $this.unbind("mouseup");
                            return false;
                        });
                    });
                },
                change:function(){
                    t.d.img.src = this.val();
                    t.d.$previewImage.attr('src', t.d.img.src).show();
                }
            });

            t.d.inputs.link = $A.newInput({
                label:$A.translate('Link to'),
                help:$A.translate('Defines a hyperlink, which is used to link to another page.'),
                value:'http://',
                change:function(){
                    t.d.img.link = this.val();
                }
            });
            t.d.inputs.alt = $A.newInput({
                label:$A.translate('ALT text'),
                help:$A.translate('The required alt attribute specifies an alternate text for an image, if the image cannot be displayed.'),
                change:function(){
                    t.d.img.alt = this.val();
                }
            });
            t.d.inputs.title = $A.newInput({
                label:$A.translate('Image title'),
                help:$A.translate('Provides additional information related to the element when a user places their mouse over the element.'),
                change:function(){
                    t.d.img.title = this.val();
                }
            });
            t.d.inputs.align = $A.newInput({
                label:$A.translate('Alignment'),
                help:$A.translate('Specifies the horizontal alignment'),
                type:'select',
                options:[
                    ['left', $A.translate('Left')],
                    ['center', $A.translate('Center'), true],
                    ['right', $A.translate('Right')]
                ],
                change:function(){
                    t.d.img.align = this.val();
                }
            });
            t.d.forms.moreSettigns = $A.newForm().draw().addGroup({
                text: 'Advanced settings',
                inputs: [
                    t.d.inputs.link,
                    t.d.inputs.alt,
                    t.d.inputs.title,
                    t.d.inputs.align
                ]
            }).drawTo(t.d.$content);

            t.d.$widget = t.d.dialogs.widget.widget();

            t.init();

            if (typeof obj !== 'undefined') {
                t.initParameter(obj);
            }

        };

        var p = ImagePicker.prototype;

        p.open = function(){
            return this.d.dialogs.widget.open.apply(this.d.dialogs.widget, arguments);
        };
        p.close = function(){
            return this.d.dialogs.widget.close.apply(this.d.dialogs.widget, arguments);
        };
        p.closable = function(){
            return this.d.dialogs.widget.closable.apply(this.d.dialogs.widget, arguments);
        };
        p.dialogTitle = function(){
            this.d.dialogs.widget.title.apply(this.d.dialogs.widget, arguments);
            return this;
        };

        p.url = p.src = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                if(value === '' || typeof value !== 'string') {
                    t.d.img.src = '';
                    t.d.inputs.url.val('');
                    t.d.$previewImage.attr('src', '').hide();
                    t.d.inputs.upload.data('automizyButton').text($A.translate('Select image from local computer'));
                }else{
                    t.d.img.src = value;
                    t.d.inputs.url.val(value);
                    t.d.$previewImage.attr('src', value).show();
                    t.d.inputs.upload.data('automizyButton').text($A.translate('Select an other image from local computer'));
                }
                return t;
            }
            return t.d.inputs.url.val();
        };
        p.link = function (value) {
            console.log(value, typeof value);
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.link = value;
                t.d.inputs.link.val(value);
                return t;
            }
            return t.d.inputs.link.val();
        };
        p.alt = function (value) {
            console.log(value, typeof value);
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.alt = value;
                t.d.inputs.alt.val(value);
                return t;
            }
            return t.d.inputs.alt.val();
        };
        p.title = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.title = value;
                t.d.inputs.title.val(value);
                return t;
            }
            return t.d.inputs.title.val();
        };
        p.align = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.align = value;
                t.d.inputs.align.val(value);
                return t;
            }
            return t.d.inputs.align.val();
        };
        p.enableAlign = function(){
            this.d.inputs.align.show();
            return this;
        };
        p.disableAlign = function(){
            this.d.inputs.align.hide();
            return this;
        };
        p.style = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.style = value;
                return t;
            }
            return t.d.img.style;
        };
        p.width = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.width = value;
                return t;
            }
            return t.d.img.width;
        };
        p.delete = function(func){
            var t = this;
            if (typeof func === 'function') {
                t.d.delete = func;
            } else {
                t.d.delete.apply(this, []);
            }
            return t;
        };
        p.enableDelete = function(){
            this.d.buttons.delete.show();
            return this;
        };
        p.disableDelete = function(){
            this.d.buttons.delete.hide();
            return this;
        };
        p.save = function (func) {
            var t = this;
            if (typeof func === 'function') {
                t.d.save = func;
            } else {
                if(typeof t.d.img.src === 'string' && t.d.img.src.length > 0) {
                    var $elem;
                    var $img = $('<img/>').attr({
                        src: t.d.img.src,
                        alt: t.d.img.alt,
                        title: t.d.img.title,
                        width: t.d.img.width
                    })
                        .addClass('aee-imagepicker-image')
                        .attr('style', 'max-width:100%; border:none; text-decoration:none; ' + t.d.img.style);
                    if($.inArray(t.d.inputs.link.val(), ['', 'http://', 'https://']) <= -1){
                        $elem = $('<a href="'+t.d.inputs.link.val()+'" class="aee-imagepicker-image-link"></a>');
                        $img.appendTo($elem);
                    }else{
                        $elem = $img;
                    }

                    t.d.img.$elem = $elem;
                    t.d.img.$img = $img;


                    /*
                     $AEE.elements.$activeBlock.data('$contentCell').css({
                     textAlign: t.d.inputs.align.val()
                     }).html($img);
                     $AEE.elements.$activeBlock.removeClass('aee-empty');
                     $img.automizyResizabe();
                     */
                }else{
                    t.d.img.$elem = false;
                }
                t.d.save.apply(t, [t.d.img]);
            }
            return t;
        };
        p.reset = function(){
            return this.dialogTitle($A.translate('Upload image'))
                .enableAlign()
                .disableDelete()
                .src('')
                .link('http://')
                .alt('')
                .title('')
                .align('center');
        };

        $A.initBasicFunctions(ImagePicker, "ImagePicker");

    });
});