function performCalculations(cb) {
	cb(999, 1);
}

function add(arg1, arg2) {
	console.log('addition = ', arg1 + arg2);
}

function substract(arg1, arg2) {
	console.log('substract = ', arg1 - arg2);
}

performCalculations(add);
performCalculations(substract);

performCalculations((arg1, arg2) => {
	console.log('multiplication = ', arg1 * arg2);
});
