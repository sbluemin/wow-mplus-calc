from flask import request, jsonify, Response
from app import appServer
import math
import json

# 기본 데미지, 물리 피해 타입 여부, 설명, 조크
검떼_영혼의융합체_영혼대폭발 = (1570000, False, '영혼 중첩 여부가 계산되지 않은 수치입니다.', '')
검떼_혐오스러운원한강타_지축붕괴발구르기 = (841026, True, '')

넬타_로크모라_산산조각 = (589128, True, '땅거미가 계산되지 않은 수치입니다.', '')

비전로_자칼_사악한격돌 = (1540000, True, '', '')

아즈_증오갈퀴여군주_집중된번개 = (1160000, False, '', '')

어숲_나무심장_부서진대지 = (766519, False, '', '')
어숲_자비우스의망령_악몽화살 = (1050000, False, '', '')
어숲_자비우스의망령_대재앙 = (1320000, False, '', '')

용맹_하임달_뿔피리 = (901116, True, '', '')
용맹_스코발드_지옥화염쇄도 = (1340000, False, '', '')

# 계산할 테이블 범위
CALC_MIN_LEVEL = 15
CALC_MAX_LEVEL = 30

named_map = {
    '융합체': 검떼_영혼의융합체_영혼대폭발,
    '원한강타': 검떼_혐오스러운원한강타_지축붕괴발구르기,
    '로크모라': 넬타_로크모라_산산조각,
    '자칼': 비전로_자칼_사악한격돌,
    '증오갈퀴여군주': 아즈_증오갈퀴여군주_집중된번개,
    '하임달': 용맹_하임달_뿔피리,
    '스코발드': 용맹_스코발드_지옥화염쇄도
}

# 쐐기 단수에 따라 데미지를 계산한다.
# 단수 스케일링 수치 공식 = (1.1^(단수-1))-1)*100 -> 올림
# 폭군은 위 공식에서 1.15를 곱한다. (폭군은 15% 스케일링을 더받으므로)
def calc_damage(mplus_level, base_damage_value, is_tyrannical):
    scale_value_percentage = ((math.ceil(((math.pow(1.1, mplus_level - 1)) - 1) * 100)) / 100)
    result_damage_value = base_damage_value * scale_value_percentage
    # 폭군일 경우 15% 를 곱한다.
    if is_tyrannical == True:
        result_damage_value = result_damage_value * 1.15
    return math.ceil(result_damage_value)

def get_damage_table(named_tuple_object):
    dic = dict()
    dic['comment'] = named_tuple_object[2]
    dic['joke'] = named_tuple_object[3]
    dic['physical'] = named_tuple_object[1]
    dic['damage'] = list()
    for i in range(CALC_MIN_LEVEL, CALC_MAX_LEVEL + 1):
        dic['damage'].insert(i - CALC_MIN_LEVEL, (i, calc_damage(i, named_tuple_object[0], False), calc_damage(i, named_tuple_object[0], True)))
    return dic

@appServer.route('/')
def index():
    return appServer.send_static_file('index.html')

@appServer.route('/api/damage_table', methods=['POST'])
def damage_table():
    request_json = request.get_json()
    named = request_json.get('named')
    
    # 현재 안쓰임
    is_tyrannical = request_json.get('is_tyrannical')

    # 네임드 튜플 객체를 가져옴
    named_tuple = named_map[named]
    result = get_damage_table(named_tuple)

    # 응답 객체 생성
    response = Response(response=json.dumps(result, indent=4),
                        status=200,
                        mimetype="application/json")

    return response
