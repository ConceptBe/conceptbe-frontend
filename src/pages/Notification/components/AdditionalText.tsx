import { Text, theme } from 'concept-be-design-system';

interface Props {
  isEmpty: boolean;
}

export const AdditionalText = ({ isEmpty }: Props) => {
  const content = isEmpty ? '아직 받은 알림이 없어요!' : '모든 알림을 확인했어요!';

  return (
    <div
      css={{
        width: '100%',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color.bg1,
      }}
    >
      <Text font="suit16r" color="b6">
        {content}
      </Text>
    </div>
  );
};
