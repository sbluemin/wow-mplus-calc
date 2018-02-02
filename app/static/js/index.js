var app = new Vue({
    el: '#app',
    data: {
        message: "Hi"
    }
});

// 기본 url
var base_url = window.location.origin;

function aaa() {
    var data = new Object();
    data.named = "융합체";
    data.is_tyrannical = false;

    $.ajax({
        type: "POST",
        url: 'api/damage_table',
        data: JSON.stringify(data),
        contentType: "application/json",

        success: function(data) {
            app.message = data;
            var jsonData = JSON.parse(data);
            for (var key in jsonData) {
                alert("User " + jsonData[key] + " is #" + key); // "User john is #234"
            }
            alert(data);
        }
    });
}