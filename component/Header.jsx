import { addLocation } from '@/redux/actions/locationActions';
import Head from '@/styles/Header.module.scss'
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const regions = [
    { id: 1, value: "Tashkent" },
    { id: 2, value: "Fergana" },
    { id: 3, value: "Andijan" },
    { id: 4, value: "Namangan" },
    { id: 5, value: "Samarkand" },
    { id: 6, value: "Gulistan" },
    { id: 7, value: "Jizzakh" },
    { id: 8, value: "Karshi" },
    { id: 9, value: "Boukhara" },
    { id: 10, value: "Khiva" },
    { id: 11, value: "Navai" },
    { id: 12, value: "Termiz" },
    { id: 13, value: "Nukus" },
]

const months = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr',
]

const Header = () => {

    const location = useSelector(state => state.location)
    const fetch = useSelector(state => state.fetchData)

    const dispatch = useDispatch()
    const router = useRouter()

    const [isActive, setIsActive] = useState(false);
    const divRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                divRef.current &&
                !divRef.current.contains(event.target) &&
                buttonRef.current !== event.target
            ) {
                setIsActive(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleButtonClick = () => {
        setIsActive(!isActive);
    };

    const date = new Date()

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000); // Update every 1 second

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formatTimeUnit = (unit) => {
        return unit.toString().padStart(2, '0');
    };

    const hours = formatTimeUnit(time.getHours());
    const minutes = formatTimeUnit(time.getMinutes());
    const seconds = formatTimeUnit(time.getSeconds());

    useEffect(()=>{
        getPrayTimeByCity()
    },[])

    const [prayTime, setPrayTime] = useState()

    const getPrayTimeByCity = async() =>{
        axios.get(`http://api.aladhan.com/v1/timingsByCity?city=Tashkent&country=Uzbekistan&method=8`)
            .then(res=>{
                const data = res.data
                setPrayTime(data.data)
            })
            .catch(err=>{
                console.log(err);
            })
    }

    return (
        <div className="container">
            <div className={Head.header}>
                <h3><Link href={`/times/${location}`}>Namoz Vaqtlari</Link></h3>
                <div className={Head.header__location}>
                    <h4>Hududni tanlang: </h4>

                    <p ref={buttonRef} className={isActive ? 'city active' : 'city'} onClick={handleButtonClick}>
                        {location ? location : 'Toshkent'}
                        <span>
                            &#10095;
                        </span>

                    </p>

                    <div ref={divRef} className={isActive ? 'city-select active' : "city-select"}>
                        {regions && regions.map(region => (
                            <p key={region.id} onClick={() => {
                                dispatch(addLocation(region.value))
                                setIsActive(false);
                                router.push(`/times/${region.value}`)
                            }}>
                                {region.value}
                            </p>
                        ))}

                    </div>
                </div>
                <div className={Head.header__time}>
                    <div className={Head.header__time__city}>
                        <h4>Mintaqa: <span className='text-yellow'>{location ? location : 'Toshkent'} shahri</span></h4>
                    </div>

                    <div className={Head.header__time__date}>
                        <Image src='/images/calendar.svg' alt='calendar' fill quality={90} />
                        <span className='text-yellow'>
                            {prayTime && prayTime.date.hijri.day}-{prayTime && prayTime.date.hijri.month.en}({prayTime && prayTime.date.hijri.month.ar}) {prayTime && prayTime.date.hijri.year}-yil {prayTime && prayTime.date.hijri.weekday.en}({prayTime && prayTime.date.hijri.weekday.ar})</span>
                    </div>

                    <div className={Head.header__time__date}>
                        <Image src='/images/calendar.svg' alt='calendar' fill quality={90} />
                        <span className='text-yellow'>{date.getDate()}-{months[date.getMonth()]} {date.getFullYear()}-yil</span>
                        <span>{hours}:{minutes}:{seconds}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;