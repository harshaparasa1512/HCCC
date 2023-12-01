import { Typography } from '@mui/material'
import GridTableComponent from '../GridTableComponent/gridTableTemplate'
import styles from './listItemOfAdded.module.scss';
import { CustomDeleteIcon } from '../StyledComponents/StyledFields';

const ListOfItemAdded = () => {
    const ItemAddedData = [
        {
            Type: "Vinay",
            "Pooja Title": "06/11/2023",
            "Date Of Pooja": "abcd@gmail.com",
            "Priest Name": "Father",
            Deities: "-",
            Purpose: "Archana",
            Description: "Archana",
            Amount: "$200",
            "": (
                <div>
                    <CustomDeleteIcon />
                </div>
            ),
        },
    ]
    return (
        <div>
            <div className={styles.familyDetails}>
                <Typography sx={{ marginTop: "20px", marginBottom: "20px" }} component="div" className={styles.typoGraphy}>List of Item Added</Typography>
                <GridTableComponent tableData={ItemAddedData} />
                <div className={styles.notePointCountDivContainer}>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td ><Typography className={styles.typoGraphy} sx={{ paddingLeft: "855px" }}>Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${200.00}</Typography></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ListOfItemAdded;
