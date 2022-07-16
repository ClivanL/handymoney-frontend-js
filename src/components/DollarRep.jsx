const DollarRep=({value})=>{
    let final=""
    if(value<0){
        final="-$"+Math.abs(value).toFixed(2).toString();
    }
    else{
        final="$"+value.toFixed(2).toString();
    }
    return(<>{final}</>)
}

export default DollarRep;