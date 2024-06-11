

var index=0;
const resultOutput = document.getElementById('result_output');

function openNewPage() {
    console.log("openNewPage");
    window.open("doc/index.html"); // 打开说明文档链接
}
function insertDiv(text, role) {
    console.log("insertDiv");
    var parentElement = $('#output_box');
    if (role == "me") {
        const newDiv = $(`
            <div class="anw-block">
                <img class="img_anw" src="/static/images/user.png">
                <div class="word_anw">${text}</div>
            </div>
        `);
        parentElement.append(newDiv);
    }
    else if (role == "computer") {
        const newDiv = $(`
            <div class="anw-block">
                <img class="img_anw" src="/static/images/system.png">
                <div class="word_anw_cmp" style="background-color: rgb(245, 245, 245);">${text}</div>
                <img class="anw_play" id="anw_play${index}"src="/static/images/play.png">    
            </div>
        `); //onclick="play_audio()"
        var str = "#anw_play" + index;
        parentElement.append(newDiv); 
         $(str).click(function() {
            var img = $(this).attr('src');
            if (img === '/static/images/play.png') {
                var word = $(this).siblings('.word_anw_cmp').text();
                play_audio(word,str);
                $(this).attr('src', '/static/images/stop.png');
            } else {
                play_audio('',str);
                $(this).attr('src', '/static/images/play.png');
            }

        });
        index++;
        // var str = '.anw_play ' + "#anw_play" + index;
        // parentElement.on('click', str, function() {
        //     var img = $(this).attr('src');
        //     if (img === '/static/images/play.png') {
        //         var word = $(this).siblings('.word_anw_cmp').text();
        //         console.log(word);
        //         play_audio(word);
        //       $(this).attr('src', '/static/images/stop.png');
        //     } else if(img === '/static/images/stop.png') {
        //       play_audio('');
        //       $(this).attr('src', '/static/images/play.png');
        //     }
        //   });
    }
    const container = $('#container02');
    container.scrollTop(container[0].scrollHeight);
    return false;
  }

