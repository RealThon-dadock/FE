import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, User, Camera, Award, Briefcase, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProfileEditContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: white;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0 16px;
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #007bff;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
  }
  
  &:disabled {
    color: #6c757d;
    cursor: not-allowed;
  }
`;

const ContentArea = styled.div`
  padding: 20px;
  padding-bottom: 100px;
`;

const ProfileImageSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 32px 20px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 32px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  
  ${props => props.$imageUrl && `
    background-image: url(${props.$imageUrl});
    background-size: cover;
    background-position: center;
  `}
`;

const CameraButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #007bff;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #0056b3;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const ProfileImageText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6c757d;
`;

const FormSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  transition: all 0.2s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const ExpertProfileEditPage = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    nickname: user?.nickname || '',
    email: user?.email || '',
    specialization: '',
    license: '',
    experience: '',
    education: '',
    introduction: ''
  });
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 기존 프로필 데이터 로드
    if (profile) {
      setFormData(prev => ({
        ...prev,
        specialization: profile.specialization || '',
        license: profile.license || '',
        experience: profile.experience || '',
        education: profile.education || '',
        introduction: profile.introduction || ''
      }));
    }
  }, [profile]);

  const handleBack = () => {
    navigate('/my');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // 프로필 업데이트 로직 (실제 구현 시 API 호출)
      const updatedProfile = {
        ...profile,
        nickname: formData.nickname,
        email: formData.email,
        specialization: formData.specialization,
        license: formData.license,
        experience: formData.experience,
        education: formData.education,
        introduction: formData.introduction,
        profileImage: profileImage
      };
      
      // 새로운 updateProfile 함수 사용
      const success = await updateProfile(updatedProfile);
      
      if (success) {
        alert('프로필이 성공적으로 수정되었습니다.');
        navigate('/my');
      } else {
        alert('프로필 수정에 실패했습니다.');
      }
    } catch (error) {
      alert('프로필 수정에 실패했습니다.');
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.nickname.trim() !== '' && formData.specialization.trim() !== '';

  return (
    <ProfileEditContainer>
      <Header>
        <HeaderLeft>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={24} />
          </BackButton>
          <HeaderTitle>전문가 정보 수정</HeaderTitle>
        </HeaderLeft>
        <SaveButton 
          onClick={handleSave} 
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? '저장 중...' : '저장'}
        </SaveButton>
      </Header>

      <ContentArea>
        <ProfileImageSection>
          <ProfileImageContainer>
            <ProfileImage $imageUrl={profileImage}>
              {!profileImage && <User size={40} />}
            </ProfileImage>
            <CameraButton onClick={() => document.getElementById('profile-image-input').click()}>
              <Camera size={16} />
            </CameraButton>
            <ImageInput
              id="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </ProfileImageContainer>
          <ProfileImageText>프로필 이미지를 변경하려면 카메라 아이콘을 클릭하세요</ProfileImageText>
        </ProfileImageSection>

        <FormSection>
          <SectionTitle>
            <User size={20} />
            기본 정보
          </SectionTitle>
          
          <FormGroup>
            <Label htmlFor="nickname">닉네임 *</Label>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder="닉네임을 입력하세요"
              maxLength={20}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
              disabled
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="specialization">전문 분야 *</Label>
            <Select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
            >
              <option value="">전문 분야를 선택하세요</option>
              <option value="심리상담">심리상담</option>
              <option value="우울증">우울증</option>
              <option value="불안장애">불안장애</option>
              <option value="트라우마">트라우마</option>
              <option value="대인관계">대인관계</option>
              <option value="가족상담">가족상담</option>
              <option value="부부상담">부부상담</option>
              <option value="청소년상담">청소년상담</option>
              <option value="직업상담">직업상담</option>
            </Select>
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>
            <Award size={20} />
            자격 및 경력
          </SectionTitle>
          
          <FormGroup>
            <Label htmlFor="license">자격증</Label>
            <Input
              id="license"
              name="license"
              type="text"
              value={formData.license}
              onChange={handleInputChange}
              placeholder="보유 자격증을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="experience">경력</Label>
            <Input
              id="experience"
              name="experience"
              type="text"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="예: OO심리센터 5년차"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="education">학력</Label>
            <Input
              id="education"
              name="education"
              type="text"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="예: OO대학교 심리학과 졸업"
            />
          </FormGroup>

        </FormSection>

        <FormSection>
          <SectionTitle>
            <Briefcase size={20} />
            자기소개
          </SectionTitle>
          
          <FormGroup>
            <Label htmlFor="introduction">자기소개</Label>
            <TextArea
              id="introduction"
              name="introduction"
              value={formData.introduction}
              onChange={handleInputChange}
              placeholder="자신의 상담 스타일과 전문성을 소개해주세요"
              maxLength={1000}
            />
          </FormGroup>
        </FormSection>
      </ContentArea>
    </ProfileEditContainer>
  );
};

export default ExpertProfileEditPage;
