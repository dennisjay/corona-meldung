import styled from "styled-components"

const PersonalBlogWrapper = styled.div``

export default PersonalBlogWrapper





export const SectionText = styled.div`
margin-bottom: 45px;
@media (max-width: 767px) {
  margin-bottom: 30px;
}
h2 {
  font-size: 30px;
  font-weight: 700;
  color: #292929;
  line-height: 1.53;
  margin-bottom: 10px;
  @media (max-width: 990px) {
    font-size: 26px;
  }
  @media (max-width: 767px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
}
`



export const SectionContent = styled.div`
  width: 870px;
  max-width: 100%;
  margin: 0 auto;

  h2 {
    font-size: 21px;
    font-weight: 500;
    color: #292929;
    margin-bottom: 40px;
    @media (max-width: 990px) {
      margin-bottom: 30px;
    }
    @media (max-width: 767px) {
      font-size: 18px;
      margin-bottom: 25px;
    }
  }
`

export const SectionWrapper = styled.div`
  width: 940px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0px 0px 10px 0px;
  display: flex;
  align-items: center;
  @media (max-width: 1400px) {
    padding: 120px 10px 120px 10px;
  }
  @media (max-width: 1200px) {
    padding: 50px 10px 60px 10px;
  }
  @media (max-width: 990px) {
    padding: 20px 25px 30px 25px;
  }
  @media (max-width: 575px) {
    display: block;
    padding: 5px 25px 10px 25px;
    text-align: center;
  }
`

export const SectionImage = styled.div`
  width: 270px;
  height: 270px;
  padding: 30px;
  border-radius: 0%;
  margin: 0 auto;
  flex-shrink: 0;
  @media (max-width: 990px) {
    width: 220px;
    height: 220px;
    padding: 25px;
    margin-bottom: 25px;
  }
  @media (max-width: 990px) {
    width: 180px;
    height: 180px;
    padding: 20px;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 50%;
  }
`

export const SectionTitle = styled.div`
  padding-left: 30px;
  @media (max-width: 575px) {
    padding-left: 0;
  }
`

