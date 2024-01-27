import styled from '@emotion/styled';
import { CheckboxContainer, useCheckbox } from 'concept-be-design-system';

type Props = {
  branches: {
    name: string;
    id: number;
  }[];
  onBranchCheckBoxChange: (newCheckedBranchIds: number[]) => void;
};

/**
 * 분야 선택
 */
const BranchSection = ({ branches, onBranchCheckBoxChange }: Props) => {
  const branchOptions = branches.map((properties) => ({ checked: false, ...properties }));
  const { checkboxValue, onChangeCheckbox } = useCheckbox({
    branches: branchOptions,
  });

  const handleCheckBoxChange: typeof onChangeCheckbox = (e, ...rest) => {
    const checkedBranchId = checkboxValue.branches.find((branch) => branch.name === e.target.value)?.id;

    if (!checkedBranchId) {
      console.error('선택한 분야(branchId)가 존재하지 않습니다');
      return;
    }

    const prevCheckBranchedIds = checkboxValue.branches.filter((branch) => branch.checked).map((branch) => branch.id);

    const newCheckedBranchIds = prevCheckBranchedIds.includes(checkedBranchId)
      ? prevCheckBranchedIds.filter((id) => id !== checkedBranchId)
      : [checkedBranchId, ...prevCheckBranchedIds];

    onChangeCheckbox(e, ...rest);
    onBranchCheckBoxChange(newCheckedBranchIds);
  };

  return (
    <BottomBox>
      <CheckboxContainer
        label="분야"
        checkboxKey="branches"
        options={checkboxValue.branches}
        onChange={handleCheckBoxChange}
      />
    </BottomBox>
  );
};

export default BranchSection;

const BottomBox = styled.div``;
