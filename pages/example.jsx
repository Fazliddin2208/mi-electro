import axios from "axios";
import { useEffect } from "react";

const Example = () => {

    useEffect(()=>{
        getPrayCalendarByCity()
        getPrayTimeByCity()
    }, [])

    const getPrayCalendarByCity = async() =>{
        axios.get(` http://api.aladhan.com/v1/calendarByCity/2017/4?city=London&country=United Kingdom&method=2`)
            .then(res=>{
                const data = res.data
                console.log(data);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const getPrayTimeByCity = async() =>{
        axios.get(`http://api.aladhan.com/v1/timingsByCity?city=Tashkent&country=Uzbekistan&method=8`)
            .then(res=>{
                const data = res.data
                console.log(data);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    return(
        <>
            <h3>Hello World</h3>
        </>
    )
}

export default Example;