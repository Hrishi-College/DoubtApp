import React, { useState, useEffect } from 'react';
import { AlertCircle, Award, TrendingUp, MessageSquare, Users, ThumbsUp, Home, BookOpen, Trophy, LogOut } from 'lucide-react';

const DoubtifyApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [activePage, setActivePage] = useState('login');
  const [doubts, setDoubts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Initialize demo data
  useEffect(() => {
    const demoDoubts = [
      { id: 1, topic: 'Calculus - Derivatives', question: 'Can you explain the chain rule with more examples?', votes: 15, timestamp: '2 hours ago', answered: false },
      { id: 2, topic: 'Physics - Thermodynamics', question: 'What is the difference between heat and temperature?', votes: 12, timestamp: '3 hours ago', answered: true },
      { id: 3, topic: 'Chemistry - Organic', question: 'How do I identify functional groups in complex molecules?', votes: 8, timestamp: '5 hours ago', answered: false },
    ];
    
    const demoTopics = [
      { id: 1, name: 'Calculus - Derivatives', date: 'Nov 10, 2025', votes: 24 },
      { id: 2, name: 'Physics - Thermodynamics', date: 'Nov 10, 2025', votes: 18 },
      { id: 3, name: 'Chemistry - Organic', date: 'Nov 9, 2025', votes: 15 },
      { id: 4, name: 'Biology - Cell Division', date: 'Nov 9, 2025', votes: 12 },
    ];

    const demoLeaderboard = [
      { rank: 1, anonymousId: 'Student #247', points: 156, badge: 'Gold Questioner' },
      { rank: 2, anonymousId: 'Student #892', points: 143, badge: 'Silver Questioner' },
      { rank: 3, anonymousId: 'Student #431', points: 128, badge: 'Bronze Questioner' },
      { rank: 4, anonymousId: 'Student #156', points: 95, badge: 'Rising Star' },
      { rank: 5, anonymousId: 'Student #678', points: 87, badge: 'Active Learner' },
    ];

    setDoubts(demoDoubts);
    setTopics(demoTopics);
    setLeaderboard(demoLeaderboard);
  }, []);

  const handleLogin = (email, password, role) => {
    // Demo login - in real app, this would authenticate with Firebase
    if (email && password) {
      const anonymousId = `Student #${Math.floor(Math.random() * 1000)}`;
      setCurrentUser({ email, anonymousId });
      setUserRole(role);
      setActivePage('home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setActivePage('login');
  };

  const addDoubt = (topic, question) => {
    const newDoubt = {
      id: doubts.length + 1,
      topic,
      question,
      votes: 0,
      timestamp: 'Just now',
      answered: false
    };
    setDoubts([newDoubt, ...doubts]);
  };

  const voteForTopic = (topicId) => {
    setTopics(topics.map(t => 
      t.id === topicId ? { ...t, votes: t.votes + 1 } : t
    ));
  };

  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Doubtify</h1>
            <p className="text-gray-600">Anonymous Learning Platform</p>
          </div>

          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setRole('student')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  role === 'student' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole('teacher')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  role === 'teacher' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Teacher
              </button>
            </div>

            <input
              type="email"
              placeholder="University/School Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => handleLogin(email, password, role)}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Login as {role === 'student' ? 'Student' : 'Teacher'}
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Demo credentials: any email & password</p>
          </div>
        </div>
      </div>
    );
  };

  const StudentDashboard = () => {
    const [newDoubtTopic, setNewDoubtTopic] = useState('');
    const [newDoubtQuestion, setNewDoubtQuestion] = useState('');
    const [showDoubtForm, setShowDoubtForm] = useState(false);

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome, {currentUser.anonymousId}!</h2>
          <p className="opacity-90">Your identity is completely anonymous. Ask freely!</p>
          <div className="mt-4 flex gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 flex-1">
              <p className="text-sm opacity-80">Doubts Asked</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 flex-1">
              <p className="text-sm opacity-80">Points Earned</p>
              <p className="text-2xl font-bold">87</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowDoubtForm(!showDoubtForm)}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          Ask a New Doubt
        </button>

        {showDoubtForm && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Submit Your Doubt</h3>
            <input
              type="text"
              placeholder="Topic (e.g., Calculus - Derivatives)"
              value={newDoubtTopic}
              onChange={(e) => setNewDoubtTopic(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Your doubt or question..."
              value={newDoubtQuestion}
              onChange={(e) => setNewDoubtQuestion(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => {
                if (newDoubtTopic && newDoubtQuestion) {
                  addDoubt(newDoubtTopic, newDoubtQuestion);
                  setNewDoubtTopic('');
                  setNewDoubtQuestion('');
                  setShowDoubtForm(false);
                }
              }}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Submit Anonymously
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            Vote for Topics to Review
          </h3>
          <p className="text-gray-600 mb-4 text-sm">Vote for topics you want the teacher to explain in detail tomorrow</p>
          <div className="space-y-3">
            {topics.map(topic => (
              <div key={topic.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{topic.name}</p>
                  <p className="text-sm text-gray-500">{topic.date}</p>
                </div>
                <button
                  onClick={() => voteForTopic(topic.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="font-medium">{topic.votes}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TeacherDashboard = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Teacher Dashboard</h2>
          <p className="opacity-90">View all student doubts and manage your classroom</p>
          <div className="mt-4 flex gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 flex-1">
              <p className="text-sm opacity-80">Total Doubts</p>
              <p className="text-2xl font-bold">{doubts.length}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 flex-1">
              <p className="text-sm opacity-80">Unanswered</p>
              <p className="text-2xl font-bold">{doubts.filter(d => !d.answered).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Most Voted Topics (Priority Review)
          </h3>
          <div className="space-y-3">
            {[...topics].sort((a, b) => b.votes - a.votes).slice(0, 3).map((topic, idx) => (
              <div key={topic.id} className="flex items-center justify-between p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{topic.name}</p>
                    <p className="text-sm text-gray-500">{topic.votes} students need help</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">All Student Doubts</h3>
          <div className="space-y-4">
            {doubts.map(doubt => (
              <div key={doubt.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                    {doubt.topic}
                  </span>
                  <span className="text-xs text-gray-500">{doubt.timestamp}</span>
                </div>
                <p className="text-gray-800 mb-2">{doubt.question}</p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{doubt.votes} students relate to this</span>
                  {doubt.answered ? (
                    <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">Answered</span>
                  ) : (
                    <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                      Mark as Answered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const LeaderboardPage = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="w-8 h-8" />
            Weekly Leaderboard
          </h2>
          <p className="opacity-90">Top questioners of the week - Keep asking to climb up!</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {leaderboard.map((student, idx) => (
            <div
              key={student.rank}
              className={`p-6 border-b border-gray-100 last:border-b-0 ${
                idx < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                      idx === 0
                        ? 'bg-yellow-400 text-yellow-900'
                        : idx === 1
                        ? 'bg-gray-300 text-gray-700'
                        : idx === 2
                        ? 'bg-orange-400 text-orange-900'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {student.rank}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{student.anonymousId}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Award className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">{student.badge}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-indigo-600">{student.points}</p>
                  <p className="text-sm text-gray-500">points</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-indigo-600" />
            How to Earn Points
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Ask a doubt: <strong>10 points</strong></li>
            <li>• Your doubt gets upvoted: <strong>5 points per vote</strong></li>
            <li>• Complete a quiz: <strong>20 points</strong></li>
            <li>• Participate in voting: <strong>2 points</strong></li>
          </ul>
        </div>
      </div>
    );
  };

  const Navigation = () => {
    const navItems = userRole === 'student' 
      ? [
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
        ]
      : [
          { id: 'home', icon: BookOpen, label: 'Dashboard' },
          { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
        ];

    return (
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">Doubtify</span>
          </div>
          <div className="flex items-center gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activePage === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition ml-2"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    );
  };

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activePage === 'home' && (userRole === 'student' ? <StudentDashboard /> : <TeacherDashboard />)}
        {activePage === 'leaderboard' && <LeaderboardPage />}
      </div>
    </div>
  );
};

export default DoubtifyApp;