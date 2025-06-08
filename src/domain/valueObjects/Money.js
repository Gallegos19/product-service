class Money {
  constructor(amount, currency = 'MXN') {
    if (amount < 0) {
      throw new Error('El monto no puede ser negativo');
    }
    
    this.amount = parseFloat(amount);
    this.currency = currency;
  }

  add(other) {
    if (this.currency !== other.currency) {
      throw new Error('No se pueden sumar montos de diferentes monedas');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other) {
    if (this.currency !== other.currency) {
      throw new Error('No se pueden restar montos de diferentes monedas');
    }
    
    const result = this.amount - other.amount;
    if (result < 0) {
      throw new Error('El resultado no puede ser negativo');
    }
    
    return new Money(result, this.currency);
  }

  multiply(factor) {
    if (factor < 0) {
      throw new Error('El factor no puede ser negativo');
    }
    return new Money(this.amount * factor, this.currency);
  }

  isGreaterThan(other) {
    if (this.currency !== other.currency) {
      throw new Error('No se pueden comparar montos de diferentes monedas');
    }
    return this.amount > other.amount;
  }

  equals(other) {
    return this.amount === other.amount && this.currency === other.currency;
  }

  toString() {
    return `${this.amount.toFixed(2)} ${this.currency}`;
  }

  toJSON() {
    return {
      amount: this.amount,
      currency: this.currency,
      formatted: this.toString()
    };
  }
}

module.exports = Money;