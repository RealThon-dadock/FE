// 작성중인 책 데이터 (임시로 하드코딩, 실제로는 API에서 가져올 수 있음)
export const getWritingBooks = () => {
  return [
    { id: 1, title: '심리적 불안', date: '08.21', isLocked: true },
    { id: 2, title: '일상의 기록', date: '08.20', isLocked: false },
    { id: 3, title: '새로운 시작', date: '08.19', isLocked: true },
    { id: 4, title: '여행 이야기', date: '08.18', isLocked: false },
    { id: 5, title: '개발 노트', date: '08.17', isLocked: true },
  ];
};

// 완결된 책 데이터 가져오기
export const getCompletedBooks = () => {
  return JSON.parse(localStorage.getItem('completedBooks') || '[]');
};

// 새 완결된 책 추가
export const addCompletedBook = (book) => {
  const existingBooks = getCompletedBooks();
  existingBooks.unshift(book);
  localStorage.setItem('completedBooks', JSON.stringify(existingBooks));
  
  // 커스텀 이벤트 발생 (다른 컴포넌트에서 감지할 수 있도록)
  window.dispatchEvent(new CustomEvent('booksUpdated'));
};

// 책 수 가져오기
export const getBookCounts = () => {
  const writingBooks = getWritingBooks();
  const completedBooks = getCompletedBooks();
  
  return {
    writingCount: writingBooks.length,
    completedCount: completedBooks.length
  };
};

// 이벤트 리스너 등록
export const onBooksUpdate = (callback) => {
  const handleUpdate = () => {
    callback(getBookCounts());
  };
  
  window.addEventListener('booksUpdated', handleUpdate);
  window.addEventListener('storage', handleUpdate);
  window.addEventListener('focus', handleUpdate);
  
  return () => {
    window.removeEventListener('booksUpdated', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
    window.removeEventListener('focus', handleUpdate);
  };
};
