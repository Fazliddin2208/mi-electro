import axios from "axios";
import Card from '@/styles/Cards.module.scss'
import Image from "next/image";

export const getServerSideProps = async (context) => {
    const query = context.query;

    const res1 = await axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${query.city ? query.city : 'Tashkent'}&country=Uzbekistan&method=8`)
    const data1 = await res1.data

    return {
        props: {
            time: data1.data.timings,
        }
    }
}

const Times = ({ time }) => {
    return (
        <div className={Card.wrapper}>
            <div className={Card.card}>
                <h3 className='text-yellow'>Bomdod</h3>
                <Image src='/images/fajr.svg' alt='fajr' fill quality={90} />
                <h2>{time.Fajr}</h2>
            </div>

            <div className={Card.card}>
                <h3 className='text-yellow'>Quyosh</h3>
                <Image src='/images/sunrise.svg' alt='fajr' fill quality={90} />
                <h2>{time.Sunrise}</h2>
            </div>

            <div className={Card.card}>
                <h3 className='text-yellow'>Peshin</h3>
                <Image src='/images/sun.svg' alt='fajr' fill quality={90} />
                <h2>{time.Dhuhr}</h2>
            </div>

            <div className={Card.card}>
                <h3 className='text-yellow'>Asr</h3>
                <Image src='/images/asr.svg' alt='fajr' fill quality={90} />
                <h2>{time.Asr}</h2>
            </div>

            <div className={Card.card}>
                <h3 className='text-yellow'>Shom</h3>
                <Image src='/images/shom.svg' alt='fajr' fill quality={90} />
                <h2>{time.Maghrib}</h2>
            </div>

            <div className={Card.card}>
                <h3 className='text-yellow'>Xufton</h3>
                <Image src='/images/moon.svg' alt='fajr' fill quality={90} />
                <h2>{time.Isha}</h2>
            </div>
        </div>
    )
}

export default Times;