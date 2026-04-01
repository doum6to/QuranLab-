import { notFound } from 'next/navigation';
import LessonEngine from '@/components/LessonEngine';
import { getLessonByNodeId } from '@/data/lessons';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ nodeId: string }>;
}) {
  const { nodeId } = await params;
  const lesson = getLessonByNodeId(nodeId);

  if (!lesson) {
    notFound();
  }

  return (
    <LessonEngine
      cards={lesson.cards}
      lessonTitle={lesson.title}
      nodeId={nodeId}
    />
  );
}
