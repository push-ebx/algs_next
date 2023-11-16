import styled from 'styled-components'
import { animated } from '@react-spring/web'

export const Frame = styled('div')`
  position: relative;
  //max-width: 18rem;
  width: 100%;
  padding: 10px 0px 0px 0px;
  text-overflow: ellipsis;
  //white-space: nowrap;
  overflow-x: hidden;
  vertical-align: middle;
  color: var(--text-color);
  fill: var(--text-color);
`

export const Title = styled('span')`
  vertical-align: middle;
  cursor: pointer;

  &:hover {
    color: var(--red-color);
  }
`

export const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed rgba(255, 255, 255, 0.4);
  overflow: hidden;
`

export const toggle = {
  width: '1em',
  height: '1em',
  marginRight: 10,
  cursor: 'pointer',
  verticalAlign: 'middle',
}
