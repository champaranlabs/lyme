import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome6 } from '@expo/vector-icons';
import Typography from '@src/atoms/Typography';
import { Colors } from '@src/constants/Colors';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.neutral.dark.darkest,
        tabBarInactiveTintColor: Colors.neutral.dark.light,
        tabBarStyle: {
          backgroundColor: Colors.neutral.light.lightest,
          height: 88,
          padding: 16,
        },
        // headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hotspots",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons name="wifi-tethering" size={24} color={color} />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            <Typography variant='BS' text="Hotspots" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome6 name="shop" size={24} color={color} />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            <Typography variant='BS' text="Shop" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          title: "Take Test",
          //   tabBarIcon: ({ color, size, focused }) => (
          //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          //       <FontAwesome6 name="shop" size={24} color={color} />
          //     </View>
          //   ),
          tabBarLabel: ({ focused, color }) => (
            <Typography variant='BS' text="Take Test" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Profile",
          //   tabBarIcon: ({ color, size, focused }) => (
          //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          //       <FontAwesome6 name="shop" size={24} color={color} />
          //     </View>
          //   ),
          tabBarLabel: ({ focused, color }) => (
            <Typography variant='BS' text="Profile" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          //   tabBarIcon: ({ color, size, focused }) => (
          //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          //       <FontAwesome6 name="shop" size={24} color={color} />
          //     </View>
          //   ),
          tabBarLabel: ({ focused, color }) => (
            <Typography variant='BS' text="History" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}