import React from 'react'
import styled from '../styles/styled'
import * as Styles from '../styles'
import OutlinedButton from '../atoms/OutlinedButton'
import ProjectShowcaseGrid from '../molecules/ProjectShowcaseGrid'

const S: Styles.Component = Styles
S.Works = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 124px;

  color: ${(props) => props.theme.color.positive};
  text-align: center;

  a {
    color: ${(props) => props.theme.color.primary};
    transition: 250ms;

    &:hover {
      color: ${(props) => props.theme.color.positive};
    }
  }
`

function Works() {
  return (
    <S.Works>
      <h1>My Recent Works</h1>
      <p>
        {"Here are a few design projects I've worked on recently. Want to see more? "}
        <a href="/contact">Email me.</a>
      </p>
      <ProjectShowcaseGrid />
      {/* Link to dribbble */}
      {/* TODO: link to my profile */}
      {/* TODO: link to my behance */}
      <OutlinedButton onClick={() => window.open('https://www.google.com')} start>
        See more on Github
      </OutlinedButton>
    </S.Works>
  )
}

export default Works
