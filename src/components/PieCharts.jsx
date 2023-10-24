import React, { useEffect, useState } from 'react';
import { getUsers } from '../ServiceApi';
import { PieChart, Pie, ResponsiveContainer, Cell, Label } from 'recharts';

const COLORS = ['red', '#FBFBFB']; // Couleurs pour les segments du PieChart

function PieCharts({ userId }) {
    const [userScore, setUserScore] = useState(0);

    useEffect(() => {
        //  fonction getUsers pour récupérer les données de l'utilisateur
        getUsers(userId)
            .then((data) => {
                setUserScore(data.todayScore);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du score de l\'utilisateur : ', error);
            });
    }, [userId]);

    // Données pour le PieChart
    const chartData = [
        { name: 'Score', value: userScore * 100 },
        { name: 'Reste', value: 100 - userScore * 100 }, 
    ];

    const endAngle = 90 + userScore * 360;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    label={false}
                    legendType={"none"}
                    data={chartData}
                    dataKey={"value"}
                    cx="50%"
                    cy="50%"
                    startAngle={90}
                    endAngle={endAngle}
                    innerRadius={80}
                    outerRadius={90}
                    cornerRadius={7}
                    paddingAngle={0}
                    fill="#FF0000"
                >
                    {
                        chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                    <Label
                        value={`Score: ${userScore * 100}%`}
                        position="center"
                        fill="#000"
                        fontSize={20}
                    />
                </Pie>

            </PieChart>
        </ResponsiveContainer>
    );
}

export default PieCharts;
