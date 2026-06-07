// BMI Calculator (for Resources page)
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    
    if (weight && height) {
        const bmi = weight / (height * height);
        document.getElementById('bmi-result').textContent = bmi.toFixed(1);
        
        let category = '';
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';
        
        document.getElementById('bmi-category').textContent = category;
    }
}

// Dosage Calculator
function calculateDosage() {
    const weight = parseFloat(document.getElementById('dose-weight').value);
    const dosePerKg = parseFloat(document.getElementById('dose-per-kg').value);
    
    if (weight && dosePerKg) {
        const totalDose = weight * dosePerKg;
        document.getElementById('dosage-result').textContent = `${totalDose.toFixed(1)} mg`;
    }
}