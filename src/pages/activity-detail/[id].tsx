import { GetServerSideProps } from 'next';
import ActivityDetail from '.';

interface Props {
  id: number;
}

export default function ActivityDetails({ id }: Props) {
  return <ActivityDetail id={id} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query;
  const activityId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  if (activityId === undefined) {
    return { notFound: true };
  }

  return {
    props: {
      id: activityId,
    },
  };
};
