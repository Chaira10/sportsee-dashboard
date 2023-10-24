import React, { useEffect, useState,useRef, } from 'react';
import { getAverages } from '../ServiceApi'; 
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AreaCharts({ userId }) {
    const [averageData, setAverageData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isHover, setIsHover] = useState(false);
    useEffect(() => {
      
      getAverages(userId)
        .then((averages) => {
          setAverageData(averages);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données d\'activité moyenne : ', error);
        });
    }, [userId]); 
  
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  
    const formattedData = averageData.map((session, index) => ({
        name: daysOfWeek[index], 
        sessionLength: session.sessionLength,
      }));

      const calculateDistance = (activeIndex) => {
        const dataLength = formattedData.length;
        return dataLength - 1 - activeIndex;
      };

      
  
    return (
      <div className="profile-average">
      <>
      <div  className="tooltip-overlay"></div>
      <ResponsiveContainer width="99%" height="100%">
        <AreaChart
          width={500}
          height={500}
          data={formattedData} 
          margin={{ top: 20, right: -20, left: -20, bottom: 60 }}
          padding={{ top: 0, right: 0, left: 0, bottom: 0 }}
          className={ 'darken-graph'}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onMouseMove={(e) => {
        const chartX = e.chartX;
        const chartWidth = 500; // Largeur du graphique
        const dataLength = formattedData.length;
        const index = Math.floor((chartX / chartWidth) * dataLength);
        setActiveIndex(index);
        console.log(e,e.chartX,chartWidth,index,dataLength,isHover);
    }}

        >
          {/* <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} fillOpacity={0.6}   /> */}
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{stroke: 'white'}} allowDataOverflow={false} stroke="#ffffff" dy={40}/>
          <Tooltip 
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const sessionLength = payload[0].payload.sessionLength; 
              return (
                <div className="custom-tooltip">
                  <p>{sessionLength} min</p>
                </div>
              );
            }
            return null;
          }}
        />
<Area 
    type="linear"
    dataKey="sessionLength"
    strokeWidth={2}
    stroke="#ffffff"
    fill={(data, index) => {
        if (isHover) {
            const distance = calculateDistance(index);
            if (distance === 0 || index === formattedData.length - 1) {
                return 'rgba(50, 50, 50, 1)'; // Gris foncé pour la fin du graphique et le point survolé
            } else if (index > activeIndex && index < formattedData.length - 1) {
                const opacity = 1; // Opacité de la couleur intermédiaire
                return `rgba(50, 50, 50, ${opacity})`; // Couleur personnalisée entre le point survolé et la fin du graphique
            } else {
                const opacity = 1; // Opacité de la couleur de remplissage par défaut
                return `rgba(50, 50, 50, ${opacity})`; // Couleur de remplissage par défaut
            }
        }
        return '#ffffff'; // Couleur de remplissage par défaut
    }}
     />




        </AreaChart>



      </ResponsiveContainer>
      
      </>
      </div>
    );
  }
  

export default AreaCharts