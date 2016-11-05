/**
 * JavaScript Framework of StuCampus
 * 
 * @author: Developer Team of StuCampus,
 *          Shenzhen University
 * 
 *          TonySeek<tonyseek@gmail.com>
 *          shonenada<shonenada@gmail.com>
 *
 */
(function(window, $) {
    var StuCampus = {};

    // 鍒濆鍖栧叏绔欑粺涓€鍏冪礌
    StuCampus.elementInit = function() {
        $('body').prepend($('<div id="message-box"></div>')); // 淇℃伅妗嗗鍣�
    };

    // 鍏ㄧ珯缁熶竴淇℃伅鎻愮ず妗�
    StuCampus._messagebox = function(message, timeout, specialClass){
        var entity = $('<div class="message-content"></div>').hide()
            .append($('<span class="message-text"></span>').append(message))
            .append($('<a href="javascript:void(0);" class="button message-close-btn">鍏抽棴</a>'))
            .addClass(specialClass);
        $('#message-box').append(entity);

        entity.fadeIn(500);

        if (timeout > 0) {
            setTimeout(function(){
                entity.fadeOut(500, function(){
                    $(this).remove();
                });
            }, timeout);
        }

        entity.children('a.message-close-btn').click(function(){
            entity.fadeOut(500, function(){
                $(this).remove();
            });
        });
    };
    StuCampus.notice = function(message, timeout) { this._messagebox(message, timeout, 'notice'); };
    StuCampus.alert  = function(message, timeout) { this._messagebox(message, timeout, 'alert'); };
    StuCampus.error  = function(message, timeout) { this._messagebox(message, timeout, 'error'); };

    StuCampus._jump_to_refer = function(){
        if (document.referrer != '' && (document.referrer != document.location)) {
            setTimeout(function(){document.location = document.referrer;}, 3000);
        } else {
            setTimeout(function(){document.location.reload();}, 3000);
        }
    }

    StuCampus.ajax = function(url, method, args){
        var data = "";
        var tips_type = "";
        var status_dict = "";
        var callback = "";
        if (typeof args != 'undefined'){
            if (typeof args['data'] != 'undefined'){
                data = args['data'];
            }else{
                data = {};
            }

            if (typeof args['tips_type'] != 'undefined'){
                tips_type = args['tips_type'];
            }else{
                tips_type = 'label';
            }

            if (typeof args['status'] != 'undefined'){
                status_dict = args['status'];
            }else{
                status_dict = {};
            }
            if (typeof args['callback'] != 'undefined'){
                callback = args['callback'];
            }else{
                callback = "";
            }
        }
        $.ajax({
            url: url,
            type: method,
            data: data,
            cache: false,
            statusCode:{
                403: function() {
                    StuCampus.alert('鏉冮檺涓嶈冻锛屾搷浣滃け璐�', 2000);
                },
                404: function () {
                    StuCampus.alert('璇锋眰鐨勯〉闈笉瀛樺湪鎴栬鍒犻櫎', 2000);
                }
            },
            success: function(response){
                if (response.status == 'success'){
                    StuCampus.notice(status_dict[response.status], 2000);
                    if (callback != ""){
                        callback();
                    }else{
                        StuCampus._jump_to_refer();
                    }
                    return false;
                }
                if (response.status == 'errors'){
                    messages = response.messages;
                    if (tips_type != 'label'){
                        StuCampus.alert(response.messages.join(', '), 2000);
                    }else{
                        // the following code has not been tested yet;
                        $(".error-messages").html("");
                        var error_messages, error_messages_array;
                        for(attr in messages){
                            error_messages_array = messages[attr];
                            error_messages = "";
                            for(var i = 0; i < error_messages_array.length; ++i){
                                error_messages += error_messages_array[i];
                            }
                            $("#"+attr+"-tips").html(error_messages);
                        }
                    }
                    return false;
                }
                StuCampus.alert(status_dict[response.status], 2000);
                return false;
            },
            error: function() {
                StuCampus.error('鍙戠敓鎶€鏈棶棰橈紝鎿嶄綔澶辫触銆傝鑱旂郴鎶€鏈紑鍙戦儴');
            }
        });
    };

    StuCampus.ajaxForm = function(forms, args){
        var tips_type = "";
        var status_dict = "";
        var callback = "";
        if (typeof args != 'undefined'){
            if (typeof args['tips_type'] != 'undefined'){
                tips_type = args['tips_type'];
            }else{
                tips_type = 'label';
            }
            if (typeof args['status'] != 'undefined'){
                status_dict = args['status'];
            }else{
                status_dict = {};
            }
            if (typeof args['callback'] != 'undefined'){
                callback = args['callback'];
            }else{
                callback = "";
            }
        }
        forms.ajaxForm({
            statusCode:{
                403: function() {
                    StuCampus.alert('鏉冮檺涓嶈冻锛屾搷浣滃け璐�', 2000);
                },
                404: function () {
                    StuCampus.alert('璇锋眰鐨勯〉闈笉瀛樺湪鎴栬鍒犻櫎', 2000);
                }
            },
            success: function(response){
                if (response.status == 'success'){
                    StuCampus.notice(status_dict[response.status], 2000);
                    if (callback != ""){
                        callback();
                    }else{
                        StuCampus._jump_to_refer();
                    }
                    return false;
                }
                if (response.status == 'errors'){
                    messages = response.messages;
                    if (tips_type != 'label'){
                        StuCampus.alert(messages.join(', '), 2000);
                    }
                    else{
                        $(".error-messages").html("");
                        var error_messages, error_messages_array;
                        for(attr in messages){
                            error_messages_array = messages[attr];
                            error_messages = "";
                            for(var i = 0; i < error_messages_array.length; ++i){
                                error_messages += error_messages_array[i];
                            }
                            $("#"+attr+"-tips").html(error_messages);
                        }
                    }
                    return false;
                }
                StuCampus.alert(status_dict[response.status], 2000);
                return false;
            },
            error: function() {
                StuCampus.error('鍙戠敓鎶€鏈棶棰橈紝鎿嶄綔澶辫触銆傝鑱旂郴鎶€鏈紑鍙戦儴');
            }
        });
    };

    // 鐢ㄦ埛鐧诲綍
    StuCampus.signIn = function(email, password){
        url = '/account/signin';
        method = 'POST';
        data = {'email': email, 'password': password};
        var status = {'success': '鐧诲綍鎴愬姛'}
        StuCampus.ajax(url, method, {'data': data, 'status': status});
    };

    // 鐢ㄦ埛娉ㄩ攢
    StuCampus.signOut = function(){
        url = '/account/signout'
        method = 'post';
        StuCampus.ajax(url, method, {'status': {'success': '閫€鍑烘垚鍔�'}});
    };

    window.StuCampus = window.$S = StuCampus;
})(window, jQuery);

// ajax with csrf token
$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});

$(function(){
    // 鍒濆鍖栧厓绱�
    $S.elementInit();
});

// 闃绘涓浗鐢典俊銆佷腑鍥借仈閫氱殑椤甸潰鍔寔
$(function(){
    if (top !== self) {
        if (top.location == self.location) {
            alert("鎮ㄧ殑椤甸潰鍙兘閬埌浜嗙綉鍏虫垨杩愯惀鍟嗙殑鍔寔");
        } else {
            top.location = self.location;
        }
    }
});