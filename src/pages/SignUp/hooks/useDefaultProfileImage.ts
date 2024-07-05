import { useState } from 'react';
import useConfirm from '../../../hooks/useConfirm';

interface Props {
  currentProfileImage: string | null;
  defaultProfileImage: string;
}

const useDefaultProfileImage = ({ currentProfileImage, defaultProfileImage }: Props) => {
  const openConfirm = useConfirm();
  const [profileImageUrl, setProfileImageUrl] = useState<string>(currentProfileImage || defaultProfileImage);
  const profileImageUrlRequest = profileImageUrl === defaultProfileImage ? null : currentProfileImage;

  const onClickSetDefaultProfileImage = async () => {
    const isDeleteProfileImage = await openConfirm({
      content: '기본 프로필 이미지로 변경하시겠습니까?',
    });

    if (isDeleteProfileImage) setProfileImageUrl(defaultProfileImage);
  };

  return { profileImageUrl, profileImageUrlRequest, onClickSetDefaultProfileImage };
};

export default useDefaultProfileImage;
