import {useEffect, useState, useMemo, useCallback} from 'react';
import {Flex, Heading, VStack, Box, useMediaQuery} from '@chakra-ui/react';
import {Redirect} from 'react-router-dom';
import {Line, Bar} from 'react-chartjs-2';
import {tempColor, huColor, serverUrl} from "../config";

function Stats({id, graphtType}) {

  const [stats, setStats] = useState(null);

  const [isLarger] = useMediaQuery('(min-width: 1000px)');

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

  const data = useMemo(() => ({
    labels: stats?.story.dates.map(d => new Date(d).toLocaleTimeString()),
      datasets: [
      {
        label: 'Temperatura',
        data: stats?.story.temps,
        fill: false,
        backgroundColor: tempColor,
        borderColor: tempColor,
      },
      {
        label: 'Umidità',
        data: stats?.story.hus,
        fill: false,
        backgroundColor: huColor,
        borderColor: huColor,
      },
    ],
  }), [stats]);

  const options = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  }

  return (
    <Flex my={4} justify="center">
      {!id && <Redirect to="/" />}
      <VStack spacing={4}>
        <VStack spacing={4}>
          <Heading>Temperatura: {stats?.currentTemp}°C</Heading>
          <Heading>Umidità: {stats?.currentHu}%</Heading>
        </VStack>
        <Box position="relative" width={isLarger ? '60vw' : '98vw'}>
          {graphtType === 'bar' ?
            <Bar data={data} options={options} /> :
            <Line data={data} options={options} />}
        </Box>
      </VStack>
    </Flex>
  );
}

export default Stats;