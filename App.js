import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';

import './src/config/Firebase';
import RootNavigation from './src/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
