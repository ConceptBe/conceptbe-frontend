import { Badge, SVGGoldBell, Text } from 'concept-be-design-system';
import { NotificationDTO } from '../types';

type Props = Omit<NotificationDTO, 'id' | 'feedId' | 'read'> & {
  putNotificationRead: () => void;
};

export const NotificationItem = ({ title, createAt, badges, isAlreadyRead, putNotificationRead }: Props) => {
  const opacity = isAlreadyRead ? 0.5 : 1;

  return (
    <div
      css={{ padding: 24, borderBottom: '1px solid #E5E5E5', cursor: 'pointer', opacity }}
      onClick={putNotificationRead}
    >
      <div css={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: 12 }}>
        <SVGGoldBell css={{ width: '20px', height: '20px' }} />
        <Text font="suit14sb" color="c1">
          나에게 꼭 맞는 알림
        </Text>
        <div css={{ width: '3px', height: '3px', backgroundColor: '#DDDDDD', borderRadius: 100 }} />
        <Text font="suit14r" color="b6" css={{ wordBreak: 'keep-all' }}>
          {createAt}
        </Text>
      </div>
      <div css={{ marginBottom: 8 }}>
        <Text font="suit16sb" color="b2" css={{ lineHeight: '24px' }}>
          {title}
        </Text>
      </div>
      <div css={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
        {badges.map((badge, idx) => (
          <div key={`${badge}-${idx}`}>
            <Badge font="suit14sb" color="c1" radius={50}>
              {badge}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
