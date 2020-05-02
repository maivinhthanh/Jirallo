import 'moment';
import React from 'react';
import DateMomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers( {label, date, changedate} ) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date(date));

  const handleDateChange = date => {
    setSelectedDate(date);
    changedate(date)
  };

  return (
    <MuiPickersUtilsProvider utils={DateMomentUtils}>
        <KeyboardDatePicker
          margin="normal" fullWidth
          id="date-picker-dialog"
          label={label}
          format="DD/MM/YYYY"
          value={date}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
    </MuiPickersUtilsProvider>
  );
}