import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    groups: ['Family', 'Work', 'Friends'],
    pendingEvents: [
      { 
        id: 1,
        name: 'Sprint tervezés',
        description: 'A következő sprint feladatainak átbeszélése és tervezése',
        date: new Date('2024-03-20'),
        time: '10:00',
        groupId: 2,
        creator: 'Kovács Péter',
        invitees: [
          { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'pending' },
          { id: 2, name: 'Nagy Anna', email: 'anna@example.com', status: 'accepted' },
          { id: 3, name: 'Kiss János', email: 'janos@example.com', status: 'pending' }
        ]
      },
      { 
        id: 2,
        name: 'Marketing megbeszélés',
        description: 'Új marketing kampány tervezése és megbeszélése',
        date: new Date('2024-03-22'),
        time: '14:00',
        groupId: 3,
        creator: 'Szabó Éva',
        invitees: [
          { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'pending' },
          { id: 4, name: 'Tóth Márk', email: 'mark@example.com', status: 'declined' },
          { id: 5, name: 'Varga Kata', email: 'kata@example.com', status: 'accepted' }
        ]
      }
    ]
  });
  const [groups, setGroups] = useState([
    { id: 1, name: 'Család', color: '#4CAF50' },
    { id: 2, name: 'Fejlesztői csapat', color: '#2196F3' },
    { id: 3, name: 'Marketing csapat', color: '#FF9800' },
    { id: 4, name: 'Egyéb', color: '#9C27B0' }
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: 'Teszt Felhasználó', email: 'test@example.com' },
    { id: 2, name: 'János Nagy', email: 'janos@example.com' },
    { id: 3, name: 'Kovács Éva', email: 'eva@example.com' },
    { id: 4, name: 'Kiss Péter', email: 'peter@example.com' },
    { id: 5, name: 'Szabó Anna', email: 'anna@example.com' }
  ]);
  const [selectedInvitees, setSelectedInvitees] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    time: '',
    groupId: '',
    color: '',
    invitees: '',
    isRecurring: false,
    recurrenceType: 'daily' // 'daily', 'weekly', 'monthly', 'yearly'
  });

  // Előre definiált színek
  const predefinedColors = [
    { name: 'Zöld', value: '#4CAF50' },
    { name: 'Kék', value: '#2196F3' },
    { name: 'Narancssárga', value: '#FF9800' },
    { name: 'Lila', value: '#9C27B0' },
    { name: 'Piros', value: '#F44336' },
    { name: 'Rózsaszín', value: '#E91E63' },
    { name: 'Sárga', value: '#FFEB3B' },
    { name: 'Türkiz', value: '#00BCD4' }
  ];

  // Példa események betöltése
  useEffect(() => {
    // Itt majd a backend-ről töltjük be az eseményeket
    const sampleEvents = [
      {
        id: 1,
        name: 'Családi vacsora',
        description: 'Havi családi vacsora',
        date: new Date(2023, 5, 15),
        time: '18:00',
        groupId: 1,
        color: '#4CAF50',
        creator: 'Teszt Felhasználó',
        status: 'created',
        invitees: [
          { id: 2, name: 'János Nagy', email: 'janos@example.com', status: 'pending' },
          { id: 3, name: 'Kovács Éva', email: 'eva@example.com', status: 'accepted' },
          { id: 4, name: 'Kiss Péter', email: 'peter@example.com', status: 'declined' }
        ]
      },
      {
        id: 2,
        name: 'Projekt megbeszélés',
        description: 'Heti projekt státusz megbeszélés',
        date: new Date(2023, 5, 16),
        time: '10:00',
        groupId: 2,
        color: '#2196F3',
        creator: 'Teszt Felhasználó',
        status: 'created',
        invitees: [
          { id: 3, name: 'Kovács Éva', email: 'eva@example.com', status: 'pending' },
          { id: 5, name: 'Szabó Anna', email: 'anna@example.com', status: 'pending' }
        ]
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getWeekDates = (date) => {
    const current = new Date(date);
    const week = [];
    const day = current.getDay();
    // Adjust to start with Monday
    const diff = day === 0 ? -6 : 1 - day;
    current.setDate(current.getDate() + diff);
    
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return week;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setNewEvent({
      name: '',
      description: '',
      time: '',
      groupId: '',
      color: '',
      invitees: '',
      isRecurring: false,
      recurrenceType: 'daily'
    });
    setSelectedInvitees([]);
    setIsEditing(false);
    setShowEventForm(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(null);
    setNewEvent({
      name: event.name,
      description: event.description,
      time: event.time,
      groupId: event.groupId,
      color: event.color,
      invitees: event.invitees,
      isRecurring: event.isRecurring,
      recurrenceType: event.recurrenceType
    });
    
    // Beállítjuk a kiválasztott meghívottakat
    if (event.invitees) {
      setSelectedInvitees(event.invitees.map(invitee => invitee.id));
    } else {
      setSelectedInvitees([]);
    }
    
    setSelectedDate(event.date);
    setIsEditing(true);
    setShowEventForm(true);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    
    // Meghívottak összegyűjtése
    const invitees = selectedInvitees.map(id => {
      const user = users.find(u => u.id === id);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        status: 'pending'
      };
    });
    
    if (isEditing) {
      // Esemény szerkesztése
      setEvents(events.map(event => {
        if (event.id === selectedEvent.id) {
          return {
            ...event,
            name: newEvent.name,
            description: newEvent.description,
            time: newEvent.time,
            groupId: newEvent.groupId,
            color: newEvent.color,
            invitees: invitees
          };
        }
        return event;
      }));
    } else {
      // Új esemény létrehozása
      const selectedGroup = groups.find(g => g.id === parseInt(newEvent.groupId));
      const event = {
        ...newEvent,
        date: selectedDate,
        id: Date.now(),
        creator: 'Teszt Felhasználó',
        status: 'created',
        color: newEvent.color || (selectedGroup ? selectedGroup.color : '#9C27B0'),
        invitees: invitees
      };
      
      // Ha ismétlődő esemény, akkor létrehozzuk a többi előfordulást is
      if (event.isRecurring) {
        const recurringEvents = [];
        const baseDate = new Date(event.date);
        const baseTime = event.time;
        
        // Létrehozzuk az első eseményt
        recurringEvents.push({
          ...event,
          id: Date.now(),
          isRecurringInstance: true,
          recurringGroupId: Date.now()
        });
        
        // Létrehozzuk a további előfordulásokat
        for (let i = 1; i < 10; i++) { // Maximum 10 előfordulást hozunk létre
          const nextDate = new Date(baseDate);
          
          switch (event.recurrenceType) {
            case 'daily':
              nextDate.setDate(baseDate.getDate() + i);
              break;
            case 'weekly':
              nextDate.setDate(baseDate.getDate() + (i * 7));
              break;
            case 'monthly':
              nextDate.setMonth(baseDate.getMonth() + i);
              break;
            case 'yearly':
              nextDate.setFullYear(baseDate.getFullYear() + i);
              break;
            default:
              break;
          }
          
          recurringEvents.push({
            ...event,
            id: Date.now() + i,
            date: nextDate,
            isRecurringInstance: true,
            recurringGroupId: Date.now()
          });
        }
        
        setEvents([...events, ...recurringEvents]);
      } else {
        setEvents([...events, event]);
      }
    }
    
    setShowEventForm(false);
    setNewEvent({
      name: '',
      description: '',
      time: '',
      groupId: '',
      color: '',
      invitees: '',
      isRecurring: false,
      recurrenceType: 'daily'
    });
    setSelectedInvitees([]);
    setIsEditing(false);
  };

  const handleEventResponse = (eventId, response) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        // Frissítjük a meghívottak állapotát
        const updatedInvitees = event.invitees.map(invitee => {
          if (invitee.id === 1) { // Teszt Felhasználó ID-je
            return { ...invitee, status: response };
          }
          return invitee;
        });
        
        return {
          ...event,
          invitees: updatedInvitees
        };
      }
      return event;
    }));
    setShowEventDetails(false);
  };

  const handleProfileEventResponse = (eventId, response) => {
    // Frissítjük az esemény állapotát
    setEvents(events.map(event => {
      if (event.id === eventId) {
        // Frissítjük a meghívottak állapotát
        const updatedInvitees = event.invitees.map(invitee => {
          if (invitee.id === 1) { // Teszt Felhasználó ID-je
            return { ...invitee, status: response };
          }
          return invitee;
        });
        
        return {
          ...event,
          invitees: updatedInvitees
        };
      }
      return event;
    }));

    // Frissítjük a függőben lévő események listáját
    setCurrentUser({
      ...currentUser,
      pendingEvents: currentUser.pendingEvents.filter(event => event.id !== eventId)
    });

    // Bezárjuk az esemény részletek ablakot
    setShowEventDetails(false);
  };

  const handleGroupChange = (e) => {
    const groupId = e.target.value;
    const selectedGroup = groups.find(g => g.id === parseInt(groupId));
    setNewEvent({
      ...newEvent,
      groupId: groupId,
      color: selectedGroup ? selectedGroup.color : ''
    });
  };

  const handleColorChange = (color) => {
    setNewEvent({
      ...newEvent,
      color: color
    });
  };

  const handleInviteeChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(parseInt(options[i].value));
      }
    }
    
    setSelectedInvitees(selectedValues);
  };

  const getGroupName = (groupId) => {
    const group = groups.find(g => g.id === parseInt(groupId));
    return group ? group.name : '';
  };

  const handleRecurringChange = (e) => {
    setNewEvent({
      ...newEvent,
      isRecurring: e.target.checked
    });
  };

  const handleRecurrenceTypeChange = (e) => {
    setNewEvent({
      ...newEvent,
      recurrenceType: e.target.value
    });
  };

  const renderMonthView = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    // Adjust first day to start with Monday (1) instead of Sunday (0)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = events.filter(event => 
        event.date.getDate() === day && 
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
      );

      days.push(
        <div
          key={day}
          className={`calendar-day ${day === new Date().getDate() && 
            currentDate.getMonth() === new Date().getMonth() && 
            currentDate.getFullYear() === new Date().getFullYear() ? 'today' : ''} 
            ${dayEvents.length > 0 ? 'has-events' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          <span className="day-number">{day}</span>
          <div className="event-indicators">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className={`event-indicator ${event.status}`}
                style={{ backgroundColor: event.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventClick(event);
                }}
                title={event.name}
              >
                <span className="event-name">{event.name}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const renderWeekView = () => {
    const weekDates = getWeekDates(currentDate);
    
    // Generate hour labels with header
    const hourLabelsColumn = (
      <div className="hour-labels">
        <div className="hour-labels-header"></div>
        {Array.from({ length: 24 }, (_, i) => {
          const hour = i < 10 ? `0${i}:00` : `${i}:00`;
          return (
            <div key={`hour-${i}`} className="hour-label">
              {hour}
            </div>
          );
        })}
      </div>
    );
    
    // Day columns
    const dayColumns = weekDates.map((date, index) => {
      const dayEvents = events.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
      );

      return (
        <div
          key={index}
          className={`week-day ${date.getDate() === new Date().getDate() && 
            date.getMonth() === new Date().getMonth() && 
            date.getFullYear() === new Date().getFullYear() ? 'today' : ''}`}
        >
          <div className="week-day-header">
            <span className="day-name">
              {date.toLocaleDateString('hu-HU', { weekday: 'long' })}
            </span>
            <span className="day-number">{date.getDate()}</span>
          </div>
          <div className="week-day-events" onClick={(e) => {
            // Calculate hour from click position
            const rect = e.currentTarget.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const hour = Math.floor(y / 60);
            const minutes = Math.round((y % 60) / 60 * 60);
            
            const clickTime = `${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`;
            
            // Create new Date object with correct date and time
            const clickDate = new Date(date);
            handleDateClick(clickDate);
            
            // Set time in the new event
            setNewEvent(prev => ({
              ...prev,
              time: clickTime
            }));
          }}>
            {dayEvents.map(event => {
              // Calculate position based on time
              const timeParts = event.time.split(':');
              const hours = parseInt(timeParts[0], 10);
              const minutes = parseInt(timeParts[1], 10);
              
              // Each hour is 60px tall, position events exactly
              const topPosition = (hours * 60) + minutes;
              const heightInPixels = 50; // Default height for events
              
              return (
                <div
                  key={event.id}
                  className={`week-event ${event.status}`}
                  style={{ 
                    borderLeftColor: event.color,
                    backgroundColor: `${event.color}20`, // Add slight transparency
                    top: `${topPosition}px`,
                    height: `${heightInPixels}px`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(event);
                  }}
                >
                  <span className="event-time">{event.time}</span>
                  <span className="event-title">{event.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
    
    return [hourLabelsColumn, ...dayColumns];
  };

  const handleLogout = () => {
    // Navigate to the login page
    navigate('/');
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const toggleUserProfile = () => {
    navigate('/profile');
    setShowUserMenu(false);
  };

  const getUserGroups = () => {
    return groups.filter(group => currentUser.groups.includes(group.id));
  };

  const getPendingEvents = () => {
    return events.filter(event => {
      // Ellenőrizzük, hogy az esemény meghívottai között van-e a jelenlegi felhasználó
      // és a státusza "pending"
      return event.invitees && 
             event.invitees.some(invitee => invitee.id === 1 && invitee.status === 'pending');
    });
  };

  const handleProfileEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-controls">
          <button onClick={viewMode === 'month' ? handlePrevMonth : handlePrevWeek}>
            &lt;
          </button>
          <h2>
            {currentDate.toLocaleDateString('hu-HU', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </h2>
          <button onClick={viewMode === 'month' ? handleNextMonth : handleNextWeek}>
            &gt;
          </button>
          <button className="today-button" onClick={handleTodayClick}>
            Ma
          </button>
        </div>
        <div className="view-mode-selector">
          <button
            className={viewMode === 'month' ? 'active' : ''}
            onClick={() => setViewMode('month')}
          >
            Havi nézet
          </button>
          <button
            className={viewMode === 'week' ? 'active' : ''}
            onClick={() => setViewMode('week')}
          >
            Heti nézet
          </button>
        </div>
        <div className="user-menu-container">
          <button className="user-menu-button" onClick={toggleUserMenu}>
            {currentUser.name}
          </button>
          {showUserMenu && (
            <div className="user-menu-dropdown">
              <button onClick={toggleUserProfile}>Profil</button>
              <button onClick={handleLogout}>Kijelentkezés</button>
            </div>
          )}
        </div>
      </div>

      <div className={`calendar-grid ${viewMode}`}>
        {viewMode === 'month' ? (
          <>
            {['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {renderMonthView()}
          </>
        ) : (
          renderWeekView()
        )}
      </div>

      {showUserProfile && (
        <div className="user-profile">
          <div className="user-info">
            <h4>Felhasználói adatok</h4>
            <p>Név: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
          </div>
          <div className="user-groups">
            <h4>Csoportok</h4>
            <ul>
              {currentUser.groups.map((group, index) => (
                <li key={index}>{group}</li>
              ))}
            </ul>
          </div>
          <div className="user-pending-events">
            <h4>Függőben lévő események</h4>
            <ul>
              {currentUser.pendingEvents.map((event, index) => (
                <li 
                  key={index} 
                  className="pending-event-item"
                  onClick={() => handleProfileEventClick(event)}
                >
                  <div className="pending-event-info">
                    <span className="pending-event-title">{event.name}</span>
                    <span className="pending-event-date">
                      {event.date.toLocaleDateString('hu-HU')} - {event.time}
                    </span>
                    <span className="pending-event-group">
                      {getGroupName(event.groupId)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button className="back-to-calendar" onClick={() => setShowUserProfile(false)}>
            Vissza a naptárhoz
          </button>
        </div>
      )}

      {showEventForm && (
        <div className="event-form-modal">
          <div className="event-form-container">
            <h3>{isEditing ? 'Esemény szerkesztése' : 'Új esemény létrehozása'}</h3>
            <form onSubmit={handleEventSubmit}>
              <div className="form-group">
                <label>Esemény neve</label>
                <input
                  type="text"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Leírás</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Időpont</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <div className="recurring-event-container">
                  <div className="recurring-checkbox">
                    <input
                      type="checkbox"
                      id="isRecurring"
                      checked={newEvent.isRecurring}
                      onChange={handleRecurringChange}
                    />
                    <label htmlFor="isRecurring">Ismétlődő esemény</label>
                  </div>
                  
                  {newEvent.isRecurring && (
                    <div className="recurrence-type-selector">
                      <label>Ismétlődés típusa:</label>
                      <select
                        value={newEvent.recurrenceType}
                        onChange={handleRecurrenceTypeChange}
                      >
                        <option value="daily">Naponta</option>
                        <option value="weekly">Hetente</option>
                        <option value="monthly">Havonta</option>
                        <option value="yearly">Évente</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Csoport</label>
                <select
                  value={newEvent.groupId}
                  onChange={handleGroupChange}
                  required
                >
                  <option value="">Válassz csoportot</option>
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Szín</label>
                <div className="color-picker">
                  {predefinedColors.map(color => (
                    <div
                      key={color.value}
                      className={`color-option ${newEvent.color === color.value ? 'selected' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleColorChange(color.value)}
                      title={color.name}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Meghívottak</label>
                <div className="invitees-checkbox-list">
                  {users.map(user => (
                    <div key={user.id} className="invitee-checkbox-item">
                      <input
                        type="checkbox"
                        id={`invitee-${user.id}`}
                        checked={selectedInvitees.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedInvitees([...selectedInvitees, user.id]);
                          } else {
                            setSelectedInvitees(selectedInvitees.filter(id => id !== user.id));
                          }
                        }}
                      />
                      <label htmlFor={`invitee-${user.id}`}>
                        {user.name} ({user.email})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="submit">{isEditing ? 'Mentés' : 'Létrehozás'}</button>
                <button type="button" onClick={() => setShowEventForm(false)}>Mégse</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEventDetails && selectedEvent && (
        <div className="event-form-modal">
          <div className="event-form-container">
            <h3>Esemény részletei</h3>
            <div className="event-details">
              <div className="event-detail-row">
                <strong>Esemény neve:</strong>
                <span>{selectedEvent.name}</span>
              </div>
              <div className="event-detail-row">
                <strong>Leírás:</strong>
                <span>{selectedEvent.description}</span>
              </div>
              <div className="event-detail-row">
                <strong>Dátum:</strong>
                <span>{selectedEvent.date.toLocaleDateString('hu-HU')}</span>
              </div>
              <div className="event-detail-row">
                <strong>Időpont:</strong>
                <span>{selectedEvent.time}</span>
              </div>
              <div className="event-detail-row">
                <strong>Csoport:</strong>
                <span>{getGroupName(selectedEvent.groupId)}</span>
              </div>
              <div className="event-detail-row">
                <strong>Létrehozta:</strong>
                <span>{selectedEvent.creator}</span>
              </div>
              {selectedEvent.invitees && selectedEvent.invitees.length > 0 && (
                <div className="event-detail-row">
                  <strong>Meghívottak:</strong>
                  <div className="invitees-list">
                    {selectedEvent.invitees.map((invitee, index) => (
                      <div key={index} className="invitee-item">
                        <span>{invitee.name} ({invitee.email})</span>
                        <span className={`status-badge ${invitee.status}`}>
                          {invitee.status === 'pending' ? 'Függőben' : 
                           invitee.status === 'accepted' ? 'Elfogadva' : 'Elutasítva'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="event-actions">
              {selectedEvent.invitees && selectedEvent.invitees.some(invitee => 
                invitee.id === 1 && invitee.status === 'pending'
              ) && (
                <div className="event-response-actions">
                  <button
                    className="accept-button"
                    onClick={() => handleProfileEventResponse(selectedEvent.id, 'accepted')}
                  >
                    Elfogadás
                  </button>
                  <button
                    className="decline-button"
                    onClick={() => handleProfileEventResponse(selectedEvent.id, 'declined')}
                  >
                    Elutasítás
                  </button>
                </div>
              )}
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setShowEventDetails(false)}>Bezárás</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar; 