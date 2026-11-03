export type Language = 'ms' | 'en';

export type StageId = 1 | 2 | 3;

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameState = 'menu' | 'playing' | 'paused' | 'stage_transition' | 'gameover' | 'victory';

export type Lane = -1 | 0 | 1; // -1: Left, 0: Center, 1: Right
export type Altitude = -1 | 0 | 1; // -1: Low, 0: Normal, 1: High

export type DskpCode = '4.1.1' | '4.1.2' | '4.1.3';

export interface StageInfo {
  id: StageId;
  name: { ms: string; en: string };
  difficultyLabel: { ms: string; en: string };
  difficulty: Difficulty;
  targetCorrect: number; // 5 questions each
  baseSpeed: number; // Stage 1: 13.8, Stage 2: 15.4, Stage 3: 17.0
  color: string;
  badge: string;
  topics: { ms: string; en: string };
  description: { ms: string; en: string };
}

export const STAGES_CONFIG: Record<StageId, StageInfo> = {
  1: {
    id: 1,
    name: { ms: 'Sky Cadet', en: 'Sky Cadet' },
    difficultyLabel: { ms: 'Mudah (Easy)', en: 'Easy' },
    difficulty: 'easy',
    targetCorrect: 5,
    baseSpeed: 16.6,
    color: 'from-sky-500 to-cyan-500',
    badge: '🔰',
    topics: {
      ms: 'Mewakilkan nisbah 2 kuantiti (a:b) & mempermudahkan kepada bentuk termudah (FSTB).',
      en: 'Representing 2 quantities (a:b) & simplifying ratios using HCF.',
    },
    description: {
      ms: 'Kelajuan selesa, halangan minima, masa menjawab seimbang untuk pemula.',
      en: 'Comfortable speed, minimal obstacles, balanced answer time for beginners.',
    },
  },
  2: {
    id: 2,
    name: { ms: 'Sky Navigator', en: 'Sky Navigator' },
    difficultyLabel: { ms: 'Sederhana (Medium)', en: 'Medium' },
    difficulty: 'medium',
    targetCorrect: 5,
    baseSpeed: 18.5,
    color: 'from-indigo-500 to-purple-600',
    badge: '⭐',
    topics: {
      ms: 'Nisbah setara, nisbah 3 kuantiti (a:b:c) & masalah berayat kontekstual.',
      en: 'Equivalent ratios, 3-quantity ratios (a:b:c) & contextual word problems.',
    },
    description: {
      ms: 'Kelajuan sederhana pantas, halangan seimbang, soalan nisbah setara.',
      en: 'Moderate brisk speed, balanced obstacles, equivalent ratio challenges.',
    },
  },
  3: {
    id: 3,
    name: { ms: 'Ratio Ace', en: 'Ratio Ace' },
    difficultyLabel: { ms: 'Mencabar (Hard)', en: 'Hard' },
    difficulty: 'hard',
    targetCorrect: 5,
    baseSpeed: 20.4,
    color: 'from-amber-500 to-orange-600',
    badge: '👑',
    topics: {
      ms: 'Menentukan nisbah 3 kuantiti apabila 2 nisbah diberi (GSTK/LCM) & KBAT pelbagai langkah.',
      en: 'Determining a:b:c given 2 ratios via LCM & multi-step higher-order thinking (KBAT).',
    },
    description: {
      ms: 'Kelajuan pantas mencabar, halangan dinamik, menguji penguasaan mutlak konsep nisbah.',
      en: 'Brisk challenging flight speed, dynamic obstacles, testing absolute ratio mastery.',
    },
  },
};

export interface RatioQuestion {
  id: string;
  difficulty: Difficulty;
  dskpCode: DskpCode;
  question: {
    ms: string;
    en: string;
  };
  context?: {
    ms?: string;
    en?: string;
  };
  options: [string, string, string]; // [Left gate, Center gate, Right gate]
  correctIndex: 0 | 1 | 2; // Which gate index is correct (0=Left, 1=Center, 2=Right)
  explanation: {
    ms: string;
    en: string;
  };
}

export interface PlayerAnswerRecord {
  question: RatioQuestion;
  stage: StageId;
  chosenIndex: number; // 0=Left, 1=Center, 2=Right, -1=Missed
  isCorrect: boolean;
  timeSpentSec: number;
  pointsDelta: number;
  isMissed?: boolean;
}

export interface GameStats {
  score: number;
  distance: number;
  coins: number;
  crystals: number;
  lives: number;
  maxLives: number;
  streak: number;
  maxStreak: number;
  currentStage: StageId;
  stageCorrectCount: number;
  totalCorrectCount: number;
  collisionsCount: number;
  boostAvailable: boolean;
  boostActive: boolean;
  boostMeter: number;
}

export interface AchievementBadge {
  id: string;
  title: { ms: string; en: string };
  desc: { ms: string; en: string };
  icon: string;
  unlocked: boolean;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  accuracy: number;
  correctAnswers: number;
  totalQuestions: number;
  distance: number;
  stagesCompleted: number; // 0, 1, 2, or 3
  completedAllStages: boolean; // True only if finished all 3 stages (15 correct)
  finalStage: StageId;
  isVictory: boolean;
  timestamp: number;
}
