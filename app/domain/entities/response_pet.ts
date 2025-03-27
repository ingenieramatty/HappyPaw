import type { Pet } from "./pet";

export interface ResponsePet{
    $metadata:{
        httpStatusCode:number,
        requestId:string,
        attempts:number,
        totalRetryDelay:number,
         },
         Count:number,
        Items:Pet[],
        ScannedCount:number,
   
}