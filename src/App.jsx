import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Plus, X, ChevronDown, AlertCircle, Check, ExternalLink, UserPlus, Trash2, Edit3, Download, Share2, RotateCcw } from 'lucide-react';

const WEEKS = [
  { id: 0, dates: 'May 26-29', label: 'Memorial Day Week', days: 4, note: 'No school Monday (Memorial Day)' },
  { id: 1, dates: 'June 1-5', label: 'Week 1', days: 5 },
  { id: 2, dates: 'June 8-12', label: 'Week 2', theme: 'Adventure Rangers', days: 5, ncsWeek: 1 },
  { id: 3, dates: 'June 15-19', label: 'Week 3', theme: 'Secret Agent Academy', days: 4, note: 'No camp June 19 (Juneteenth)', ncsWeek: 2 },
  { id: 4, dates: 'June 22-26', label: 'Week 4', theme: 'Crafty Creators', days: 5, ncsWeek: 3 },
  { id: 5, dates: 'June 29-July 3', label: 'Week 5', theme: 'Summer Science', days: 5, ncsWeek: 4 },
  { id: 6, dates: 'July 6-10', label: 'Week 6', days: 5, note: 'No NCS camp this week' },
  { id: 7, dates: 'July 13-17', label: 'Week 7', theme: 'Around the World', days: 5, ncsWeek: 5 },
  { id: 8, dates: 'July 20-24', label: 'Week 8', theme: 'Under the Sea', days: 5, ncsWeek: 6 },
  { id: 9, dates: 'July 27-31', label: 'Week 9', theme: 'Carnival Camp', days: 5, ncsWeek: 7 },
  { id: 10, dates: 'Aug 3-7', label: 'Week 10', theme: 'Animal Planet', days: 5, ncsWeek: 8 },
  { id: 11, dates: 'Aug 10-14', label: 'Week 11', days: 5 },
  { id: 12, dates: 'Aug 17-21', label: 'Week 12', days: 5, note: 'School starts soon!' },
];

const EXTERNAL_CAMPS = [
  {
    id: 'grc',
    name: 'Gifted Resource Council',
    shortName: 'GRC',
    url: 'https://giftedresourcecouncil.org/summer-academies/',
    cost: 520,
    costNote: '$515-525 / 2 weeks',
    duration: '2 weeks',
    regDate: 'Jan 5 (members) / Jan 16',
    grades: [0,1,2,3,4,5,6,7,8],
    ageRange: 'K-8th',
    location: 'Creve Coeur',
    color: 'purple',
    sessions: [
      { weeks: [2,3], name: 'Session 1 (June 8-19)' },
      { weeks: [4,5], name: 'Session 2 (June 22-July 3)' },
      { weeks: [7,8], name: 'Session 3 (July 13-24)' },
    ]
  },
  {
    id: 'burroak',
    name: 'Burr Oak (John Burroughs)',
    shortName: 'Burr Oak',
    url: 'https://www.jburroughs.org/about-jbs/summer-programs',
    cost: 495,
    costNote: '$495/week (w/ lunch)',
    duration: '1 week',
    regDate: 'Jan 21 (priority) / Jan 23',
    grades: [0,1,2,3,4,5,6],
    ageRange: 'Ages 5-12',
    location: 'Ladue',
    color: 'emerald',
    weeks: [2,3,4,5,6,7,8,9,10]
  },
  {
    id: 'mrsroams',
    name: "Mrs. Roam's Art Camp",
    shortName: 'Mrs. Roams',
    url: 'https://www.rebeccaroam.com/',
    cost: 250,
    costNote: '~$250/week',
    duration: '1 week',
    regDate: 'TBD - check site',
    ageRange: 'K-6th',
    location: 'St. Louis',
    color: 'pink',
    weeks: [2,3,4,5,6,7,8,9,10,11]
  },
  {
    id: 'superninja',
    name: 'All American Gymnastics SuperNinja',
    shortName: 'SuperNinja',
    url: 'https://www.aag-stl.com/summer-camp',
    cost: 370,
    costNote: 'Early bird $370 (till Jan 15)',
    duration: '1 week',
    regDate: 'Jan 13',
    ageRange: 'Various',
    location: 'St. Louis',
    color: 'red',
    weeks: [2,3,4,5,6,7,8,9,10,11]
  },
  {
    id: 'slusoccer',
    name: 'SLU Elite Soccer Camp',
    shortName: 'SLU Soccer',
    url: 'https://www.saintlouiselitesoccercamp.com/',
    cost: 265,
    costNote: '~$265/week',
    duration: '1 week',
    regDate: 'Open now',
    ageRange: 'Various',
    location: 'SLU Campus',
    color: 'blue',
    weeks: [1,7]
  },
  {
    id: 'humanesociety',
    name: 'Humane Society Kids for Critters',
    shortName: 'Humane Society',
    url: 'https://hsmo.org/summercamp/',
    cost: 350,
    costNote: '$350/week + aftercare $30/day',
    duration: '1 week',
    regDate: 'Feb 11 @ 10am/12pm/2pm by age',
    location: '1201 Macklind Ave',
    color: 'orange',
    ageSessions: [
      { ages: '6-8', weeks: [2, 6] },
      { ages: '9-11', weeks: [4, 8, 10] },
      { ages: '12-14', weeks: [5, 9] },
    ]
  },
  {
    id: 'zoo',
    name: 'STL Zoo Camp',
    shortName: 'Zoo Camp',
    url: 'https://stlzoo.org/education/education-registration',
    cost: null,
    costNote: 'TBD - check site',
    duration: '1 week',
    regDate: 'Feb 10 @ 10am',
    ageRange: 'Various',
    location: 'Forest Park',
    color: 'green',
    weeks: [2,3,4,5,6,7,8,9,10]
  },
  {
    id: 'newcity',
    name: 'New City School Day Camp',
    shortName: 'NCS Day Camp',
    url: 'https://newcityschool.org/summer',
    cost: 320,
    costNote: '$256-320/week',
    duration: '1 week',
    regDate: 'Jan 8 (NCS) / Jan 16',
    ageRange: 'Age 3 - 6th',
    location: 'New City School',
    color: 'ncs',
    weeks: [2,3,4,5,7,8,9,10],
    weekCosts: { 3: 256 } // June 15-19 is prorated (no camp June 19)
  }
];

const NCS_SPECIALTY = {
  1: [
    { name: 'Dance (3rd-6th)', cost: 325, time: 'full' },
    { name: 'Chess Camp', cost: 180, time: 'half' },
    { name: 'Cooking: Breakfast Bash', cost: 400, time: 'full' },
    { name: 'Crayola Legends & Lore', cost: 280, time: 'am' },
    { name: 'Metro Theater Creative Arts', cost: 300, time: 'full' },
    { name: "Minecrafter's Guild", cost: 220, time: 'pm' },
    { name: "Nature Explorer's (1st-3rd)", cost: 325, time: 'full' },
    { name: 'RC Racing', cost: 220, time: 'am' },
    { name: 'Sports & Games Madness', cost: 340, time: 'full' },
    { name: 'Summer E.A.T.S.', cost: 180, time: 'am' },
  ],
  2: [
    { name: 'Basketball AM (1st-3rd)', cost: 144, time: 'am' },
    { name: 'Chess Camp', cost: 144, time: 'half' },
    { name: 'Cooking: World Dishes', cost: 320, time: 'full' },
    { name: 'Crayola Artblazers', cost: 225, time: 'pm' },
    { name: 'Metro Theater Creative Arts', cost: 225, time: 'full' },
    { name: "Nature Explorer's", cost: 260, time: 'full' },
    { name: 'Painting Camp', cost: 260, time: 'full' },
    { name: 'Run, Jump, Code', cost: 225, time: 'am' },
    { name: 'Sports & Games Madness', cost: 272, time: 'full' },
    { name: "Summer Jammin'", cost: 144, time: 'am' },
  ],
  3: [
    { name: 'Dance (3rd-6th)', cost: 325, time: 'full' },
    { name: 'AstroInnovators', cost: 280, time: 'pm' },
    { name: 'Cartooning & Caricature', cost: 325, time: 'full' },
    { name: 'Chess Camp', cost: 180, time: 'half' },
    { name: 'Cooking: Baking', cost: 400, time: 'full' },
    { name: 'Fairy Garden (1st-3rd)', cost: 180, time: 'am' },
    { name: "Minecrafter's Guild", cost: 220, time: 'pm' },
    { name: 'RC Racing', cost: 220, time: 'am' },
    { name: 'Sports & Games Madness', cost: 325, time: 'full' },
  ],
  4: [
    { name: 'Chess Camp', cost: 180, time: 'half' },
    { name: 'Cooking: Handheld Delights', cost: 400, time: 'full' },
    { name: "Crayola Artist's Passport", cost: 280, time: 'pm' },
    { name: 'Flag Football AM (1st-3rd)', cost: 180, time: 'am' },
    { name: 'Printmaking', cost: 325, time: 'full' },
    { name: 'Secret Agent Lab', cost: 280, time: 'am' },
    { name: 'Sports & Games Madness', cost: 340, time: 'full' },
  ],
  5: [
    { name: "Babysitter's Club", cost: 325, time: 'am' },
    { name: 'Chess Camp', cost: 180, time: 'half' },
    { name: 'Drawing Camp', cost: 325, time: 'full' },
    { name: 'KTK Theatre (4 wks $800)', cost: 800, time: 'full', note: '4-week commitment' },
    { name: "Minecrafter's Guild", cost: 220, time: 'pm' },
    { name: 'Rocketry Camp', cost: 280, time: 'am' },
    { name: 'RC Racing', cost: 220, time: 'am' },
    { name: 'Sewing Camp', cost: 180, time: 'pm' },
    { name: 'Sports & Games Madness', cost: 340, time: 'full' },
  ],
  6: [
    { name: 'Dance (3rd-6th)', cost: 325, time: 'full' },
    { name: 'Basketball AM (1st-3rd)', cost: 180, time: 'am' },
    { name: 'Chess Camp', cost: 180, time: 'half' },
    { name: 'Crayola World of Design', cost: 280, time: 'am' },
    { name: 'Sewing Camp', cost: 180, time: 'pm' },
    { name: 'Sports & Games Madness', cost: 340, time: 'full' },
    { name: 'Super Gross Science', cost: 280, time: 'pm' },
  ],
  7: [
    { name: 'Chess Camp', cost: 180, time: 'half' },
    { name: 'Earth & Space Investigators', cost: 280, time: 'pm' },
    { name: 'Fun with Felt (1st-3rd)', cost: 325, time: 'full' },
    { name: 'RC Racing', cost: 220, time: 'am' },
    { name: 'Sewing Camp', cost: 180, time: 'pm' },
    { name: 'Sports & Games Madness', cost: 340, time: 'full' },
  ],
  8: [
    { name: 'Dance (3rd-6th)', cost: 325, time: 'full' },
    { name: 'Chess Camp', cost: 180, time: 'half' },
    { name: 'Crayola Wild World', cost: 280, time: 'am' },
    { name: 'Sewing Camp', cost: 180, time: 'pm' },
    { name: 'Sports & Games Madness', cost: 340, time: 'full' },
  ],
};

const EXTENDED_DAY_COST = 110;
const EXTENDED_DAY_PRORATED = { 3: 88 }; // June 15-19 is 4 days
const STORAGE_KEY = 'summer-camp-planner-2026';

const colorClasses = {
  purple: 'bg-purple-100 border-purple-400 text-purple-800',
  emerald: 'bg-emerald-100 border-emerald-400 text-emerald-800',
  pink: 'bg-pink-100 border-pink-400 text-pink-800',
  red: 'bg-red-100 border-red-400 text-red-800',
  blue: 'bg-blue-100 border-blue-400 text-blue-800',
  orange: 'bg-orange-100 border-orange-400 text-orange-800',
  cyan: 'bg-cyan-100 border-cyan-400 text-cyan-800',
  green: 'bg-green-100 border-green-400 text-green-800',
  ncs: 'bg-gradient-to-r from-orange-100 to-green-100 border-orange-400 text-orange-800',
  gray: 'bg-gray-100 border-gray-400 text-gray-700',
};

const kidColors = ['bg-blue-500', 'bg-pink-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500'];

// Load saved data from localStorage
const loadSavedData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load saved data:', e);
  }
  return null;
};

// Save data to localStorage
const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
};

export default function App() {
  const savedData = loadSavedData();
  
  const [kids, setKids] = useState(savedData?.kids || [
    { id: 1, name: 'Child 1', grade: 4, color: 0 }
  ]);
  const [activeKid, setActiveKid] = useState(savedData?.activeKid || 1);
  const [selections, setSelections] = useState(savedData?.selections || {});
  const [extendedDay, setExtendedDay] = useState(savedData?.extendedDay || {});
  const [showCampPicker, setShowCampPicker] = useState(null);
  const [editingKid, setEditingKid] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveData({ kids, activeKid, selections, extendedDay });
  }, [kids, activeKid, selections, extendedDay]);

  const addKid = () => {
    const newId = Math.max(...kids.map(k => k.id), 0) + 1;
    setKids([...kids, { 
      id: newId, 
      name: `Child ${newId}`, 
      grade: 3,
      color: (newId - 1) % kidColors.length 
    }]);
    setActiveKid(newId);
  };

  const removeKid = (kidId) => {
    if (kids.length === 1) return;
    setKids(kids.filter(k => k.id !== kidId));
    if (activeKid === kidId) {
      setActiveKid(kids.find(k => k.id !== kidId)?.id);
    }
    setSelections(prev => {
      const newSel = { ...prev };
      delete newSel[kidId];
      return newSel;
    });
  };

  const updateKid = (kidId, updates) => {
    setKids(kids.map(k => k.id === kidId ? { ...k, ...updates } : k));
  };

  const handleSelectCamp = (weekId, camp, forceSlot = null) => {
    // Determine slot: 'am', 'pm', or 'full'
    // 'half' camps default to the first available half-day slot
    let slot;
    if (forceSlot) {
      slot = forceSlot;
    } else if (camp.time === 'am') {
      slot = 'am';
    } else if (camp.time === 'pm') {
      slot = 'pm';
    } else if (camp.time === 'half') {
      // Half-day camp without specified slot - pick first available
      const weekSel = selections[activeKid]?.[weekId] || {};
      const available = getAvailableSlots(weekSel);
      slot = available.am ? 'am' : available.pm ? 'pm' : 'full';
    } else {
      slot = 'full';
    }
    
    setSelections(prev => {
      const kidSel = prev[activeKid] || {};
      const weekSel = kidSel[weekId] || {};
      
      let newWeekSel;
      if (slot === 'full') {
        // Full day clears AM/PM
        newWeekSel = { full: { ...camp, time: 'full' } };
      } else {
        // Half day clears full, keeps the other half
        newWeekSel = {
          am: slot === 'am' ? { ...camp, time: 'am' } : (weekSel.am || null),
          pm: slot === 'pm' ? { ...camp, time: 'pm' } : (weekSel.pm || null),
        };
      }
      
      return {
        ...prev,
        [activeKid]: {
          ...kidSel,
          [weekId]: newWeekSel
        }
      };
    });
    setShowCampPicker(null);
  };

  const clearWeek = (weekId, slot = null) => {
    setSelections(prev => {
      const kidSel = { ...(prev[activeKid] || {}) };
      
      if (!slot) {
        // Clear entire week
        delete kidSel[weekId];
      } else {
        // Clear specific slot
        const weekSel = { ...(kidSel[weekId] || {}) };
        delete weekSel[slot];
        
        // If nothing left, remove the week entirely
        if (!weekSel.am && !weekSel.pm && !weekSel.full) {
          delete kidSel[weekId];
        } else {
          kidSel[weekId] = weekSel;
        }
      }
      
      return { ...prev, [activeKid]: kidSel };
    });
  };
  
  // Helper to get camps from week selection
  const getWeekCamps = (weekSel) => {
    if (!weekSel) return [];
    const camps = [];
    if (weekSel.full) camps.push({ ...weekSel.full, slot: 'full' });
    if (weekSel.am) camps.push({ ...weekSel.am, slot: 'am' });
    if (weekSel.pm) camps.push({ ...weekSel.pm, slot: 'pm' });
    return camps;
  };
  
  // Check what slots are available for a week
  const getAvailableSlots = (weekSel) => {
    if (!weekSel) return { am: true, pm: true, full: true };
    if (weekSel.full) return { am: false, pm: false, full: false };
    return {
      am: !weekSel.am,
      pm: !weekSel.pm,
      full: !weekSel.am && !weekSel.pm
    };
  };

  const toggleExtendedDay = (weekId) => {
    const key = `${activeKid}-${weekId}`;
    setExtendedDay(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetAll = () => {
    if (confirm('Are you sure you want to clear all selections? This cannot be undone.')) {
      setKids([{ id: 1, name: 'Child 1', grade: 4, color: 0 }]);
      setActiveKid(1);
      setSelections({});
      setExtendedDay({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const getCampsForWeek = (week) => {
    const camps = [];
    EXTERNAL_CAMPS.forEach(camp => {
      let available = false;
      if (camp.weeks?.includes(week.id)) available = true;
      if (camp.sessions?.some(s => s.weeks.includes(week.id))) available = true;
      if (camp.ageSessions?.some(s => s.weeks.includes(week.id))) available = true;
      if (available) camps.push(camp);
    });
    return camps;
  };

  const getNCSSpecialty = (week) => {
    if (!week.ncsWeek) return [];
    return NCS_SPECIALTY[week.ncsWeek] || [];
  };

  const calculateKidTotal = (kidId) => {
    const kidSelections = selections[kidId] || {};
    let campCost = 0;
    let extCost = 0;
    let weeks = 0;

    Object.entries(kidSelections).forEach(([weekId, weekSel]) => {
      const camps = getWeekCamps(weekSel);
      if (camps.length > 0) weeks++;
      
      camps.forEach(camp => {
        if (camp?.cost) campCost += camp.cost;
      });
      
      // Extended day only if has NCS camp
      const hasNCS = camps.some(c => c?.source === 'ncs');
      if (extendedDay[`${kidId}-${weekId}`] && hasNCS) {
        const weekIdNum = parseInt(weekId);
        extCost += EXTENDED_DAY_PRORATED[weekIdNum] ?? EXTENDED_DAY_COST;
      }
    });

    return { campCost, extCost, total: campCost + extCost, weeks };
  };

  const grandTotal = useMemo(() => {
    return kids.reduce((acc, kid) => {
      const kidTotal = calculateKidTotal(kid.id);
      return {
        campCost: acc.campCost + kidTotal.campCost,
        extCost: acc.extCost + kidTotal.extCost,
        total: acc.total + kidTotal.total,
        weeks: acc.weeks + kidTotal.weeks
      };
    }, { campCost: 0, extCost: 0, total: 0, weeks: 0 });
  }, [selections, extendedDay, kids]);

  const generateSummaryText = () => {
    let text = "Summer Camp Plan 2026\n";
    text += "=".repeat(30) + "\n\n";
    
    kids.forEach(kid => {
      const kidSelections = selections[kid.id] || {};
      const kidTotal = calculateKidTotal(kid.id);
      
      text += `${kid.name} (${kid.grade === 0 ? 'K' : kid.grade}th Grade)\n`;
      text += "-".repeat(20) + "\n";
      
      WEEKS.forEach(week => {
        const weekSel = kidSelections[week.id];
        const camps = getWeekCamps(weekSel);
        if (camps.length > 0) {
          text += `${week.dates}:\n`;
          camps.forEach(camp => {
            text += `  - ${camp.name}`;
            if (camp.slot !== 'full') text += ` (${camp.slot.toUpperCase()})`;
            if (camp.cost) text += ` $${camp.cost}`;
            text += "\n";
          });
          if (extendedDay[`${kid.id}-${week.id}`]) text += `  + Extended Day\n`;
        }
      });
      
      text += `\nSubtotal: $${kidTotal.total}\n\n`;
    });
    
    text += "=".repeat(30) + "\n";
    text += `FAMILY TOTAL: $${grandTotal.total}\n`;
    
    return text;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSummaryText());
    alert('Summary copied to clipboard!');
  };

  const activeKidData = kids.find(k => k.id === activeKid);
  const activeSelections = selections[activeKid] || {};

  const regDates = [
    { date: 'Jan 5', event: 'GRC members', color: 'purple' },
    { date: 'Jan 8', event: 'NCS Early Bird', color: 'ncs' },
    { date: 'Jan 13', event: 'SuperNinja', color: 'red' },
    { date: 'Jan 16', event: 'NCS & GRC public', color: 'green' },
    { date: 'Jan 21', event: 'Burr Oak priority', color: 'emerald' },
    { date: 'Feb 10', event: 'STL Zoo', color: 'green' },
    { date: 'Feb 11', event: 'Humane Society', color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-orange-400 to-green-500 rounded-full p-3">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Summer Camp Planner 2026</h1>
                <p className="text-gray-500">Plan your family's summer adventures</p>
              </div>
            </div>
            
            {/* Actions & Total */}
            <div className="flex gap-3 items-center">
              <button
                onClick={() => setShowShareModal(true)}
                className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1 text-sm font-medium"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button
                onClick={resetAll}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-1 text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
              <div className="text-right pl-3 border-l">
                <p className="text-sm text-gray-500">{grandTotal.weeks} weeks</p>
                <p className="text-2xl font-bold text-green-600">${grandTotal.total.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Kid Tabs */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {kids.map(kid => {
              const kidTotal = calculateKidTotal(kid.id);
              return (
                <button
                  key={kid.id}
                  onClick={() => setActiveKid(kid.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    activeKid === kid.id 
                      ? 'bg-gray-800 text-white shadow-lg scale-105' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${kidColors[kid.color]}`} />
                  <span>{kid.name}</span>
                  <span className="text-xs opacity-75">({kid.grade === 0 ? 'K' : kid.grade}th)</span>
                  {kidTotal.weeks > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      activeKid === kid.id ? 'bg-white/20' : 'bg-gray-300'
                    }`}>
                      ${kidTotal.total}
                    </span>
                  )}
                  {activeKid === kid.id && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingKid(kid.id); }}
                      className="ml-1 p-1 hover:bg-white/20 rounded"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  )}
                </button>
              );
            })}
            <button
              onClick={addKid}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 font-medium"
            >
              <UserPlus className="w-4 h-4" />
              Add Child
            </button>
          </div>

          {/* Edit Kid Modal */}
          {editingKid && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Edit Child</h3>
                <button onClick={() => setEditingKid(null)}><X className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Name</label>
                  <input
                    type="text"
                    value={kids.find(k => k.id === editingKid)?.name || ''}
                    onChange={(e) => updateKid(editingKid, { name: e.target.value })}
                    className="px-3 py-2 border rounded-lg w-40"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Grade (Fall 2026)</label>
                  <select
                    value={kids.find(k => k.id === editingKid)?.grade || 3}
                    onChange={(e) => updateKid(editingKid, { grade: parseInt(e.target.value) })}
                    className="px-3 py-2 border rounded-lg"
                  >
                    {[0,1,2,3,4,5,6,7,8].map(g => (
                      <option key={g} value={g}>{g === 0 ? 'K' : g}th Grade</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Color</label>
                  <div className="flex gap-1">
                    {kidColors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => updateKid(editingKid, { color: i })}
                        className={`w-8 h-8 rounded-full ${c} ${
                          kids.find(k => k.id === editingKid)?.color === i ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {kids.length > 1 && (
                  <button
                    onClick={() => { removeKid(editingKid); setEditingKid(null); }}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Registration Timeline */}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">📅 Key Registration Dates</h3>
            <div className="flex flex-wrap gap-2">
              {regDates.map((r, i) => (
                <span key={i} className={`px-2 py-1 rounded-full text-xs font-medium border ${colorClasses[r.color]}`}>
                  {r.date}: {r.event}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Share Your Plan</h3>
                <button onClick={() => setShowShareModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <textarea
                readOnly
                value={generateSummaryText()}
                className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-50"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className={`p-4 ${kidColors[activeKidData?.color || 0]}`}>
            <h2 className="text-white font-bold text-lg">{activeKidData?.name}'s Schedule</h2>
            <p className="text-white/80 text-sm">
              Entering {activeKidData?.grade === 0 ? 'K' : activeKidData?.grade}th Grade · May 26 – Aug 21, 2026
            </p>
          </div>
          
          <div className="divide-y">
            {WEEKS.map((week) => {
              const selected = activeSelections[week.id];
              const selectedCamps = getWeekCamps(selected);
              const availableSlots = getAvailableSlots(selected);
              const availableCamps = getCampsForWeek(week);
              const ncsSpecialty = getNCSSpecialty(week);
              const hasOptions = availableCamps.length > 0 || ncsSpecialty.length > 0;
              const canAddMore = availableSlots.am || availableSlots.pm;

              const otherKidsThisWeek = kids
                .filter(k => k.id !== activeKid && selections[k.id]?.[week.id])
                .map(k => ({ ...k, camps: getWeekCamps(selections[k.id][week.id]) }));

              return (
                <div key={week.id} className={`p-4 ${selected ? 'bg-gray-50' : ''}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Week Info */}
                    <div className="lg:w-44 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{week.dates}</span>
                        {otherKidsThisWeek.length > 0 && (
                          <div className="flex -space-x-1">
                            {otherKidsThisWeek.map(k => (
                              <div 
                                key={k.id} 
                                className={`w-4 h-4 rounded-full ${kidColors[k.color]} border-2 border-white`}
                                title={`${k.name}: ${k.camps.map(c => c.name).join(', ')}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      {week.theme && (
                        <p className="text-sm text-orange-600">NCS: {week.theme}</p>
                      )}
                      {week.note && (
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {week.note}
                        </p>
                      )}
                    </div>

                    {/* Selection Area */}
                    <div className="flex-1">
                      {selectedCamps.length > 0 ? (
                        <div className="space-y-2">
                          {/* Show selected camps */}
                          {selectedCamps.map((camp, idx) => (
                            <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                              colorClasses[camp.color] || colorClasses.gray
                            }`}>
                              <div className="flex items-center gap-3">
                                <Check className="w-5 h-5" />
                                <div>
                                  <p className="font-medium">
                                    {camp.name}
                                    {camp.slot !== 'full' && (
                                      <span className="ml-2 text-xs px-2 py-0.5 rounded bg-black/10">
                                        {camp.slot.toUpperCase()}
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-sm opacity-75">
                                    {camp.cost ? `$${camp.cost}` : 'Cost TBD'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {camp.source === 'ncs' && idx === 0 && (
                                  <label className="flex items-center gap-1 text-xs cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={extendedDay[`${activeKid}-${week.id}`] || false}
                                      onChange={() => toggleExtendedDay(week.id)}
                                      className="rounded"
                                    />
                                    +Ext
                                  </label>
                                )}
                                {camp.url && (
                                  <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => window.open(camp.url, '_blank', 'noopener,noreferrer')}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') window.open(camp.url, '_blank', 'noopener,noreferrer');
                                    }}
                                    className="p-1 hover:bg-white/50 rounded cursor-pointer"
                                    title="Open camp website"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </span>
                                )}
                                <button onClick={() => clearWeek(week.id, camp.slot)} className="p-1 hover:bg-white/50 rounded">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          
                          {/* Add more button if half-day slots available */}
                          {canAddMore && (
                            <button
                              onClick={() => setShowCampPicker(week.id)}
                              className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 flex items-center justify-center gap-1"
                            >
                              <Plus className="w-4 h-4" />
                              Add {availableSlots.am ? 'AM' : ''}{availableSlots.am && availableSlots.pm ? ' or ' : ''}{availableSlots.pm ? 'PM' : ''} camp
                            </button>
                          )}
                        </div>
                      ) : hasOptions ? (
                        <div className="flex flex-wrap gap-2">
                          {availableCamps.slice(0, 5).map(camp => {
                            const weekCost = camp.weekCosts?.[week.id] ?? camp.cost;
                            const campSlot = camp.time === 'am' ? 'am' : camp.time === 'pm' ? 'pm' : camp.time === 'half' ? 'half' : 'full';
                            
                            // Check if slot is available
                            let slotAvailable;
                            if (campSlot === 'half') {
                              slotAvailable = availableSlots.am || availableSlots.pm;
                            } else {
                              slotAvailable = availableSlots[campSlot];
                            }
                            
                            if (!slotAvailable) return null;
                            
                            return (
                            <button
                              key={camp.id}
                              onClick={() => handleSelectCamp(week.id, {
                                ...camp,
                                cost: weekCost,
                                source: camp.id === 'newcity' ? 'ncs' : 'external'
                              })}
                              className={`group px-3 py-2 rounded-lg border-2 text-sm font-medium hover:opacity-90 transition flex items-center gap-2 ${colorClasses[camp.color]}`}
                            >
                              <span>
                                {camp.shortName}
                                {weekCost && <span className="opacity-75"> ${weekCost}</span>}
                              </span>
                              <span
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  window.open(camp.url, '_blank', 'noopener,noreferrer');
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.stopPropagation();
                                    window.open(camp.url, '_blank', 'noopener,noreferrer');
                                  }
                                }}
                                className="p-1 rounded hover:bg-black/10 opacity-60 hover:opacity-100"
                                title={`Open ${camp.name} website`}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </span>
                            </button>
                            );
                          }).filter(Boolean)}
                          
                          {(ncsSpecialty.length > 0 || availableCamps.length > 5) && (
                            <button
                              onClick={() => setShowCampPicker(week.id)}
                              className="px-3 py-2 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400"
                            >
                              <Plus className="w-4 h-4 inline mr-1" />
                              More options...
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm italic">No preset camps this week</span>
                          <button
                            onClick={() => setShowCampPicker(week.id)}
                            className="px-3 py-1 rounded-lg border border-gray-300 text-sm text-gray-500 hover:border-gray-400"
                          >
                            <Plus className="w-3 h-3 inline mr-1" />
                            Add
                          </button>
                        </div>
                      )}

                      {/* Expanded Camp Picker */}
                      {showCampPicker === week.id && (
                        <div className="mt-3 p-4 bg-gray-50 rounded-lg border max-h-80 overflow-y-auto">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-700">
                              Options for {week.dates}
                              {(!availableSlots.full && (availableSlots.am || availableSlots.pm)) && (
                                <span className="ml-2 text-sm font-normal text-gray-500">
                                  ({availableSlots.am ? 'AM' : ''}{availableSlots.am && availableSlots.pm ? ' & ' : ''}{availableSlots.pm ? 'PM' : ''} available)
                                </span>
                              )}
                            </h4>
                            <button onClick={() => setShowCampPicker(null)}><X className="w-4 h-4" /></button>
                          </div>
                          
                          {/* External Camps */}
                          <div className="mb-4">
                            <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Camps</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {availableCamps.map(camp => {
                                const weekCost = camp.weekCosts?.[week.id] ?? camp.cost;
                                const campSlot = camp.time === 'am' ? 'am' : camp.time === 'pm' ? 'pm' : camp.time === 'half' ? 'half' : 'full';
                                
                                let slotAvailable;
                                if (campSlot === 'half') {
                                  slotAvailable = availableSlots.am || availableSlots.pm;
                                } else {
                                  slotAvailable = availableSlots[campSlot];
                                }
                                
                                if (!slotAvailable) return null;
                                
                                return (
                                <button
                                  key={camp.id}
                                  onClick={() => handleSelectCamp(week.id, {
                                    ...camp,
                                    cost: weekCost,
                                    source: camp.id === 'newcity' ? 'ncs' : 'external'
                                  })}
                                  className={`p-3 rounded-lg border text-left hover:opacity-90 ${colorClasses[camp.color]}`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">
                                        {camp.name}
                                        {campSlot !== 'full' && (
                                          <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-black/10">
                                            {campSlot === 'half' ? 'AM/PM' : campSlot.toUpperCase()}
                                          </span>
                                        )}
                                      </p>
                                      <p className="text-xs opacity-75">{weekCost ? `$${weekCost}` : camp.costNote}</p>
                                      <p className="text-xs opacity-60">{camp.location}</p>
                                    </div>
                                    <span
                                      role="button"
                                      tabIndex={0}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        window.open(camp.url, '_blank', 'noopener,noreferrer');
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.stopPropagation();
                                          window.open(camp.url, '_blank', 'noopener,noreferrer');
                                        }
                                      }}
                                      className="p-2 rounded-lg bg-white/50 hover:bg-white flex-shrink-0"
                                      title={`Open ${camp.name} website`}
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </span>
                                  </div>
                                </button>
                                );
                              }).filter(Boolean)}
                            </div>
                          </div>

                          {/* NCS Specialty */}
                          {ncsSpecialty.length > 0 && (
                            <div>
                              <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                                NCS Specialty Camps 
                                <span
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => window.open('https://newcityschool.org/summer', '_blank', 'noopener,noreferrer')}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') window.open('https://newcityschool.org/summer', '_blank', 'noopener,noreferrer');
                                  }}
                                  className="inline-flex items-center text-orange-600 hover:text-orange-800 cursor-pointer"
                                >
                                  Register <ExternalLink className="w-3 h-3 ml-1" />
                                </span>
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {ncsSpecialty.map((camp, i) => {
                                  const campSlot = camp.time === 'am' ? 'am' : camp.time === 'pm' ? 'pm' : camp.time === 'half' ? 'half' : 'full';
                                  
                                  let slotAvailable;
                                  if (campSlot === 'half') {
                                    slotAvailable = availableSlots.am || availableSlots.pm;
                                  } else {
                                    slotAvailable = availableSlots[campSlot];
                                  }
                                  
                                  if (!slotAvailable) return null;
                                  
                                  // Determine display slot
                                  const displaySlot = campSlot === 'half' ? (availableSlots.am ? 'am' : 'pm') : campSlot;
                                  
                                  return (
                                  <button
                                    key={i}
                                    onClick={() => handleSelectCamp(week.id, {
                                      name: camp.name,
                                      cost: camp.cost,
                                      time: camp.time,
                                      color: 'ncs',
                                      url: 'https://newcityschool.org/summer',
                                      source: 'ncs'
                                    })}
                                    className={`p-2 rounded-lg border text-left text-sm hover:opacity-80 ${colorClasses.ncs}`}
                                  >
                                    <span className="font-medium">{camp.name}</span>
                                    <span className="opacity-75 ml-2">${camp.cost}</span>
                                    {campSlot !== 'full' && (
                                      <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-black/10">
                                        {campSlot === 'half' ? 'AM/PM' : campSlot.toUpperCase()}
                                      </span>
                                    )}
                                    {camp.note && <span className="text-xs block opacity-60">{camp.note}</span>}
                                  </button>
                                  );
                                }).filter(Boolean)}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Summary by Child</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kids.map(kid => {
              const kidTotal = calculateKidTotal(kid.id);
              const kidSelections = selections[kid.id] || {};
              return (
                <div key={kid.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-4 h-4 rounded-full ${kidColors[kid.color]}`} />
                    <span className="font-semibold">{kid.name}</span>
                    <span className="text-sm text-gray-500">({kid.grade === 0 ? 'K' : kid.grade}th)</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weeks</span>
                      <span className="font-medium">{kidTotal.weeks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Camp Fees</span>
                      <span className="font-medium">${kidTotal.campCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Extended Day</span>
                      <span className="font-medium">${kidTotal.extCost}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t font-bold">
                      <span>Subtotal</span>
                      <span className="text-green-600">${kidTotal.total}</span>
                    </div>
                  </div>
                  {kidTotal.weeks > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {Object.entries(kidSelections).map(([weekId, weekSel]) => {
                        const camps = getWeekCamps(weekSel);
                        if (camps.length === 0) return null;
                        return (
                          <span key={weekId} className={`text-xs px-2 py-0.5 rounded ${colorClasses[camps[0].color] || colorClasses.gray}`}>
                            {WEEKS.find(w => w.id === parseInt(weekId))?.dates.split('-')[0]}
                            {camps.length > 1 && ` (${camps.length})`}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              <p>• NCS Early Care (7am) free • Extended Day $110/wk • No NCS July 6-10</p>
              <p>• Variable tuition discounts apply to NCS camps • Data saves automatically</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Family Total</p>
              <p className="text-3xl font-bold text-green-600">${grandTotal.total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Summer Camp Planner 2026 · St. Louis Area Camps</p>
          <p className="mt-1">Your selections are saved locally in your browser.</p>
        </div>
      </div>
    </div>
  );
}
