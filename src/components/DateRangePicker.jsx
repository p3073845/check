import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap-daterangepicker';

const DateRangePicker = ({ onDateSelect , startDate, endDate }) => {
  const datePickerRef = useRef(null);

  const handleCalendarClick = () => {
    if (datePickerRef.current) {
      $(datePickerRef.current).trigger('click');
    }
  };

  useEffect(() => {
    if (!datePickerRef.current) return;

    try {
      const start = startDate || moment().startOf('month');
      const end = endDate || moment();
      $(datePickerRef.current).daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment()],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        locale: {
          format: 'DD/MM/YYYY',
          separator: ' - '
        },
        timePicker: false
      }, function(start, end) {
        onDateSelect?.(start, end);
      });

      //      // Only set initial values if not provided through props
      if (!startDate && !endDate) {
        onDateSelect?.(start, end);
      }
    } catch (error) {
      console.error('Error initializing daterangepicker:', error);
    }

    return () => {
      try {
        $(datePickerRef.current).daterangepicker('remove');
      } catch (error) {
        console.error('Error cleaning up daterangepicker:', error);
      }
    };
  }, [onDateSelect, startDate, endDate]);

  return (
    <div className="input-group">
      <input 
        ref={datePickerRef}
        type="text" 
        className="form-control" 
        placeholder="Select date range"
        readOnly
      />
      <div className="input-group-append">
        <span className="input-group-text" onClick={handleCalendarClick} style={{ cursor: 'pointer' }}>
          <i className="fa fa-calendar"></i>
        </span>
      </div>
    </div>
  );
};

export default DateRangePicker;
