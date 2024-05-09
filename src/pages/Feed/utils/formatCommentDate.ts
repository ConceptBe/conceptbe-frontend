export function formatCommentDate(date: string) {
  const now = new Date();
  const commentDate = new Date(date);
  const diffTime = Math.abs(now.getTime() - commentDate.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

  if (diffMinutes < 1) {
    return '방금 전';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const year = commentDate.getFullYear();
  const month = commentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
  const day = commentDate.getDate();
  const hours = commentDate.getHours();
  const minutes = commentDate.getMinutes();

  // 숫자가 한 자리일 때 앞에 0을 붙여주는 함수
  const padZero = (num: number) => num.toString().padStart(2, '0');

  return `${year}.${padZero(month)}.${padZero(day)} ${padZero(hours)}:${padZero(minutes)}`;
}
