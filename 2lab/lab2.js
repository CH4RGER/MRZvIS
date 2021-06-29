/*
    Created by Maxim Borisevich on 06.06.2018
*/

var matrixA = [];
var matrixB = [];
var matrixC = [];
var addition, subtraction, abs, compare, multiplication, squaring;

function start() {

    readValues();

    if (!p || !m || !q || !abs || !multiplication || !compare || !subtraction || !squaring || !addition || !n)
        alert("Одно или несколько полей пусты, либо содержат только пробелы");
    else {
        var flag = false;

        if (p.match(/^\d+$/) || m.match(/^\d+$/) || q.match(/^\d+$/) || abs.match(/^\d+$/) || n.match(/^\d+$/) || compare.match(/^\d+$/) || multiplication.match(/^\d+$/) || addition.match(/^\d+$/) || subtraction.match(/^\d+$/) || squaring.match(/^\d+$/)) {
            p = +p;
            m = +m;
            q = +q;
            abs = +abs;
            compare = +compare;
            multiplication = +multiplication;
            subtraction = +subtraction;
            squaring = +squaring;
            addition = +addition;
            n = +n;

        } else
            flag = true;

        if (flag)
            alert("Поля могут содержать только целые числа");
        else {
            var flag = false;

            if (p <= 0 || m <= 0 || q <= 0 || abs <= 0 || compare <= 0 || multiplication <= 0 || subtraction <= 0 || squaring <= 0 || addition <= 0 || n <= 0)
                flag = true;

            if (flag)
                alert("Поля могут содержать только положительные числа");
            else {

                matrixA = genMatrix(p, m);
                matrixB = genMatrix(m, q);
                matrixC = genMatrix(p, q);

                calculate(m,n);

                document.getElementById('MatrixATitle').innerHTML = "<br>Матрица A(p*m)";
                    for (var row = 0; row < p; row++) {
                        document.getElementById('MatrixA').insertRow(-1);
                        for (var column = 0; column < m; column++) {
                            document.getElementById('MatrixA').rows[row].insertCell(-1);
                            document.getElementById('MatrixA').rows[row].cells[column].innerText = matrixA[row][column];
                        }
                    }

                document.getElementById('MatrixBTitle').innerHTML = "Матрица B(m*q)";
                    for (var row = 0; row < m; row++) {
                        document.getElementById('MatrixB').insertRow(-1);
                        for (var column = 0; column < q; column++) {
                            document.getElementById('MatrixB').rows[row].insertCell(-1);
                            document.getElementById('MatrixB').rows[row].cells[column].innerText = matrixB[row][column];
                        }
                    }

                document.getElementById('MatrixCTitle').innerHTML = "Матрица C(p*q)";
                    for (var row = 0; row < p; row++) {
                        document.getElementById('MatrixC').insertRow(-1);
                        for (var column = 0; column < q; column++) {
                            document.getElementById('MatrixC').rows[row].insertCell(-1);
                            document.getElementById('MatrixC').rows[row].cells[column].innerText = matrixC[row][column];
                        }
                    }
            }
        }
    }

}

function readValues() {
    document.getElementById('MatrixATitle').innerHTML = " ";
    document.getElementById('MatrixBTitle').innerHTML = " ";
    document.getElementById('MatrixCTitle').innerHTML = " ";
    document.getElementById('CountTimeMassage').innerHTML = " ";

    document.getElementById('MatrixA').innerHTML = " ";
    document.getElementById('MatrixB').innerHTML = " ";
    document.getElementById('MatrixC').innerHTML = " ";

    p = document.getElementById('getP').value;
    m = document.getElementById('getM').value;
    q = document.getElementById('getQ').value;
    n = document.getElementById('getN').value;
    
    addition = document.getElementById('addition').value;
    subtraction = document.getElementById('subtraction').value;
    abs = document.getElementById('abs').value;
    compare = document.getElementById('compare').value;
    multiplication = document.getElementById('multiplication').value;
    squaring = document.getElementById('squaring').value;
}

function calculate(r, n) {
    var Ky = 0;
    var e = 0;
    var D = 0;
    var timePar = 0, timeCons = 0;
    var d = 0, Sum = 0;
    var amountAbs, amountCompare, amountMultiplication, amountAddition, amountSubtraction, amountSquaring, amountSumAddition;
    var L = 0, rangResultSum = 0;

    for (var i = 0; i < p; i++) {
        for (var j = 0; j < q; j++) {
            amountAbs = 0;
            amountCompare = 0;
            amountMultiplication = 0;
            amountSubtraction = 0;
            amountAddition = 0;
            amountSumAddition = 0;
            amountSquaring = 0;

            for (var k = 0; k < r; k++) {
                amountAbs++;
                amountAbs++;
                amountCompare++;
                L += 2 * (abs + abs + compare);

                if (Math.abs(matrixA[i][k]) < Math.abs(matrixB[k][j])) {
                    d = matrixA[i][k] * matrixB[k][j];
                    amountMultiplication++;
                    L += 2 * multiplication;

                } else {
                    amountCompare++;
                    L += 2 * compare;

                    if (matrixB[i][k] == 0) {
                        d = matrixA[i][k] * matrixA[i][k] + matrixB[k][j];
                        amountSquaring++;
                        amountAddition++;
                        L += 2 * (addition + squaring);

                    } else {
                        d = matrixA[i][k] * matrixA[i][k] - Math.abs(matrixA[i][k] * matrixB[k][j]);
                        amountSquaring++;
                        amountSubtraction++;
                        amountAbs++;
                        amountMultiplication++;
                        L += 2 * (squaring + subtraction + abs + multiplication);

                    }
                }

                amountSumAddition++;
                Sum += d;
                L += rangResultSum * addition;
                rangResultSum += 2;
            }

            matrixC[i][j] = Sum.toFixed(3);
            Sum = 0;
            timeCons += (amountAddition * addition) + (amountSubtraction * subtraction) + (amountCompare * compare) + (amountMultiplication * multiplication) + (amountAbs * abs) + (amountSquaring * squaring) + (amountSumAddition * addition);
            timePar += (Math.ceil(amountAddition / n) * addition) + Math.ceil((amountSubtraction / n) * subtraction) + Math.ceil((amountSquaring / n) * squaring) + Math.ceil((amountCompare / n) * compare) + Math.ceil((amountMultiplication / n) * multiplication) + Math.ceil((amountAbs / n) * abs) + (amountSumAddition * addition);
        }
    }

    Ky = timeCons / timePar;
    e = Ky / n;
    D = timePar / (L / (2 * r * p * q));

    document.getElementById('CountTimeMassage').innerHTML = "Время, затраченное при последовательном исчислении: " + timeCons +
        "<br> Время, затраченное при параллельном исчислении: " + timePar + "<br>Коэффициент ускорения: " + Ky +
        "<br>Эффективность: " + e + "<br>Коэффициент расхождения: " + D;
}

function genMatrix(x, y) {
    var maxVal = 1;
    var minVal = -1;
    var matrix = [];
    for (var i = 0; i < x; i++) {
        matrix[i] = [];
        for (var j = 0; j < y; j++) {
            matrix[i][j] = (Math.random() * (maxVal - minVal) + minVal).toFixed(3);
        }
    }
    return matrix;
}
