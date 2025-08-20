// 작성중인 책 데이터 (로컬 스토리지에서 가져오기)
export const getWritingBooks = () => {
  return JSON.parse(localStorage.getItem('writingBooks') || '[]');
};

// 작성중인 책 추가
export const addWritingBook = (book) => {
  const existingBooks = getWritingBooks();
  const newBook = {
    ...book,
    id: book.id || Date.now(),
    isWriting: true,
    isCompleted: false
  };
  existingBooks.unshift(newBook);
  localStorage.setItem('writingBooks', JSON.stringify(existingBooks));
  
  // 커스텀 이벤트 발생
  window.dispatchEvent(new CustomEvent('booksUpdated'));
};

// 작성중인 책 업데이트
export const updateWritingBook = (bookId, updatedData) => {
  const existingBooks = getWritingBooks();
  const updatedBooks = existingBooks.map(book => 
    book.id === bookId ? { ...book, ...updatedData } : book
  );
  localStorage.setItem('writingBooks', JSON.stringify(updatedBooks));
  
  // 커스텀 이벤트 발생
  window.dispatchEvent(new CustomEvent('booksUpdated'));
};

// 작성중인 책 삭제
export const deleteWritingBook = (bookId) => {
  const existingBooks = getWritingBooks();
  const filteredBooks = existingBooks.filter(book => book.id !== bookId);
  localStorage.setItem('writingBooks', JSON.stringify(filteredBooks));
  
  // 커스텀 이벤트 발생
  window.dispatchEvent(new CustomEvent('booksUpdated'));
};

// 작성중인 책을 완결된 책으로 이동
export const moveToCompleted = (bookId) => {
  const writingBooks = getWritingBooks();
  const completedBooks = getCompletedBooks();
  
  const bookToMove = writingBooks.find(book => book.id === bookId);
  if (bookToMove) {
    const now = new Date();
    const completedBook = {
      ...bookToMove,
      isWriting: false,
      isCompleted: true,
      completedDate: now.toLocaleDateString('ko-KR', {
        month: '2-digit',
        day: '2-digit'
      }),
      completedAt: now.toISOString(), // 완결 시간 저장
      author: bookToMove.author || '사용자' // 작성자 정보 보존
    };
    
    // 작성중인 책에서 제거
    const updatedWritingBooks = writingBooks.filter(book => book.id !== bookId);
    localStorage.setItem('writingBooks', JSON.stringify(updatedWritingBooks));
    
    // 완결된 책에 추가
    completedBooks.unshift(completedBook);
    localStorage.setItem('completedBooks', JSON.stringify(completedBooks));
    
    // 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('booksUpdated'));
  }
};

// 완결된 책 데이터 가져오기
export const getCompletedBooks = () => {
  return JSON.parse(localStorage.getItem('completedBooks') || '[]');
};

// 새 완결된 책 추가
export const addCompletedBook = (book) => {
  const existingBooks = getCompletedBooks();
  const now = new Date();
  
  console.log('addCompletedBook 호출됨:', book); // 디버깅용 로그
  console.log('전달받은 completedAt:', book.completedAt); // 디버깅용 로그
  
  const newBook = {
    ...book,
    id: book.id || Date.now(),
    isWriting: false,
    isCompleted: true,
    completedDate: now.toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit'
    }),
    completedAt: book.completedAt ? book.completedAt : now.toISOString(), // 완결 시간 저장
    author: book.author || '사용자' // 작성자 정보 보존
  };
  
  console.log('최종 newBook:', newBook); // 디버깅용 로그
  console.log('최종 completedAt:', newBook.completedAt); // 디버깅용 로그
  
  existingBooks.unshift(newBook);
  localStorage.setItem('completedBooks', JSON.stringify(existingBooks));
  
  // 커스텀 이벤트 발생 (다른 컴포넌트에서 감지할 수 있도록)
  window.dispatchEvent(new CustomEvent('booksUpdated'));
};

// 완결된 책 업데이트
export const updateCompletedBook = (bookId, updatedData) => {
  const existingBooks = getCompletedBooks();
  const updatedBooks = existingBooks.map(book => 
    book.id === bookId ? { ...book, ...updatedData } : book
  );
  localStorage.setItem('completedBooks', JSON.stringify(updatedBooks));
  
  // 커스텀 이벤트 발생
  window.dispatchEvent(new CustomEvent('booksUpdated'));
};

// 완결된 책 삭제
export const deleteCompletedBook = (bookId) => {
  const existingBooks = getCompletedBooks();
  const filteredBooks = existingBooks.filter(book => book.id !== bookId);
  localStorage.setItem('completedBooks', JSON.stringify(filteredBooks));
  
  // 커스텀 이벤트 발생
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
