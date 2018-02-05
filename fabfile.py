from fabric.contrib.files import append, exists, sed, put
from fabric.api import env, local, run, sudo
import os
import json

os.environ["PIPENV_VENV_IN_PROJECT"] = "1"

# 현재 fabfile.py가 있는 폴더의 경로
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))

# deploy.json이라는 파일을 열어 아래의 변수들에 담아줍니다.
# envs = json.load(open(os.path.join(PROJECT_DIR, "deploy.json")))

REPO_URL = "https://github.com/sbluemin/wow-mplus-calc"
PROJECT_NAME = "wow-mplus-calc"
REMOTE_HOST = "sbluemin.iptime.org"
REMOTE_HOST_SSH = "sbluemin.iptime.org:1002"
REMOTE_USER = "flask"

# SSH에 접속할 유저를 지정하고,
env.user = REMOTE_USER

# SSH로 접속할 서버주소를 넣어주고,
env.hosts = [
    REMOTE_HOST_SSH,
]

# 원격 서버중 어디에 프로젝트를 저장할지 지정해준 뒤,
PROJECT_DIR = '/home/{}/{}'.format(env.user, PROJECT_NAME)

# 우리 프로젝트에 필요한 apt 패키지들을 적어줍니다.
APT_REQUIREMENTS = [
    'curl',
    'git',
    'python3-pip',
    'nginx',
    'uwsgi-plugin-python'
]

PIP_REQUIREMENTS = [
    'pipenv',
    'uwsgi'
]

# 최초 배포시
def initial():
    _install_apt_requirements(APT_REQUIREMENTS)
    _install_pip_requirements(PIP_REQUIREMENTS)

# 상시 배포시
def deploy():
    _get_latest_source()
    _setup_pipenv()

# 필요한 apt 패키지를 설치합니다.
def _install_apt_requirements(APT_REQUIREMENTS):
    reqs = ''
    for req in APT_REQUIREMENTS:
        reqs += (' ' + req)
    sudo('apt-get -y install {}'.format(reqs))

# 필요한 pip 패키지를 설치합니다.
def _install_pip_requirements(PIP_REQUIREMENTS):
    reqs = ''
    for req in PIP_REQUIREMENTS:
        reqs += (' ' + req)
    sudo('pip3 install {}'.format(reqs))

# Git Repo에서 최신 소스를 받아옵니다.
# 깃이 있다면 fetch를, 없다면 clone을 진행합니다.
def _get_latest_source():
    if exists(PROJECT_DIR + '/.git'):
        run('cd %s && git fetch' % (PROJECT_DIR,))
    else:
        run('git clone %s %s' % (REPO_URL, PROJECT_DIR))
    current_commit = local("git log -n 1 --format=%H", capture=True)
    run('cd %s && git reset --hard %s' % (PROJECT_DIR, current_commit))

# Package Manager인 pipenv 설치
def _setup_pipenv():
    # 프로젝트 폴더에 .venv 생성을 위해 환경변수 설정
    run('PIPENV_VENV_IN_PROJECT="1"')
    run('cd %s && pipenv shell pipenv install' % (PROJECT_DIR))
    