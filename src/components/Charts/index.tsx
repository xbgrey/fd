import React from 'react';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import DataSet from '@antv/data-set';

interface IProps {
  data: object[];
}

const Curved = (props: IProps) => {
  const ds = new DataSet();
  const dv = ds.createView().source(props.data);
  dv.transform({
    type: 'fold',
    fields: ['PV', 'Direct', 'Diffuse', 'Temperature'],
    // 展开字段集
    key: 'city',
    // key字段
    value: 'temp', // value字段
  });
  const scale = {
    time: {
      ticks: [
        '0:00',
        '2:00',
        '4:00',
        '6:00',
        '8:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
      ],
      tickCount: 12, // 定义坐标轴刻度线的条数，默认为 5
    },
  };
  const bg = {
    fill: '#fff',
  };
  return (
    <Chart
      data={dv}
      scale={scale}
      forceFit
      height={300}
      background={bg}
      padding="auto"
    >
      <Legend />
      <Axis name="time" />
      <Axis
        name="temp"
        label={{
          formatter: val => `${val}`,
        }}
      />
      <Tooltip
        crosshairs={{
          type: 'y',
        }}
      />
      <Geom
        type="line"
        position="time*temp"
        size={2}
        color={'city'}
        shape={'smooth'}
      />
    </Chart>
  );
};

export default Curved;