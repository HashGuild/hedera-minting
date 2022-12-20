
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { NftFormErrors, StepOneErrors } from './Interfaces';
import getAccountInfo from './getAccountInfo';

 export default async function isAccountIdValid (e: ChangeEvent<HTMLInputElement>, formDataErrors: NftFormErrors | StepOneErrors, setFormDataErrors: Dispatch<SetStateAction<any>>) {
    if (e.target.name === 'accountId' && e.target.value?.length > 5) {
     const result = await getAccountInfo(e.target.value)
 
     if (!result) {
       setFormDataErrors({
         ...formDataErrors,
         accountIdError: true,
       });
     } else {
       setFormDataErrors({
         ...formDataErrors,
         accountIdError: false,
       });
     }
     }
   }
