import ThemeProvider from '@/providers/ThemeProvider';
import Header from '@/modules/header';
import Footer from '@/modules/footer';

import Home from '@/pages/home';

const App = () => {
  return (
    <ThemeProvider>
      <div className="grid grid-rows-[auto_1fr_auto] h-screen">
        <Header />
        <Home />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App