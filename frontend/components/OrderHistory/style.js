import { css } from 'glamor';

const gap = 20;
const color = '#cecece';

const container = css({
  margin: `0 ${gap}px`,
  borderBottom: `0.5px ${color} solid`,
}).toString();

export default {
  container,
};
