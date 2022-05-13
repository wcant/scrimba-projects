const input = document.getElementById('input');
const outputs = document.querySelectorAll('.conversion');

handleInput();

input.addEventListener('change', handleInput);

function handleInput() {
    const val = input.value;
    const lengths = calculateLength(val);
    const volumes = calculateVolume(val);
    const mass = calculateMass(val);
    outputs[0].innerHTML = `${val} meters = ${lengths[0]} feet │ ${val} feet = ${lengths[1]} meters`;
    outputs[1].textContent = `${val} liters = ${lengths[0]} gallons │ ${val} gallons = ${lengths[1]} liters`;
    outputs[2].textContent = `${val} kilos = ${lengths[0]} pounds │ ${val} pounds = ${lengths[1]} kilos`;
}

function calculateLength(val) {
    const feet = val/0.3048;
    const meters = val*0.3048;
    return [feet.toFixed(3), meters.toFixed(3)];
}

function calculateVolume(val) {
    const gallons = val*0.264172;
    const liters = val/0.264172;
    return [gallons.toFixed(3), liters.toFixed(3)];
}

function calculateMass(val) {
    const pounds = val*2.20462;
    const kilograms = val/2.20462;
    return [pounds.toFixed(3), kilograms.toFixed(3)];
}