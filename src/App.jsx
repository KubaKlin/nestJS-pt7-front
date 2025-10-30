import { AuthProvider } from './AuthContext.jsx';
import AppContent from './components/AppContent.jsx';

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;