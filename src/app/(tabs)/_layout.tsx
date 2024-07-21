import { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import {
  TabView,
  TabBar,
  Route,
  SceneRendererProps,
  NavigationState
} from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './index';
import AgendaScreen from './agenda';
import * as colors42 from '@/style/Colors';
import Companion42Header from '@/components/Companion42Header';

type RouteProps = Route & { icon: string };
type State = NavigationState<RouteProps>;

const TabLayout = () => {
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'profile', title: 'Profile', icon: 'home' },
    { key: 'agenda', title: 'Agenda', icon: 'calendar' }
  ];

  const isLandscape = width > height;

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'profile':
        return <HomeScreen />;
      case 'agenda':
        return <AgendaScreen />;
      default:
        return null;
    }
  };

  const renderIcon = ({
    route,
    focused
  }: {
    route: RouteProps;
    focused: boolean;
  }) =>
    isLandscape ? null : (
      <Ionicons
        name={focused ? (route.icon as any) : (`${route.icon}-outline` as any)}
        size={21}
        color={focused ? colors42.C42_ORANGE_DARK : colors42.C42_TEXT}
      />
    );

  const renderLabel = ({
    route,
    focused
  }: {
    route: RouteProps;
    focused: boolean;
  }) => (
    <Text
      style={[
        styles.label,
        {
          color:
            focused && isLandscape
              ? colors42.C42_ORANGE_DARK
              : colors42.C42_TEXT,
          fontSize: isLandscape ? 15 : 10
        }
      ]}
    >
      {route.title}
    </Text>
  );

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <TabBar
      {...props}
      renderIcon={renderIcon}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      pressColor="transparent"
      renderLabel={renderLabel}
    />
  );

  return (
    <View style={styles.container}>
      <Companion42Header />
      <TabView
        navigationState={{ index, routes }}
        renderScene={height ? renderScene : () => null}
        onIndexChange={setIndex}
        initialLayout={{ width }}
        renderTabBar={renderTabBar}
        tabBarPosition="bottom"
        style={{ marginTop: isLandscape ? 0 : 21 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors42.C42_BACKGROUND
  },
  tabBar: {
    backgroundColor: colors42.C42_GREEN,
    paddingTop: 5
  },
  indicator: {
    backgroundColor: colors42.C42_ORANGE_DARK
  },
  label: {
    fontSize: 10,
    color: colors42.C42_TEXT,
    fontWeight: 'bold'
  }
});

export default TabLayout;
