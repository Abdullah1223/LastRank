import React, { useState } from 'react';
import { Play, Users, Clock, Music, Filter, Search, Trophy } from 'lucide-react';

interface LiveCompetition {
  id: string;
  title: string;
  genre: string;
  currentParticipant: string;
  viewerCount: number;
  startTime: string;
  thumbnail: string;
  prize: string;
  status: 'Live' | 'Next Up' | 'Upcoming';
  description: string;
}

const mockLiveCompetitions: LiveCompetition[] = [
  {
    id: '1',
    title: 'Beat Battle Finals',
    genre: 'Hip Hop',
    currentParticipant: 'DJ Spark',
    viewerCount: 1243,
    startTime: '2024-03-20T15:00:00',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
    prize: '$5,000',
    status: 'Live',
    description: 'Watch the final showdown between top producers!'
  },
  {
    id: '2',
    title: 'Electronic Music Showcase',
    genre: 'Electronic',
    currentParticipant: 'Voltage',
    viewerCount: 856,
    startTime: '2024-03-20T16:00:00',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
    prize: '$3,000',
    status: 'Next Up',
    description: 'Experience cutting-edge electronic music production'
  },
  {
    id: '3',
    title: 'Vocal Performance Challenge',
    genre: 'Pop',
    currentParticipant: 'Sarah Voice',
    viewerCount: 2187,
    startTime: '2024-03-20T17:00:00',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    prize: '$4,000',
    status: 'Live',
    description: 'Top vocalists compete for the grand prize'
  }
];

function CompetitionViewer({ competition }: { competition: LiveCompetition }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      <div className="relative">
        <img 
          src={competition.thumbnail} 
          alt={competition.title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Play className="w-16 h-16 text-white" />
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            competition.status === 'Live' 
              ? 'bg-red-500 animate-pulse' 
              : competition.status === 'Next Up'
              ? 'bg-yellow-500'
              : 'bg-gray-500'
          } text-white`}>
            {competition.status}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full">
            <Users className="w-4 h-4 text-white" />
            <span className="text-white text-sm">{competition.viewerCount}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-white">{competition.title}</h3>
          <span className="text-green-500 font-bold">{competition.prize}</span>
        </div>
        
        <p className="text-gray-400 text-sm mb-3">{competition.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-orange-500" />
            <span className="text-gray-300">{competition.genre}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-300">
              {new Date(competition.startTime).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LiveCompetitionsPage() {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const genres = ['All', 'Hip Hop', 'Electronic', 'Pop', 'Rock', 'Jazz'];
  
  const filteredCompetitions = mockLiveCompetitions.filter(comp => {
    const matchesGenre = selectedGenre === 'all' || comp.genre.toLowerCase() === selectedGenre.toLowerCase();
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const handleCompetitionClick = (competition: LiveCompetition) => {
    // In a real app, this would navigate to a dedicated viewing page
    alert(`Opening live stream for ${competition.title}`);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Live Competitions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Watch live performances and judging in real-time
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-orange-500" />
            <span className="text-lg font-semibold">
              {filteredCompetitions.filter(c => c.status === 'Live').length} Live Now
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search competitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre.toLowerCase())}
                className={`px-4 py-1 rounded-full whitespace-nowrap ${
                  selectedGenre === genre.toLowerCase()
                    ? 'bg-orange-500 text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Live Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((competition) => (
            <div 
              key={competition.id}
              onClick={() => handleCompetitionClick(competition)}
              className="cursor-pointer transform hover:scale-[1.02] transition-transform"
            >
              <CompetitionViewer competition={competition} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}