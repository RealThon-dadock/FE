// 채팅 데이터 관리 유틸리티

// 채팅방 목록 가져오기
export const getChatRooms = () => {
  try {
    const chatRooms = localStorage.getItem('chatRooms');
    return chatRooms ? JSON.parse(chatRooms) : [];
  } catch (error) {
    console.error('채팅방 목록 로드 실패:', error);
    return [];
  }
};

// 채팅방 목록 저장
export const saveChatRooms = (chatRooms) => {
  try {
    localStorage.setItem('chatRooms', JSON.stringify(chatRooms));
  } catch (error) {
    console.error('채팅방 목록 저장 실패:', error);
  }
};

// 특정 채팅방의 메시지 가져오기
export const getChatMessages = (chatRoomId) => {
  try {
    const messages = localStorage.getItem(`chatMessages_${chatRoomId}`);
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error('채팅 메시지 로드 실패:', error);
    return [];
  }
};

// 특정 채팅방의 메시지 저장
export const saveChatMessages = (chatRoomId, messages) => {
  try {
    localStorage.setItem(`chatMessages_${chatRoomId}`, JSON.stringify(messages));
  } catch (error) {
    console.error('채팅 메시지 저장 실패:', error);
  }
};

// 새 채팅방 생성
export const createChatRoom = (postId, postTitle, postContent, expertName) => {
  const chatRooms = getChatRooms();
  const chatRoomId = `chat_${postId}`;
  
  // 이미 존재하는 채팅방인지 확인
  const existingRoom = chatRooms.find(room => room.id === chatRoomId);
  if (existingRoom) {
    return existingRoom;
  }
  
  const newChatRoom = {
    id: chatRoomId,
    postId: postId,
    expertName: expertName,
    postTitle: postTitle,
    postContent: postContent,
    lastMessage: '안녕하세요, 너구리입니다!',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 0,
    createdAt: new Date().toISOString()
  };
  
  // 초기 메시지 설정
  const initialMessages = [
    {
      id: 'date',
      type: 'date',
      text: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      })
    },
    {
      id: 'post',
      type: 'post',
      title: postTitle,
      preview: postContent
    },
    {
      id: 'bot1',
      from: 'other',
      text: '안녕하세요, 너구리입니다!',
      author: expertName,
      timestamp: new Date().toISOString()
    }
  ];
  
  saveChatMessages(chatRoomId, initialMessages);
  
  const updatedChatRooms = [newChatRoom, ...chatRooms];
  saveChatRooms(updatedChatRooms);
  
  return newChatRoom;
};

// 메시지 추가
export const addMessage = (chatRoomId, message) => {
  const messages = getChatMessages(chatRoomId);
  const updatedMessages = [...messages, message];
  saveChatMessages(chatRoomId, updatedMessages);
  
  // 채팅방 목록 업데이트
  const chatRooms = getChatRooms();
  const updatedChatRooms = chatRooms.map(room => {
    if (room.id === chatRoomId) {
      return {
        ...room,
        lastMessage: message.text,
        lastMessageTime: message.timestamp || new Date().toISOString(),
        unreadCount: message.from === 'other' ? (room.unreadCount || 0) + 1 : 0
      };
    }
    return room;
  });
  saveChatRooms(updatedChatRooms);
  
  return updatedMessages;
};

// 채팅방 삭제
export const deleteChatRoom = (chatRoomId) => {
  try {
    // 채팅방 목록에서 제거
    const chatRooms = getChatRooms();
    const updatedChatRooms = chatRooms.filter(room => room.id !== chatRoomId);
    saveChatRooms(updatedChatRooms);
    
    // 메시지 데이터 삭제
    localStorage.removeItem(`chatMessages_${chatRoomId}`);
    
    return true;
  } catch (error) {
    console.error('채팅방 삭제 실패:', error);
    return false;
  }
};

// 읽지 않은 메시지 수 초기화
export const markAsRead = (chatRoomId) => {
  const chatRooms = getChatRooms();
  const updatedChatRooms = chatRooms.map(room => {
    if (room.id === chatRoomId) {
      return {
        ...room,
        unreadCount: 0
      };
    }
    return room;
  });
  saveChatRooms(updatedChatRooms);
};
