import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TrainingHomeScreen from '../screens/TrainingHomeScreen';
import DietHomeScreen from '../screens/DietHomeScreen';

const Tab = createBottomTabNavigator();
const TrainingStack = createStackNavigator();
const DietStack = createStackNavigator();

const TrainingNavigator = () => (
  <TrainingStack.Navigator>
    <TrainingStack.Screen name="TrainingHome" component={TrainingHomeScreen} />
  </TrainingStack.Navigator>
);

const DietNavigator = () => (
  <DietStack.Navigator>
    <DietStack.Screen name="DietHome" component={DietHomeScreen} />
  </DietStack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Training" component={TrainingNavigator} options={{ headerShown: false }} />
    <Tab.Screen name="Diet" component={DietNavigator} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default AppNavigator;