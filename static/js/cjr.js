var utterThis = new SpeechSynthesisUtterance();

var myprompt = '';
var playing=0;

const ROLES = [
    {
        role: '英语高级翻译',
        prompt: `I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is "istanbulu cok seviyom burada olmak cok guzel"`
    },
    {
        role: '故事大王',
        prompt: `I want you to act as a storyteller. You will come up with entertaining stories that are engaging, imaginative and captivating for the audience. It can be fairy tales, educational stories or any other type of stories which has the potential to capture people's attention and imagination. Depending on the target audience, you may choose specific themes or topics for your storytelling session e.g., if it’s children then you can talk about animals; If it’s adults then history-based tales might engage them better etc. My first request is "I need an interesting story on perseverance."`
    },
    {
        role: '诗词达人',
        prompt: `I want you to act as a poet. You will create poems that evoke emotions and have the power to stir people’s soul. Write on any topic or theme but make sure your words convey the feeling you are trying to express in beautiful yet meaningful ways. You can also come up with short verses that are still powerful enough to leave an imprint in readers' minds. My first request is "I need a poem about love."`
    },
    {
        role: '标题生成大师',
        prompt: `I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. my first keywords are api,test,automation.`
    },
    {
        role: '梦境解析者',
        prompt: `I want you to act as a dream interpreter. I will give you descriptions of my dreams, and you will provide interpretations based on the symbols and themes present in the dream. Do not provide personal opinions or assumptions about the dreamer. Provide only factual interpretations based on the information given. My first dream is about being chased by a giant spider.`
    },
    {
        role: '密友',
        prompt: `I want you to act as my friend. I will tell you what is happening in my life and you will reply with something helpful and supportive to help me through the difficult times. Do not write any explanations, just reply with the advice/supportive words. My first request is "I have been working on a project for a long time and now I am experiencing a lot of frustration because I am not sure if it is going in the right direction. Please help me stay positive and focus on the important things."`
    }
];


function play_audio(text,str) {
    
    // var text = parent.find('.word_anw_cmp').text();
    if(playing == 0){
        // document.getElementById('play-button').textContent='结束播放';
        playing = 1;
        utterThis.text = text;//document.getElementById("gpt-anw").textContent;
        utterThis.volume = 1; // 声音的音量 范围是0到1
        utterThis.rate = 0.7; //语速，数值，默认值是1，范围是0.1到10
        utterThis.pitch = 0; // 音高，数值，范围从0（最小）到2（最大）。默认值为1
        speechSynthesis.speak(utterThis);

        utterThis.onend=function(){
            playing = 0;
            speechSynthesis.cancel(); // 停止语音播放
            $(str).attr('src', '/static/images/play.png');
        }
    }
    else{
        // document.getElementById('play-button').textContent='开始播放';
        playing = 0;
        speechSynthesis.cancel(); // 停止语音播放
    }
}

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

function send123()  {
    var text = $('#result_output').val();
    if (text == '') {
        return
    }
    $('#result_output').val('');
    insertDiv(text,"me")
    console.log(text)
    $.post('http://127.0.0.1:8086', { message: text, prompt: myprompt }, function (res, data) {
        console.log(res)
        $('.gpt-anw').text(res.anwser)
        insertDiv(res.anwser,"computer")
        myprompt = ''
        // 显示元素
        document.getElementById('play').style.display = 'block'
        document.getElementById('stop-play').style.display = 'block'
        console.log(data)
    })
}
$(function () {
    $('#send').on('click', function () {
        send123()
    })

})


resultOutput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      // Do something when Enter is pressed
      send123()
    }
  });
  