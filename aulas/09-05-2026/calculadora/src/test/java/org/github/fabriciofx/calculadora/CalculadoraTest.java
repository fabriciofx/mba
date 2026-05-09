package org.github.fabriciofx.calculadora;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public final class CalculadoraTest {
    static Calculadora calculadora;

    @BeforeAll
    public static void setUp() {
        calculadora = new Calculadora();
    }

    @AfterAll
    public static void tearDown() {
        calculadora = null;
    }

    @Test
    public void deveSomarDoisNumeros() {
        final double resultado = calculadora.soma(2, 3);
        Assertions.assertEquals(
            5.0,
            resultado,
            "Deve resultar em 5.0 ao somar 2 e 3"
        );
    }

    @Test
    public void deveSubtrairDoisNumeros() {
        final double resultado = calculadora.subtrai(3, 2);
        Assertions.assertEquals(
            1.0,
            resultado,
            "Deve resultar em 1.0 ao subtrair 3 e 2"
        );
    }

    @Test
    public void devePermitirResultadoNegativoAoSubtrairDoisNumeros() {
        final double resultado = calculadora.subtrai(2, 3);
        Assertions.assertEquals(
            -1.0,
            resultado,
            "Deve resultar em -1.0 ao subtrair 3 e 2"
        );
    }

    @Test
    public void deveMultiplicarDoisNumeros() {
        final double resultado = calculadora.multiplica(3, 2);
        Assertions.assertEquals(
            6.0,
            resultado,
            "Deve resultar em 6.0 ao multiplicar 3 e 2"
        );
    }

    @Test
    public void deveResultarEmPositivoAoMultiplicarDoisNumerosNegativos() {
        final double resultado = calculadora.multiplica(-3, -2);
        Assertions.assertEquals(
            6.0,
            resultado,
            "Deve resultar em 6.0 ao multiplicar -3 e -2"
        );
    }

    @Test
    public void deveDividirDoisNumeros() {
        final double resultado = calculadora.divide(3, 2);
        Assertions.assertEquals(
            1.5,
            resultado,
            "Deve resultar em 1.5 ao dividir 3 e 2"
        );
    }

    @Test
    public void deveResultarEmPositivoAoDividirDoisNumerosNegativos() {
        final double resultado = calculadora.divide(-3, -2);
        Assertions.assertEquals(
            1.5,
            resultado,
            "Deve resultar em 1.5 ao dividir -3 e -2"
        );
    }

    @Test
    public void deveImpedirDeDividirPorZero() {
        Assertions.assertThrows(
            ArithmeticException.class,
            () -> calculadora.divide(2, 0),
            "Deve impedir divisão por zero"
        );
    }
}
