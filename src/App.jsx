import React, { useState, useEffect } from 'react';
import { Trophy, Users, MessageSquare, Shield, Bell, Share2, Play, CheckCircle, Clock, AlertCircle, Send, Lock, Unlock, RefreshCw, Award, Heart, ThumbsUp } from 'lucide-react';

export default function App() {
  // Navigation & State
  const [activeTab, setActiveTab] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Tournament Data States
  const [teams, setTeams] = useState([
    { id: 1, name: 'Kings XI', p: 0, w: 0, l: 0, pts: 0, nrr: '+0.0' },
    { id: 2, name: 'Royal Strikers', p: 0, w: 0, l: 0, pts: 0, nrr: '+0.0' },
    { id: 3, name: 'Carrom Kings', p: 0, w: 0, l: 0, pts: 0, nrr: '+0.0' },
    { id: 4, name: 'Striker Legends', p: 0, w: 0, l: 0, pts: 0, nrr: '+0.0' },
    { id: 5, name: 'Board Masters', p: 0, w: 0, l: 0, pts: 0, nrr: '+0.0' },
    { id: 6, name: 'Pocket Wizards', p: 0, w: 0, l: 0, pts: 0, nrr: '+0.0' },
    { id: 7, name: 'Queen Hunters', p: 0, w: 0, l: 0, pts: 0, nrr: '+0.0' },
    { id: 8, name: 'Black & White', p: 0, w: 0, l: 0, pts: 0, nrr: '+0.0' },
  ]);

  const [matches, setMatches] = useState([
    { id: 1, team1: 'Kings XI', team2: 'Royal Strikers', score1: '-', score2: '-', status: 'Upcoming', time: 'Today, 8:00 PM' },
    { id: 2, team1: 'Carrom Kings', team2: 'Striker Legends', score1: '-', score2: '-', status: 'Upcoming', time: 'Today, 9:00 PM' },
    { id: 3, team1: 'Board Masters', team2: 'Pocket Wizards', score1: '-', score2: '-', status: 'Upcoming', time: 'Tomorrow, 8:00 PM' },
    { id: 4, team1: 'Queen Hunters', team2: 'Black & White', score1: '-', score2: '-', status: 'Upcoming', time: 'Tomorrow, 9:00 PM' },
  ]);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  
  // Notice Board & Polls
  const [notices, setNotices] = useState([
    { id: 1, title: 'Welcome to 2v2 Carrom Championship 2026!', date: 'Today', text: 'All players must report 15 minutes before their scheduled match time.' }
  ]);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeText, setNewNoticeText] = useState('');

  const [poll, setPoll] = useState({
    question: 'Who will win the Championship?',
    options: [
      { text: 'Kings XI', votes: 12 },
      { text: 'Carrom Kings', votes: 19 },
      { text: 'Royal Strikers', votes: 8 },
      { text: 'Other Teams', votes: 5 }
    ],
    voted: false
  });

  // Admin Authentication
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'carrom2026') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      alert('Admin Login Successful!');
    } else {
      alert('Incorrect Password! Try "carrom2026"');
    }
  };

  // Match Score Update (Admin)
  const updateMatchScore = (matchId, s1, s2, status) => {
    setMatches(matches.map(m => {
      if (m.id === matchId) {
        return { ...m, score1: s1, score2: s2, status: status };
      }
      return m;
    }));
  };

  // Add Comment/Chat for specific match
  const handleSendComment = (matchId, e) => {
    e.preventDefault();
    if (!newComment.trim() || !commenterName.trim()) return;

    const msg = {
      id: Date.now(),
      name: commenterName,
      text: newComment,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages({
      ...chatMessages,
      [matchId]: [...(chatMessages[matchId] || []), msg]
    });
    setNewComment('');
  };

  // Delete Comment (Admin Moderation)
  const handleDeleteComment = (matchId, commentId) => {
    setChatMessages({
      ...chatMessages,
      [matchId]: chatMessages[matchId].filter(c => c.id !== commentId)
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      
      {/* Top Header */}
      <header className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActiveTab('home'); setSelectedMatch(null); }}>
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 p-2.5 rounded-2xl shadow-md shadow-indigo-500/20 animate-pulse">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-400 bg-clip-text text-transparent">
                CARROM CLASH 2v2
              </h1>
              <p className="text-xs text-slate-400 font-medium">Official Championship Portal</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/80">
            <button onClick={() => { setActiveTab('home'); setSelectedMatch(null); }} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'home' && !selectedMatch ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}>
              Home
            </button>
            <button onClick={() => { setActiveTab('standings'); setSelectedMatch(null); }} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'standings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}>
              Standings
            </button>
            <button onClick={() => { setActiveTab('notices'); setSelectedMatch(null); }} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'notices' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}>
              Notices
            </button>
            
            {isAdmin ? (
              <button onClick={() => setIsAdmin(false)} className="px-3 py-2 rounded-xl text-sm font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                <Unlock className="w-4 h-4" /> Exit Admin
              </button>
            ) : (
              <button onClick={() => setShowAdminLogin(true)} className="px-3 py-2 rounded-xl text-sm font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center gap-1">
                <Lock className="w-4 h-4" /> Admin
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 mt-6">

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><Shield className="text-indigo-500" /> Admin Authentication</h3>
                <button onClick={() => setShowAdminLogin(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Password (Hint: carrom2026)</label>
                  <input 
                    type="password" 
                    value={adminPassword} 
                    onChange={(e) => setAdminPassword(e.target.value)} 
                    placeholder="Enter admin password" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30">
                  Login as Admin
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MATCH DETAILS VIEW WITH LIVE CHAT & POLL */}
        {selectedMatch ? (
          <div className="space-y-6">
            <button onClick={() => setSelectedMatch(null)} className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1">
              ← Back to Matches
            </button>

            {/* Match Header Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider">
                {selectedMatch.status}
              </div>
              <p className="text-slate-400 text-xs mb-2">{selectedMatch.time}</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4">
                <div className="text-2xl font-extrabold text-white">{selectedMatch.team1}</div>
                <div className="px-4 py-2 bg-slate-800/80 rounded-2xl border border-slate-700 text-xl font-black text-indigo-400 tracking-widest">
                  {selectedMatch.score1} : {selectedMatch.score2}
                </div>
                <div className="text-2xl font-extrabold text-white">{selectedMatch.team2}</div>
              </div>

              {/* Admin Score Controller inside Match Detail */}
              {isAdmin && (
                <div className="mt-6 p-4 bg-slate-950/80 border border-indigo-500/30 rounded-2xl max-w-md mx-auto">
                  <p className="text-xs text-indigo-400 font-bold mb-3 uppercase tracking-wider">Admin Score Control</p>
                  <div className="flex gap-2 justify-center">
                    <input 
                      type="text" 
                      id={`s1-${selectedMatch.id}`} 
                      defaultValue={selectedMatch.score1} 
                      className="w-16 bg-slate-900 border border-slate-700 rounded-xl text-center py-2 font-bold"
                      placeholder="Team 1"
                    />
                    <span className="self-center font-bold">:</span>
                    <input 
                      type="text" 
                      id={`s2-${selectedMatch.id}`} 
                      defaultValue={selectedMatch.score2} 
                      className="w-16 bg-slate-900 border border-slate-700 rounded-xl text-center py-2 font-bold"
                      placeholder="Team 2"
                    />
                    <button 
                      onClick={() => {
                        const s1 = document.getElementById(`s1-${selectedMatch.id}`).value;
                        const s2 = document.getElementById(`s2-${selectedMatch.id}`).value;
                        updateMatchScore(selectedMatch.id, s1, s2, 'Live');
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Update Live
                    </button>
                    <button 
                      onClick={() => {
                        const s1 = document.getElementById(`s1-${selectedMatch.id}`).value;
                        const s2 = document.getElementById(`s2-${selectedMatch.id}`).value;
                        updateMatchScore(selectedMatch.id, s1, s2, 'Finished');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Finish
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Live Chat & Discussion Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Chat Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col h-[400px]">
                <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" /> Match Live Chat & Discussion
                </h3>
                
                {/* Messages List */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/60">
                  {(!chatMessages[selectedMatch.id] || chatMessages[selectedMatch.id].length === 0) ? (
                    <div className="text-center text-slate-500 text-sm mt-20">
                      No comments yet. Be the first to cheer for your team!
                    </div>
                  ) : (
                    chatMessages[selectedMatch.id].map((msg) => (
                      <div key={msg.id} className="bg-slate-900 border border-slate-800/80 p-3 rounded-2xl text-sm relative group">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-indigo-400 text-xs">{msg.name}</span>
                          <span className="text-[10px] text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">{msg.text}</p>
                        
                        {isAdmin && (
                          <button 
                            onClick={() => handleDeleteComment(selectedMatch.id, msg.id)}
                            className="absolute top-2 right-2 text-rose-400 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Input Form */}
                <form onSubmit={(e) => handleSendComment(selectedMatch.id, e)} className="space-y-2">
                  <input 
                    type="text" 
                    value={commenterName} 
                    onChange={(e) => setCommenterName(e.target.value)} 
                    placeholder="Your Name / Team" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                    required
                  />
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newComment} 
                      onChange={(e) => setNewComment(e.target.value)} 
                      placeholder="Write your cheering message..." 
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md shadow-indigo-600/30">
                      <Send className="w-3.5 h-3.5" /> Send
                    </button>
                  </div>
                </form>
              </div>

              {/* Match Specific Poll */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-400" /> Match Fan Poll
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">{poll.question}</p>

                  <div className="space-y-3">
                    {poll.options.map((opt, idx) => {
                      const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
                      const percentage = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);

                      return (
                        <div 
                          key={idx}
                          onClick={() => {
                            if (!poll.voted) {
                              const updatedOptions = [...poll.options];
                              updatedOptions[idx].votes += 1;
                              setPoll({ ...poll, options: updatedOptions, voted: true });
                            }
                          }}
                          className="bg-slate-950 border border-slate-800 p-3 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-all relative overflow-hidden"
                        >
                          <div 
                            className="absolute inset-0 bg-indigo-600/10 transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          />
                          <div className="relative z-10 flex justify-between items-center text-xs font-semibold">
                            <span>{opt.text}</span>
                            <span className="text-indigo-400">{percentage}% ({opt.votes} votes)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-center">
                  <p className="text-xs text-indigo-300 font-medium">Share this match link with friends to get more live crowd support!</p>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* HOME & OTHER TABS VIEW */
          <div className="space-y-8">

            {activeTab === 'home' && (
              <>
                {/* Hero Banner */}
                <div className="bg-gradient-to-r from-indigo-900/40 via-violet-900/30 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="max-w-xl">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-extrabold uppercase tracking-widest rounded-full border border-indigo-500/30">
                      Season 2026 Active
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black mt-3 tracking-tight leading-tight">
                      Ultimate 2v2 Carrom Championship
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      Experience live tournament schedules, standings, match score updates, and live spectator discussions all in one place.
                    </p>
                  </div>
                </div>

                {/* Match Fixtures Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Play className="w-5 h-5 text-indigo-500 fill-indigo-500" /> Tournament Matches
                    </h3>
                    <span className="text-xs text-slate-400">Click any match for Live Discussion & Score</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matches.map((match) => (
                      <div 
                        key={match.id}
                        onClick={() => setSelectedMatch(match)}
                        className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-3xl transition-all cursor-pointer shadow-lg group"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[11px] text-slate-400 font-medium">{match.time}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            match.status === 'Live' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {match.status}
                          </span>
                        </div>

                        <div className="flex justify-between items-center my-3">
                          <span className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">{match.team1}</span>
                          <div className="px-3 py-1 bg-slate-950 rounded-xl border border-slate-800 font-black text-indigo-400 tracking-wider text-sm">
                            {match.score1} : {match.score2}
                          </div>
                          <span className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">{match.team2}</span>
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-800/80 text-xs text-indigo-400 font-semibold">
                          <span>Join Match Chat & Poll</span>
                          <span>→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'standings' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" /> Points Table (8 Teams)
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="py-3 px-4">Team Name</th>
                        <th className="py-3 px-3 text-center">Played</th>
                        <th className="py-3 px-3 text-center">Won</th>
                        <th className="py-3 px-3 text-center">Lost</th>
                        <th className="py-3 px-3 text-center">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {teams.map((team, idx) => (
                        <tr key={team.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                              idx === 0 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {idx + 1}
                            </span>
                            <span className="text-white">{team.name}</span>
                          </td>
                          <td className="py-3.5 px-3 text-center text-slate-300">{team.p}</td>
                          <td className="py-3.5 px-3 text-center text-emerald-400">{team.w}</td>
                          <td className="py-3.5 px-3 text-center text-rose-400">{team.l}</td>
                          <td className="py-3.5 px-3 text-center font-bold text-indigo-400">{team.pts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'notices' && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-indigo-400" /> Official Notice Board
                  </h3>

                  {isAdmin && (
                    <div className="mb-6 p-4 bg-slate-950 border border-indigo-500/30 rounded-2xl space-y-3">
                      <p className="text-xs font-bold text-indigo-400 uppercase">Post New Notice (Admin)</p>
                      <input 
                        type="text" 
                        value={newNoticeTitle} 
                        onChange={(e) => setNewNoticeTitle(e.target.value)} 
                        placeholder="Notice Title" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                      />
                      <textarea 
                        value={newNoticeText} 
                        onChange={(e) => setNewNoticeText(e.target.value)} 
                        placeholder="Notice details..." 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                        rows="2"
                      />
                      <button 
                        onClick={() => {
                          if (!newNoticeTitle || !newNoticeText) return;
                          setNotices([{ id: Date.now(), title: newNoticeTitle, date: 'Just now', text: newNoticeText }, ...notices]);
                          setNewNoticeTitle('');
                          setNewNoticeText('');
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-xs font-bold"
                      >
                        Publish Notice
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {notices.map((notice) => (
                      <div key={notice.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-sm text-indigo-300">{notice.title}</h4>
                          <span className="text-[10px] text-slate-500">{notice.date}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{notice.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
}
