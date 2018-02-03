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

var sideBar = new Vue({
    el: '#sidebar-wrapper',
    methods: {
        // 영혼 융합체: 영혼 대폭발
        a: function(event) {
            requestPostDamageTableAndUpdateDamageTable(createDamageJsonMessage("융합체", false));
        },
        // 혐오스러운 원한강타: 지축붕괴 발구르기
        b: function(event) {
            requestPostDamageTableAndUpdateDamageTable(createDamageJsonMessage("원한강타", false));
        },
        // 로크모라: 산산조각
        c: function(event) {
            requestPostDamageTableAndUpdateDamageTable(createDamageJsonMessage("로크모라", false));
        },
        // 자칼:사악한 격돌
        d: function(event) {
            requestPostDamageTableAndUpdateDamageTable(createDamageJsonMessage("자칼", false));
        },
        // 증오갈퀴 여군주: 집중된 번개
        e: function(event) {
            requestPostDamageTableAndUpdateDamageTable(createDamageJsonMessage("증오갈퀴여군주", false));
        },
        // 하임달: 뿔피리
        f: function(event) {
            requestPostDamageTableAndUpdateDamageTable(createDamageJsonMessage("하임달", false));
        },
        // 스코발드: 지옥화염쇄도
        g: function(event) {
            requestPostDamageTableAndUpdateDamageTable(createDamageJsonMessage("스코발드", false));
        },
    }
});

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