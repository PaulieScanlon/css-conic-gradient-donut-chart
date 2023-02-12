import React from 'react';
import PropTypes from 'prop-types';

const Chart = ({ data }) => {
  const total_value = data.reduce((a, b) => a + b.value, 0);
  const percent = (num) => Math.round((num / total_value) * 100);
  const degrees = (percent) => Math.round((percent / 100) * 360);

  const css_string = data
    .map((_, index, array) => {
      const start_value = array[index - 1]?.value ? array[index - 1].value : 0;
      const end_value = (array[index].value += array[index - 1]?.value ? array[index - 1].value : 0);

      const start_degrees = degrees(percent(start_value));
      const end_degrees = degrees(percent(end_value));

      return ` var(--color-pink-${(index + 1) * 100}) ${start_degrees}deg ${end_degrees}deg`;
    })
    .join();

  return (
    <div className='flex flex-col gap-8 grow'>
      <div className='flex flex-col grow'>
        <h2 className='m-0 text-white text-xl font-bold'>Donut Chart 1</h2>
        <a
          href='https://github.com/PaulieScanlon/css-conic-gradient-charts/blob/main/components/donut-1.js'
          target='_blank'
          rel='noopener'
          className='m-0 text-xs text-gray-400 flex hover:text-pink-300'
        >
          ./components/donut-1.js
        </a>
      </div>
      <div>
        <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' className='rounded-full'>
          <clipPath id='ring'>
            <path d='M 50 0 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100 v 18 a 2 2 0 0 0 0 64 2 2 0 0 0 0 -64' />
          </clipPath>

          <foreignObject x='0' y='0' width='100' height='100' clipPath='url(#ring)'>
            <div
              xmlns='http://www.w3.org/1999/xhtml'
              className='w-full h-full'
              style={{
                background: `conic-gradient(${css_string})`,
              }}
            />
          </foreignObject>
        </svg>
      </div>
    </div>
  );
};

Chart.propTypes = {
  /** Shape of the data to drive the chart */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
};

export default Chart;
