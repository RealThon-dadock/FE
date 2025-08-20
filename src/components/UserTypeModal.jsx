import React from 'react';
import styled from 'styled-components';
import { createMyProfile } from '../utils/profilesApi';
import { useAuth } from '../contexts/AuthContext';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 32px 24px;
  margin: 20px;
  max-width: 320px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 700;
  color: #212529;
`;

const Message = styled.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #6c757d;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.user {
    background-color: #007bff;
    color: white;
    &:hover { background-color: #0056b3; }
  }
  
  &.expert {
    background-color: #6c757d;
    color: white;
    &:hover { background-color: #545b62; }
  }
`;

const UserTypeModal = ({ isOpen, onClose }) => {
  const { refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUserTypeSelect = async (role) => {
    setIsLoading(true);
    try {
      await createMyProfile({ role });
      await refreshProfile();
      onClose();
    } catch (err) {
      alert(err?.message || '사용자 유형 설정에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <Title>사용자 유형 선택</Title>
        <Message>
          서비스를 이용하기 위해<br/>
          사용자 유형을 선택해주세요.
        </Message>
        <ButtonGroup>
          <Button
            className="user"
            onClick={() => handleUserTypeSelect('user')}
            disabled={isLoading}
          >
            일반 사용자
          </Button>
          <Button
            className="expert"
            onClick={() => handleUserTypeSelect('expert')}
            disabled={isLoading}
          >
            전문가
          </Button>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
};

export default UserTypeModal;
