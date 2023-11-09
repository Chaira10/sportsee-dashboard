import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Rectangle } from 'recharts';
import { useUser } from '../../../context/Context';
import './LineChart.css';




function LineCharts({ userId }) {
    // const [averageData, setAverageData] = useState([]);
    const {averagesData,error} = useUser();
    console.log(averagesData);


    if (error) {
      return <div>Erreur: {error.message}</div>; 
    } else if (!averagesData) {
      return <div>Chargement en cours...</div>;
    }

    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    const formattedData = averagesData.map((session, index) => ({
        name: daysOfWeek[index],
        sessionLength: session.sessionLength,
    }));

    function CustomCursor(props) {
      const { points, width } = props; 
      const { x, y } = points[0];
      return (
        <Rectangle
          fill="#000"
          stroke="#000"
          x={x}
          y={y}
          width={width}
          height={230}
          className="custom-cursor"
        />
      );
    }


    return (
      <div className="session-lineChart">
      <h3 className="text-start">Durée moyenne des sessions</h3>
        <ResponsiveContainer width="100%" height="100%" className="areaContainer" >
            <LineChart
                data={formattedData}
          margin={{ top: 0, right: 0, left: 3, bottom: 5 }}
          padding={{ top: 0, right: 5, left: 5, bottom: 10 }}
            >
            <CartesianGrid vertical={false} horizontal={false} />
                <XAxis  className="xArea" dataKey="name" tickLine={false} axisLine={false}  style={{ fill: '#fff', opacity: '.5', fontSize: '12px' }}/>
                <YAxis  dataKey="sessionLength" domain={["dataMin - 10", "dataMax + 50"]} width={0} orientation="right"   />
                <Tooltip
						offset={10}
						contentStyle={{
							backgroundColor: '#fff',
							border: 'none',
							textAlign: 'center',
						}}
						wrapperStyle={{
							outline: 'none',
						}}
						itemStyle={{
							fontSize: '12px',
							fontWeight: '500',
							color: '#000',
							lineHeight: '0',
              opacity: 0.5,
						}}
						labelFormatter={() => ''}
						separator=""
						formatter={(value) => ['', value]}
						cursor={<CustomCursor />}
					/>
<defs>
						<linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="rgba(255,255,255,30%)" />
							<stop offset="100%" stopColor="rgba(255,255,255,100%)" />
						</linearGradient>
					</defs>
                <Line style={{ stroke: 'url(#linear)' }} radius={[10, 10, 0, 0]} type="natural" dataKey="sessionLength"  fill="white"   unit="min"  dot={false} strokeWidth={2} activeDot={{ r: 3, strokeWidth: 4, stroke: 'rgba(255,255,255,.2)',fill: '#fff', }}/>
            </LineChart>
        </ResponsiveContainer>
        </div>
    );
}

export default LineCharts;
