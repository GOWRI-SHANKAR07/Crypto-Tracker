import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../Config/api';
import { chartDays } from '../Config/data';
import { CryptoState } from '../CryptoContext';
import '../Styles/CoinPage.css';
import SelectButton from './SelectButton';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import UserSidebar from './Authentication/UserSlidebar';
import AuthModal from './Authentication/AuthModal';
Chart.register(CategoryScale);

const CoinInfo = ({ coin }) => {

  const [historicData, setHistoricData] = useState(coin);
  const [days, setDays] = useState(1);
  const { currency, setCurrency, user } = CryptoState();
  const [flag, setflag] = useState(false);


  const fetchHistoricData = async () => {
    const response = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(response.data.prices);
  };
  console.log(historicData);

  useEffect(() => {
    fetchHistoricData();
  }, [])

  useEffect(() => {
    fetchHistoricData();
    console.log("hi");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);



  return (
    <div className='InfoCont'
      style={{
        marginLeft: 20,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!historicData | flag === false ? (
        <CircularProgress
          style={{ color: "gold" }}
          size={250}
          thickness={1}
        />
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          
        </>
      )
      
      }
      <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setflag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
    </div>
  )
}

export default CoinInfo;

// how to send automatic mail to the authenticated user about the details of the cryptocurrency coins that they added in their wishlist in react js

