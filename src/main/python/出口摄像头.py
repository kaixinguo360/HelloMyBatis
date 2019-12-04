import cv2
import json
import requests
from hyperlpr import *

url = 'http://localhost:4200/api/park/'
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

cap = cv2.VideoCapture(0)
while(1):
    # get a frame
    ret, frame = cap.read()
    cv2.imshow("capture", frame)
    res = HyperLPR_PlateRecogntion(frame)
    if len(res) != 0:
        for car in res:
            out(car[0])
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break



