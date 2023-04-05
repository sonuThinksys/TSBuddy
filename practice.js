console.log('Hello world!');
const prom = new Promise((resolve, reject) => {
  setTimeout(() => {
    const er = new Error('OH Shit!');
    // console.log('er:', er);
    // reject('Promise reject hua!', er);
  }, 2000);
});

console.log('Hello world Khatam!');

prom
  .then(data => {
    console.log('data finally aaya:', data);
  })
  .catch(err => {
    console.log('err:', err);
  });
