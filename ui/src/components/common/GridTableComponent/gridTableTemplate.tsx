import { type RefObject } from 'react';
import type React from 'react';
import styles from './gridTableTemplate.module.scss';
import { isArray, isEmpty, isNil } from 'lodash';

export interface GridTableProps {
   tableData?: any[];
   tableRef?: RefObject<HTMLTableElement>;
}

export default function GridTableComponent(props: GridTableProps): JSX.Element {
   const data = [
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 100,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'vvvv',
         mode: 'Gpay',
         amount: 1000,
      },
   ];

   const getTableData = (): any[] => {
      if (isNil(props.tableData)) {
         return data;
      } else if (isEmpty(props.tableData)) {
         return data;
      } else if (!isArray(props.tableData)) {
         return data;
      } else {
         return props.tableData;
      }
   };

   const renderTable = (): React.ReactElement => {
      return (
         <div className={styles.tableContainer}>
            <table className={styles.tableContainer} ref={props.tableRef}>
               <thead>
                  <tr className={styles.headerTableRow}>
                     {Object?.keys(getTableData()[0])?.map((key : any, index : number) => (
                        <th className={styles.tableHorizontal} key={index}>
                           {key}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {getTableData().map((item : any, index : number) => (
                     <tr key={index} className={styles.tableRow}>
                        {Object?.values(item)?.map((value : any, idx: number) => (
                           <td className={styles.tableDiagonal} key={idx}>
                              {value}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      );
   };
   return <>{renderTable()}</>;
}
