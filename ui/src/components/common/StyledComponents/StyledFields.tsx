import { Box, Button, IconButton, InputLabel, Select, TextField, Checkbox, Radio, styled } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InputMask from 'react-input-mask';

export const CustomCheckbox = styled(Checkbox)`
   & svg {
      color: #f05802;
      height: 16px;
   }
`;
export const CustomRadioButton = styled(Radio)`
  & svg {
    color: #F05802;
    height: 24px;
    width: 24px;
  }
`;

export const CustomTextFeild = styled(TextField)`
   & input {
      background-color: #fff9e4;
      width: 370px;
      padding: 14px 16px;
      border-radius: 8px;
      height: 20px;
      border: 1px solid #fff9e4;

      :hover {
         border-color: #F05802;
               }
   }
   & fieldset {
      border-style: unset;
   }
`;


export const CustomTextFeildforFamily = styled(TextField)`
   & input {
      background-color: white;
      width: 370px;
      padding: 14px 16px;
      border-radius: 8px;
      height: 20px;
   }
   & fieldset {
      border-style: unset;
   }
`;
export const CommonButton = styled(Button)`
   border-radius: 4px;
   background: #f05802;
   display: inline-flex;
   padding: 8px 16px;
   height: 38px;
   box-shadow: none;
   width: auto;
   color: #fff;
   text-transform: capitalize;
   align-items: flex-start;
   text-align: center;
   gap: 10px;
   &:hover{
      color: #fff;
      background-color: #f05802;

                           
   }
`;

export const CommonOutlinedButton = styled(Button)`
   border-radius: 4px;
   background: #ffffff;
   display: inline-flex;
   padding: 8px 16px;
   height: 38px;
   box-shadow: none;
   width: auto;
   color: #f05802;
   border-color:#f05802;
   text-transform: capitalize;
   align-items: flex-start;
   text-align: center;
   gap: 10px;
   &:hover{
      color: #fff;
      background-color: #f05802;

                           
   }
`;


export const LeftAndRightStyledIconsButton = styled(IconButton)`
   box-shadow:
      rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
   padding: 4px;
   background-color: #efe4c5;
   height: 30px;
   top: 95px;
`;
export const CustomSelect = styled(Select)`
   & svg {
      color: #F05802;
   }
   & div {
      overflow: unset;
      padding: 14px 16px;
      height: 20px !important;
      min-height: 0px !important;
      border-radius: 8px;
      background:#FFF9E4;
      min-width: 0 !important;
   }
   & input {
      padding: 14px 16px;
      height: 20px;
   }
   & fieldset {
      border-style: unset;
   }
`;
export const CustomSelectforFamily = styled(Select)`
   & svg {
      color: #F05802;
   }
   & div {
      overflow: unset;
      padding: 14px 16px;
      height: 20px !important;
      min-height: 0px !important;
      border-radius: 8px;
      background: white;
      min-width: 0 !important;
   }
   & input {
      padding: 14px 16px;
      height: 20px;
   }
   & fieldset {
      border-style: unset;
   }
`;

export const StyledDateContainer = styled(Box)`
   & div {
      overflow: unset;
      padding-top: 0px;
      border-radius: 8px;
      min-width: 0 !important;
   }
`;
export const CustomInputLabel = styled(InputLabel)`
   color: #313131;
   font-family: Lato;
   font-size: 14px;
   font-style: normal;
   font-weight: 400;
   line-height: 20px;
   margin-bottom: 2px;
`;

// This is for Phone Number in US Format
export const ContactNumberInput = styled(InputMask)`
   background-color: #fff9e4;
   padding: 14px 16px;
   border-radius: 8px;
   height: 20px;
   border: 1px solid #f05802;
   & input {
      border: none !important;
   }

   :hover {
      border-color: #f05802;
   }
`;

export const CustomDateRangePicker = styled(DateRangePicker)`
   & div {
      display: flex;
      flex-direction: row;
      align-items: center;
      & input {
         padding: 0px;
         margin-bottom: -2px;
         align-items: center;
         font-size: 14px;
         font-style: normal;
         font-weight: 400;
      }
      & fieldset {
         border-style: none;
      }
   }
`;

export const CustomDatePicker = styled(DatePicker)`
   & div {
      display: flex;
      flex-direction: row;
      align-items: center;
      & input {
         padding: 14px 16px;
         height: 20px;
         align-items: center;
         font-size: 14px;
         font-style: normal;
         font-weight: 400;
      }
      :hover {
         /* border: 1px solid #F05802; */
      }
      & fieldset {
         border-style: none;
      }
   }
`;
export const CustomTimePicker = styled(TimePicker)`
   & div {
      display: flex;
      flex-direction: row;
      align-items: center;
      & input {
         padding: 14px 16px;
         height: 20px;
         align-items: center;
         font-size: 14px;
         font-style: normal;
         font-weight: 400;
      }
      & fieldset {
         border-style: none;
      }
   }
`;

export const CustomDateTimePicker = styled(DateTimePicker)`
   & div {
      display: flex;
      flex-direction: row;
      align-items: center;
      & input {
         padding: 0px;
         margin-bottom: -2px;
         align-items: center;
         font-size: 14px;
         font-style: normal;
         font-weight: 400;
      }
      & fieldset {
         border-style: none;
      }
   }
`;
//adding custom info for View  Request
export function CustomInfo(): JSX.Element {
   return (
      <InfoOutlinedIcon
         sx={{
            color: '#F05802',
            fontSize: '14px',
            width: '24px',
            height: '24px',
            // marginRight: '-6px',
            cursor: 'pointer',
         }}
      />
   );
}
export function CustomCalendarIcon(): JSX.Element {
   return (
      <CalendarTodayOutlinedIcon
         sx={{
            color: '#22A699',
            fontSize: '14px',
            width: '16px',
            height: '16px',
            marginRight: '-6px',
            cursor: 'pointer',
         }}
      />
   );
}

export function CustomCalendarTodayOutlinedIcon(): JSX.Element {
   return (
      <CalendarTodayOutlinedIcon
         sx={{
            color: '#F05802',
            fontSize: '14px',
            width: '16px',
            height: '16px',
            marginRight: '0px',
            cursor: 'pointer',
         }}
      />
   );
}

export function CustomEditIcon(): JSX.Element {
   return (
      <EditIcon
         sx={{
            color: '#F05802',
            fontSize: '14px',
            width: '16px',
            height: '16px',
            padding: '5px',
            marginRight: '-6px',
            cursor: 'pointer',
         }}
      />
   );
}

export function CustomDeleteIcon(): JSX.Element {
   return (
      <DeleteIcon
         sx={{
            color: '#F05802',
            fontSize: '14px',
            width: '16px',
            height: '16px',
            padding: '5px',
            marginRight: '-6px',
            cursor: 'pointer',
         }}
      />
   );
}

export function CustomTimeOutlinedIcon(): JSX.Element {
   return (
      <AccessTimeOutlinedIcon
         sx={{
            color: '#F05802',
            fontSize: '14px',
            width: '16px',
            height: '16px',
            marginRight: '0px',
            cursor: 'pointer',
         }}
      />
   );
}

export function CustomLocationOutlinedIcon(): JSX.Element {
   return (
      <PlaceOutlinedIcon
         sx={{
            color: '#22A699',
            fontSize: '14px',
            width: '18px',
            height: '18px',
            marginRight: '0px',
            cursor: 'pointer',
         }}
      />
   );
}

export function CustomCalendarOutlinedIcon(): JSX.Element {
   return (
      <CalendarTodayOutlinedIcon
         sx={{
            color: '#22A699',
            fontSize: '14px',
            width: '18px',
            height: '18px',
            marginRight: '0px',
            cursor: 'pointer',
         }}
      />
   );
}
export const CustomSearchFeild = styled(TextField)`
   & input {
      border-radius: 8px;
   }
   & fieldset {
      border-style: unset;
   }
   & placeholder {
      color: black;
   }
`;
