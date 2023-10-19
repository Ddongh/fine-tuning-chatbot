from selenium import webdriver
from selenium.webdriver.common.by import By 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import time
import json


# bbs1 = ['일반 공지사항', '안전보안지시 / 정보', '인사발령', '스케줄 및 운항 허가 공지', '항공업계동향', '위기대응계획', '경조사', 'AIP', '제휴사 프로모션']
# bbs1_folder1 = ['계약서 DB']
# bbs2 = ['경영지원팀', '법무팀', '재무팀', '구매팀', '여객영업팀', '운송영업팀', '인천지점', '김포지점', '제주지점', '마케팅전략팀', '홍보팀', 'IT운영팀', '화물사업팀', '운항안전팀', '운항훈련팀', '운항표준팀', '운항품질팀', '객실운영팀', '객실훈련팀', '정비기획팀', '정비기술팀', '정비자재팀', '정비품질팀', '운항정비팀', '전략기획실', '안전보안실', '종합통제실', '사업개발실', 'CX팀', 'Innovation 전략실']
bbs2 = ['운항안전팀', '운항훈련팀', '운항표준팀', '운항품질팀', '객실운영팀', '객실훈련팀', '정비기획팀', '정비기술팀', '정비자재팀', '정비품질팀', '운항정비팀', '전략기획실', '안전보안실', '종합통제실', '사업개발실', 'CX팀', 'Innovation 전략실']
bbs3 = ['경영본부', '전략본부', '여객사업본부', '운항본부', '정비본부', '안전보안본부', '종합통제본부', '화물사업본부']


url = "http://devgw.premia.kr/login" # 로그인 페이지

driver = webdriver.Chrome()
driver.get(url) # 페이지 접속


time.sleep(1)
email = driver.find_element(By.CSS_SELECTOR,"#dusername") # 이메일(아이디) 필드
password = driver.find_element(By.CSS_SELECTOR, "#dpassword") # 비밀번호 필드
email.send_keys('ky.yang') #  파이썬용 계정
password.send_keys('1') # 파이썬용 아이디

button = driver.find_element(By.CSS_SELECTOR, "button[role=login]") # 로그인 버튼
button.click() # 로그인버튼 클릭

time.sleep(1)

bbs_url = "http://devgw.premia.kr/jgate/home/openpage?&applcode=bbs"
driver.get(bbs_url) # 페이지 접속
time.sleep(2)

""" #전사게시판 - 계약서 DB 하위 게시판
for i in range(len(bbs2)):
    bbs_manager_button = driver.find_element(By.CSS_SELECTOR, "#nv_top_g06 .lnb_menu") # 게시판관리 버튼
    bbs_manager_button.click() # 클릭
    time.sleep(2)

    bbs2_json = json.dumps(bbs2[i])

    # driver.execute_script("document.querySelector(\"input[name=parent_board_nm]\").value = \"계약서 DB\"") # 상위게시판
    driver.execute_script("document.querySelector(\".egate_btn_confirm\").click()")
    time.sleep(1)
    driver.execute_script("document.querySelector(\".egate_dialog_wrap\").querySelector(\".dynatree-expander\").click()")
    driver.execute_script("document.querySelectorAll(\".dynatree-radio\")[10].click()")
    time.sleep(1)
    driver.execute_script("document.querySelector(\".ui-dialog-buttonset\").querySelector(\"button\").click()")

    driver.execute_script("document.querySelector(\"input[name=board_kd]\").checked = true") # 분류
    driver.execute_script("document.querySelector(\"input[name=use_fl]\").checked = true") # 사용여부
    
    script = f"var board_nm_value = {bbs2_json}; document.querySelector('input[name=board_nm]').value = board_nm_value;"
    driver.execute_script(script) # 타이틀

    script = f"var board_sort_value = {(i+14) * 10}; document.querySelector('input[name=sort_ord]').value = board_sort_value;"
    driver.execute_script(script) # 순서

    driver.execute_script("document.querySelector(\"input[name=board_gb]\").checked = true") # 게시판 형태
    driver.execute_script("document.querySelector(\"input[name=board_ty]\").checked = true") # 게시판 유형
    driver.execute_script("document.querySelector(\"input[name=anony_fl]\").checked = true") # 작성자표시

    manager = driver.find_element(By.CSS_SELECTOR, ".egate_eugp_input input") # 담당자
    manager.send_keys("이혜령")
    time.sleep(1)
    manager.send_keys(Keys.RETURN)  # 엔터키 입력

    saveButton = driver.find_element(By.CSS_SELECTOR, "#btn_save")
    saveButton.click()

    try:
        # 알림창이 나타날 때까지 대기
        alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
        
        # 알림창의 확인 버튼 클릭
        alert.accept()
    except TimeoutException:
        # 대기 시간 내에 알림창이 나타나지 않은 경우 예외 처리
        print("알림창이 나타나지 않았습니다.")
    time.sleep(2)
    # driver.execute_script("")
    # driver.execute_script("")
    # break
"""

for i in range(len(bbs3)): # 부서별게시판 depth_0
    bbs_manager_button = driver.find_element(By.CSS_SELECTOR, "#nv_top_g06 .lnb_menu") # 게시판관리 버튼
    bbs_manager_button.click() # 클릭
    time.sleep(2)

    bbs2_json = json.dumps(bbs3[i])

    # driver.execute_script("document.querySelector(\"input[name=parent_board_nm]\").value = \"계약서 DB\"") # 상위게시판
    driver.execute_script("document.querySelector(\".egate_btn_confirm\").click()")
    time.sleep(1)
    # driver.execute_script("document.querySelector(\".egate_dialog_wrap\").querySelector(\".dynatree-expander\").click()")
    driver.execute_script("document.querySelectorAll(\".dynatree-radio\")[1].click()")
    time.sleep(1)
    driver.execute_script("document.querySelector(\".ui-dialog-buttonset\").querySelector(\"button\").click()")

    driver.execute_script("document.querySelector(\"input[name=board_kd]\").checked = true") # 분류
    driver.execute_script("document.querySelector(\"input[name=use_fl]\").checked = true") # 사용여부
    
    script = f"var board_nm_value = {bbs2_json}; document.querySelector('input[name=board_nm]').value = board_nm_value;"
    driver.execute_script(script) # 타이틀

    script = f"var board_sort_value = {(i+1) * 10}; document.querySelector('input[name=sort_ord]').value = board_sort_value;"
    driver.execute_script(script) # 순서

    driver.execute_script("document.querySelector(\"input[name=board_gb]\").checked = true") # 게시판 형태
    driver.execute_script("document.querySelector(\"input[name=board_ty]\").checked = true") # 게시판 유형
    driver.execute_script("document.querySelector(\"input[name=anony_fl]\").checked = true") # 작성자표시

    manager = driver.find_element(By.CSS_SELECTOR, ".egate_eugp_input input") # 담당자
    manager.send_keys("이혜령")
    time.sleep(2)
    manager.send_keys(Keys.RETURN)  # 엔터키 입력

    saveButton = driver.find_element(By.CSS_SELECTOR, "#btn_save")
    saveButton.click()
    time.sleep(2)
    try:
        # 알림창이 나타날 때까지 대기
        alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
        
        # 알림창의 확인 버튼 클릭
        alert.accept()
    except TimeoutException:
        # 대기 시간 내에 알림창이 나타나지 않은 경우 예외 처리
        print("알림창이 나타나지 않았습니다.")
    time.sleep(2)
    # break

print("게시판 등록 끝")
time.sleep(99999)


time.sleep(10)
# for title in range(len(bbs2)):
#     a = driver.find_element(By.CSS_SELECTOR, "input[name=parent_board_nm]")
#     a.send_keys("계약서 DB")
#     break



time.sleep(9999)

api_url = "" # python3 and solved에 해당하는 문제 리스트를 가져오기위함
id = ""
detail_url = ""
for i in range(1, 12): 
    api_url = "https://school.programmers.co.kr/api/v1/school/challenges/?perPage=20&languages[]=python3&statuses[]=solved&order=recent&search=&page=" + str(i)  # 페이지가 11까지 존재
    driver.get(api_url)
    pre = driver.find_element(By.CSS_SELECTOR, "pre") # pre태그 내부에 json형태로 존재
    html = pre.get_attribute('innerHTML')
    jsonObject = json.loads(html) # 변환

    for j in range(0, 20): # id 가져와서 크롤링하기
        id = jsonObject["result"][j]['id'] # id
        level = jsonObject["result"][j]['level'] # 레벨
        partTitle = jsonObject["result"][j]['partTitle'] # partTitle
        title = jsonObject["result"][j]['title'] # 타이틀
        finishedAt = jsonObject["result"][j]['finishedAt'] # 완료일

        # print(id, level, partTitle, title, finishedAt)
        detail_url = "https://school.programmers.co.kr/learn/courses/30/lessons/" + str(id) + "?language=python3"
        driver.get(detail_url)
        time.sleep(999)
        explain = driver.find_element(By.CSS_SELECTOR, ".guide-section") # 설명 및 입출력 예시 영역
        explain_html = explain.get_attribute('innerHTML') # 설명 및 입출력
        code = driver.find_element(By.CSS_SELECTOR, ".CodeMirror-code") # 코드영역
        code_html = code.get_attribute('innerHTML') # 코드
        run_button = driver.find_element(By.CSS_SELECTOR, "#run-code")
        run_button.click()
        result = driver.find_element(By.CSS_SELECTOR, "#output-wrapper")
        resule_html = result.get_attribute('innerHTML') # 실행결과

        CodingTestModel.objects.create(id=id, level=level, partTitle=partTitle, title=title, finishedAt=finishedAt, explain=explain, code=code, result=result) 

        # print(code_html)
        # time.sleep(1)
    
    # time.sleep(5)


pre = driver.find_element(By.CSS_SELECTOR, "pre")
html = pre.get_attribute('innerHTML')


jsonObject = json.loads(html)
# print(jsonObject["result"][0]['id'])
# detail_url = "" 

# for i in range(1845, 214295+1):

#     detail_url = "https://school.programmers.co.kr/learn/courses/30/lessons/" + str(i) + "?language=python3"
#     driver.get(detail_url)
#     time.sleep(10000)
#     # try:
        
#     # except:
#     #     pass

# # driver.get("https://school.programmers.co.kr/learn/courses/30/lessons/181952")
# time.sleep(10)