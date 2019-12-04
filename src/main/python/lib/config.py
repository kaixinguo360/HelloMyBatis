import cv2
import json
import requests
from hyperlpr import *

url = 'http://localhost:8080/api/park/'
apikey='1234567'

def enter(car):
        print(car+'请求进入')
        try:
            res = requests.get(url + 'enter/'
                               + car + '?key=' + apikey, timeout = 20)
            res = json.loads(res.text)
            print(res['message'])
        except:
            print('An Unknow Error Happened')
            
def out(car):
        print(car+'请求离开')
        try:
            res = requests.get(url + 'out/'
                               + car + '?key=' + apikey, timeout = 20)
            res = json.loads(res.text)
            print(res['message'])
        except:
            print('An Unknow Error Happened')
