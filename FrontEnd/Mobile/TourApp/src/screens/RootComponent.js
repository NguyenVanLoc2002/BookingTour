import MainComponent from "./MainComponent"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTour from "../components/HomeComponent/HomeComponent"
import AccountComponent from "../components/AccountComponent/AccountComponent"
import BookingComponent from "../components/BookingComponent/ListBookingComponent"
import NotificationComponent from "../components/NotificationComponent/NotificationComponent"
import SavedListComponent from "../components/SavedListComponent/SavedListComponent"
import DetailTour from "../components/TourComponent/DetailTour"
import Tour from "../components/HomeComponent/component/TourComponent"
import ListTour from "../components/TourComponent/ListTour"
import SetCriteria from "../components/HomeComponent/component/SetCriteria"

const Stack = createNativeStackNavigator();

export default function RootComponent() {

  return  (
    <Stack.Navigator initialRouteName="TourComponent">
      <Stack.Screen
        name="TourComponent"
        component={MainComponent}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen name="HomeTour" component={HomeTour} />
       <Stack.Screen name="AccountComponent" component={AccountComponent} />
       <Stack.Screen name="BookingComponent" component={BookingComponent} />
       <Stack.Screen name="NotificationComponent" component={NotificationComponent} />
       <Stack.Screen name="SavedListComponent" component={SavedListComponent} />
       <Stack.Screen name="DetailTour" component={DetailTour} />
       <Stack.Screen name="ListTour" component={ListTour} />
       <Stack.Screen name="Tour" component={Tour} />
       <Stack.Screen name="SetCriteria" component={SetCriteria} />
    </Stack.Navigator>
  ) 
}