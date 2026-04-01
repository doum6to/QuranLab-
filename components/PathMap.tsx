'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CourseDefinition, NodeDefinition } from '@/data/courses';

interface PathMapProps {
  courses: CourseDefinition[];
  onNodePress: (nodeId: string) => void;
  onLockedPremiumPress: () => void;
}

type NodeState = 'completed' | 'active' | 'locked' | 'premium_locked';

function getNodeState(
  node: NodeDefinition,
  isFirstNodeInCourse: boolean
): NodeState {
  // MVP logic: first node of each course is "active", rest are locked
  // Non-free nodes show premium_locked
  if (isFirstNodeInCourse) {
    return 'active';
  }
  if (!node.isFreePreview) {
    return 'premium_locked';
  }
  return 'locked';
}

function NodeButton({
  node,
  state,
  index,
  courseColor,
  onNodePress,
  onLockedPremiumPress,
}: {
  node: NodeDefinition;
  state: NodeState;
  index: number;
  courseColor: string;
  onNodePress: (nodeId: string) => void;
  onLockedPremiumPress: () => void;
}) {
  // Zigzag offset: odd nodes offset left, even nodes offset right
  const offsetX = index % 2 === 0 ? 'translate-x-6' : '-translate-x-6';

  const handleClick = () => {
    if (state === 'active' || state === 'completed') {
      onNodePress(node.id);
    } else if (state === 'premium_locked') {
      onLockedPremiumPress();
    }
    // locked nodes: do nothing
  };

  const nodeSize = state === 'active' ? 'h-16 w-16' : 'h-14 w-14';

  const stateStyles: Record<NodeState, string> = {
    completed:
      'border-correct bg-correct-bg text-white cursor-pointer',
    active:
      'border-primary ring-2 ring-primary/30 bg-surface-card text-foreground cursor-pointer',
    locked:
      'border-disabled bg-disabled text-disabled-text cursor-not-allowed',
    premium_locked:
      'border-disabled bg-disabled text-disabled-text cursor-pointer',
  };

  return (
    <div className={`flex flex-col items-center ${offsetX} transition-transform`}>
      <motion.button
        onClick={handleClick}
        whileTap={
          state === 'active' || state === 'completed' || state === 'premium_locked'
            ? { scale: 0.93 }
            : undefined
        }
        className={`relative ${nodeSize} rounded-full border-[3px] flex items-center justify-center text-sm font-semibold ${stateStyles[state]} ${
          state === 'active' ? 'animate-pulse' : ''
        }`}
        style={
          state === 'active' || state === 'completed'
            ? { borderColor: courseColor }
            : state === 'premium_locked'
            ? { borderColor: '#2A2A3E' }
            : undefined
        }
        aria-label={node.title}
      >
        {/* Icon content */}
        {state === 'completed' && (
          <svg
            className="h-6 w-6 text-correct"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        {state === 'active' && (
          <span className="text-lg" style={{ color: courseColor }}>
            ▶
          </span>
        )}
        {state === 'locked' && (
          <span className="text-base">🔒</span>
        )}
        {state === 'premium_locked' && (
          <span className="text-base">🔒</span>
        )}

        {/* Gold badge for premium locked */}
        {state === 'premium_locked' && (
          <span
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
            style={{ backgroundColor: '#D4AF37' }}
          >
            👑
          </span>
        )}
      </motion.button>
      <span
        className={`mt-1.5 text-xs text-center max-w-[100px] leading-tight ${
          state === 'locked' || state === 'premium_locked'
            ? 'text-disabled-text'
            : 'text-text-secondary'
        }`}
      >
        {node.title}
      </span>
    </div>
  );
}

export default function PathMap({
  courses,
  onNodePress,
  onLockedPremiumPress,
}: PathMapProps) {
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(() => {
    // Start with all courses expanded
    return new Set(courses.map((c) => c.id));
  });

  const toggleCourse = (courseId: string) => {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  // Track global node index for zigzag
  let globalNodeIndex = 0;

  return (
    <div className="flex flex-col gap-6 pb-8">
      {courses.map((course) => {
        const isExpanded = expandedCourses.has(course.id);

        return (
          <div key={course.id}>
            {/* Course header card */}
            <motion.button
              onClick={() => toggleCourse(course.id)}
              className="w-full rounded-xl bg-surface-card p-4 text-left border-l-4 active:bg-surface-warm transition-colors"
              style={{ borderLeftColor: course.color }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{course.icon}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-foreground">
                    {course.title}
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                    {course.description}
                  </p>
                </div>
                <span className="text-text-muted text-sm">
                  {isExpanded ? '▲' : '▼'}
                </span>
              </div>
            </motion.button>

            {/* Sections and nodes */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-4 mt-4">
                    {course.sections.map((section) => {
                      return (
                        <div key={section.id}>
                          {/* Section separator */}
                          <div className="flex justify-center mb-4">
                            <div
                              className="rounded-lg border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                              style={{
                                borderColor: `${course.color}40`,
                                backgroundColor: `${course.color}10`,
                              }}
                            >
                              Section {section.order + 1} — {section.title}
                            </div>
                          </div>

                          {/* Nodes */}
                          <div className="flex flex-col items-center gap-1">
                            {section.nodes.map((node) => {
                              const isFirstNodeInCourse =
                                section.order === 0 && node.orderIndex === 0;
                              const state = getNodeState(
                                node,
                                isFirstNodeInCourse
                              );
                              const currentIndex = globalNodeIndex++;

                              return (
                                <div key={node.id} className="flex flex-col items-center">
                                  {/* Connecting line (except for the first node) */}
                                  {currentIndex > 0 && (
                                    <div className="h-6 w-0.5 bg-border" />
                                  )}
                                  <NodeButton
                                    node={node}
                                    state={state}
                                    index={currentIndex}
                                    courseColor={course.color}
                                    onNodePress={onNodePress}
                                    onLockedPremiumPress={onLockedPremiumPress}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
