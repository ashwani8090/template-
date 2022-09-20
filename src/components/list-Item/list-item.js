import React from "react";
import './list-item.css'

function TempList({data=[], renderItem=()=>{}}){
    return(
      <div>
       {
        data.map(renderItem)
       }
      </div>  
    );
}

export default TempList;