import Card from '@/styles/Cards.module.scss'
import PrayCard from './PrayCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Cards = () => {

    const location = useSelector(state=>state.location)
    const fetch = useSelector(state=>state.fetchData)

    useEffect(() => {
        getPrayTimeByCity()
    }, [])

    const [prayTime, setPrayTime] = useState()

    const arr = []
    const getPrayTimeByCity = async () => {
        axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${location ? location : 'Tashkent'}&country=Uzbekistan&method=8`)
            .then(res => {
                const data = res.data.data.timings
                arr.push({name:'Bomdod', time:data.Fajr})
                arr.push({name:'Quyosh', time:data.Sunrise})
                arr.push({name:'Peshin', time:data.Dhuhr})
                arr.push({name:'Asr', time:data.Asr})
                arr.push({name:'Shom', time:data.Maghrib})
                arr.push({name:'Xufton', time:data.Isha})
                setPrayTime(arr)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className={Card.wrapper}>
            {prayTime && prayTime.map((time,index)=>(
                <PrayCard key={index} time={time} />
            ))}
        </div>
    )
}

export default Cards;