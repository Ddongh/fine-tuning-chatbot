from rest_framework.decorators import api_view
from rest_framework.response import Response
import sys

from selenium import webdriver
from selenium.webdriver.common.by import By 
from selenium.webdriver.common.action_chains import ActionChains
import time
import json
# from models import CodingTestModel
from .models import CodingTestProblems
from .serializers import CodingTestProblemsSerializer
from .serializers import CodingTestProblemsTreeSerializer
from datetime import datetime
from decouple import config

@api_view(['GET'])
def crwCodingTest(request):

    def crw(p_id, p_pw, lang):
        
        err_title = ""
        # try:
        login_page = "https://programmers.co.kr/account/sign_in" # 로그인 페이지
        list_page = "https://school.programmers.co.kr/learn/challenges?order=recent&statuses=solved" # 푼 문제 목록 페이지

        driver = webdriver.Chrome()
        driver.get(login_page) # 페이지 접속

        email = driver.find_element(By.CSS_SELECTOR,"input[name=email]") # 이메일(아이디) 필드
        password = driver.find_element(By.CSS_SELECTOR, "input[type='password']") # 비밀번호 필드

        email.send_keys(p_id) # 아이디
        password.send_keys(p_pw) # 비밀번호

        button = driver.find_element(By.CSS_SELECTOR, ".itAWTII94uCyf9uUgREi") # 로그인 버튼
        button.click() # 로그인버튼 클릭
        driver.execute_script("localStorage.setItem('algorithm-lesson_end', 'yes')")
        time.sleep(1)

        driver.get(list_page) # 푼 문제 목록 리스트 페이지로 이동
        time.sleep(1)
        total = driver.find_element(By.CSS_SELECTOR, ".Statusstyle__StatusStyled-sc-tdk15-0") # 푼문제 개수 크롤링 및 정수 변환
        total = total.get_attribute('innerText')
        total = int(total.split(" ")[0]) 
        
        page_cnt = ((total - 1) // 20) + 1 # 목록 페이지 개수

        api_url = "" # solved에 해당하는 문제 리스트를 가져오기위함
        id = "" # 문제 id
        detail_url = "" # 문제 조회하기위한 url

        for i in range(1, page_cnt): 
            api_url = "https://school.programmers.co.kr/api/v1/school/challenges/?perPage=20&statuses[]=solved&order=recent&search=&page=" + str(i) 
            driver.get(api_url)
            pre = driver.find_element(By.CSS_SELECTOR, "pre") # pre태그 내부에 json형태로 존재
            html = pre.get_attribute('innerHTML')
            jsonObject = json.loads(html) # 변환

            cnt = len(jsonObject["result"]) # 해당 페이지의 문서 개수(마지막 페이지에서 오류 처리)

            for j in range(0, cnt): # id 가져와서 크롤링하기
                try:                
                    id = jsonObject["result"][j]['id'] # id
                    level = jsonObject["result"][j]['level'] # 레벨
                    partTitle = jsonObject["result"][j]['partTitle'] # partTitle
                    title = jsonObject["result"][j]['title'] # 타이틀
                    finishedAt = jsonObject["result"][j]['finishedAt'] # 완료일
                    converted_date = datetime.strptime(finishedAt, "%Y-%m-%dT%H:%M:%S.%f%z")
                    formatted_date = converted_date.strftime("%Y-%m-%d %H:%M")

                
                    detail_url = "https://school.programmers.co.kr/learn/courses/30/lessons/" + str(id) + "?language=" + lang
                    driver.get(detail_url)
                    # time.sleep(999)
                    explain = driver.find_element(By.CSS_SELECTOR, ".guide-section") # 설명 및 입출력 예시 영역
                    explain_html = explain.get_attribute('innerHTML') # 설명 및 입출력
                    code = driver.find_element(By.CSS_SELECTOR, ".CodeMirror-code") # 코드영역
                    code_html = code.get_attribute('innerHTML') # 코드
                    run_button = driver.find_element(By.CSS_SELECTOR, "#run-code")
                    # actions = ActionChains(driver)
                    # actions.move_to_element(run_button).click().perform()
                    while True:
                        try:
                            run_button.click()
                            break
                        except:
                            print("##########클릭 필요##########")
                    
                    time.sleep(2)
                    result = driver.find_element(By.CSS_SELECTOR, "#output-wrapper")
                    result_html = result.get_attribute('innerHTML') # 실행결과

                    coding_test = CodingTestProblems.objects.get(id=id, language=lang) # 데이터베이스에 저장된 데이터가 있는지 확인
                    CodingTestProblems.objects.update(id=str(id)+"_"+lang, level=level, partTitle=partTitle, title=title, language=lang , finishedAt=formatted_date, explain=explain_html, code=code_html, result=result_html) 

                    # try:
                    #     coding_test = CodingTestModel.objects.get(id=id) # 데이터베이스에 저장된 데이터가 있는지 확인

                except CodingTestProblems.DoesNotExist: # 데이터베이스에 존재하지 않으면 create
                    CodingTestProblems.objects.create(id=str(id)+"_"+lang, level=level, partTitle=partTitle, title=title, language=lang , finishedAt=formatted_date, explain=explain_html, code=code_html, result=result_html) 
                except Exception as e:
                    err_title += title + ", "
                    print("#####################크롤링 에러 발생#####################")
                    print(str(e))
                    print("err_title >>> ", err_title)
        
        return

    crw(config('CODING_TEST_JAVASCRIPT_ID'), config('CODING_TEST_JAVASCRIPT_PW'), "javascript")
    crw(config('CODING_TEST_PYTHON_ID'), config('CODING_TEST_PYTHON_PW'), "python3")
    

    
    # email.send_keys('qwer5383@naver.com') #  파이썬용 계정
    

    
    '''
    time.sleep(3)

    api_url = "" # python3 and solved에 해당하는 문제 리스트를 가져오기위함
    id = ""
    detail_url = ""
    print("for Start ")
    
            # return Response("test")
    '''
    return Response("저장완료")

@api_view(['GET'])
def initCodingTestProblems(request):
    CodingTestProblems.objects.all().delete()
    return Response("CodingTestModel 초기화 완료")

@api_view(['GET'])
def allCodingTestProblems(request):
    problems = CodingTestProblems.objects.all()
    serializer = CodingTestProblemsSerializer(problems, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def codingTestTreeData(request):
    problems = CodingTestProblems.objects.all()
    serializer = CodingTestProblemsTreeSerializer(problems, many=True)
    return Response(serializer.data)

