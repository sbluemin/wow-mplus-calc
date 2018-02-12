//import Vue from 'vue'

function createDamageJsonMessage(named, is_tyrannical) {
    var data = new Object();
    data.named = named;
    data.is_tyrannical = is_tyrannical;
    return JSON.stringify(data);
}

// api/damage_table 을 요청하고 성공 시, 데미지 테이블에 업데이트 시킨다.
function requestPostDamageTableAndUpdateDamageTable(named, headerViewString) {
    // 테이블 데이터 초기화
    damageTable.bodyItems = [];

    var jsonString = createDamageJsonMessage(named, false);

    $.ajax({
        type: "POST",
        url: 'api/damage_table',
        data: jsonString,
        contentType: "application/json",

        success: function(data) {
            jsonObject = data;
            //var jsonObject = JSON.parse(data);

            damageTable.comment = jsonObject['comment'];
            damageTable.joke = jsonObject['joke'];

            if (jsonObject['physical'] == true) {
                damageTable.isPhysical = "물리 데미지"
            } else {
                damageTable.isPhysical = "마법 데미지"
            }

            /*
            for (var [level, oneDmg, TwoDmg] in jsonObject.damage) {
                damageTable.bodyItems.push({
                    level: level,
                    oneDamage: numberWithCommas(oneDmg),
                    twoDamage: numberWithCommas(TwoDmg)
                });
            }
            */

            for (var i = 0; i < jsonObject.damage.length; i++) {
                var damage = jsonObject.damage[i];
                damageTable.bodyItems.push({
                    level: damage[0],
                    oneDamage: numberWithCommas(damage[1]),
                    twoDamage: numberWithCommas(damage[2])
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
            requestPostDamageTableAndUpdateDamageTable("융합체", "영혼의 융합체 - 영혼 대폭발");
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
        // 나무심장: 부서진 대지
        f: function(event) {
            requestPostDamageTableAndUpdateDamageTable("나무심장", "나무심장 - 부서진 대지");
        },
        // 자비우스: 악몽화살
        g: function(event) {
            requestPostDamageTableAndUpdateDamageTable("자비우스_악몽화살", "자비우스의 망령 - 악몽화살");
        },
        // 자비우스: 대재앙의 악몽
        h: function(event) {
            requestPostDamageTableAndUpdateDamageTable("자비우스_대재앙", "자비우스의 망령 - 대재앙의 악몽");
        },
        // 하임달: 뿔피리
        i: function(event) {
            requestPostDamageTableAndUpdateDamageTable("하임달", "하임달 - 뿔피리");
        },
        // 스코발드: 지옥화염쇄도
        j: function(event) {
            requestPostDamageTableAndUpdateDamageTable("스코발드", "스코발드 - 지옥화염쇄도");
        },
    }
});

var damageTable = new Vue({
    el: '#damage_table',
    data: {
        named: "Welcome!",
        comment: "",
        joke: "",
        isPhysical: "",
        headItems: [
            { label: '레벨' },
            { label: '경화 데미지' },
            { label: '폭군 데미지' }
        ],
        bodyItems: []
    }
});