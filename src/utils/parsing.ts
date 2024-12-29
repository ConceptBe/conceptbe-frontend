import { Info, WrappedBranchInfo } from '../pages/Write/types';

type IsAllBranchesSelected = {
  branches: WrappedBranchInfo[];
  categoryName: string;
  selectedBranchResponses: Info[];
};

type SetSelectedBranchResponses = {
  branches: WrappedBranchInfo[];
  selectedBranch1Depth: string;
  selectedBranchResponses: Info[];
  setSelectedBranchResponses: React.Dispatch<React.SetStateAction<Info[]>>;
  selected: Info;
};

export const identifyAbbreviationBadge = (badges: string[], limitWordLength?: number) => {
  const limitTotalWordLength = limitWordLength || 25;
  const limitOriginWordLength = limitTotalWordLength - 5;

  const totalWordLength = badges.reduce((acc, cur) => acc + cur.length, 0);

  if (totalWordLength < limitTotalWordLength) return badges;

  const firstLength = !!badges[0] ? badges[0].length : 0;
  const secondLength = !!badges[1] ? badges[1].length : 0;
  const thirdLength = !!badges[2] ? badges[2].length : 0;
  const fourthLength = !!badges[3] ? badges[3].length : 0;
  const fifthLength = !!badges[4] ? badges[4].length : 0;

  if (firstLength > limitOriginWordLength) return [badges[0], `+ ${badges.length - 1}`];
  if (firstLength + secondLength > limitOriginWordLength) return [badges[0], badges[1], `+ ${badges.length - 2}`];
  if (firstLength + secondLength + thirdLength > limitOriginWordLength) {
    return [badges[0], badges[1], badges[2], `+ ${badges.length - 3}`];
  }
  if (
    firstLength + secondLength + thirdLength + fourthLength > limitOriginWordLength ||
    firstLength + secondLength + thirdLength + fourthLength + fifthLength > limitOriginWordLength
  ) {
    return [badges[0], badges[1], badges[2], badges[3], `+ ${badges.length - 4}`];
  }

  return [badges[0], badges[1], badges[2], badges[3], badges[4], `+ ${badges.length - 5}`];
};

export const getBranchBottomSheetRightItems = (branches: WrappedBranchInfo[], selectedBranch1Depth: string) => {
  const items = branches.find((item) => item.name === selectedBranch1Depth)?.branchResponses || [];

  // 전체 선택 옵션 추가
  const allSelectOption = {
    id: -(branches.find((item) => item.name === selectedBranch1Depth)?.id ?? 1),
    name: '전체 선택',
  };

  return [allSelectOption, ...items];
};

export const isAllBranchesSelected = ({ branches, categoryName, selectedBranchResponses }: IsAllBranchesSelected) => {
  const currentBranch = branches.find((item) => item.name === categoryName);
  if (!currentBranch) return false;

  return currentBranch.branchResponses.every((branch) =>
    selectedBranchResponses.some((selected) => selected.id === branch.id),
  );
};

export const getIsSelectedAllOption = ({
  branches,
  selectedBranch1Depth,
  selectedBranchResponses,
  setSelectedBranchResponses,
  selected,
}: SetSelectedBranchResponses) => {
  if (selected.id < 0) {
    const currentBranch = branches.find((item) => item.name === selectedBranch1Depth);
    if (!currentBranch) return false;

    const allBranchResponses = currentBranch.branchResponses;

    // 현재 카테고리의 모든 항목이 선택되어 있는지 확인
    const isAllSelected = allBranchResponses.every((branch) =>
      selectedBranchResponses.some((selected) => selected.id === branch.id),
    );

    if (isAllSelected) {
      // 모두 선택되어 있다면 해제
      setSelectedBranchResponses((prev) =>
        prev.filter((item) => !allBranchResponses.some((branch) => branch.id === item.id)),
      );
    } else {
      // 모두 선택되어 있지 않다면 선택
      const newSelectedResponses = [...selectedBranchResponses];
      allBranchResponses.forEach((branch) => {
        if (!newSelectedResponses.some((selected) => selected.id === branch.id)) {
          newSelectedResponses.push(branch);
        }
      });
      setSelectedBranchResponses(newSelectedResponses);
    }
    return true;
  }
};
