import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HostelsList from './components/Hostelslist/Hostelslist';
import HostelDetails from './components/HostelDetails/HostelDetails';
import NotFound from './components/NotFound/NotFound';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HostelsList />} />
        <Route path="/hostel/:id" element={<HostelDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
