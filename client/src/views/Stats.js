import {useEffect, useState, useMemo, useCallback, useRef} from 'react';
import {Flex, Heading, VStack, Box, useMediaQuery, useColorMode} from '@chakra-ui/react';
import {Redirect} from 'react-router-dom';
import {Line, Bar, defaults} from 'react-chartjs-2';
import {tempColor, huColor, serverUrl} from "../config";

const options = {
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        }
      }
    ]
  }
};

function Stats({id, graphType}) {

  const [stats, setStats] = useState(null);
  const chartRef = useRef(null);

  const [isLarger] = useMediaQuery('(min-width: 1000px)');
  const {colorMode} = useColorMode();

  const fetchStats = useCallback(async () => {
    const res = await fetch(serverUrl+'/stats', {
      headers: {
        'user_access_id': id
      }
    }).then(r => r.json());
    setStats(res);
  }, [id]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  useEffect(() => {
    if(colorMode === 'dark') {
      defaults.global.defaultFontColor = '#fff';
    }else {
      defaults.global.defaultFontColor = '#000'
    }
    chartRef.current.chartInstance.update();
  }, [colorMode]);

  const data = useMemo(() => ({
    labels: stats?.story.dates.map(d => new Date(d).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperatura',
        data: stats?.story.temps,
        fill: false,
        backgroundColor: tempColor,
        borderColor: tempColor,
        yAxisId: 'temp'
      },
      {
        label: 'Umidità',
        data: stats?.story.hus,
        fill: false,
        backgroundColor: huColor,
        borderColor: huColor,
        yAxisId: 'hu'
      },
    ],
  }), [stats]);

  return (
    <Flex my={4} justify="center">
      {!id && <Redirect to="/" />}
      <VStack spacing={4}>
        <VStack spacing={4}>
          <Heading>Temperatura: {stats?.currentTemp}°C</Heading>
          <Heading>Umidità: {stats?.currentHu}%</Heading>
        </VStack>
        <Box position="relative" width={isLarger ? '60vw' : '98vw'}>
          {graphType === 'bar' ?
            <Bar ref={chartRef} data={data} options={options} /> :
            <Line ref={chartRef} data={data} options={options} />}
        </Box>
      </VStack>
    </Flex>
  );
}

export default Stats;