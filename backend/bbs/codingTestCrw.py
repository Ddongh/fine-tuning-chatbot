from selenium import webdriver
from selenium.webdriver.common.by import By 
import time
import json
# from models import CodingTestModel
from .models import CodingTestModel
from decouple import config

url = "https://programmers.co.kr/account/sign_in" # 로그인 페이지

driver = webdriver.Chrome()
driver.get(url) # 페이지 접속

email = driver.find_element(By.CSS_SELECTOR,"input[name=email]") # 이메일(아이디) 필드
password = driver.find_element(By.CSS_SELECTOR, "input[type='password']") # 비밀번호 필드
#email.send_keys('qwer5383@naver.com') #  파이썬용 계정

password.send_keys('A18501pjdf**p') # 파이썬용 아이디

button = driver.find_element(By.CSS_SELECTOR, ".itAWTII94uCyf9uUgREi") # 로그인 버튼
button.click() # 로그인버튼 클릭

time.sleep(3)

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