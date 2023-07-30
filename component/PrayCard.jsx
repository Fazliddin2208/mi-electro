import Card from '@/styles/Cards.module.scss'
import Image from 'next/image';

const images = [
    '/images/fajr.svg',
    '/images/sunrise.svg',
    '/images/sun.svg',
    '/images/asr.svg',
    '/images/shom.svg',
    '/images/moon.svg',
]

const PrayCard = ({ time }) => {
    return (
        <div className={Card.card}>
            <h3 className='text-yellow'>{time.name}</h3>
            <Image src={time.name == 'Bomdod' ?
                images[0] : time.name == 'Quyosh' ?
                    images[1] : time.name == 'Peshin' ?
                        images[2] : time.name == 'Asr' ?
                            images[3] : time.name == 'Shom' ?
                                images[4] : images[5]
            } alt='fajr' fill quality={90} />
            <h2>{time.time}</h2>
        </div>
    )
}

export default PrayCard;