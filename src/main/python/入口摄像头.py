import cv2
import json
import requests
from hyperlpr import *
from lib.config import *

cap = cv2.VideoCapture(0)
while(1):
    # get a frame
    ret, frame = cap.read()
    cv2.imshow("capture", frame)
    res = HyperLPR_PlateRecogntion(frame)
    if len(res) != 0:
        for car in res:
            enter(car[0])
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break



