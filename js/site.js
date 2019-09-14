﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

window.onload = function () {
    // Write your Javascript code.
    //const button = document.querySelector('.foo-button');
    //mdc.ripple.MDCRipple.attachTo(button);


    //const secondButton = document.querySelector('.bar-button');
    //mdc.ripple.MDCRipple.attachTo(secondButton);

    //const radio = new MDCRadio(document.querySelector('.mdc-radio'));
    //const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
    //formField.input = radio;


    mdc.autoInit();
     $(".dialog-mask").hide();

};
var currentType = 's';
var currentFullType = 'square';
var currentColor = 'green';
var currentResult = '';
var TempImage = 'https://res.cloudinary.com/gdgadoekiti/image/upload/v1568137375/3e7c135c31f0456681632808109ed557.png';
var SetWidth = 0;
var cloudUrl = '';
var general_to_crop;

$(document).ready(function () {

    $('img').attr('crossorigin', 'anonymous');

    function getFormattedTime() {
        var today = new Date();
        var y = today.getFullYear();
        // JavaScript months are 0-based.
        var m = today.getMonth() + 1;
        var d = today.getDate();
        var h = today.getHours();
        var mi = today.getMinutes();
        var s = today.getSeconds();
        return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
    }


    general_to_crop = $('#tocrop').cropme();
    general_to_crop.cropme('bind', {
        url: TempImage
    });




    $('input:radio').change(function () {
        var tp = $(this).val();
        if (tp === 'square') {
            currentType = 's';
            currentFullType = tp;
            console.log(currentFullType);
            general_to_crop.cropme('reload', {
                viewport: {
                    type: currentFullType,
                    width: 300,
                    height: 300,
                    border: {
                        enable: true,
                        width: 2,
                        color: '#fff'
                    }
                }
            });
        }
        else if (tp === 'circle') {
            currentType = 'o';
            currentFullType = tp;
            console.log(currentFullType);
            general_to_crop.cropme('reload', {
                viewport: {
                    type: currentFullType,
                    width: 300,
                    height: 300,
                    border: {
                        enable: true,
                        width: 2,
                        color: '#fff'
                    }
                }
            });
        }
        else {
            currentColor = tp;
            if (currentResult === '') {
                SetPreset();
            }
        }
    });
    function SetPreset() {
        switch (currentColor) {
            case 'blue': {
                TempImage = 'https://res.cloudinary.com/gdgadoekiti/image/upload/v1568137274/03d231e019be46af94c83a0ea1e8116b.png';
                general_to_crop.cropme('bind', {
                    url: TempImage
                });
                break;
            }
            case 'yellow': {
                TempImage = 'https://res.cloudinary.com/gdgadoekiti/image/upload/v1568137303/3986557df6d8470390b2d235c5ca5208.png';
                general_to_crop.cropme('bind', {
                    url: TempImage
                });
                break;
            }
            case 'green': {
                TempImage = 'https://res.cloudinary.com/gdgadoekiti/image/upload/v1568137375/3e7c135c31f0456681632808109ed557.png';
                general_to_crop.cropme('bind', {
                    url: TempImage
                });
                break;
            }
            case 'red': {
                TempImage = 'https://res.cloudinary.com/gdgadoekiti/image/upload/v1568137205/80e005c2010b47768406aec11e4e87dd.png';
                general_to_crop.cropme('bind', {
                    url: TempImage
                });
                break;
            }
            default:
            // code block
        }
    }

    $('input:file').change(function () {
        imageId = $(this).data('id');
        tempFilename = $(this).val();
        readFile(this);
    });

    //$uploadCrop = $('#cropper').croppie({
    //    viewport: { width: 300, height: 300, type: currentFullType },
    //   // boundary: { width: 350, height: 350 },
    //    enforceBoundary: true,
    //    enableExif: true,
    //    //enableResize: true,
    //    //enableOrientation: true,
    //});

    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                rawImg = e.target.result;
                currentResult = rawImg;
                general_to_crop.cropme('bind', {
                    url: rawImg,
                    viewport: {
                        type: currentFullType,
                        width: 300,
                        height: 300
                    },
                    container: {
                        width: 300,
                        height: 300
                    }
                });
                var image = new Image();
                image.src = rawImg;

                image.onload = function () {
                    // access image size here 
                    SetWidth = this.width;
                    if (this.height < this.width) {
                        SetWidth = this.height;
                    }
                    console.log(SetWidth);
                };
            };
            reader.readAsDataURL(input.files[0]);
        }
        else {
            toastr.info("No Input.");
        }
    }

    function showloading() {
        $(".dialog-mask").show();
        $('.dialog-mask').removeClass('collapse');
    }
    function hideloading() {

        $(".dialog-mask").hide();
        $('.dialog-mask').addClass("collapse");
    }

    $(".export").click(function () {
        if (currentResult === '') {
            toastr.warning('Choose an image first!');
        }
        else {
            console.log($(this).attr('title'));
            
            switch ($(this).attr('title')) {
                case 'Download': {
                    var link = document.createElement('a');
                    link.href = currentResult;
                    link.download = 'DevFestExport-' + getFormattedTime() + '.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    break;
                }
                case 'Facebook': {
                    isfbsr = true;
                    FB.ui({
                        method: 'share_open_graph',
                        action_type: 'og.likes',
                        action_properties: JSON.stringify({
                            object: 'https://res.cloudinary.com/gdgadoekiti/image/upload/v1568137375/3e7c135c31f0456681632808109ed557.png',
                        })
                    }, function (response) {
                        // Debug response (optional)
                        console.log(response);
                        });

                    //checkLoginState();
                    break;
                }
                default:
            }
        }
    });
    $("#finalSubmit").click(function () {
        if (currentResult === '') {
            toastr.warning('Choose an image first!');
        }
        else {
            console.log('submit clicked');


            general_to_crop.cropme('crop', {
                type: 'base64',
                width: SetWidth
            }).then(function (output) {
               // console.log(output);
                //show loading
                showloading();
                UploadImage(output);
            });

        }
    });

    function UploadImage(dat) {
        $.ajax('https://devfest.azurewebsites.net/image/processstring', {
            data: JSON.stringify({ "type": currentColor + currentType, "data": dat }),
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (data === '') {

                    console.log('try again');

                }
                else {
                    data = 'data:image/png;base64,' + data;
                    TempImage = data;
                    //set the main view.
                    general_to_crop.cropme('bind', {
                        url: TempImage,
                        viewport: {
                            type: currentFullType,
                            width: 300,
                            height: 300
                        },
                        container: {
                            width: 300,
                            height: 300
                        }
                    });
                   // console.log(data);
                    currentResult = data;
                    //set buttons for download.
                    //$('#downloadimg').attr('href', data);
                    //var ressplt = data.split("/").pop();
                    //$('#downloadimg').attr('download', ressplt);

                    //set buttons for whatsapp
                   // $('#whatsappimg').attr('href', 'whatsapp://send?text=' + encodeURIComponent(data));

                    //set for facebook.

                    //try to download
                    var link = document.createElement('a');
                    link.href = currentResult;
                    link.download = 'DevFestExport-' + getFormattedTime() + '.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                hideloading();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                hideloading();
            }
        });
    }
});




var $uploadCrop,
    tempFilename,
    rawImg,
    imageId;
