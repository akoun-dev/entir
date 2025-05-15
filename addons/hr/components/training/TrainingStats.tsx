
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { TrainingStats as TrainingStatsType } from '../../types';
import { ChartContainer, ChartTooltip } from '../../../../src/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Cell, PieChart, Pie } from 'recharts';
import { TrainingCategory } from '../../types';

interface TrainingStatsProps {
  stats: TrainingStatsType;
  categories: TrainingCategory[];
}

export const TrainingStats: React.FC<TrainingStatsProps> = ({ stats, categories }) => {
  // Prepare category data for chart
  const categoryData = stats.by_category.map(item => {
    const category = categories.find(cat => cat.id === item.category_id);
    return {
      name: category?.name || 'Unknown',
      value: item.count,
      color: category?.color || '#cccccc'
    };
  });

  // Stats cards data
  const statsCards = [
    { 
      title: 'Formations', 
      value: stats.total_courses, 
      description: 'formations disponibles'
    },
    { 
      title: 'Sessions actives', 
      value: stats.active_sessions, 
      description: 'sessions programmées'
    },
    { 
      title: 'Inscriptions', 
      value: stats.total_enrollments, 
      description: 'inscriptions totales'
    },
    { 
      title: 'Ce mois', 
      value: stats.enrollments_this_month, 
      description: 'nouvelles inscriptions'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsCards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}

      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Inscriptions par catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            config={{
              green: { color: '#10b981' },
              blue: { color: '#3b82f6' },
              red: { color: '#ef4444' },
              yellow: { color: '#f59e0b' },
              purple: { color: '#8b5cf6' },
            }}
            className="aspect-[4/3]"
          >
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded shadow-sm">
                        <p className="text-sm font-medium">{payload[0].name}</p>
                        <p className="text-sm font-bold">{`${payload[0].value} inscriptions`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Performance des formations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Taux de complétion</span>
            <span className="text-sm font-bold">{stats.completion_rate.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
            <div
              className="bg-primary h-3"
              style={{ width: `${stats.completion_rate}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-medium">Note moyenne</span>
            <div className="flex items-center">
              <div className="flex text-amber-500 mr-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(stats.average_rating)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-muted stroke-muted'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold">{stats.average_rating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingStats;
