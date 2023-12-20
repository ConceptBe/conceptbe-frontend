export default function TestPage() {
  return (
    <div>
      Test.page
      {Array(100)
        .fill(100)
        .map((arr) => {
          return <div>{arr}</div>;
        })}
    </div>
  );
}
