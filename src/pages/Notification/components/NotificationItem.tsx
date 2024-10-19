import { Text } from 'concept-be-design-system';

interface Props {
  title: string;
  createAt: string;
  badges: string[];
}

export const NotificationItem = ({ title, createAt, badges }: Props) => {
  return (
    <div>
      <div>
        <Text font="suit14sb" color="c1">
          나에게 꼭 맞는 알림
        </Text>
        <Text font="suit14r">{createAt}</Text>
      </div>
    </div>
  );
};
