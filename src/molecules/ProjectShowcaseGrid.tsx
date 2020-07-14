import React from 'react'
import styled from '../styles/styled'
import * as Styles from '../styles'
import OutlinedButton from '../atoms/OutlinedButton'

const S: Styles.Component = Styles
S.ProjectShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 32px;
  padding: 48px;
  width: 100%;
  max-width: 1215px;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }

  .grid-item {
    position: relative;
    padding-top: 60%;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${(props) => props.theme.color.primary};
  }

  .thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: 0.5s ease;
    background-color: ${(props) => props.theme.color.positive};
    color: ${(props) => props.theme.color.negative};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 16px;
    box-sizing: border-box;
  }

  .grid-item:hover {
    .overlay {
      opacity: 1;
    }
  }
`

function ProjectShowcaseGrid() {
  return (
    <S.ProjectShowcaseGrid>
      {/* Thumbnails of Projects */}
      <div className="grid-item">
        <div className="overlay">
          <h3>Bringing world music and rock n' roll to San Francisco for over 15 years.</h3>
          <OutlinedButton onClick={() => window.open('https://www.freepeoples.com')} end={true} transparent>
            Visit Site
          </OutlinedButton>
        </div>
      </div>
      <div className="grid-item">
        <div className="overlay">
          <h3>Creative first gamers building high end tools for the League of Legends community.</h3>
          <OutlinedButton onClick={() => window.open('https://www.rune-stone.com')} end={true} transparent>
            Visit Site
          </OutlinedButton>
        </div>
      </div>
      <div className="grid-item">
        <div className="overlay">
          <h3>Green technology experts helping forward thinking companies for over 20 years.</h3>
          <OutlinedButton onClick={() => window.open('http://www.greenconsultants.com')} end={true} transparent>
            Visit Site
          </OutlinedButton>
        </div>
      </div>
    </S.ProjectShowcaseGrid>
  )
}

export default ProjectShowcaseGrid
