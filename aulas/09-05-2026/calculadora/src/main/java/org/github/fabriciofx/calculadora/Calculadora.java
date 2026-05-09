package org.github.fabriciofx.calculadora;

public final class Calculadora {
    public double soma(double left, double right) {
        return left + right;
    }

    public double subtrai(double left, double right) {
        return left - right;
    }

    public double multiplica(double left, double right) {
        return left * right;
    }

    public double divide(double left, double right) {
        if (right == 0) {
            throw  new ArithmeticException("Divide by zero");
        }
        return left / right;
    }
}
