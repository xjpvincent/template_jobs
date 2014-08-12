
Do('common', function(){

$(function(){
$('.a_show_video').click(function(e){
    var o = $(e.currentTarget),
    eid = paras(o.attr('href'))['from'],
    overlay = $('<div class="video_overlay"></div>'),
    fhtml = $('img',o).attr('name'),
    closebtn = $('<a href="javascript:void(0)">缩进</a>');

    e.preventDefault();

    $('div',o).append(overlay);
    o.css('position','relative');

    if (typeof eid != 'undefined') {
      $.get("/j/recommend?from=" + eid);
    }
    closebtn.click(function(){
     o.show();
     $(this).prev().remove();
     $(this).remove();
    });

    o.after(closebtn).after($('<em>'+fhtml+'</em>'));
    o.hide();
});
});

Douban.init_del_reply = function(e){
  e.click(function(e){
    var url = '/j/saying_comment?sid={id}&del_comment={cid}', ids = this.name.split('-');
    if(confirm(this.title)){
      $.getJSON(url.replace('{id}', ids[1]).replace('{cid}', ids[2]),
      $.proxy(function(r){
        $(this).closest('div').fadeOut();
      }, this));
    }
    return false;
  });
};

Douban.init_reply_form = function(frm){
    var n = frm.attr('name'), is_in_process = frm.data('is_in_process');
    if (is_in_process) {
      return;
    }
    frm.attr('action', frm.attr('rev'));
    frm.submit(function(){
        var replst;
    frm.data('is_in_process', 1);
        Douban.remote_submit_json(this, function(r){
        var a;
            replst = frm.parent();
            replst.html(r.html);
        if (n=='n'){
          a = $('<span><a href="javascript:void(0)">添加回应</a></span>');
        }
        else
        {
              a = $('<span><a href="javascript:void(0)">添加回应</a></span>');
        }
           $('form', replst).hide().after(a);
           a.click(function(){
                $(this).prev().show();
                $(this).remove();
           });
       replst.parent().find('.a_saying_reply').attr('rev', replst.find('.simplelst').length + '回应');
       Douban.init_del_reply(replst.find('.a_confirm_link'));
       Douban.init_reply_form(replst.find('form'));
       replst.find('form').data('is_in_process', 0);
        });
        $(':submit',frm).attr('disabled', 1);
        return false;
    });
    frm.set_len_limit(140);
};

// show reply list.
Douban.init_saying_reply = function(e){
    var o = $(this),
    _ = o.attr('name').split('-'),
    is_hide = o.attr('rev') === 'unfold' || o.attr('rev') === '',
    url = '/j/saying_comment',
    is_in_process = o.data('is_in_process');

    if (is_in_process) {
      return;
    }

    if(!is_hide){
        o.parent().parent().next().remove();
        o.html(o.attr('rev'));
        o.attr('rev', 'unfold');
    } else {
        o.data('is_in_process', 1);
        $.getJSON(url, {sid: _[2], type: _[3], n:_[4], ni:_[5]}, function(r){
          var list;
          list = $('<div class="recreplylst"></div>').insertAfter(o.parent().parent()).html(r.html);
          o.attr('rev', o.html());
          o.text('隐藏回应');
          Douban.init_del_reply(list.find('.a_confirm_link'));
          Douban.init_reply_form(list.find('form'));
          o.data('is_in_process', 0);
        });
    }
};

/* follow site */
$('.follow-miniblog').click(function (e) {
    e.preventDefault();
    $.post_withck(
        '/j/site/' + $('body').attr('id') + '/follow',
        function (o) {
            location.reload();
        }
    );
});

/* cancel follow */
$('.unfollow-miniblog').click(function (e) {
    e.preventDefault();
    $.post_withck(
        '/j/site/' + $('body').attr('id') + '/unfollow',
        function (o) {
            location.reload();
        }
    );
});

});
