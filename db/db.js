const Ticket = require("../models/Ticket");

class MyDB {
  constructor() {
    this.tickets = [];
  }

  /**
   * Create a ticket
   * @param {string} username
   * @param {number} price
   * @returns {Ticket} return a ticket object
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }

  /**
   * create a multiple ticket for a single user
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @returns {Array <Ticket>}
   */
  bulkTicket(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }
    return result;
  }

  /**
   * return all tickets
   */

  find() {
    return this.tickets;
  }

  /**
   * find a single ticket by id
   * @param {string} ticketId
   * @returns {Ticket}
   */
  findById(ticketId) {
    const tickets = this.tickets.find(
      /**
       * @param {Ticket} ticket
       */

      (ticket) => ticket.id === ticketId
    );
    return tickets;
  }

  /**
   *
   * @param {string;} username
   * @returns {Array <Ticket>}
   */
  findByUsername(username) {
    const ticket = this.tickets.filter(
      /**
       * @param {Ticket} ticket
       */

      ticket.username === username
    );

    return ticket;
  }

  /**
   *
   * @param {string} ticketId
   * @param {{username:string,price:number}} ticketBody
   */
  updateById(ticketId, ticketBody) {
    const ticket = this.find(ticketId);
    this.username = ticketBody.username ?? this.username;
    this.price = ticketBody.price ?? this.price;
    this.updateAt = new Date();

    return ticket;
  }

  /**
   *
   * @param {number} ticketId
   * @returns {Boolean}
   */
  deleteById(ticketId) {
    const index = this.tickets.findIndex((ticket) => ticket.id === ticketId);

    if (index !== -1) {
      this.tickets.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   * @param {number} winnerCount
   */
  draw(winnerCount) {
    let winnerIndexes = new Array(winnerCount);

    let index = 0;
    while (index < winnerCount) {
      let winnerIndex = Math.floor(Math.random() * this.tickets.length);
      if (!winnerIndexes.includes(winnerIndex)) {
        winnerIndexes[index++] = winnerIndex;
        continue;
      }
    }

    const winners = winnerIndexes.map((index) => this.tickets[index]);
    return winners;
  }
}

const myDB = new MyDB();
module.exports = myDB;
