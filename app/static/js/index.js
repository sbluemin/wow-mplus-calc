//import Vue from 'vue'

function createDamageJsonMessage(named, is_tyrannical) {
    var data = new Object();
    data.named = named;
    data.is_tyrannical = is_tyrannical;
    return JSON.stringify(data);
}

// api/damage_table 을 요청하고 성공 시, 데미지 테이블에 업데이트 시킨다.
function requestPostDamageTableAndUpdateDamageTable(jsonString) {
    $.ajax({
        type: "POST",
        url: 'api/damage_table',
        data: jsonString,
        contentType: "application/json",

        success: function(data) {
            // 테이블 데이터 초기화
            damageTable.bodyItems = [];

            var jsonObject = JSON.parse(data);
            for (var key in jsonObject) {
                damageTable.bodyItems.push({ level: key, damage: numberWithCommas(jsonObject[key]) });
            }
        }
    });
}

// 숫자 스트링을 3자리마다 콤마를 찍어준다.
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var damageTable = new Vue({
    el: '#damage_table',
    data: {
        headItems: [
            { label: '레벨' },
            { label: '데미지' }
        ],
        bodyItems: []
    }
});