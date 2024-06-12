var utterThis = new SpeechSynthesisUtterance();

var myprompt = '';
var playing = 0;

const ROLES = [
    {
        role: '英语高级翻译',
        prompt: "将我所说的翻译成英语"
    },
    {
        role: '故事大王',
        prompt: '根据关键词，讲一个独创的故事'
    },
    {
        role: '诗词达人',
        prompt: '按提示生成诗词'
    },
    {
        role: '标题生成大师',
        prompt: '按提示生成标题'
    },
    {
        role: '梦境解析者',
        prompt: '按提示解析梦境的含义'

    },
    {
        role: '密友',
        prompt: '扮演我的好友，回答我的问题'
    }
];


function play_audio(text, str) {

    if (playing == 0) {
        playing = 1;
        utterThis.text = text;
        utterThis.volume = 1; // 声音的音量 范围是0到1
        utterThis.rate = 0.7; //语速，数值，默认值是1，范围是0.1到10
        utterThis.pitch = 0; // 音高，数值，范围从0（最小）到2（最大）。默认值为1
        speechSynthesis.speak(utterThis);

        utterThis.onend = function () {
            playing = 0;
            speechSynthesis.cancel(); // 停止语音播放
            $(str).attr('src', '/static/images/play.png');
        }
    }
    else {
        // document.getElementById('play-button').textContent='开始播放';
        playing = 0;
        speechSynthesis.cancel(); // 停止语音播放
    }
}

// function get_prompt(i) {
//     myprompt = ROLES[i].prompt;
//     myprompt += '(字数不能超过80字)';
//     // console.log(ROLES[i].role);
//     // 获取元素
//     var myElement = document.getElementById("choice");
//     // 修改文本内容
//     myElement.textContent = ROLES[i].role;
//     $('#output_box').empty();
// }
function get_prompt(node) {

    myprompt=ROLES[node.id-'0'].prompt;
    myprompt += '字数不能超过80字';

    //按钮样式
    node.classList.add('active');
  for (const role of document.getElementsByClassName('role')) {
    if (role.id !== node.id) {
        role.classList.remove('active');
    }
  }

    // 清除#output_box内部子元素
    $('#output_box').empty();
}

function send123() {
    var text = $('#result_output').val();
    if (text == '') {
        return;
    }
    $('#result_output').val('');
    insertDiv(text, "me");
    console.log('this is a test');
    console.log(myprompt + ':' + text);
    console.log('this is a test');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ques: myprompt + ':' + text,
            appKey: '666841a26e15113935ab239c',
            uid: '994cfx17181085583485rKZsFbpX7'
        })
    };

    fetch('https://luckycola.com.cn/ai/openwxyy', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('AI Response:', data.data.result);
            insertDiv(data.data.result, "computer");
        })
        .catch(error => {
            console.error('Error:', error);
        });

    document.getElementById('play').style.display = 'block';
    document.getElementById('stop-play').style.display = 'block';

}

$(function () {
    $('#send').on('click', function () {
        send123()
    })

})



resultOutput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Do something when Enter is pressed
        send123()
    }
});
