/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GameWorld } from './game/GameWorld';
import { soundManager } from './audio/soundManager';
import { HUD } from './components/HUD';
import { MainMenu } from './components/MainMenu';
import { PauseModal } from './components/PauseModal';
import { GameOverModal } from './components/GameOverModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { ObjectivesModal } from './components/ObjectivesModal';
import { SettingsModal } from './components/SettingsModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { StageTransitionModal } from './components/StageTransitionModal';
import {
  GameState,
  StageId,
  Language,
  RatioQuestion,
  PlayerAnswerRecord,
  LeaderboardEntry,
} from './types/game';

const INITIAL_SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'sample-1',
    name: 'Amirul (1 Arif)',
    score: 2350,
    accuracy: 100,
    correctAnswers: 15,
    totalQuestions: 15,
    distance: 1240,
    stagesCompleted: 3,
    completedAllStages: true,
    finalStage: 3,
    isVictory: true,
    timestamp: Date.now() - 3600000 * 2,
  },
  {
    id: 'sample-2',
    name: 'Siti Nurhaliza',
    score: 1980,
    accuracy: 94,
    correctAnswers: 15,
    totalQuestions: 16,
    distance: 1190,
    stagesCompleted: 3,
    completedAllStages: true,
    finalStage: 3,
    isVictory: true,
    timestamp: Date.now() - 3600000 * 4,
  },
  {
    id: 'sample-3',
    name: 'Chong Wei',
    score: 1420,
    accuracy: 90,
    correctAnswers: 10,
    totalQuestions: 11,
    distance: 820,
    stagesCompleted: 2,
    completedAllStages: false,
    finalStage: 2,
    isVictory: false,
    timestamp: Date.now() - 3600000 * 6,
  },
  {
    id: 'sample-4',
    name: 'Danial Haziq',
    score: 720,
    accuracy: 71,
    correctAnswers: 5,
    totalQuestions: 7,
    distance: 490,
    stagesCompleted: 1,
    completedAllStages: false,
    finalStage: 1,
    isVictory: false,
    timestamp: Date.now() - 3600000 * 8,
  },
];

export default function App() {
  // DOM References
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const gameWorldRef = useRef<GameWorld | null>(null);

  // Player & Core Game State
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('sky_quiz_player_name') || 'Juruterbang Tingkatan 1';
  });
  const [gameState, setGameState] = useState<GameState>('menu');
  const [language, setLanguage] = useState<Language>('ms');

  // Single Continuous 3-Stage Progression State
  const [currentStage, setCurrentStage] = useState<StageId>(1);
  const [stageCorrectCount, setStageCorrectCount] = useState<number>(0);
  const [stageTargetCorrect, setStageTargetCorrect] = useState<number>(5);
  const [totalCorrectCount, setTotalCorrectCount] = useState<number>(0);
  const [stagesCompleted, setStagesCompleted] = useState<number>(0);

  // Stage Transition Modal State
  const [stageTransition, setStageTransition] = useState<{
    completedStage: StageId;
    nextStage: StageId;
    bonusScore: number;
  } | null>(null);

  // HUD & Flight Stats
  const [score, setScore] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [maxLives] = useState<number>(3);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [boostMeter, setBoostMeter] = useState<number>(0);
  const [isBoosting, setIsBoosting] = useState<boolean>(false);
  const [collisionsCount, setCollisionsCount] = useState<number>(0);

  // Quiz feedback & Warnings
  const [currentQuestion, setCurrentQuestion] = useState<RatioQuestion | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{
    visible: boolean;
    isCorrect: boolean;
    explanation: string;
    pointsDelta: number;
    streakBonusAwarded: number;
    fastBonusAwarded: boolean;
    correctAnswerText: string;
  } | null>(null);

  const [lifeLostWarning, setLifeLostWarning] = useState<{
    visible: boolean;
    remainingLives: number;
  } | null>(null);

  const [levelUpNotification, setLevelUpNotification] = useState<number | null>(null);
  const [answerRecords, setAnswerRecords] = useState<PlayerAnswerRecord[]>([]);

  // Classroom Leaderboard state
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>(() => {
    const saved = localStorage.getItem('sky_quiz_classroom_leaderboard');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SAMPLE_LEADERBOARD;
      }
    }
    return INITIAL_SAMPLE_LEADERBOARD;
  });

  // Sound state
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(true);

  // Modals
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showObjectives, setShowObjectives] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  // Swipe gesture touch tracking
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  // Persist player name
  const handlePlayerNameChange = (name: string) => {
    setPlayerName(name);
    localStorage.setItem('sky_quiz_player_name', name);
  };

  // Helper to record a completed run to the classroom leaderboard
  const saveFlightToLeaderboard = useCallback(
    (
      finalScore: number,
      finalDistance: number,
      isWin: boolean,
      records: PlayerAnswerRecord[],
      finalStg: StageId,
      stgCompleted: number
    ) => {
      const totalQ = records.length;
      const correctQ = records.filter((r) => r.isCorrect).length;
      const finalAccuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;
      const completedAll = isWin || (stgCompleted >= 3 && correctQ >= 15);

      const newEntry: LeaderboardEntry = {
        id: 'entry-' + Date.now(),
        name: playerName.trim() || (language === 'ms' ? 'Juruterbang Tingkatan 1' : 'Form 1 Pilot'),
        score: finalScore,
        accuracy: finalAccuracy,
        correctAnswers: correctQ,
        totalQuestions: totalQ,
        distance: finalDistance,
        stagesCompleted: completedAll ? 3 : stgCompleted,
        completedAllStages: completedAll,
        finalStage: finalStg,
        isVictory: completedAll,
        timestamp: Date.now(),
      };

      setLeaderboardEntries((prev) => {
        const updated = [newEntry, ...prev];
        localStorage.setItem('sky_quiz_classroom_leaderboard', JSON.stringify(updated));
        return updated;
      });
    },
    [playerName, language]
  );

  // Clear leaderboard records
  const handleClearLeaderboard = () => {
    setLeaderboardEntries([]);
    localStorage.removeItem('sky_quiz_classroom_leaderboard');
  };

  // 1. Initialize 3D Engine
  useEffect(() => {
    if (!canvasMountRef.current) return;

    const game = new GameWorld(canvasMountRef.current, {
      onScoreUpdate: (newScore) => setScore(newScore),
      onCoinsUpdate: (newCoins) => setCoins(newCoins),
      onLivesUpdate: (newLives, lostLifeWarning) => {
        setLives(newLives);
        if (lostLifeWarning) {
          setLifeLostWarning({ visible: true, remainingLives: newLives });
          setTimeout(() => {
            setLifeLostWarning(null);
          }, 2600);
        }
      },
      onStreakUpdate: (newStreak) => {
        setStreak(newStreak);
        setMaxStreak((prev) => Math.max(prev, newStreak));
      },
      onDistanceUpdate: (dist) => setDistance(dist),
      onBoostMeterUpdate: (meter) => {
        setBoostMeter(meter);
        setIsBoosting(meter >= 100);
      },
      onQuestionTrigger: (question) => {
        setCurrentQuestion(question);
      },
      onQuizAnswered: (
        question,
        stage,
        chosenIndex,
        isCorrect,
        pointsDelta,
        streakBonusAwarded,
        fastBonusAwarded
      ) => {
        setAnswerRecords((prev) => [
          ...prev,
          {
            question,
            stage,
            chosenIndex,
            isCorrect,
            timeSpentSec: 0,
            pointsDelta,
            isMissed: chosenIndex < 0,
          },
        ]);

        const correctAnswerText = question.options[question.correctIndex];

        setQuizFeedback({
          visible: true,
          isCorrect,
          explanation: language === 'ms' ? question.explanation.ms : question.explanation.en,
          pointsDelta,
          streakBonusAwarded,
          fastBonusAwarded,
          correctAnswerText,
        });

        setTimeout(() => {
          setQuizFeedback((prev) => (prev ? { ...prev, visible: false } : null));
        }, 3400);
      },
      onStageProgressUpdate: (stage, stageCorrect, stageTarget, totalCorrect) => {
        setCurrentStage(stage);
        setStageCorrectCount(stageCorrect);
        setStageTargetCorrect(stageTarget);
        setTotalCorrectCount(totalCorrect);
      },
      onStageComplete: (completedStage, nextStage, bonusScore) => {
        setStagesCompleted((prev) => Math.max(prev, completedStage));
        setStageTransition({
          completedStage,
          nextStage,
          bonusScore,
        });
      },
      onCollisionsUpdate: (collisions) => {
        setCollisionsCount(collisions);
      },
      onGameOver: () => {
        setGameState('gameover');
      },
      onVictory: (_bonusScore) => {
        setStagesCompleted(3);
        setGameState('victory');
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.5 },
        });
      },
      onLevelUp: (newLevel) => {
        setCurrentLevel(newLevel);
        setLevelUpNotification(newLevel);
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          setLevelUpNotification(null);
        }, 2200);
      },
    });

    gameWorldRef.current = game;

    return () => {
      game.destroy();
      gameWorldRef.current = null;
    };
  }, [language]);

  // Save to leaderboard whenever a game finishes (gameover or victory)
  useEffect(() => {
    if (gameState === 'victory') {
      saveFlightToLeaderboard(score, distance, true, answerRecords, currentStage, 3);
    } else if (gameState === 'gameover') {
      saveFlightToLeaderboard(score, distance, false, answerRecords, currentStage, stagesCompleted);
    }
  }, [gameState]);

  // Handle Game Controls
  const handleMoveLeft = useCallback(() => {
    gameWorldRef.current?.moveLeft();
  }, []);

  const handleMoveRight = useCallback(() => {
    gameWorldRef.current?.moveRight();
  }, []);

  const handleMoveUp = useCallback(() => {
    gameWorldRef.current?.moveUp();
  }, []);

  const handleMoveDown = useCallback(() => {
    gameWorldRef.current?.moveDown();
  }, []);

  const handleTriggerBoost = useCallback(() => {
    gameWorldRef.current?.triggerBoost();
  }, []);

  const handleTogglePause = useCallback(() => {
    if (gameState === 'playing') {
      gameWorldRef.current?.pause();
      setGameState('paused');
    } else if (gameState === 'paused') {
      gameWorldRef.current?.resume();
      setGameState('playing');
    }
  }, [gameState]);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      soundManager.userInteractionTrigger();

      if (e.code === 'Escape') {
        handleTogglePause();
        return;
      }

      if (gameState !== 'playing') return;

      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          e.preventDefault();
          handleMoveLeft();
          break;
        case 'ArrowRight':
        case 'KeyD':
          e.preventDefault();
          handleMoveRight();
          break;
        case 'ArrowUp':
        case 'KeyW':
          e.preventDefault();
          handleMoveUp();
          break;
        case 'ArrowDown':
        case 'KeyS':
          e.preventDefault();
          handleMoveDown();
          break;
        case 'Space':
          e.preventDefault();
          handleTriggerBoost();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleMoveLeft, handleMoveRight, handleMoveUp, handleMoveDown, handleTriggerBoost, handleTogglePause]);

  // Touch & Swipe Event Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    soundManager.userInteractionTrigger();
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current || gameState !== 'playing') return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartPos.current.x;
    const deltaY = touch.clientY - touchStartPos.current.y;
    const threshold = 35;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        handleMoveLeft();
      } else {
        handleMoveRight();
      }
    } else if (Math.abs(deltaY) > threshold) {
      if (deltaY < 0) {
        handleMoveUp();
      } else {
        handleMoveDown();
      }
    }
    touchStartPos.current = null;
  };

  // Start Game
  const handleStartGame = () => {
    soundManager.userInteractionTrigger();
    setAnswerRecords([]);
    setQuizFeedback(null);
    setLifeLostWarning(null);
    setCurrentQuestion(null);
    setStageTransition(null);
    setMaxStreak(0);
    setCollisionsCount(0);
    setCurrentStage(1);
    setStageCorrectCount(0);
    setTotalCorrectCount(0);
    setStagesCompleted(0);
    gameWorldRef.current?.reset();
    gameWorldRef.current?.start();
    setGameState('playing');
  };

  // Resume Game
  const handleResumeGame = () => {
    gameWorldRef.current?.resume();
    setGameState('playing');
  };

  // Restart Game
  const handleRestartGame = () => {
    soundManager.userInteractionTrigger();
    setAnswerRecords([]);
    setQuizFeedback(null);
    setLifeLostWarning(null);
    setCurrentQuestion(null);
    setStageTransition(null);
    setMaxStreak(0);
    setCollisionsCount(0);
    setCurrentStage(1);
    setStageCorrectCount(0);
    setTotalCorrectCount(0);
    setStagesCompleted(0);
    gameWorldRef.current?.reset();
    gameWorldRef.current?.start();
    setGameState('playing');
  };

  // Return to Main Menu
  const handleMainMenu = () => {
    gameWorldRef.current?.reset();
    soundManager.stopEngine();
    setStageTransition(null);
    setGameState('menu');
  };

  // Sound Mute Toggle
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMute(next);
  };

  const handleToggleMusic = () => {
    const next = !isMusicEnabled;
    setIsMusicEnabled(next);
    soundManager.setMusicEnabled(next);
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => soundManager.userInteractionTrigger()}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={canvasMountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* In-Game HUD Overlay */}
      {gameState === 'playing' && (
        <HUD
          score={score}
          distance={distance}
          coins={coins}
          lives={lives}
          maxLives={maxLives}
          streak={streak}
          currentLevel={currentLevel}
          boostMeter={boostMeter}
          isBoosting={isBoosting}
          currentStage={currentStage}
          stageCorrectCount={stageCorrectCount}
          stageTargetCorrect={stageTargetCorrect}
          totalCorrectCount={totalCorrectCount}
          currentQuestion={currentQuestion}
          lifeLostWarning={lifeLostWarning}
          quizFeedback={quizFeedback}
          levelUpNotification={levelUpNotification}
          language={language}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onPause={handleTogglePause}
          onMoveLeft={handleMoveLeft}
          onMoveRight={handleMoveRight}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onTriggerBoost={handleTriggerBoost}
        />
      )}

      {/* Stage Transition Modal (3-second seamless countdown) */}
      {stageTransition && (
        <StageTransitionModal
          completedStage={stageTransition.completedStage}
          nextStage={stageTransition.nextStage}
          bonusScore={stageTransition.bonusScore}
          totalScore={score}
          totalCorrect={totalCorrectCount}
          language={language}
          onResume={() => setStageTransition(null)}
        />
      )}

      {/* Main Menu Screen */}
      {gameState === 'menu' && (
        <MainMenu
          onStartGame={handleStartGame}
          onOpenHowToPlay={() => setShowHowToPlay(true)}
          onOpenObjectives={() => setShowObjectives(true)}
          onOpenSettings={() => setShowSettings(true)}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          language={language}
          onChangeLanguage={setLanguage}
          playerName={playerName}
          onChangePlayerName={handlePlayerNameChange}
        />
      )}

      {/* Pause Modal */}
      {gameState === 'paused' && (
        <PauseModal
          onResume={handleResumeGame}
          onRestart={handleRestartGame}
          onMainMenu={handleMainMenu}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isMusicEnabled={isMusicEnabled}
          onToggleMusic={handleToggleMusic}
          language={language}
        />
      )}

      {/* Game Over / Victory Modal */}
      {(gameState === 'gameover' || gameState === 'victory') && (
        <GameOverModal
          isVictory={gameState === 'victory'}
          score={score}
          distance={distance}
          coins={coins}
          maxStreak={maxStreak}
          highestLevel={currentLevel}
          collisionsCount={collisionsCount}
          finalStage={currentStage}
          stagesCompleted={stagesCompleted}
          totalCorrect={totalCorrectCount}
          answerRecords={answerRecords}
          language={language}
          playerName={playerName}
          onPlayAgain={handleRestartGame}
          onMainMenu={handleMainMenu}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
        />
      )}

      {/* Classroom Leaderboard Modal */}
      {showLeaderboard && (
        <LeaderboardModal
          entries={leaderboardEntries}
          language={language}
          onClose={() => setShowLeaderboard(false)}
          onClearLeaderboard={handleClearLeaderboard}
        />
      )}

      {/* How To Play Modal */}
      {showHowToPlay && (
        <HowToPlayModal
          language={language}
          onClose={() => setShowHowToPlay(false)}
        />
      )}

      {/* Objectives / Curriculum Modal */}
      {showObjectives && (
        <ObjectivesModal
          language={language}
          onClose={() => setShowObjectives(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          language={language}
          onChangeLanguage={setLanguage}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
