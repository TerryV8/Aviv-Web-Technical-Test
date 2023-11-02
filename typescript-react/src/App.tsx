import Header from '@components/Header/Header';
import Listings from '@containers/Listings/Listings';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListingPriceHistory from '@components/ListingPriceHistory/ListingPriceHistory';
import NotFoundPage from '@components/NotFoundPage/NotFoundPage';

const App = () => (
  <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route
          path="/:listingId/prices"
          element={<ListingPriceHistory />}
        ></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
