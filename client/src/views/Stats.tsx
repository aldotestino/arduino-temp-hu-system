import {useEffect, useState, useMemo, useCallback, useRef} from 'react';
import {Flex, Heading, VStack, Box, useMediaQuery, useColorMode, useToast} from '@chakra-ui/react';
import {Redirect} from 'react-router-dom';
import {ChartData, ChartOptions} from 'chart.js';
import {Line, Bar, defaults} from 'react-chartjs-2';
import {tempColor, huColor, serverUrl} from '../config';
import {GraphType} from '../types';
import {StatsI} from '../types';

const options: ChartOptions = {
  responsive: true,
  legend: {
    labels: {
      fontSize: 18,
    }
  },
  tooltips: {
    titleFontSize: 18,
    bodyFontSize: 15,
    xPadding: 10,
    yPadding: 10
  },
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

interface StatsProps {
  id: string | null,
  graphType: GraphType
}

function Stats({id, graphType}: StatsProps) {

  const [stats, setStats] = useState<StatsI | null>(null);
  const chartRef = useRef<Bar | Line | null>(null);
  const [error, setError] = useState<boolean>(false);

  const [isLarger] = useMediaQuery('(min-width: 1000px)');
  const {colorMode} = useColorMode();
  const toast = useToast();

  const fetchStats = useCallback(async () => {
    try {
      if(id) {
        const res = await fetch(serverUrl+'/stats', {
          headers: {
            'user_access_id': id
          }
        });
        const statsResponse: StatsI = await res.json();
        if(statsResponse.error) {
          console.log(statsResponse.error);
          toast({
            title: 'Stats',
            description: 'Il servizio non è al momento disponibile!',
            duration: 5000,
            status: 'error',
            isClosable: true,
            position: 'top-right'
          });
          setError(true);
          return;
        }
        setStats(statsResponse);
      }
    }catch(e) {
      console.log(e);
      toast({
        title: 'Stats',
        description: 'Il servizio non è al momento disponibile!',
        duration: 5000,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      });
    }
  }, [id, toast]);

  useEffect(() => {
    if(error) {
      return;
    }
    fetchStats();
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, [fetchStats, error]);

  useEffect(() => {
    if(colorMode === 'dark') {
      defaults.global.defaultFontColor = '#fff';
    }else {
      defaults.global.defaultFontColor = '#000';
    }
    chartRef.current?.chartInstance.update();
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
        borderJoinStyle: 'round',
      }, 
      {
        label: 'Umidità',
        data: stats?.story.hus,
        fill: false,
        backgroundColor: huColor,
        borderColor: huColor,
        borderJoinStyle: 'round'
      }
    ]
  } as ChartData), [stats]);

  return (
    <Flex my={4} justify='center'>
      {!id && <Redirect to='/' />}
      <VStack spacing={4}>
        <VStack spacing={4}>
          <Heading>Temperatura: {stats?.currentTemp}°C</Heading>
          <Heading>Umidità: {stats?.currentHu}%</Heading>
        </VStack>
        <Box position='relative' width={isLarger ? '60vw' : '98vw'}>
          {graphType === 'bar' ?
            <Bar ref={chartRef} data={data} options={options} /> :
            <Line ref={chartRef} data={data} options={options} />}
        </Box>
      </VStack>
    </Flex>
  );
}

export default Stats;