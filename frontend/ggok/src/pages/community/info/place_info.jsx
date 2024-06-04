import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper, Title, LogoImage, TitleDiv, BackButton } from "../../../styles/Styles";
import logo from "../../../others/img/logo-icon.png";
import leftlogo from "../../../others/img/left-button.png";
import StarRating from "../../../components/starrating";

const Container = styled.div`
  padding: 20px;
  max-height: 900px;
  overflow-y: auto;
`;

const PostTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  text-align: left;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  text-align: left;
`;

const Nickname = styled.div`
  font-size: 18px;
`;

const TimeAgo = styled.div`
  font-size: 18px;
  color: grey;
`;

const PostContent = styled.div`
  margin-bottom: 20px;
  font-size: 23px;
  text-align: left;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f8f5;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: left;
`;

const LocationIcon = styled.div`
  margin-right: 30px;
`;

const LocationText = styled.div`
  font-size: 30px;

  span {
    font-size: 15px;
  }
`;

const FormContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  padding-top: 10px;
`;

const CommentSection = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const CommentTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: left;
`;

const Comment = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
`;

const CommentContent = styled.div`
  font-size: 16px;
`;

const CommentTime = styled.div`
  font-size: 14px;
  color: grey;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const TextAreaField = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  resize: none;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #a3ccaa;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

const DeleteButton = styled.button`
  margin-left: 10px;
`;

const EditButton = styled.button`
  margin-left: 10px;
`;

const SuccessModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const SuccessModalButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
`;

export default function Place_info() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/${parseInt(id)}/`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/comments/${parseInt(id)}/`);
        setComments(response.data.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [id]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  const getUserId = () => {
    const sessionData = sessionStorage.getItem('user');
    if (sessionData) {
      try {
        const userData = JSON.parse(sessionData);
        return parseInt(userData.data.id);
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    } else {
      console.error('Session data not found.');
      return null;
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const postData = {
      content: comment,
      post: parseInt(id),
      author: getUserId()
    };
    try {
      await axios.post(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/comments/${id}/`, postData);
      setComment("");
      fetchComments(); // Reload comments
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/${parseInt(id)}/`, {
        data: { 
          post_id: parseInt(id),
          author: getUserId()
        }
      });
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = () => {
    setIsEditing(true);
    setEditTitle(data.subject);
    setEditContent(data.content);
  };

  const handleSaveEdit = async () => {
    try {
      const postData = {
        subject: editTitle,
        content: editContent,
        lat: data.lat,
        long: data.long,
        address: data.address,
        name: data.name,
        public: data.public,
        review: data.review,
        category: data.category,
        author: data.author,
      };
      const response = await axios.put(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/${parseInt(id)}/`, postData);
      setIsEditing(false);
      setData(response.data); // Update data
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
      } else {
        console.error('Error saving edited post:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const userInfo = () => {
    const session = sessionStorage.getItem('user');
    const user = JSON.parse(session);
    return user.data;
  }

  return (
    <Wrapper>
      <Title>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>우리 지역</span></TitleDiv>
      </Title>
      <Container>
        {data && (
          <>
            {isEditing ? (
              <>
                <InputField
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="제목"
                />
                <TextAreaField
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="내용"
                  rows="10"
                />
                {data.author == userInfo().id ?
                <ButtonContainer>
                  <Button onClick={handleSaveEdit}>저장</Button>
                  <Button onClick={handleCancelEdit}>취소</Button>
                </ButtonContainer>
                : <></>}
              </>
            ) : (
              <>
                <PostTitle>{data.subject}
                {data.author == userInfo().id ?
                  <EditButton onClick={handleEditPost}>수정</EditButton>
                : <></>}
                {data.author == userInfo().id ?
                  <DeleteButton onClick={handleDeletePost}>삭제</DeleteButton>
                : <></>}
                
                </PostTitle>
                <PostHeader>
                  <Nickname></Nickname>
                  <TimeAgo>{formatTimeAgo(data.create_date)}</TimeAgo>
                </PostHeader>
                <LocationContainer>
                  <LocationIcon>
                    <LocationText>
                      📍  {data.name}  <br /> 
                      <span>{data.address}</span>
                      <StarRating totalStars={5} selectedStars={data.review} /><br /> 
                    </LocationText>
                  </LocationIcon>
                </LocationContainer>
                <PostContent>
                  <p>{data.content}</p>
                  {data.image && <PostImage src={data.image} alt="Post" />}
                </PostContent>
              </>
            )}
          </>
        )}
        <CommentSection>
          {comments.length > 0 && <CommentTitle>댓글</CommentTitle>}
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <CommentContent>{comment.content}</CommentContent>
              <CommentTime>{formatTimeAgo(comment.create_date)}</CommentTime>
            </Comment>
          ))}
        </CommentSection>
        <FormContainer>
          <form onSubmit={handleSubmitComment}>
            <InputField
              required
              maxLength={100}
              onChange={handleCommentChange}
              value={comment}
              placeholder="댓글을 입력해주세요"
            />
            <Button type="submit">등록</Button>
          </form>
        </FormContainer>
      </Container>
      {showSuccessModal && (
        <SuccessModalOverlay>
          <SuccessModalContent>
            <h2>성공</h2>
            <p>작업이 성공적으로 완료되었습니다.</p>
            <SuccessModalButton onClick={handleCloseModal}>확인</SuccessModalButton>
          </SuccessModalContent>
        </SuccessModalOverlay>
      )}
    </Wrapper>
  );
}

