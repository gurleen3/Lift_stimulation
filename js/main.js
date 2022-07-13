let Container=document.getElementsByClassName('Container')
let floorOrder=[]

window.scrollTo(0,0);
function Create(){

    let floor=parseInt(document.getElementById('NumberOfFloor').value);
    let lifts = parseInt(document.getElementById('NumberOfLift').value);
    if(floor>0 && lifts>0 )
    {
        let floorContainer = document.createElement("div");
        floorContainer.classList.add("Floors")
     
        for(let i=floor-1;i>=0;--i)
        {
            let floor1=        `<div class="FloorContainer">
            <div class="ButtonContainer">
               ${i!==floor-1 ?  `<button class="up-button ${i}" id="${i}" onclick="handleclick(id)"> up </button>`:``}
               ${i!==0 ?  `<button class="down-button ${i}" id="${i}" onclick="handleclick(id)"> down </button>`:``}
            </div>
            <div class="FloorDetail">
                <div class="Line"></div><h3>Floor ${i}</h3>
            </div>
        </div>`
        floorContainer.innerHTML+= floor1;   
        }
        let ElevatorContainer = document.createElement("div");
        ElevatorContainer.classList.add("ElevatorContainer")
        for(let i=0;i<lifts;i++){
            let elevator=`
            <div id="Lift" class="SingleLift" style="left:${((i+1)*15)+"%"}">
                <div class="LeftDoor" ></div>
                <div class="RightDoor" ></div>
            </div>`
            floorContainer.innerHTML+=elevator
        }
        
        Container[0].innerHTML=''
        Container[0].prepend(floorContainer)
       
    }
    else{
        alert('Enter Valid number')
    }
}

function MoveLift(id,FreeLift){
    if(!FreeLift.classList.contains("busy"))
    {
        FreeLift.style.transform=`translateY(-${(272 *(parseInt(id)))}px)`
        FreeLift.classList.add('busy')
        setTimeout( ()=>{FreeLift.children[0].classList.add('OpenLeftDoor'); FreeLift.children[1].classList.add('OpenRightDoor')},4500) 
        setTimeout( ()=>{FreeLift.children[0].classList.remove('OpenLeftDoor'); FreeLift.children[1].classList.remove('OpenRightDoor')},8500) 
        setTimeout( ()=>{FreeLift.classList.remove('busy')},11000) 
    }
}

var flag=1;

function handleclick(id){
    let Alllift=document.querySelectorAll('#Lift')
    let FreeLift=FreeLiftdiV(Alllift)

        floorOrder.push(id)

        setInterval(() => {
        if(floorOrder.length)
        {
            FreeLift=FreeLiftdiV(Alllift)
            if(!FreeLift.classList.contains("busy")){
                MoveLift(floorOrder.shift(),FreeLift)
            }
            else{
                console.log('No lift is Free')
            }

        }

       }, 2000);
 
}

function FreeLiftdiV(Alllift)
{
    let liftsArray = Array.from(Alllift)
    for( i = 0 ; i < liftsArray.length ; i++){
        if(!liftsArray[i].classList.contains("busy")){
          return liftsArray[i];
        }
    } 
    return 0;
}

