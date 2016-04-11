define([
    "js/functions/core/ready",
    "js/settings/common"
], function () {
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'share.gif',
            name:'share',
            category:'content',
            title:$A.translate('Share'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-share-block-item').attr('data-space', 6);
                var $table = $('<table cellpadding="0" cellspacing="0" border="0" class="aee-share-block-content" style="width:100%"></table>').appendTo($contentCell);
                var $tr = $('<tr></tr>').appendTo($table);
                var $textCell = $('<td style="width:50%" class="aee-share-block-content-cell-text"></td>').appendTo($tr);
                var $iconsCell = $('<td style="width:50%; padding:0 12px 0 12px; text-align:left" class="aee-share-block-content-cell-icons"></td>').appendTo($tr);

                var html = '<div style="text-align: right;"><b><span style="font-family: arial, helvetica, sans-serif; font-size: 16pt;">' + $A.translate('Share this email!') + '</span></b></div>';
                var $content = $('<div contenteditable class="aee-text-block-content"></div>').html(html).appendTo($textCell);

                $AEE.inputs.blockSettingsShareFacebook.check();
                $AEE.inputs.blockSettingsShareTwitter.check();
                $AEE.inputs.blockSettingsShareGoogleplus.check();
                $AEE.inputs.blockSettingsShareLinkedin.check();
                $AEE.inputs.blockSettingsShareDistanceBetween.val(6);
                $AEE.rebuildIcons();

                $AEE.settings.tinymceBlock.oninit = function(editor){editor.focus()};
                $content.tinymce($AEE.settings.tinymceBlock);
            }
        });

    });

    $AEE.layoutReady(function(){

        $AEE.elements.$blockSettingsShareBox = $('<div id="aee-block-settings-share-box" class="aee-block-settings-box"></div>').appendTo($AEE.elements.$blockSettingsContent);

        $AEE.elements.$shareFacebookIcon = $('<img src="' + $AEE.d.config.dir + '/images/social-facebook.gif" />');
        $AEE.elements.$shareTwitterIcon = $('<img src="' + $AEE.d.config.dir + '/images/social-twitter.gif" />');
        $AEE.elements.$shareGoogleplusIcon = $('<img src="' + $AEE.d.config.dir + '/images/social-googleplus.gif" />');
        $AEE.elements.$shareLinkedinIcon = $('<img src="' + $AEE.d.config.dir + '/images/social-linkedin.gif" />');

        $AEE.rebuildIcons = function($block, options){
            var $block = $block || $AEE.elements.$activeBlock;
            var options = options || {};
            var $textCell = $block.find('.aee-share-block-content-cell-text:first');
            var $iconsCell = $block.find('.aee-share-block-content-cell-icons:first');
            var $icons = $('<div class="aee-share-block-icons"></div>');
            var icons = [];
            var distance = $AEE.inputs.blockSettingsShareDistanceBetween.val();

            if(options.facebook || $AEE.inputs.blockSettingsShareFacebook.checked()){
                icons.push('<a href="[{share_facebook}]" onclick="return false;" style="text-decoration:none"><img src="' + $AEE.d.config.url + '/images/social-facebook.gif" class="aee-share-block-icons-facebook" /></a>');
            }
            if(options.twitter || $AEE.inputs.blockSettingsShareTwitter.checked()){
                icons.push('<a href="[{share_twitter}]" onclick="return false;" style="text-decoration:none"><img src="' + $AEE.d.config.url + '/images/social-twitter.gif" class="aee-share-block-icons-twitter" /></a>');
            }
            if(options.googleplus || $AEE.inputs.blockSettingsShareGoogleplus.checked()){
                icons.push('<a href="[{share_gplus}]" onclick="return false;" style="text-decoration:none"><img src="' + $AEE.d.config.url + '/images/social-googleplus.gif" class="aee-share-block-icons-googleplus" /></a>');
            }
            if(options.linkedin || $AEE.inputs.blockSettingsShareLinkedin.checked()){
                icons.push('<a href="[{share_linkedin}]" onclick="return false;" style="text-decoration:none"><img src="' + $AEE.d.config.url + '/images/social-linkedin.gif" class="aee-share-block-icons-linkedin" /></a>');
            }

            $block.attr('data-space', distance);

            var html = icons.join('<img src="' + $AEE.d.config.url + '/images/spacer.gif" height="1" width="'+distance+'" style="height:1px; width:'+distance+'px" />');
            $iconsCell.html(html);
        };

        $AEE.inputs.blockSettingsShareFacebook = $A.newInput({
            type:'checkbox',
            label:$AEE.elements.$shareFacebookIcon,
            labelWidth:'40px',
            change:function(){
                $AEE.rebuildIcons();
            },
            create:function(){
                this.widget().css('padding', 0);
            }
        });
        $AEE.inputs.blockSettingsShareTwitter = $A.newInput({
            type:'checkbox',
            label:$AEE.elements.$shareTwitterIcon,
            labelWidth:'40px',
            change:function(){
                $AEE.rebuildIcons();
            },
            create:function(){
                this.widget().css('padding', 0);
            }
        });
        $AEE.inputs.blockSettingsShareGoogleplus = $A.newInput({
            type:'checkbox',
            label:$AEE.elements.$shareGoogleplusIcon,
            labelWidth:'40px',
            change:function(){
                $AEE.rebuildIcons();
            },
            create:function(){
                this.widget().css('padding', 0);
            }
        });
        $AEE.inputs.blockSettingsShareLinkedin = $A.newInput({
            type:'checkbox',
            label:$AEE.elements.$shareLinkedinIcon,
            labelWidth:'40px',
            change:function(){
                $AEE.rebuildIcons();
            },
            create:function(){
                this.widget().css('padding', 0);
            }
        });
        $AEE.inputs.blockSettingsShareDistanceBetween = $A.newInput({
            type:'number',
            label:$A.translate('Space between icons'),
            labelAfter:'px',
            value:6,
            enter:function(){
                $AEE.rebuildIcons();
                return false;
            },
            change:function(){
                $AEE.rebuildIcons();
            },
            create:function(){
                this.widget().css('padding-top', '12px');
                this.input().attr('min', 0);
                this.input().pbmInput();
            }
        });

        $AEE.forms.blockSettingsShare = $A.newForm().addInputs([
            $AEE.inputs.blockSettingsShareFacebook,
            $AEE.inputs.blockSettingsShareTwitter,
            $AEE.inputs.blockSettingsShareGoogleplus,
            $AEE.inputs.blockSettingsShareLinkedin,
            $AEE.inputs.blockSettingsShareDistanceBetween
        ]).drawTo($AEE.elements.$blockSettingsShareBox);
    })

});