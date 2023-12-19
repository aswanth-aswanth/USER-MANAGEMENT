// function delayPrint(value, delay) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(value);
//       resolve();
//     }, delay);
//   });
// }

// delayPrint('a', 2000)
//   .then(() => delayPrint('b', 1000))
//   .then(() => delayPrint('c', 500))
//   .then(() => delayPrint('d', 2000))
//   .catch((error) => console.error(error));



  // function delayPrint(value,delay){
  //   return new Promise((resolve)=>{
  //     setTimeout(()=>{
  //       console.log(value)
  //       resolve();
  //     },delay);
  //   })
  // }

  // delayPrint('a',2000)
  // .then(()=>delayPrint('b',1000))
  // .then(()=>delayPrint('c',400))
  // .then(()=>delayPrint('d',2000))
  // .catch((err)=>console.log(err))

  function* a(){
    let temp=0;
    while(true){
      yield temp++;
    }
  }


  let temp1=a();
  let temp2=0;
  while(temp2>=0&&temp2!=100){
    temp2=temp1.next().value;
    console.log(temp2);
    // console.log(temp.next().value);
  }