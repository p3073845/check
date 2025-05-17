import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import moment from 'moment';
import 'daterangepicker';

const DateRangePicker = ({ onDateSelect }) => {
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (!datePickerRef.current) return;

    const picker = $(datePickerRef.current).daterangepicker({
      startDate: moment().subtract(7, 'days'),
      endDate: moment(),
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    });

    picker.on('apply.daterangepicker', (event, picker) => {
      if (onDateSelect) {
        onDateSelect(picker.startDate, picker.endDate);
      }
    });

    return () => {
      if (picker && picker.data('daterangepicker')) {
        picker.off('apply.daterangepicker');
        picker.data('daterangepicker').remove();
      }
    };
  }, [onDateSelect]);

  return (
    <input 
      ref={datePickerRef}
      type="text" 
      className="form-control" 
      placeholder="Select date range"
    />
  );
};

export default DateRangePicker;
