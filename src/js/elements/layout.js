define([
    "js/functions/core/ready",
    "js/functions/core/buildBlockList",

    "js/functions/setBlockSettings",
    "js/functions/touchable",

    "js/settings/common",
    "js/settings/sortable",

    "js/addons/jquery/automizySetUp",

    "js/modules/bpbm"
], function () {
    $AEE.ready(function () {
        $AEE.elements.$tmp = $('<div></div>');
        $AEE.elements.$spacer = $('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" />');

        $AEE.elements.$widget = $('<div id="automizy-email-editor"></div>').appendTo('body:first');
        if ($AEE.touchable()) {
            $A.convertToResponsive();
            $AEE.elements.$widget.addClass('automizy-touchable');
            $('body:first').addClass('automizy-touchable');
        }
        $AEE.elements.$widgetTable = $('<table cellpadding="0" cellspacing="0" border="0" id="aee-widget-table"></table>').appendTo($AEE.elements.$widget);
        $AEE.elements.$widgetTableFirstRow = $('<tr></tr>').appendTo($AEE.elements.$widgetTable);
        $AEE.elements.$widgetTableSecondRow = $('<tr></tr>').appendTo($AEE.elements.$widgetTable);

        $AEE.elements.$header = $('<td id="aee-header"></td>').appendTo($AEE.elements.$widgetTableFirstRow);
        $AEE.elements.$headerButtons = $('<div id="aee-header-buttons"></div>').appendTo($AEE.elements.$header);
        $AEE.elements.$logoLink = $('<a href="#" target="_blank" id="aee-logo-link" />').appendTo($AEE.elements.$header);
        $AEE.elements.$logoImage = $('<img src="" id="aee-logo-img" />').appendTo($AEE.elements.$logoLink);
        $AEE.elements.$headerTitle = $('<div id="aee-header-title" />').appendTo($AEE.elements.$header);
        $AEE.elements.$lastSave = $('<div id="aee-header-lastsave" />').html($A.translate('It has not been saved yet')).appendTo($AEE.elements.$header);
        $AEE.saved = false;

        $AEE.buttons.saveAndExitButton = $A.newButton({
            text: $A.translate('Save and next >>'),
            skin: 'simple-orange',
            float: 'right',
            thin: true,
            target: $AEE.elements.$headerButtons,
            click: function () {
                $AEE.clickToSaveAndExit();
            }
        });
        $AEE.buttons.saveButton = $A.newButton({
            text: $A.translate('Save'),
            skin: 'simple-orange',
            float: 'right',
            thin: true,
            target: $AEE.elements.$headerButtons,
            click: function () {
                $AEE.clickToSave();
            }
        });
        $AEE.buttons.previewButton = $A.newButton({
            text: $A.translate('Preview'),
            skin: 'simple-white',
            float: 'right',
            thin: true,
            target: $AEE.elements.$headerButtons,
            click: function () {
                $AEE.clickToPreview();
            }
        });
        $AEE.buttons.backButton = $A.newButton({
            text: $A.translate('<< Back'),
            skin: 'simple-white',
            float: 'right',
            thin: true,
            target: $AEE.elements.$headerButtons,
            click: function () {
                $AEE.clickToBack();
            }
        });
        $AEE.buttons.sendTestButton = $A.newButton({
            text: $A.translate('Send test email'),
            skin: 'simple-orange',
            click: function () {
                $AEE.clickToSendTest();
            }
        });
        $AEE.elements.$mobileMenu = $('<div id="aee-mobilemenu"></div>').appendTo($AEE.elements.$widget);
        $AEE.elements.$mobileSaveButton = $('<div class="aee-mobilemenu-item"></div>').html($A.translate('Save')).appendTo($AEE.elements.$mobileMenu).click(function () {
            $AEE.clickToSave();
            $AEE.elements.$mobileMenu.stop().fadeOut();
        });
        $AEE.elements.$mobilePreviewButton = $('<div class="aee-mobilemenu-item"></div>').html($A.translate('Preview')).appendTo($AEE.elements.$mobileMenu).click(function () {
            $AEE.clickToPreview();
            $AEE.elements.$mobileMenu.stop().fadeOut();
        });
        $AEE.elements.$mobileSaveAndExitButton = $('<div class="aee-mobilemenu-item"></div>').html($A.translate('Save and next >>')).appendTo($AEE.elements.$mobileMenu).click(function () {
            $AEE.clickToSaveAndExit();
            $AEE.elements.$mobileMenu.stop().fadeOut();
        });
        $AEE.elements.$mobileBackButton = $('<div class="aee-mobilemenu-item"></div>').html($A.translate('<< Back')).appendTo($AEE.elements.$mobileMenu).click(function () {
            $AEE.clickToBack();
            $AEE.elements.$mobileMenu.stop().fadeOut();
        });

        $AEE.elements.$widgetTableSecondCell = $('<td id="aee-second-cell"></td>').appendTo($AEE.elements.$widgetTableSecondRow);

        $AEE.elements.$mobileMenuIcon = $('<div id="aee-mobilemenu-icon"></div>').appendTo($AEE.elements.$widget).css({
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/icon-menu.png)'
        }).click(function (event) {
            event.stopPropagation();
            $AEE.elements.$mobileMenu.stop().fadeToggle();
        });
        $AEE.elements.$blocksIcon = $('<div id="aee-blocks-icon"></div>').appendTo($AEE.elements.$widgetTableSecondCell).css({
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/icon-blocks.png)'
        }).click(function () {
            $AEE.blocksShowed = true;
            $AEE.settingsShowed = false;
            $AEE.setLayoutByDisplay();
        });
        $AEE.elements.$settingsIcon = $('<div id="aee-settings-icon"></div>').appendTo($AEE.elements.$widgetTableSecondCell).css({
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/icon-settings.png)'
        }).click(function () {
            $AEE.blocksShowed = false;
            $AEE.settingsShowed = true;
            $AEE.setLayoutByDisplay();
        });

        $AEE.elements.$blockList = $('<div id="aee-block-list"></div>').appendTo($AEE.elements.$widgetTableSecondCell);
        $AEE.elements.$blockListModal = $('<div id="aee-block-list-modal"></div>').appendTo($AEE.elements.$blockList);

        $AEE.elements.$editor = $('<div id="aee-editor"></div>').appendTo($AEE.elements.$widgetTableSecondCell);
        $AEE.elements.$documentBox = $('<div id="aee-document-box"></div>').appendTo($AEE.elements.$editor);
        $AEE.elements.$document = $('<div id="aee-document" style="width:800px"></div>').appendTo($AEE.elements.$documentBox);
        $AEE.elements.$blockHandle = $('<div class="aee-block-handle"></div>').appendTo($AEE.elements.$widget).css({
            cursor: 'url(' + $AEE.d.config.dir + '/images/cursors/openhand.cur), move',
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/block-handle.gif)'
        });
        $AEE.elements.$blockHandleCopy = $('<div class="aee-block-handle-copy"></div>').appendTo($AEE.elements.$blockHandle).css({
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/block-copy.png)'
        }).click(function () {
            $AEE.hideTinyMcePanel();
            setTimeout(function () {
                $AEE.elements.$blockHandle.appendTo($AEE.elements.$tmp);
                $AEE.setBlockSettings($AEE.elements.$activeBlock.clone().insertAfter($AEE.elements.$activeBlock).automizySetUp());
            }, 20);
        });
        $AEE.elements.$blockHandleDelete = $('<div class="aee-block-handle-delete"></div>').appendTo($AEE.elements.$blockHandle).css({
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/block-delete.png)'
        }).click(function () {
            $AEE.hideTinyMcePanel();
            setTimeout(function () {
                $A.confirm({
                    title:$A.translate("Are you sure you want to delete this block?"),
                    content:$A.translate('Warning: This action is irreversible!'),
                    ok:function(){
                        $AEE.elements.$blockHandle.appendTo($AEE.elements.$tmp);
                        $AEE.elements.$activeBlock.remove();
                    }
                });
            }, 20);
        });

        $AEE.elements.$blockSettings = $('<div id="aee-block-settings"></div>').appendTo($AEE.elements.$widgetTableSecondCell);
        $AEE.elements.$blockSettingsContent = $('<div id="aee-block-settings-content"></div>').appendTo($AEE.elements.$blockSettings);
        $AEE.elements.$blockSettingsContentTitle = $('<div id="aee-block-settings-content-title"></div>').appendTo($AEE.elements.$blockSettingsContent);
        $AEE.inputs.bpbm = $A.bpbm().drawTo($AEE.elements.$blockSettingsContent);

        $AEE.inputs.dropFiles = $A.newInput({
            id: 'aee-drop-files',
            type: 'file',
            name: 'aee-drop-files'
        }).draw().hide();
        $AEE.elements.$dropFilesCover = $('<div id="aee-drop-files-cover"></div>').text($A.translate('Drop the files here!')).appendTo($AEE.elements.$widget);
        $AEE.elements.$dropFilesProgressCover = $('<div id="aee-drop-files-progress-cover"></div>').appendTo($AEE.elements.$widget);
        $AEE.elements.$dropFilesProgressCoverText = $('<div id="aee-drop-files-progress-cover-text"></div>').text('Uploading files!').appendTo($AEE.elements.$dropFilesProgressCover);
        $AEE.elements.$dropFilesProgressBarBox = $('<div id="aee-drop-files-progress-bar-box"></div>').appendTo($AEE.elements.$dropFilesProgressCover);
        $AEE.elements.$dropFilesProgressBar = $('<div id="aee-drop-files-progress-bar"></div>').appendTo($AEE.elements.$dropFilesProgressBarBox);
        $AEE.elements.$dropFilesProgressBarText = $('<div id="aee-drop-files-progress-bar-text"></div>').appendTo($AEE.elements.$dropFilesProgressBarBox);

        $AEE.elements.$blockSettingsDynamicBox = $('<div id="aee-block-settings-dynamic-box" class="aee-block-settings-box"></div>').appendTo($AEE.elements.$blockSettingsContent);
        $AEE.elements.$zIndexStyle = $('<style></style>').appendTo($('body:first'));
        $AEE.inputs.blockSettingsDynamicCheckbox = $A.newInput2({
            type: 'checkbox',
            labelBefore: $A.translate('Dynamic block'),
            checked: false,
            change: function () {
                if (this.checked()) {
                    $AEE.inputs.blockSettingsDynamicSegments.show();
                    var segments = $AEE.inputs.blockSettingsDynamicSegments.val() || [];
                    $AEE.elements.$activeBlock.attr('data-dynamic-segments', segments.join(','));
                } else {
                    $AEE.inputs.blockSettingsDynamicSegments.hide();
                    $AEE.elements.$activeBlock.removeAttr('data-dynamic-segments');
                }
            }
        });
        $AEE.inputs.blockSettingsDynamicSegments = $A.newInput2({
            type: 'select',
            multiple: true,
            labelTop: $A.translate('Who should see this content block?'),
            options: [],
            change: function () {
                var value = this.automizySelect().val();
                if(!!value && typeof value.join === 'function') {
                    $AEE.elements.$activeBlock.attr('data-dynamic-segments', value.join(','));
                }
            }
        }).hide();
        $AEE.forms.blockSettingsDynamic = $A.newForm().addInputs([
            $AEE.inputs.blockSettingsDynamicCheckbox,
            $AEE.inputs.blockSettingsDynamicSegments
        ]).drawTo($AEE.elements.$blockSettingsDynamicBox);

        $AEE.elements.$blockSettingsDocumentBox = $('<div id="aee-block-settings-document-box" class="aee-block-settings-box"></div>').appendTo($AEE.elements.$blockSettingsContent);
        $AEE.inputs.blockSettingsResponsiveEmail = $A.newInput2({
            type: 'checkbox',
            labelBefore: $A.translate('Responsive'),
            checked: true,
            change: function () {
                if (this.checked()) {
                    $AEE.inputs.blockSettingsDocumentMaxWidth.labelBefore($A.translate('Max. width'));
                    $AEE.elements.$document.attr('data-responsive-email', '1');
                } else {
                    $AEE.inputs.blockSettingsDocumentMaxWidth.labelBefore($A.translate('Width'));
                    $AEE.elements.$document.attr('data-responsive-email', '0');
                }
            }
        });
        $AEE.inputs.blockSettingsDocumentMaxWidth = $A.newInput2({
            type: 'number',
            labelBefore: $A.translate('Max. width'),
            value: 800,
            enter: function () {
                this.change();
                return false;
            },
            change: function () {
                $AEE.elements.$document[0].style.width = this.val() + 'px';
            },
            create: function () {
                this.input().attr('min', 300).attr('max', 2500).pbmInput();
            }
        });
        $AEE.inputs.blockSettingsDocumentOuterColor = $A.newInput2({
            type: 'text',
            labelBefore: $A.translate('Outer color'),
            change: function () {
                $AEE.elements.$documentBox[0].style.backgroundColor = this.val();
                $AEE.elements.$document.attr('data-outer-color', this.val());
            },
            create: function () {
                this.input().css({
                    width: '29px',
                    height: '25px',
                    '-webkit-box-shadow': 'none',
                    'box-shadow': 'none'
                }).addClass('automizy-bpbm-color-input').colpick({
                    colorScheme: 'dark',
                    layout: 'rgbhex',
                    color: '#ffffff',
                    onSubmit: function (hsb, hex, rgb, el) {
                        $(el).css({
                            backgroundColor: '#' + hex,
                            color: '#' + hex
                        }).val('#' + hex).trigger('change').colpickHide();
                    },
                    onShow: function (el) {
                        (function (el) {
                            setTimeout(function () {
                                var $d = $(document);
                                var documentWidth = $AEE.widget().width();
                                var documentHeight = $AEE.widget().height();
                                var elementWidth = parseInt(el.offsetWidth);
                                var elementHeight = parseInt(el.offsetHeight);
                                var elementRight = parseInt(el.style.left) + elementWidth;
                                var elementBottom = parseInt(el.style.top) + elementHeight;
                                var offsetLeft = elementRight - documentWidth;
                                var offsetTop = elementBottom - documentHeight;

                                if (offsetLeft > 0) {
                                    el.style.left = documentWidth - elementWidth + 'px';
                                }
                                if (offsetTop > 0) {
                                    el.style.top = documentHeight - elementHeight + 'px';
                                }
                            }, 10)
                        })(el);
                    }
                });
            }
        });
        $AEE.inputs.blockSettingsPreviewText = $A.newInput2({
            type: 'textarea',
            labelBefore: $A.translate('Preview text'),
            change: function () {
                $AEE.elements.$document.attr('data-preview-text', this.val());
            }
        });

        $AEE.forms.blockSettingsDocument = $A.newForm().addInputs([
            $AEE.inputs.blockSettingsResponsiveEmail,
            $AEE.inputs.blockSettingsDocumentMaxWidth,
            $AEE.inputs.blockSettingsDocumentOuterColor,
            $AEE.inputs.blockSettingsPreviewText
        ]).drawTo($AEE.elements.$blockSettingsDocumentBox);


        $('<style>#aee-document .aee-ui-state-highlight:before{content: "' + $A.translate("Drop here") + '"}</style>').appendTo('body:first');
        $('<style>#aee-block-list .aee-ui-state-highlight:before{content: "' + $A.translate("Delete") + '"}</style>').appendTo('body:first');


        if (!$AEE.d.values.logoLink) {
            $AEE.logoLink('https://automizy.com');
        }
        if (!$AEE.d.values.logoSrc) {
            $AEE.logoSrc($AEE.d.config.dir + '/images/logo-automizy.png');
        }
        if (!$AEE.d.values.title) {
            $AEE.title($A.translate('Automizy Email Editor'));
        }
        if (!$AEE.d.values.subject) {
            $AEE.subject($A.translate('Test email'));
        }
        if (!$AEE.d.functions.clickToPreview) {
            $AEE.clickToPreview(function () {
                $AEE.dialogs.preview.open();
            });
        }
        if (!$AEE.d.functions.clickToSendTest) {
            $AEE.clickToSendTest(function () {
                $AEE.dialogs.sendTest.open();
            });
        }
        if (!$AEE.d.functions.clickToSave) {
            $AEE.clickToSave(function () {
                $AEE.save();
            });
        }
        if (!$AEE.d.functions.clickToSaveAndExit) {
            $AEE.clickToSaveAndExit(function () {
                $AEE.saveAndExit();
            });
        }
        if (!$AEE.d.functions.clickToBack) {
            $AEE.clickToBack(function () {
                if ($AEE.saved) {
                    $AEE.close();
                } else {
                    $A.confirm({
                        title:$A.translate("You have unsaved edits in the campaign. Are you sure you want to exit without saving?"),
                        ok:function(){
                            $AEE.close();
                        }
                    });
                }
            });
        }
        if (!$AEE.d.functions.save) {
            $AEE.save(function (aeeData) {
                $AEE.newsletterId = $AEE.newsletterId || 0;
                if ($AEE.newsletterId === 0) {
                    return $AA.newsletters().insert({
                        name: aeeData.title,
                        subject: '',
                        tags: [],
                        editorCode: aeeData.editorCode,
                        htmlCode: aeeData.htmlCode,
                        maxWidth: aeeData.maxWidth
                    }).done(function (data) {
                        $AEE.newsletterId = data.id;
                    }).error(function () {
                        alert('Save error!');
                    });
                } else {
                    return $AA.newsletters().update({
                        id: $AEE.newsletterId,
                        name: aeeData.title,
                        subject: '',
                        tags: [],
                        editorCode: aeeData.editorCode,
                        htmlCode: aeeData.htmlCode,
                        maxWidth: aeeData.maxWidth
                    }).done(function (data) {

                    }).error(function () {
                        alert('Save error!');
                    });
                }
            });
        }
        if (!$AEE.d.functions.saveAndExit) {
            $AEE.saveAndExit(function (aeeData) {
                $A.ajaxDocumentCover(1);
                $AEE.save().done(function () {
                    $AEE.close();
                }).complete(function () {
                    $A.ajaxDocumentCover(0);
                });
            });
        }


        setTimeout(function () {
            setTimeout(function () {
                /*
                $AEE.elements.$blockList.niceScroll($AEE.settings.niceScroll);
                $AEE.elements.$documentBox.niceScroll($AEE.settings.niceScroll);
                $AEE.elements.$blockSettings.niceScroll($AEE.settings.niceScroll);
                */
                $AEE.elements.$blockList[0].addEventListener('touchmove', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }, false);
                $AEE.elements.$documentBox[0].addEventListener('touchmove', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }, false);
                $AEE.elements.$blockSettings[0].addEventListener('touchmove', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }, false);

                /*var niceObj = $.extend({}, $AEE.settings.niceScroll);
                 niceObj.zindex = 2003;
                 for(var i in $AEE.dialogs){
                 $AEE.dialogs[i].widget().find('.automizy-dialog-content:first').niceScroll(niceObj)
                 }*/
            }, 600);
            $AEE.buildBlockList();
            $AEE.elements.$document.add('.aee-block-drop-zone').sortable($AEE.settings.sortable);
            $AEE.inputs.blockSettingsDocumentMaxWidth.labelAfter('px');
            $AEE.layoutReady();
            $AEE.setBlockSettings($AEE.elements.$document);
        }, 100);
    });
});