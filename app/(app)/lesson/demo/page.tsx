import LessonEngine from '@/components/LessonEngine';
import { demoCards } from '@/data/lessons/demo';

export default function DemoPage() {
  return (
    <LessonEngine
      cards={demoCards}
      lessonTitle="Demo — Pronoms Demonstratifs"
      nodeId="demo"
    />
  );
}
