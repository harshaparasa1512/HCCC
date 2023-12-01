export interface DonationHistoryProps {
   RecieptNo: string;
   Date: string;
   Purpose: string;
   mode: string;
   amount: number;
}

export interface AuthProps {
   isLoggedIn: boolean;
}

export interface MeetingMinutesProps {
   "Meeting Date": string;
   "View Docunment": string;
   'File Size': string;
   'Uploaded On': string;
   'File Url': string;
}
