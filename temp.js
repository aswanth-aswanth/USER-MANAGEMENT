process.nextTick(() => { 
    console.log('nextTick callback'); 
  }); 
   
  setImmediate(() => { 
    console.log('setImmediate callback'); 
  }); 
   
  console.log('End of script'); 