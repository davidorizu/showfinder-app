import React, { useState } from 'react';
import { 
  MapPin, Music, Plus, Search, Star, Calendar, Clock, 
  DollarSign, Users, TrendingUp, BarChart3,
  ChevronRight, ChevronLeft, Filter, User, Bell
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const ShowFinderApp = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailView, setDetailView] = useState(null);

  // Sample data
  const venues = [
    {
      id: 1,
      name: "The Local Stage",
      address: "123 East Main St, Anytown, USA 12345",
      capacity: 150,
      rating: 4.8,
      image: "🎭",
      upcomingShows: 3,
      description: "Intimate venue perfect for acoustic and small band performances",
      phone: "(555) 123-4567",
      website: "www.localstage.com"
    },
    {
      id: 2,
      name: "The Beatnik Lounge",
      address: "456 West Broadway, Anytown, USA 12345",
      capacity: 80,
      rating: 4.6,
      image: "🎷",
      upcomingShows: 2,
      description: "Classic jazz lounge with a sophisticated atmosphere",
      phone: "(555) 987-6543",
      website: "www.beatniklounge.com"
    },
    {
      id: 3,
      name: "The Vinyl Vault",
      address: "789 South Oak St, Anytown, USA 12345",
      capacity: 200,
      rating: 4.9,
      image: "💿",
      upcomingShows: 5,
      description: "Record store and venue celebrating vinyl culture",
      phone: "(555) 456-7890",
      website: "www.vinylvault.com"
    }
  ];

  const artists = [
    {
      id: 1,
      name: "The Electric Storms",
      genre: "Rock",
      followers: 1250,
      upcomingShows: 3,
      monthlyListeners: 15000,
      image: "⚡",
      verified: true,
      description: "High-energy rock band known for electrifying performances and original compositions.",
      formed: "2019",
      members: 4,
      website: "www.electricstorms.com"
    },
    {
      id: 2,
      name: "Sarah Moon Quartet",
      genre: "Jazz",
      followers: 890,
      upcomingShows: 2,
      monthlyListeners: 8500,
      image: "🌙",
      verified: true,
      description: "Contemporary jazz ensemble led by acclaimed saxophonist Sarah Moon.",
      formed: "2015",
      members: 4,
      website: "www.sarahmoon.com"
    },
    {
      id: 3,
      name: "Mountain Folk Collective",
      genre: "Folk",
      followers: 2100,
      upcomingShows: 4,
      monthlyListeners: 22000,
      image: "🏔️",
      verified: false,
      description: "Community-based folk group celebrating traditional mountain music and storytelling.",
      formed: "2020",
      members: 6,
      website: "www.mountainfolk.com"
    }
  ];

  const shows = [
    {
      id: 1,
      title: "Electric Storm Live",
      artist: "The Electric Storms",
      venue: "The Local Stage",
      venueId: 1,
      artistId: 1,
      date: "2025-09-22",
      time: "20:00",
      price: 25,
      genre: "Rock",
      attendees: 85,
      capacity: 150,
      image: "⚡",
      description: "High-energy rock performance with special guest appearances and extended set list featuring new material.",
      ticketsAvailable: 65,
      ageRestriction: "18+",
      doorTime: "19:00"
    },
    {
      id: 2,
      title: "Jazz Under the Stars",
      artist: "Sarah Moon Quartet",
      venue: "The Beatnik Lounge",
      venueId: 2,
      artistId: 2,
      date: "2025-09-22",
      time: "19:30",
      price: 18,
      genre: "Jazz",
      attendees: 45,
      capacity: 80,
      image: "🌙",
      description: "Intimate jazz evening featuring original compositions and classic standards in our cozy lounge setting.",
      ticketsAvailable: 35,
      ageRestriction: "21+",
      doorTime: "19:00"
    },
    {
      id: 3,
      title: "Mountain Folk Festival",
      artist: "Mountain Folk Collective",
      venue: "The Vinyl Vault",
      venueId: 3,
      artistId: 3,
      date: "2025-09-25",
      time: "15:00",
      price: 0,
      genre: "Folk",
      attendees: 120,
      capacity: 200,
      image: "🏔️",
      description: "Free outdoor festival celebrating folk music traditions with multiple artists and food trucks.",
      ticketsAvailable: 80,
      ageRestriction: "All ages",
      doorTime: "14:30"
    }
  ];

  // Analytics data
  const monthlyRevenue = [
    { month: 'Jan', revenue: 12000, shows: 15 },
    { month: 'Feb', revenue: 18000, shows: 22 },
    { month: 'Mar', revenue: 15000, shows: 18 },
    { month: 'Apr', revenue: 22000, shows: 28 },
    { month: 'May', revenue: 28000, shows: 35 },
    { month: 'Jun', revenue: 32000, shows: 40 },
  ];

  const genreData = [
    { name: 'Rock', value: 30, color: '#8884d8' },
    { name: 'Jazz', value: 25, color: '#82ca9d' },
    { name: 'Electronic', value: 20, color: '#ffc658' },
    { name: 'Folk', value: 15, color: '#ff7300' },
    { name: 'Other', value: 10, color: '#00ff00' }
  ];

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getShowsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return shows.filter(show => show.date === dateStr);
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const showsForDay = getShowsForDate(date);
      days.push({
        date: day,
        fullDate: date,
        shows: showsForDay,
        isToday: date.toDateString() === new Date().toDateString()
      });
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const VenueCard = ({ venue }) => (
    <div 
      className="bg-white p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => {
        setSelectedItem(venue);
        setDetailView('venue');
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
          {venue.image}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{venue.name}</h3>
          <p className="text-sm text-gray-500">{venue.address}</p>
          <p className="text-xs text-gray-400">Capacity: {venue.capacity} • {venue.upcomingShows} upcoming shows</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );

  const ArtistCard = ({ artist }) => (
    <div 
      className="bg-white p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => {
        setSelectedItem(artist);
        setDetailView('artist');
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
          {artist.image}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{artist.name}</h3>
            {artist.verified && <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>}
          </div>
          <p className="text-sm text-gray-500">{artist.genre} • {artist.followers.toLocaleString()} followers</p>
          <p className="text-xs text-gray-400">{artist.monthlyListeners.toLocaleString()} monthly listeners</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );

  const ShowCard = ({ show, showVenue = true }) => (
    <div 
      className="bg-white p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => {
        setSelectedItem(show);
        setDetailView('show');
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
          {show.image}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{show.title}</h3>
          <p className="text-sm text-gray-600">{show.artist}</p>
          {showVenue && <p className="text-sm text-gray-500">{show.venue}</p>}
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-xs text-gray-400">{new Date(show.date).toLocaleDateString()}</span>
            <span className="text-xs text-gray-400">{show.time}</span>
            <span className="text-xs font-semibold text-green-600">
              {show.price === 0 ? 'Free' : `$${show.price}`}
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );

  const CalendarView = () => {
    const calendarDays = generateCalendarDays();
    
    return (
      <div className="flex-1 bg-white">
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <h2 className="text-xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`aspect-square flex flex-col items-center justify-start p-1 rounded-lg border cursor-pointer transition-all ${
                  day === null
                    ? 'border-transparent'
                    : day.isToday
                    ? 'bg-blue-50 border-blue-200'
                    : selectedDate?.toDateString() === day.fullDate?.toDateString()
                    ? 'bg-blue-100 border-blue-300'
                    : 'border-gray-100 hover:bg-gray-50'
                }`}
                onClick={() => day && setSelectedDate(day.fullDate)}
              >
                {day && (
                  <>
                    <span className={`text-sm font-medium mb-1 ${
                      day.isToday
                        ? 'text-blue-600 font-bold'
                        : 'text-gray-900'
                    }`}>
                      {day.date}
                    </span>
                    
                    <div className="flex flex-col gap-0.5 w-full">
                      {day.shows.slice(0, 2).map((show) => (
                        <div
                          key={show.id}
                          className={`w-full h-1 rounded-full ${
                            show.genre === 'Rock' ? 'bg-red-400' :
                            show.genre === 'Jazz' ? 'bg-blue-400' :
                            show.genre === 'Electronic' ? 'bg-purple-400' :
                            show.genre === 'Folk' ? 'bg-green-400' :
                            show.genre === 'Blues' ? 'bg-indigo-400' :
                            'bg-gray-400'
                          }`}
                        />
                      ))}
                      {day.shows.length > 2 && (
                        <div className="text-xs text-gray-500 text-center mt-0.5">
                          +{day.shows.length - 2}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="border-t border-gray-200 bg-gray-50">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Shows on {selectedDate.toLocaleDateString()}
              </h3>
              
              {getShowsForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getShowsForDate(selectedDate).map(show => (
                    <div 
                      key={show.id} 
                      className="bg-white rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        setSelectedItem(show);
                        setDetailView('show');
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                          {show.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{show.title}</h4>
                          <p className="text-sm text-gray-600">{show.artist}</p>
                          <p className="text-sm text-gray-500">{show.venue} • {show.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No shows scheduled for this date</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const ShowDetailView = ({ show, onBack }) => {
    const venue = venues.find(v => v.id === show.venueId);
    
    return (
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">
              {show.image}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{show.title}</h1>
            <p className="text-lg text-gray-600 mb-1">{show.artist}</p>
            <p className="text-gray-500">{show.venue}</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Event Details</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{new Date(show.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{show.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-bold text-green-600">
                    {show.price === 0 ? 'Free' : `$${show.price}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Age Restriction</span>
                  <span className="font-medium">{show.ageRestriction}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Venue Information</h3>
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-right">{venue?.address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-medium">{show.capacity} people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium text-blue-600">{venue?.phone}</span>
                </div>
              </div>
              
              {/* Map View */}
              <div className="mt-4">
                <div className="bg-gray-200 rounded-lg h-48 relative overflow-hidden">
                  {/* Google Maps Embed */}
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(venue?.address || show.venue)}&zoom=15`}
                  ></iframe>
                  
                  {/* Directions button overlay */}
                  <button 
                    onClick={() => {
                      const address = encodeURIComponent(venue?.address || show.venue);
                      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
                      window.open(googleMapsUrl, '_blank');
                    }}
                    className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1.5 rounded shadow-lg text-xs font-medium hover:bg-blue-600 transition-colors z-10"
                  >
                    Get Directions
                  </button>
                </div>
                
                {/* Map footer */}
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Tap map to interact</span>
                  <span>Powered by Google Maps</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Attendance</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Going</span>
                  <span className="font-medium">{show.attendees} people</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(show.attendees / show.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">About This Show</h3>
            <p className="text-gray-600 leading-relaxed">{show.description}</p>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              I'm Going
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>
    );
  };

  const VenueDetailView = ({ venue, onBack }) => {
    const venueShows = shows.filter(show => show.venueId === venue.id);
    
    return (
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">
              {venue.image}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{venue.name}</h1>
            <p className="text-gray-600">{venue.address}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Venue Details</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Capacity</span>
                <span className="font-medium">{venue.capacity} people</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium text-blue-600">{venue.phone}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">{venue.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Upcoming Shows ({venueShows.length})
            </h3>
            {venueShows.length > 0 ? (
              <div className="space-y-2">
                {venueShows.map(show => (
                  <ShowCard key={show.id} show={show} showVenue={false} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming shows at this venue</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ArtistDetailView = ({ artist, onBack }) => {
    const artistShows = shows.filter(show => show.artistId === artist.id);
    
    return (
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">
              {artist.image}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{artist.name}</h1>
            <p className="text-gray-600">{artist.genre}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Artist Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Followers</span>
                <span className="font-medium">{artist.followers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Monthly Listeners</span>
                <span className="font-medium">{artist.monthlyListeners.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">{artist.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Upcoming Shows ({artistShows.length})
            </h3>
            {artistShows.length > 0 ? (
              <div className="space-y-2">
                {artistShows.map(show => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming shows for this artist</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AnalyticsTab = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">$127K</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Shows</p>
                <p className="text-2xl font-bold text-blue-600">158</p>
              </div>
              <Music className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Genre Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({name, value}) => `${name}: ${value}%`}
              >
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const AddModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
      <div className="bg-white w-full rounded-t-3xl max-h-96 overflow-y-auto">
        <div className="p-6">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          <h2 className="text-xl font-bold text-center mb-6">Add New</h2>
          
          <div className="space-y-4">
            <button className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 text-left hover:bg-blue-100 transition-colors">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Add Venue</h3>
                  <p className="text-sm text-gray-600">Register a new music venue</p>
                </div>
              </div>
            </button>
            
            <button className="w-full bg-purple-50 border border-purple-200 rounded-lg p-4 text-left hover:bg-purple-100 transition-colors">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Add Artist</h3>
                  <p className="text-sm text-gray-600">Register as an artist or band</p>
                </div>
              </div>
            </button>
            
            <button className="w-full bg-green-50 border border-green-200 rounded-lg p-4 text-left hover:bg-green-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Music className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Add Show</h3>
                  <p className="text-sm text-gray-600">Post a new music event</p>
                </div>
              </div>
            </button>
          </div>
          
          <button 
            onClick={() => setShowModal(false)}
            className="w-full mt-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen flex flex-col">
      {/* Status Bar */}
      <div className="bg-black text-white px-4 py-1 flex justify-between items-center text-sm font-medium">
        <span>2:10</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span>📶</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
        </div>
        
        <h1 className="text-lg font-bold text-gray-900 capitalize">{activeTab}</h1>
        
        <button 
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </header>

      {/* Search Bar */}
      {activeTab !== 'analytics' && activeTab !== 'calendar' && !detailView && (
        <div className="bg-white px-4 py-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-lg border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {detailView === 'show' && selectedItem && (
          <ShowDetailView 
            show={selectedItem} 
            onBack={() => {
              setDetailView(null);
              setSelectedItem(null);
            }} 
          />
        )}

        {detailView === 'venue' && selectedItem && (
          <VenueDetailView 
            venue={selectedItem} 
            onBack={() => {
              setDetailView(null);
              setSelectedItem(null);
            }} 
          />
        )}

        {detailView === 'artist' && selectedItem && (
          <ArtistDetailView 
            artist={selectedItem} 
            onBack={() => {
              setDetailView(null);
              setSelectedItem(null);
            }} 
          />
        )}

        {!detailView && activeTab === 'calendar' && <CalendarView />}

        {!detailView && activeTab === 'shows' && (
          <div className="h-full overflow-y-auto">
            {filteredShows.map(show => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}

        {!detailView && activeTab === 'venues' && (
          <div className="h-full overflow-y-auto">
            {filteredVenues.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}

        {!detailView && activeTab === 'artists' && (
          <div className="h-full overflow-y-auto">
            {filteredArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}

        {!detailView && activeTab === 'analytics' && <AnalyticsTab />}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {[
            { id: 'calendar', icon: Calendar, label: 'Calendar' },
            { id: 'shows', icon: Music, label: 'Shows' },
            { id: 'venues', icon: MapPin, label: 'Venues' },
            { id: 'artists', icon: Star, label: 'Artists' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* Home indicator */}
        <div className="flex justify-center mt-2">
          <div className="w-32 h-1 bg-black rounded-full"></div>
        </div>
      </div>

      {/* Modals */}
      {showModal && <AddModal />}
    </div>
  );
};

export default ShowFinderApp;