import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './hooks/useFavorites.jsx';
import { RecentlyPlayedProvider } from './hooks/useRecentlyPlayed.jsx';
import { AchievementsProvider } from './hooks/useAchievements.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <RecentlyPlayedProvider>
          <AchievementsProvider>
            <App />
          </AchievementsProvider>
        </RecentlyPlayedProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
