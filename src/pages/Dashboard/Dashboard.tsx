import { useState } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Select from '../../components/Select/Select';
import Chart from './components/Chart/Chart';
import StatCard from './components/StatCard/StatCard';
import styles from './Dashboard.module.css';
// import { optionsExample } from '../../exampleData';
import { useTranslation } from 'react-i18next';
import '../../i18n/i18n';
import { useLocalizedMonths } from '../../hooks/useLocalizedMonths';



function Dashboard() {
  const [month, setMonth] = useState<string>('');
  const months = useLocalizedMonths();
  const { t } = useTranslation();
  console.log(months);
  const selectedMonth = months.find(o => o.value === month);

  return (
    <div className={styles['container']}>
      <PageTitle>{t('dashboard.title')}</PageTitle>
      <div className={styles['stat-container']}>
        <StatCard direction='up' icon={0} infoText={t('dashboard.statCard.upYesterday')} percent={8.5} title={t('dashboard.statCard.user')} value='40,689' ></StatCard>
        <StatCard direction='up' icon={1} infoText={t('dashboard.statCard.upLastWeek')} percent={1.3} title={t('dashboard.statCard.order')} value='10293' ></StatCard>
        <StatCard direction='down' icon={2} infoText={t('dashboard.statCard.downYesterday')} percent={4.3} title={t('dashboard.statCard.sales')} value='$89,000' ></StatCard>
        <StatCard direction='up' icon={3} infoText={t('dashboard.statCard.upYesterday')} percent={1.8} title={t('dashboard.statCard.pending')} value='2040' ></StatCard>
      </div>
      <div className={styles['chart-container']}>
        <div className={styles['chart-head']}>
          <p className={styles['chart-title']}>{t('dashboard.chart.title')}</p>
          <Select options={months} selected={selectedMonth || null} placeholder={t('dashboard.chart.month')} onChange={setMonth}></Select>
        </div>
        <div></div>
        <Chart ></Chart>
      </div>
    </div>
  );
}

export default Dashboard;