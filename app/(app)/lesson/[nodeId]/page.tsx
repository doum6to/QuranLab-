import LessonEngine from '@/components/LessonEngine';
import { getLessonByNodeId } from '@/data/lessons/demo';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ nodeId: string }>;
}) {
  const { nodeId } = await params;
  const lesson = getLessonByNodeId(nodeId);

  return (
    <LessonEngine
      cards={lesson.cards}
      lessonTitle={lesson.title}
      nodeId={nodeId}
    />
  );
}
