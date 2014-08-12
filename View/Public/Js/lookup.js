/**
 * @author Dongxu Huang \ shuke
 */
var isAlpha = function(str) {
  return/[a-zA-Z']+/.test(str)
};

document.addEventListener("mousemove", update_mouse_pos, true);
document.addEventListener("mouseup", on_mouse_up, true);
document.addEventListener("mousedown", on_mouse_down, true);
document.addEventListener("dblclick", on_mouse_dbclick, true);
var start_offset;
var clientX, clientY;
var pageX, pageY;
// 鼠标按下的位置，用于判断鼠标是不是有很大的位移
var mouse_down_x, mouse_down_y;

function onText(resonse) {
}

/* 接受到取词通知时候的回调函数 */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if(request.action == "onmsg") {
    var word = get_word_by_mouse();
    chrome.extension.sendRequest({action:"word", msg:word, offset:start_offset}, onText)  //返回后台，发送词语
  }
});
function update_mouse_pos(event) {
  clientX = event.clientX, clientY = event.clientY;
  pageX = event.pageX, pageY = event.pageY
}
function isChinese(temp) {
  var re = /[^\u4e00-\u9fa5]/;
  if(re.test(temp)) {
    return false
  }
  return true
}
/* 得到鼠标位置所指的词语 */
function get_word_by_mouse() {
  var r = document.caretRangeFromPoint(clientX, clientY);   // 得到固定位置的文本
  do {
    if(!r) {
      break
    }
    pX = pageX;
    pY = pageY;
    var so = r.startOffset, eo = r.endOffset;
    start_offset = so;
    var cnt = 0;
    var space_cnt = 0;
    var chinese_cnt = 0;
    var tr = r.cloneRange(), text = "";
    if(r.startContainer.data) {  //向前遍历
      while(so >= 1) {
        tr.setStart(r.startContainer, --so);
        text = tr.toString();
        if(!isAlpha(text.charAt(0))) {
          if(isChinese(text.charAt(0))) {
            chinese_cnt++
          }
          if(text.charAt(0) == " ") {
            space_cnt++
          }
          if(space_cnt == 0 && chinese_cnt == 0 || space_cnt == 3 || chinese_cnt == 5) {
            tr.setStart(r.startContainer, so + 1);
            break
          }
        }
        cnt++
      }
    }
    start_offset = start_offset - (so + 1);
    if(cnt == 0) {
      break
    }
    cnt = 0;
    space_cnt = 0;
    chinese_cnt = 0;
    if(r.endContainer.data) {
      while(eo < r.endContainer.data.length) {   // 向回遍历
        tr.setEnd(r.endContainer, ++eo);
        text = tr.toString();
        if(!isAlpha(text.charAt(text.length - 1))) {
          if(isChinese(text.charAt(text.length - 1))) {
            chinese_cnt++
          }
          if(text.charAt(text.length - 1) == " ") {
            space_cnt++
          }
          if(space_cnt == 0 && chinese_cnt == 0 || space_cnt == 3 || chinese_cnt == 5) {
            tr.setEnd(r.endContainer, eo - 1);
            break
          }
        }
        cnt++
      }
    }
    if(cnt == 0) {
      break
    }
    var word = tr.toString();
    if(word.length >= 1) {
      return word
    }
  }while(0);
  return ""
}
;

function on_mouse_down(event) {
    mouse_down_x = event.clientX;
    mouse_down_y = event.clientY;
}

function on_mouse_up(event) {
    if ( Math.abs(event.clientX - mouse_down_x) > 2 || Math.abs(event.clientY - mouse_down_y) > 2)
    {
        var sText = document.selection == undefined ? document.getSelection().toString():document.selection.createRange().text;
        if (sText != "")
        {
            //  字符串过长
            if (sText.length > 100)
                sText = sText.substr(0, 100);
            chrome.extension.sendRequest({action:"stroke", msg:sText}, onText);
            console.log(sText);
        }
    }
}

function on_mouse_dbclick(event) {
    var sText = document.selection == undefined ? document.getSelection().toString():document.selection.createRange().text;
    if (sText != "")
    {
        // 字符串过长
        if (sText.length > 100)
            sText = sText.substr(0, 100);
        chrome.extension.sendRequest({action:"stroke", msg:sText}, onText);
        console.log(sText);
    }
}
