import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  
  // Példa felhasználói adatok (később backend-ről jön majd)
  const currentUser = {
    username: 'johndoe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    teams: [
      { id: 1, name: 'Fejlesztői csapat', role: 'Tag' },
      { id: 2, name: 'Marketing csapat', role: 'Vezető' },
      { id: 3, name: 'Projekt csapat', role: 'Tag' }
    ],
    pendingEvents: [
      { 
        id: 1,
        title: 'Sprint tervezés',
        date: '2024-03-20',
        time: '10:00',
        team: 'Fejlesztői csapat'
      },
      {
        id: 2,
        title: 'Marketing megbeszélés',
        date: '2024-03-22',
        time: '14:00',
        team: 'Marketing csapat'
      }
    ]
  };

  const handleBackToCalendar = () => {
    navigate('/calendar');
  };

  const handleEventClick = (eventId) => {
    // Később: esemény részletek megjelenítése
    console.log('Event clicked:', eventId);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="back-button" onClick={handleBackToCalendar}>
          Vissza a naptárhoz
        </button>
        <h1>Profil</h1>
      </div>
      
      <div className="profile-content">
        <section className="user-info-section">
          <h2>Felhasználói adatok</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Felhasználónév:</label>
              <span>{currentUser.username}</span>
            </div>
            <div className="info-item">
              <label>Név:</label>
              <span>{currentUser.name}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{currentUser.email}</span>
            </div>
          </div>
        </section>

        <section className="teams-section">
          <h2>Csapatok</h2>
          <div className="teams-grid">
            {currentUser.teams.map(team => (
              <div key={team.id} className="team-card">
                <h3>{team.name}</h3>
                <span className="role-badge">{team.role}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pending-events-section">
          <h2>Függőben lévő események</h2>
          <div className="events-list">
            {currentUser.pendingEvents.map(event => (
              <div 
                key={event.id} 
                className="event-card"
                onClick={() => handleEventClick(event.id)}
              >
                <div className="event-header">
                  <h3>{event.title}</h3>
                  <span className="team-tag">{event.team}</span>
                </div>
                <div className="event-details">
                  <span className="event-date">{event.date}</span>
                  <span className="event-time">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile; 