class RSVP {
    constructor(eventName, name, email) {
      this.eventName = eventName;
      this.name = name;
      this.email = email;
    }
  
    // Register an attendee if email is valid
    register() {
      if (this.validateEmail()) {
        return true;
      }
      return false;
    }
  
    // Simple email validation
    validateEmail() {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(this.email);
    }
  }
  
  module.exports = RSVP;
  