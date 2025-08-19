import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createMyProfile } from '../utils/profilesApi';
import { useAuth } from '../contexts/AuthContext';

const PageContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Content = styled.div`
  padding: 20px;
  padding-bottom: 100px;
`;

const Section = styled.section`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h2`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: #212529;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #495057;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #007bff; }
  &::placeholder { color: #adb5bd; }
`;

const RadioRow = styled.div`
  display: flex;
  gap: 12px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  background: #fff;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${props => props.disabled ? '#adb5bd' : '#007bff'};
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 4px 12px rgba(0,0,0,0.15)'};
  }
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #dc3545;
`;

function validateEmail(value) {
  if (!value) return false; return /.+@.+\..+/.test(value);
}

const ProfileCreatePage = () => {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => ({
    name: name.trim() === '' ? '이름을 입력해주세요.' : '',
    birth: birth.trim() === '' ? '생년월일을 선택해주세요.' : '',
    email: validateEmail(email) ? '' : '이메일 주소를 올바르게 입력해주세요.'
  }), [name, birth, email]);

  const isValid = useMemo(() => Object.values(errors).every((e) => e === ''), [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, birth: true, email: true });
    if (!isValid) return;
    const profile = { name: name.trim(), birth, email: email.trim(), role };
    try {
      await createMyProfile(profile);
      await refreshProfile();
      navigate('/', { replace: true });
    } catch (err) {
      alert(err?.message || '프로필 생성에 실패했습니다.');
    }
  };

  return (
    <PageContainer>
      <Content>
        <Section>
          <Title>프로필 생성</Title>
          <form onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, name: true }))} />
              {touched.name && errors.name && <ErrorText>{errors.name}</ErrorText>}
            </Field>

            <Field>
              <Label htmlFor="birth">생년월일</Label>
              <Input id="birth" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, birth: true }))} />
              {touched.birth && errors.birth && <ErrorText>{errors.birth}</ErrorText>}
            </Field>

            <Field>
              <Label htmlFor="email">이메일 주소</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, email: true }))} />
              {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}
            </Field>

            <Field>
              <Label>유형 선택</Label>
              <RadioRow>
                <RadioLabel>
                  <input type="radio" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} />
                  일반 사용자
                </RadioLabel>
                <RadioLabel>
                  <input type="radio" name="role" value="expert" checked={role === 'expert'} onChange={() => setRole('expert')} />
                  전문가
                </RadioLabel>
              </RadioRow>
            </Field>

            <SubmitButton type="submit" disabled={!isValid}>프로필 생성</SubmitButton>
          </form>
        </Section>
      </Content>
    </PageContainer>
  );
};

export default ProfileCreatePage;


