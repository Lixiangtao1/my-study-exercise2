function makeIterator(array) {
    var nextIndex = 0;
    return {
      next: function() {
        return nextIndex < array.length ?
          {value: array[nextIndex++], done: false} :
          {value: undefined, done: true};
      }
    };
}
const ss = new makeIterator(['a', 'b']);
console.log(ss.next());
console.log(ss.next());
console.log(ss.next());



