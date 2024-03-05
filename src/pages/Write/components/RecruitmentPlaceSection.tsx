import { Dropdown, Spacer, Text } from 'concept-be-design-system';

type Props = {
  places: { id: number; name: string }[];
  selectedPlace: string;
  onPlaceChange: (selectedPlace: string) => void;
};

const RecruitmentPlaceSection = ({ places, selectedPlace, onPlaceChange }: Props) => {
  return (
    <>
      <Text font="suit15m" color="b9">
        모집 지역
      </Text>
      <Spacer size={20} />
      <Dropdown selectedValue={selectedPlace} initialValue="시/도/광역시">
        {places.map(({ id, name }) => (
          <Dropdown.Item
            key={id}
            value={name}
            onClick={(value) => {
              onPlaceChange(value);
            }}
          >
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </>
  );
};

export default RecruitmentPlaceSection;
