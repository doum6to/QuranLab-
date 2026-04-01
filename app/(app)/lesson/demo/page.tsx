import LessonEngine from '@/components/LessonEngine';
import { getLessonByNodeId } from '@/data/lessons';

export default function DemoPage() {
  // Demo uses the first free lesson (Pronoms Demonstratifs)
  const lesson = getLessonByNodeId('node-p1-pronoms-1');

  if (!lesson) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <p className="text-text-muted">Aucune lecon disponible.</p>
      </div>
    );
  }

  return (
    <LessonEngine
      cards={lesson.cards}
      lessonTitle={lesson.title}
      nodeId="demo"
    />
  );
}
