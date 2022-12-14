import { NavigationContainer } from '@react-navigation/native';
import { MyTabs } from './src/component/tabs';

export default function App() {
  return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
  );
}