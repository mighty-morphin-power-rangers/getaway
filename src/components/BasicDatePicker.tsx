import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

export default function ResponsiveDateTimePickers(props:any) {
const { setAppointment } = props;

const chosenTime = (time:any)=>{
setAppointment(dayjs(time.$d).locale('en').format('MMMM D, YYYY h:mmA'))
}

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>


          <StaticDateTimePicker defaultValue={dayjs('2023-05-06T15:30')} sx={{ backgroundColor: '#CCD7FF' }} onChange={chosenTime} />


    </LocalizationProvider>
  );
}