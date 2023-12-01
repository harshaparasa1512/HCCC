import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './poojaBooking.module.scss';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// import EventIcon from '@mui/icons-material/Event';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);

const PoojaBooking: React.FunctionComponent  = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const onChangeCheckBox = (itemName: string): void => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(item => item !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const cartVisibility = ():React.ReactElement => {
    return (
      <div
        style={{
          color: 'action.active',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <Badge color="secondary" badgeContent={selectedItems.length}>
            <ShoppingCartIcon />
          </Badge>
        </div>
      </div>
    );
  }

  const HandlePoojaItems = () :void => {
    setIsOpen(true);
  }

  const handleClose = () :void => {
    setIsOpen(false);
  };

  const BasicDateTimePicker = ():React.ReactElement => {
    return (
      <div className={styles.dateAndTimePicker}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
            label=" "
            format="D MMM YY | H:MM A"
            className={styles.datepickerandtime}
          />
        </DemoContainer>
      </LocalizationProvider>
      </div>
    );
  }


  const Cardheader = ():React.ReactElement => {
    return (
      <div className={styles.cardHeaderAndIcon}>
        <Typography component="div" className={styles.typoGraphy}>
          Pooja Booking
        </Typography>
        <div style={{ fontSize: '20px', padding: "5px" }} >
          {cartVisibility()}
        </div>
        <Button className={styles.buttonPaynow}>Pay Now</Button>
      </div>
    )
  }

  const radioButtons = ():React.ReactElement => {
    return (
      <RadioGroup className={styles.formGroup}>
        <FormControlLabel value="temple" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 10 } }} />} label="Temple" />
        <FormControlLabel value="home" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 10 } }} />} label="Home" />
      </RadioGroup>
    )
  }


  const FrequentlyBookedCard = ():React.ReactElement => {
    const exampleNames = [
      {
        name: "Laxmi Sahasranama Archana"
      },
      {
        name: "Ganesha Puja"
      },
      {
        name: "Durga Aarti"
      },
      {
        name: "Hanuman Chalisa"
      },
    ];

    return (
      <>
        {exampleNames.map((exampleName, index) => (
          <CardContent className={styles.cardContent} key={index}>
            <div className={styles.boxContent}>
              <Checkbox checked={selectedItems.includes(exampleName.name)} onChange={() :void => { onChangeCheckBox(exampleName.name); }} />
              <div className={styles.boxContent1}>
                <Typography component="div" className={styles.typoGraphyText}>
                  {exampleName.name}
                </Typography>
                {radioButtons()}
              </div>
              <div className={styles.poojaItemsAndcalenderbox}>
                <p className={styles.poojaItems} onClick={HandlePoojaItems}>Pooja items</p>
                <div className={styles.calenderIconAndDate}>
                  <div className={styles.calenderIcon}>
                    {BasicDateTimePicker()}
                  </div>
                  {/* <p>selected date: {selectedDate}</p> */}
                  {/* <EventIcon onClick={handleDateDialog} onChange={onChangeDate} className={styles.calenderIcon} /> */}
                </div>
              </div>
            </div>
          </CardContent>
        ))}
      </>
    )
  }


  const AllPoojasCard = ():React.ReactElement => {
    const allpoojaexamples = [
      {
        name: "Puja 1"
      },
      {
        name: "Puja 2"
      },
      {
        name: "Puja 3"
      },
      {
        name: "Puja 4"
      },
    ];
    return (
      <>
        {allpoojaexamples.map((allpoojaName, index) => (
          <CardContent className={styles.cardContent} key={index}>
            <div className={styles.boxContent}>
              <Checkbox checked={selectedItems.includes(allpoojaName.name)} onChange={() :void => { onChangeCheckBox(allpoojaName.name); }} />
              <div className={styles.boxContent1}>
                <Typography component="div" className={styles.typoGraphyText}>
                  {allpoojaName.name}
                </Typography>
                {radioButtons()}
              </div>
              <div className={styles.poojaItemsAndcalenderbox}>
                <p className={styles.poojaItems} onClick={HandlePoojaItems}>Pooja items</p>
                <div className={styles.calenderIconAndDate}>
                  {BasicDateTimePicker()}
                </div>
              </div>
            </div>
          </CardContent>
        ))}
      </>
    )
  }


  const poojaItemsList = ():React.ReactElement => {
    const poojaItems = [
      { item: 'Incense Sticks', quantity: '1 pack' },
      { item: 'Camphor', quantity: '1 small div' },
      { item: 'Candles', quantity: '2 candles' },
      { item: 'Flowers', quantity: '1 bouquet' },
      { item: 'Fruits', quantity: '5 pieces' },
      { item: 'Coconut', quantity: '1 coconut' },
      { item: 'Rice', quantity: '1 cup' },
      { item: 'Sandalwood Paste', quantity: '1 small container' },
      // Add more items as needed
    ];


    return (
      <>
        <Dialog className={styles.dialogBoxMain} open={isOpen}>
          <div style={{ backgroundColor: "#D9D9D9" }}>
            <DialogTitle sx={{ fontWeight: 700, fontSize: 20 }}>{"Pooja Items"}</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme:any) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <DialogContent className={styles.dialogContent}>
            <DialogContentText id="alert-dialog-slide-description">
              <table>
                <tr>
                  <th>Item Names</th>
                  <th>Quantity</th>
                  <th>Item Names</th>
                  <th>Quantity</th>
                </tr>
                {poojaItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item}</td>
                    <td>{item.quantity}</td>
                    <td>{item.item}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </table>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </>
    )
  }


  return (
    <Card className={styles.cardContainer}>
      {Cardheader()}
      <div className={styles.maindiv}>
        <Typography component="div" sx={{ fontSize: '15px', fontWeight: "600", paddingTop: "10px" }}>
          Frequently Booked
        </Typography>
        {FrequentlyBookedCard()}
      </div>
      <div className={styles.maindiv}>
        <Typography component="div" sx={{ fontSize: '15px', fontWeight: "600", paddingTop: "10px" }}>
          All Pooja's
        </Typography>
        {AllPoojasCard()}
      </div>
      {isOpen ? poojaItemsList() : ""}
    </Card>
  );
}

export default PoojaBooking;