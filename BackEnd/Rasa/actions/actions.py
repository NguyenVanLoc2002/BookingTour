from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import UserUtteranceReverted
import requests

class ActionShowNorthernTours(Action):
    def name(self) -> str:
        return "action_show_northern_tours"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict) -> list:
        # Gọi API của TourService để lấy thông tin các tour miền Bắc
        tour_service_url = "http://api_gateway:8000/api/v1/tours/region?region=NORTH&page=1&size=4&isAscending=false"  # URL của TourService qua API Gateway
        try:
            response = requests.get(tour_service_url)
            response.raise_for_status()
            data = response.json()  # Lấy dữ liệu JSON từ phản hồi của API

            # Lấy danh sách các tour từ trường 'content'
            tours = data.get('content', [])

            # Tạo câu trả lời từ dữ liệu tour với trường 'day' thay vì 'days'
            tour_list = [f"{tour['name']}: {tour['day']} ngày, giá {tour['price']} VNĐ." for tour in tours]
            response_text = "Các tour miền Bắc hiện có:\n" + "\n".join(tour_list)
            dispatcher.utter_message(text=response_text)
        except requests.exceptions.RequestException as e:
            dispatcher.utter_message(text="Xin lỗi, hiện không thể lấy thông tin tour. Vui lòng thử lại sau.")
            print(f"Error: {e}")

        return []


# class ActionDefaultFallback(Action):
#     def name(self) -> str:
#         return "action_default_fallback"
#
#     def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict) -> list:
#         # Gửi thông điệp khi không nhận diện được intent
#         dispatcher.utter_message(text="Vui lòng đặt một câu hỏi khác, câu hỏi hiện tại của bạn không phù hợp.")
#
#         # Hoàn tác lời nói của người dùng, trả về để bot không ghi nhận
#         return [UserUtteranceReverted()]
