declare module 'vue' {
    interface Number {
      $Number: typeof Number
      // Extend Number object with methods to convert between degrees & radians
        toRadians =()=> function() { return this * Math.PI / 180; };
        toDegrees =()=> function() { return this * 180 / Math.PI; };
    }
  }