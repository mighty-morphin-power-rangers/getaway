import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface MoodEntry {
  mood: {
    mood_color: string;
    mood_desc: string;
  };
}

interface MoodPieChartProps {
  data: MoodEntry[];
  width: number;
  height: number;
}

const MoodPieChart: React.FC<MoodPieChartProps> = ({ data, width, height }) => {
  const pieChartRef = useRef<SVGSVGElement>(null);

  const aggregateMoodData = (moodEntries: MoodEntry[]) => {
    const colorCounts: Record<string, number> = {};

    moodEntries.forEach((entry) => {
      const color = entry.mood.mood_color;

      colorCounts[color] = (colorCounts[color] || 0) + 1;
    });

    const totalCount = moodEntries.length;

    return Object.entries(colorCounts).map(([key, value]) => ({
      key,
      value,
      percentage: (value / totalCount) * 100,
    }));
  };

  useEffect(() => {
    if (!pieChartRef.current) return;

    // sets actual colors i want
    const customColorScale = d3
      .scaleOrdinal<string>()
      .domain(['rgba(0, 191, 194, 1)', 'rgba(252, 110, 71, 1)', '#6BB76A', 'rgba(255, 153, 158, 1)'])
      .range(['rgba(0, 191, 194, 1)', 'rgba(252, 110, 71, 1)', '#6BB76A', 'rgba(255, 153, 158, 1)']);

    const color = (key: string) => customColorScale(key) || 'black';

    const aggregatedData = aggregateMoodData(data);

    const svg = d3.select(pieChartRef.current);

    const radius = Math.min(width, height) / 2;

    const pie = d3.pie<any>().value((d) => d.value);

    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // const color = d3.scaleOrdinal(d3.schemeCategory10);

    g.selectAll('.arc')
      .data(pie(aggregatedData))
      .enter()
      .append('path')
      .attr('class', 'arc')
      .attr('d', arc)
      .style('fill', (d) => color(d.data.key));

    svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .selectAll('text')
      .data(pie(aggregatedData))
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '.8rem')
      .style('fill', (d) => (d.data.key === 'Yellow' ? 'white' : 'white')) // Change text color based on the background color
      .text((d) => `(${d.data.percentage.toFixed(2)}%)`);
  }, [data, width, height]);

  return <svg ref={pieChartRef} width={width} height={height}></svg>;
};

export default MoodPieChart;
