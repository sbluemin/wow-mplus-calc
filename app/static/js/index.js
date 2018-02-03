//import Vue from 'vue'

function createDamageJsonMessage(named, is_tyrannical) {
    var data = new Object();
    data.named = named;
    data.is_tyrannical = is_tyrannical;
    return JSON.stringify(data);
}

// api/damage_table 을 요청하고 성공 시, 데미지 테이블에 업데이트 시킨다.
function requestPostDamageTableAndUpdateDamageTable(named, headerViewString) {
    var jsonString = createDamageJsonMessage(named, false);

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
                damageTable.bodyItems.push({
                    level: key,
                    oneDamage: numberWithCommas(jsonObject[key][0]),
                    twoDamage: numberWithCommas(jsonObject[key][1])
                });
            }

            damageTable.named = headerViewString;
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
            requestPostDamageTableAndUpdateDamageTable("융합체", "영혼의 융합체- 영혼 대폭발");
        },
        // 혐오스러운 원한강타: 지축붕괴 발구르기
        b: function(event) {
            requestPostDamageTableAndUpdateDamageTable("원한강타", "혐오스러운 원한강타 - 지축붕괴 발구르기");
        },
        // 로크모라: 산산조각
        c: function(event) {
            requestPostDamageTableAndUpdateDamageTable("로크모라", "로크모라 - 산산조각");
        },
        // 자칼:사악한 격돌
        d: function(event) {
            requestPostDamageTableAndUpdateDamageTable("자칼", "자칼 - 사악한 격돌");
        },
        // 증오갈퀴 여군주: 집중된 번개
        e: function(event) {
            requestPostDamageTableAndUpdateDamageTable("증오갈퀴여군주", "증오갈퀴 여군주 - 집중된 번개");
        },
        // 하임달: 뿔피리
        f: function(event) {
            requestPostDamageTableAndUpdateDamageTable("하임달", "하임달 - 뿔피리");
        },
        // 스코발드: 지옥화염쇄도
        g: function(event) {
            requestPostDamageTableAndUpdateDamageTable("스코발드", "스코발드 - 지옥화염쇄도");
        },
    }
});

var damageTable = new Vue({
    el: '#damage_table',
    data: {
        named: "Welcome!",
        headItems: [
            { label: '레벨' },
            { label: '경화 데미지' },
            { label: '폭군 데미지' }
        ],
        bodyItems: []
    }
});