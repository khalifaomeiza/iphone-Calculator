const hour = document.querySelector(".hour")
const minute = document.querySelector('.minute')
const display = document.querySelector('.display')

//targeting functions
const ac = document.querySelector('.ac')
const plusMinus = document.querySelector('.plus-minus')
const percent = document.querySelector('.percent')

//targeting operators
const division = document.querySelector('.division')
const multiplication = document.querySelector('.multiplication')
const subtraction = document.querySelector('.subtraction')
const addition = document.querySelector('.addition')
const equal = document.querySelector('.equal')

//targeting numbers
const number0 = document.querySelector('.number-0')
const number1 = document.querySelector('.number-1')
const number2 = document.querySelector('.number-2')
const number3 = document.querySelector('.number-3')
const number4 = document.querySelector('.number-4')
const number5 = document.querySelector('.number-5')
const number6 = document.querySelector('.number-6')
const number7 = document.querySelector('.number-7')
const number8 = document.querySelector('.number-8')
const number9 = document.querySelector('.number-9')
const decimal = document.querySelector('.decimal')


//creating a number array which are in order with the index
const numArray = [
    number0, number1, number2, number3, number4, number5, number6, number7, number8, number9
]


//Adding Event LIsteners to numbers 
for (let i=0; i<numArray.length; i++ ){
   const number = numArray[i]
    number.addEventListener('click', ()=>{
        //bascically "console.log(i)" would give on the console the index which corresponds to the number value been clicked. But in considering, the data structure which largely affects computation... we need to carefully recognize & handle string and Number values, thus we have to be very explicit.
        
        
        //a call to the handleNumberClick funtion 
      handleNumberClick(i.toString())
    })
}



//functions

 //indexStr is the number clicked received as a string representation of the index of number clicked i.e (i)
 const handleNumberClick = (indexStr)=>{
   //  const currentDisplayStr = display.textContent;
    const currentDisplayStr = getDisplayValueStr();

    // once we have a current display value, we concatenate other values by adding up the currentDisplayStr to the indexStr.
    
    if (currentDisplayStr === '0'){
      //   display.textContent= indexStr
      setStrValue(indexStr)
    }else {
      //   display.textContent = parseFloat(currentDisplayStr + indexStr).toLocaleString();
       setStrValue(currentDisplayStr + indexStr)


      //results from here is initially assigned to currentDisplay which is transforms currentDisplay into a localString that cannot be parsed into Float(numbers), without stripping the comma.
        
    }
    
    
 }

 
 //stripping the comma's on the currentDisplay string so that 2,222 + 2 != NaN
 const getDisplayValueStr = () =>{
    return display.textContent.split(',').join('')
 }

 const getDisplayValueNum = () =>{
    return parseFloat(getDisplayValueStr())

 }
 const setStrValue = (valueStr)=> {
   //conditional for when the last value of the argument passed into the function as a valueStr is a decimal sign. otherwise, the parseFloat convert the valueStr into a number and deletes the decimal before making it a Local string
   if (valueStr[valueStr.length-1]===".") {
      display.textContent += "."
   }else {
      display.textContent = parseFloat(valueStr).toLocaleString();
   }
   // splitting the valuStr at the decimal "." restricting the toLocaleString() method to only the whole number. 

   // const [wholeNumStr, decimalStr] =  valueStrSplitterArray 
   //  valueStrSplitterArray = valueStr.split('.');

   const [wholeNumStr, decimalStr] = valueStr.split('.');
   if (decimalStr){
      display.textContent = parseFloat(wholeNumStr).toLocaleString() +'.'+ decimalStr

   }
  
   


 }

//Adding Event Listeners to decimal
  decimal.addEventListener('click', ()=>{
    currentDisplayStr = getDisplayValueStr();
     
   //a conditional to ensure that the decimal sign get displayed only once.
     if (currentDisplayStr.includes(".")){
      // display.textContent = currentDisplayStr
      setStrValue(currentDisplayStr);


     }else {
      // display.textContent = currentDisplayStr + '.';
      setStrValue(currentDisplayStr + '.')
     }
     //with this been achieved, the display would only accept 3 decimal places and subsequent numbers are approximated into the existing 3d.p which is because we are using a toLocaleString()

  });

//   //Adding Event Listeners to functions

ac.addEventListener('click', ()=>{
   resetCalc()
   setStrValue('0')
   
})

percent.addEventListener('click', ()=>{
   const result = getDisplayValueNum()*0.01
   setStrValue(result.toString())

   resetCalc()

})
plusMinus.addEventListener('click', ()=> {
   const currentValueDisplay = getDisplayValueNum() 

   if (currentValueDisplay > 0){
      let newValue = currentValueDisplay * -1
      setStrValue (newValue.toString())
   }else {
      let newValue = currentValueDisplay * -1
      setStrValue (newValue.toString())
      
   }

})

//Add EventLitseners to the Operators
addition.addEventListener('click',
()=>{ handleOperatorClick("addition")})

subtraction.addEventListener('click',
()=>{ handleOperatorClick("subtraction")}
)
division.addEventListener('click',
   ()=>{ handleOperatorClick("division")}
)
multiplication.addEventListener('click',
   ()=>{ handleOperatorClick("multiplication")}
)
equal.addEventListener('click',
()=>{ 
   if (valueStrInMemory){
       
   }
}
)

let valueStrInMemory = null
let operatorInMemory = null

const resetCalc = ()=> {
   //variables to keep data in memory
   valueStrInMemory = 0
  operatorInMemory = 0
}


const handleOperatorClick = (operation)=> {
   //since the operator is a string
   const currentDisplayStr = getDisplayValueStr()
   const currentDisplayNum = getDisplayValueNum()

   //initializing Calculation
   if (!valueStrInMemory) {
      valueStrInMemory = currentDisplayStr;
      operatorInMemory = operation;
      //upating display
      setStrValue('0')

   }else {

      let newValueNum;
      valueStrInMemory = parseFloat(valueStrInMemory)

      if (operatorInMemory === "addition") {
         newValueNum = valueStrInMemory + currentDisplayNum
         console.log(newValueNum)

      
      }else if (operatorInMemory === "subtraction") {
         newValueNum = valueStrInMemory - currentDisplayNum
         console.log(newValueNum)

      }else if (operatorInMemory === "division") {
         newValueNum = valueStrInMemory - currentDisplayNum
         console.log(newValueNum)

      }else if (operatorInMemory === "multiplication") {
         newValueNum = valueStrInMemory * currentDisplayNum
         console.log(newValueNum)

      }else if (operation === "equal") {
      console.log(display.textContent)

      }
   }

}

//we want our calculator to constantly save variable in order to chain operations




















//Set time based on real time
//using the setInterval Function which accepts only two parameters; a function and a timedelay

const updateTime = ()=>{
        //the "new Date()' is a js object which contains the browser's Date and Time, saved into the constant variable "currentTime"
        const currentTime = new Date();
        //the currentTime is a object with .getHours() & .getMinutes() as part of it's key-value pair.
         let currentHour = currentTime.getHours()
         let currentMinutes = currentTime.getMinutes()

         if (currentHour > 12){
            currentHour -= 12
         }
         
         //updating Minutes & Hours to the DOM
         hour.textContent = currentHour;
         minute.textContent = currentMinutes.toString().padStart(2, '0');
}

// setInterval(()=> {}, 1000 )
setInterval(updateTime, 1000)
updateTime()