import './src/i18n';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';
import { initSentry } from './src/services/monitoring/sentry';
import { trackEvent } from './src/services/analytics/events';

// Initialize monitoring
initSentry();
trackEvent('app_opened');

function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <StatusBar style="dark" />
        <AppNavigator />
      </NavigationContainer>
    </ErrorBoundary>
  );
}

export default Sentry.wrap(App);
