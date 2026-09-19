import React, { useState, useEffect } from 'react';
import { 
  Trophy, Users, Calendar, BarChart2, Shield, Settings, 
  Share2, MessageSquare, ThumbsUp, Trash2, Bell, Moon, Sun, 
  Search, Lock, CheckCircle, RefreshCw, AlertCircle, Play, Sparkles
} from 'lucide-react';

export default function CarromTournamentApp() {
  // Theme State
  const [darkMode, setDarkMode] = useState(false);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // home, schedule, standings, bracket, admin
  const [matchFilter, setMatchFilter] = useState('all'); // all, upcoming, live, completed
  const [searchQuery, setSearchQuery] = useState('');

  // Tournament Data States
  const [tournamentName, setTournamentName] = useState('Pro 2v2 Carrom Championship 2026');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [passwordInput, setPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  
  // Broadcast Notice
  const [broadcastNotice, setBroadcastNotice] = useState('Welcome to the tournament! Matches are live now.');
  const [noticeInput, setNoticeInput] = useState('');

  // Teams State (8 Teams, 2 Groups, 2v2)
  const [teams, setTeams] = useState([
    { id: 1, name: 'Strikers XI', group: 'A', player1: 'Rahim', player2: 'Karim', points: 6, played: 3, won: 3, lost: 0, carromDiff: 15 },
    { id: 2, name: 'Board Masters', group: 'A', player1: 'Tanvir', player2: 'Sakib', points: 4, played: 3, won: 2, lost: 1, carromDiff: 5 },
    { id: 3, name: 'Pocket Kings', group: 'A', player1: 'Imran', player2: 'Farhan', points: 2, played: 3, won: 1, lost: 2, carromDiff: -4 },
    { id: 4, name: 'Carrom Snipers', group: 'A', player1: 'Nabil', player2: 'Sadman', points: 0, played: 3, won: 0, lost: 3, carromDiff: -16 },
    { id: 5, name: 'Queen Hunters', group: 'B', player1: 'Sujon', player2: 'Ripon', points: 6, played: 3, won: 3, lost: 0, carromDiff: 12 },
    { id: 6, name: 'Striker Legends', group: 'B', player1: 'Arman', player2: 'Joy', points: 4, played: 3, won: 2, lost: 1, carromDiff: 3 },
    { id: 7, name: 'White Black Pro', group: 'B', player1: 'Asif', player2: 'Raihan', points: 2, played: 3, won: 1, lost: 2, carromDiff: -5 },
    { id: 8, name: 'Board Rulers', group: 'B', player1: 'Fahim', player2: 'Sabbir', points: 0, played: 3, won: 0, lost: 3, carromDiff: -10 },
  ]);

  // Matches State
  const [matches, setMatches] = useState([
    { id: 101, group: 'A', team1: 'Strikers XI', team2: 'Board Masters', status: 'completed', score1: 25, score2: 18, queen: 'Strikers XI', comments: [{ id: 1, user: 'Fan_1', text: 'Amazing match by Rahim!' }] },
    { id: 102, group: 'A', team1: 'Pocket Kings', team2: 'Carrom Snipers', status: 'completed', score1: 22, score2: 10, queen: 'Pocket Kings', comments: [] },
    { id: 103, group: 'B', team1: 'Queen Hunters', team2: 'Striker Legends', status: 'live', score1: 18, score2: 15, queen: 'Pending', comments: [{ id: 2, user: 'CarromLover', text: 'Come on Queen Hunters!' }] },
    { id: 104, group: 'B', team1: 'White Black Pro', team2: 'Board Rulers', status: 'upcoming', score1: 0, score2: 0, queen: 'None', comments: [] },
  ]);

  // Selected Match for Details / Comments / Voting
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [pollVotes, setPollVotes] = useState({ team1: 12, team2: 8 });
  const [hasVoted, setHasVoted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Handle Admin Login
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsAdminAuthenticated(true);
      setPasswordInput('');
    } else {
      alert('Incorrect Password!');
    }
  };

  // Handle Password Change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPasswordInput.trim()) {
      setAdminPassword(newPasswordInput);
      setNewPasswordInput('');
      alert('Admin password changed successfully!');
    }
  };

  // Add Comment
  const handleAddComment = (matchId) => {
    if (!newComment.trim() || !userName.trim()) {
      alert('Please enter your name and comment!');
      return;
    }
    setMatches(matches.map(m => {
      if (m.id === matchId) {
        return {
          ...m,
          comments: [...m.comments, { id: Date.now(), user: userName, text: newComment }]
        };
      }
      return m;
    }));
    setNewComment('');
  };

  // Delete Comment (Admin)
  const handleDeleteComment = (matchId, commentId) => {
    setMatches(matches.map(m => {
      if (m.id === matchId) {
        return {
          ...m,
          comments: m.comments.filter(c => c.id !== commentId)
        };
      }
      return m;
    }));
  };

  // Share functionality
  const handleShare = (title, text) => {
    if (navigator.share) {
      navigator.share({ title, text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} min-h-screen font-sans transition-colors duration-300`}>
      
      {/* Top Header */}
      <header className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm sticky top-0 z-50 border-b`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <Trophy className="w-8 h-8 text-amber-500 animate-bounce" />
            <span className="font-bold text-xl tracking-wide">{tournamentName}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-slate-700 text-amber-400' : 'bg-slate-100 text-slate-600'} hover:opacity-85`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className="flex items-center space-x-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Broadcast Notice Banner */}
        {broadcastNotice && (
          <div className="bg-amber-500 text-slate-950 font-medium px-4 py-2 text-center text-sm flex items-center justify-center space-x-2 shadow-inner">
            <Bell className="w-4 h-4 animate-pulse" />
            <span>{broadcastNotice}</span>
          </div>
        )}
      </header>

      {/* Navigation Tabs */}
      <nav className={`${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'} border-b shadow-xs backdrop-blur sticky top-[57px] z-40`}>
        <div className="max-w-6xl mx-auto flex overflow-x-auto px-4 py-2 space-x-2 no-scrollbar">
          {[
            { id: 'home', label: 'Home', icon: Sparkles },
            { id: 'schedule', label: 'Schedule & Scores', icon: Calendar },
            { id: 'standings', label: 'Standings', icon: BarChart2 },
            { id: 'bracket', label: 'Knockout Bracket', icon: Trophy },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedMatch(null); }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-amber-500 text-white shadow-md' 
                    : `${darkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {/* ================= HOME TAB WITH LIVE CARROM ANIMATION ================= */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            
            {/* Hero Banner with Live Carrom Board Animation */}
            <div className={`relative overflow-hidden rounded-2xl ${darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700' : 'bg-gradient-to-br from-amber-600 to-amber-800 text-white'} p-8 shadow-xl flex flex-col md:flex-row items-center justify-between`}>
              <div className="z-10 space-y-4 max-w-lg mb-6 md:mb-0">
                <span className="bg-amber-400/20 border border-amber-300/30 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Official 2v2 Championship
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  {tournamentName}
                </h1>
                <p className={`${darkMode ? 'text-slate-300' : 'text-amber-100'} text-sm md:text-base`}>
                  8 elite teams, 2 intense groups, round-robin battles & grand knockout showdowns! Predict, chat, and track live scores.
                </p>
                <div className="flex space-x-4 pt-2">
                  <button 
                    onClick={() => setActiveTab('schedule')}
                    className="bg-white text-slate-900 font-bold px-6 py-2.5 rounded-xl shadow hover:bg-amber-50 transition"
                  >
                    View Matches
                  </button>
                  <button 
                    onClick={() => handleShare('Carrom Tournament', 'Check out this awesome 2v2 Carrom Tournament!')}
                    className="bg-amber-500/30 border border-amber-300/40 text-white font-semibold px-6 py-2.5 rounded-xl flex items-center space-x-2 hover:bg-amber-500/50 transition"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share App</span>
                  </button>
                </div>
              </div>

              {/* Animated Carrom Board Preview Graphic */}
              <div className="relative w-64 h-64 md:w-72 md:h-72 bg-amber-200 rounded-2xl border-4 border-amber-900 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-4 border-2 border-amber-700 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-red-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-600 rounded-full animate-ping"></div>
                  </div>
                </div>
                {/* Pockets */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-slate-900 rounded-full"></div>
                <div className="absolute top-2 right-2 w-6 h-6 bg-slate-900 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 bg-slate-900 rounded-full"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-slate-900 rounded-full"></div>
                
                {/* Moving Striker & Carrom Pieces Animation */}
                <div className="absolute w-8 h-8 bg-white border-2 border-slate-800 rounded-full shadow-lg animate-bounce flex items-center justify-center text-xs font-bold text-slate-800">
                  ⚡
                </div>
                <div className="absolute w-5 h-5 bg-red-500 rounded-full shadow animate-pulse top-1/3 left-1/4"></div>
                <div className="absolute w-5 h-5 bg-slate-900 rounded-full shadow animate-spin bottom-1/3 right-1/4"></div>
              </div>
            </div>

            {/* Quick Stats / Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Teams', value: '8 Teams', icon: Users, color: 'text-blue-500' },
                { label: 'Format', value: '2v2 Doubles', icon: Trophy, color: 'text-amber-500' },
                { label: 'Groups', value: 'Group A & B', icon: BarChart2, color: 'text-emerald-500' },
                { label: 'Status', value: 'Group Stage Live', icon: Play, color: 'text-red-500' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-5 rounded-xl border shadow-sm flex items-center space-x-4`}>
                    <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-700 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                      <h4 className="text-lg font-bold">{stat.value}</h4>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= SCHEDULE & MATCHES TAB ================= */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-amber-500" />
                <span>Match Fixtures & Scorecards</span>
              </h2>
              
              {/* Filters */}
              <div className="flex space-x-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
                {['all', 'upcoming', 'live', 'completed'].map(f => (
                  <button
                    key={f}
                    onClick={() => setMatchFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                      matchFilter === f ? 'bg-amber-500 text-white shadow' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Matches List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches
                .filter(m => matchFilter === 'all' || m.status === matchFilter)
                .map(match => (
                  <div 
                    key={match.id}
                    className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-5 shadow-sm space-y-4 hover:border-amber-500 transition`}
                  >
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-md">
                        Group {match.group}
                      </span>
                      <span className={`px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        match.status === 'live' ? 'bg-red-500 text-white animate-pulse' :
                        match.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
                      }`}>
                        {match.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center font-bold text-lg">
                      <div className="w-2/5 text-left truncate">{match.team1}</div>
                      <div className="w-1/5 text-center text-amber-500 font-extrabold text-xl">
                        {match.status === 'upcoming' ? 'VS' : `${match.score1} - ${match.score2}`}
                      </div>
                      <div className="w-2/5 text-right truncate">{match.team2}</div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
                      <span>Queen: <strong className="text-amber-500">{match.queen}</strong></span>
                      <button 
                        onClick={() => setSelectedMatch(match)}
                        className="text-amber-500 hover:underline font-semibold flex items-center space-x-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat & Details ({match.comments.length})</span>
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= MATCH DETAILS & COMMENT MODAL ================= */}
        {selectedMatch && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto`}>
              
              <div className="flex justify-between items-center border-b pb-3 dark:border-slate-700">
                <h3 className="text-lg font-bold">Match Scorecard & Discussion</h3>
                <button 
                  onClick={() => setSelectedMatch(null)}
                  className="text-slate-400 hover:text-red-500 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Match Header */}
              <div className="text-center space-y-2 bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl">
                <span className="text-xs uppercase bg-amber-500 text-white px-2 py-0.5 rounded">Group {selectedMatch.group}</span>
                <div className="flex justify-around items-center text-xl font-extrabold pt-2">
                  <span>{selectedMatch.team1}</span>
                  <span className="text-amber-500">{selectedMatch.status === 'upcoming' ? 'VS' : `${selectedMatch.score1} : ${selectedMatch.score2}`}</span>
                  <span>{selectedMatch.team2}</span>
                </div>
                <p className="text-xs text-slate-400">Queen Status: {selectedMatch.queen}</p>
              </div>

              {/* Fan Poll Section */}
              <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-3">
                <h4 className="text-sm font-bold flex items-center space-x-2">
                  <ThumbsUp className="w-4 h-4 text-amber-500" />
                  <span>Who will win this match? (Fan Poll)</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    disabled={hasVoted}
                    onClick={() => { setPollVotes(p => ({ ...p, team1: p.team1 + 1 })); setHasVoted(true); }}
                    className="p-2 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-xs font-semibold border border-amber-500/30"
                  >
                    {selectedMatch.team1} ({pollVotes.team1} votes)
                  </button>
                  <button 
                    disabled={hasVoted}
                    onClick={() => { setPollVotes(p => ({ ...p, team2: p.team2 + 1 })); setHasVoted(true); }}
                    className="p-2 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-xs font-semibold border border-amber-500/30"
                  >
                    {selectedMatch.team2} ({pollVotes.team2} votes)
                  </button>
                </div>
              </div>

              {/* Viewer Comments Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold">Match Live Comments ({selectedMatch.comments.length})</h4>
                
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedMatch.comments.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">No comments yet. Be the first to comment!</p>
                  ) : (
                    selectedMatch.comments.map(c => (
                      <div key={c.id} className="bg-slate-100 dark:bg-slate-700/60 p-2.5 rounded-lg text-xs flex justify-between items-start">
                        <div>
                          <strong className="text-amber-500 block pb-0.5">{c.user}</strong>
                          <span>{c.text}</span>
                        </div>
                        {isAdminAuthenticated && (
                          <button 
                            onClick={() => handleDeleteComment(selectedMatch.id, c.id)}
                            className="text-red-400 hover:text-red-600 ml-2"
                            title="Delete Comment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Add Comment Input */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={userName} 
                    onChange={e => setUserName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border dark:bg-slate-700 dark:border-slate-600"
                  />
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Write your comment..." 
                      value={newComment} 
                      onChange={e => setNewComment(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border dark:bg-slate-700 dark:border-slate-600"
                    />
                    <button 
                      onClick={() => handleAddComment(selectedMatch.id)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= STANDINGS / POINTS TABLE TAB ================= */}
        {activeTab === 'standings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <BarChart2 className="w-6 h-6 text-amber-500" />
                <span>Group Standings & Points Table</span>
              </h2>
              <button 
                onClick={() => handleShare('Points Table', 'Check out the latest Carrom Tournament Points Table!')}
                className="flex items-center space-x-1 text-xs bg-slate-200 dark:bg-slate-700 px-3 py-1.5 rounded-lg font-semibold"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Table</span>
              </button>
            </div>

            {/* Groups Table (Group A & Group B) */}
            {['A', 'B'].map(groupName => (
              <div key={groupName} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl overflow-hidden shadow-sm space-y-2 mb-6`}>
                <div className="bg-amber-500 text-white px-4 py-2 font-bold text-sm">
                  Group {groupName} Standings
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className={`${darkMode ? 'bg-slate-700/50 text-slate-300' : 'bg-slate-100 text-slate-600'} uppercase`}>
                      <tr>
                        <th className="p-3">Pos & Team</th>
                        <th className="p-3 text-center">P</th>
                        <th className="p-3 text-center">W</th>
                        <th className="p-3 text-center">L</th>
                        <th className="p-3 text-center font-bold">Pts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {teams
                        .filter(t => t.group === groupName)
                        .sort((a, b) => b.points - a.points || b.carromDiff - a.carromDiff)
                        .map((team, index) => (
                          <tr key={team.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                            <td className="p-3 flex items-center space-x-3">
                              <span className="font-bold text-amber-500 w-4">{index + 1}</span>
                              <div>
                                <span className="font-bold block">{team.name}</span>
                                <span className="text-[10px] text-slate-400">({team.player1} & {team.player2})</span>
                              </div>
                            </td>
                            <td className="p-3 text-center">{team.played}</td>
                            <td className="p-3 text-center text-emerald-500 font-semibold">{team.won}</td>
                            <td className="p-3 text-center text-red-500 font-semibold">{team.lost}</td>
                            <td className="p-3 text-center font-extrabold text-amber-500">{team.points}</td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= KNOCKOUT BRACKET TAB ================= */}
        {activeTab === 'bracket' && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              <span>Knockout Bracket (Semifinals & Finals)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              
              {/* Semifinal 1 */}
              <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border p-4 rounded-xl shadow space-y-3`}>
                <span className="text-xs font-bold text-amber-500 uppercase">Semifinal 1</span>
                <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded text-sm font-semibold flex justify-between">
                  <span>Strikers XI (A1)</span>
                  <span>-</span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded text-sm font-semibold flex justify-between">
                  <span>Striker Legends (B2)</span>
                  <span>-</span>
                </div>
              </div>

              {/* Semifinal 2 */}
              <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border p-4 rounded-xl shadow space-y-3`}>
                <span className="text-xs font-bold text-amber-500 uppercase">Semifinal 2</span>
                <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded text-sm font-semibold flex justify-between">
                  <span>Queen Hunters (B1)</span>
                  <span>-</span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded text-sm font-semibold flex justify-between">
                  <span>Board Masters (A2)</span>
                  <span>-</span>
                </div>
              </div>

              {/* Grand Final */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-4 rounded-xl shadow-lg space-y-3 flex flex-col justify-center">
                <span className="text-xs font-extrabold uppercase bg-white/20 px-2 py-0.5 rounded">Grand Final</span>
                <div className="bg-black/20 p-2 rounded text-sm font-bold flex justify-between">
                  <span>Winner SF 1</span>
                  <span>VS</span>
                </div>
                <div className="bg-black/20 p-2 rounded text-sm font-bold flex justify-between">
                  <span>Winner SF 2</span>
                  <span>VS</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= ADMIN PANEL TAB ================= */}
        {activeTab === 'admin' && (
          <div className="max-w-xl mx-auto space-y-6">
            {!isAdminAuthenticated ? (
              <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border p-6 rounded-2xl shadow-sm space-y-4`}>
                <div className="text-center space-y-1">
                  <Lock className="w-10 h-10 text-amber-500 mx-auto" />
                  <h3 className="text-xl font-bold">Admin Panel Access</h3>
                  <p className="text-xs text-slate-400">Enter secure password to manage tournament (No hints provided).</p>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input 
                    type="password" 
                    placeholder="Enter Admin Password" 
                    value={passwordInput} 
                    onChange={e => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border dark:bg-slate-700 dark:border-slate-600 text-sm"
                  />
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-xl shadow text-sm">
                    Login to Admin
                  </button>
                </form>
              </div>
            ) : (
              <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border p-6 rounded-2xl shadow-sm space-y-6`}>
                <div className="flex justify-between items-center border-b pb-4 dark:border-slate-700">
                  <h3 className="text-xl font-bold flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-amber-500" />
                    <span>Admin Control Center</span>
                  </h3>
                  <button onClick={() => setIsAdminAuthenticated(false)} className="text-xs text-red-400 font-bold hover:underline">
                    Logout
                  </button>
                </div>

                {/* Change Tournament Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Change Tournament Name</label>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      value={tournamentName} 
                      onChange={e => setTournamentName(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-lg border dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                </div>

                {/* Broadcast Notice Control */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Post Broadcast Notice Banner</label>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Write announcement..." 
                      value={noticeInput} 
                      onChange={e => setNoticeInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-lg border dark:bg-slate-700 dark:border-slate-600"
                    />
                    <button 
                      onClick={() => { setBroadcastNotice(noticeInput); setNoticeInput(''); alert('Notice posted!'); }}
                      className="bg-amber-500 text-white px-4 py-2 rounded-lg text-xs font-bold"
                    >
                      Post
                    </button>
                  </div>
                </div>

                {/* Change Admin Password */}
                <form onSubmit={handlePasswordChange} className="space-y-2 pt-2 border-t dark:border-slate-700">
                  <label className="text-xs font-semibold">Change Admin Password</label>
                  <div className="flex space-x-2">
                    <input 
                      type="password" 
                      placeholder="New Password" 
                      value={newPasswordInput} 
                      onChange={e => setNewPasswordInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-lg border dark:bg-slate-700 dark:border-slate-600"
                    />
                    <button type="submit" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-xs font-bold">
                      Update
                    </button>
                  </div>
                </form>

              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`mt-12 py-6 border-t ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-500'} text-center text-xs`}>
        <p>{tournamentName} © 2026 | Managed with 2v2 Carrom System</p>
      </footer>

    </div>
  );
}