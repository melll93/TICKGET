import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../styles/Calendar.css'; // css import

const MainCalendar = () => {
    const [value, onChange] = useState(new Date());

    /*****************달력에 마커 찍기 시작*****************

    const [mark, setMark] = useState([]);

    const { data } = useQuery(
        ["logDate", month],
        async () => {
            const result = await axios.get(
                `/api/healthLogs?health_log_type=DIET`
            );
            return result.data;
        },
        {
            onSuccess: (data: any) => {
                setMark(data);
                // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
            },
        }
    );
    *****************달력에 마커 찍기 끝*****************/

    return (
        <div>
            <Calendar className="react_calendar" onChange={onChange} value={value} />
        </div>
    )
}

export default MainCalendar
