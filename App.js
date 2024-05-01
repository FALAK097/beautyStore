import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import './src/config/Firebase';
import RootNavigation from './src/navigation';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootNavigation />
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
