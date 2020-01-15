var count = 0;
var OldparseInt = parseInt;

function parseInt () {
    count += 1;
    return OldparseInt.apply(null, arguments);
}

parseInt('10');
parseInt('20');
parseInt('30');
console.log('count = ' + count);